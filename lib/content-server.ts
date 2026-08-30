import fs from "fs"
import path from "path"
import { SiteContent, getInitialDefaultContent } from "./content"

const localContentPath = path.join(process.cwd(), "data", "content.json")
const tmpContentPath = path.join("/tmp", "genz_content.json")

// Global in-memory cache for serverless execution
declare global {
  var __genz_content: SiteContent | undefined
}

// 1. Upstash Redis / Vercel KV REST helper (Zero-package dependency)
async function fetchCloudKV(): Promise<SiteContent | null> {
  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN

  if (!kvUrl || !kvToken) return null

  try {
    const res = await fetch(`${kvUrl}/get/genz_site_content`, {
      headers: { Authorization: `Bearer ${kvToken}` },
      cache: "no-store",
    })
    const data = await res.json()
    if (data && data.result) {
      const parsed = typeof data.result === "string" ? JSON.parse(data.result) : data.result
      return parsed as SiteContent
    }
  } catch (err) {
    console.error("Cloud KV fetch error:", err)
  }
  return null
}

async function saveCloudKV(content: SiteContent): Promise<boolean> {
  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN

  if (!kvUrl || !kvToken) return false

  try {
    const res = await fetch(`${kvUrl}/set/genz_site_content`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${kvToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(content),
    })
    const data = await res.json()
    return data && data.result === "OK"
  } catch (err) {
    console.error("Cloud KV save error:", err)
    return false
  }
}

// 2. GitHub API Auto-Commit Sync (Optional: If GITHUB_TOKEN is set in Vercel)
async function syncToGitHub(content: SiteContent): Promise<boolean> {
  const ghToken = process.env.GITHUB_TOKEN || process.env.GH_TOKEN
  const repo = process.env.GITHUB_REPO || "lokeshnagrikar/genzmedia-website"

  if (!ghToken) return false

  try {
    const fileUrl = `https://api.github.com/repos/${repo}/contents/data/content.json`
    const getRes = await fetch(fileUrl, {
      headers: {
        Authorization: `Bearer ${ghToken}`,
        Accept: "application/vnd.github.v3+json",
      },
      cache: "no-store",
    })

    let sha = ""
    if (getRes.ok) {
      const fileData = await getRes.json()
      sha = fileData.sha
    }

    const contentBase64 = Buffer.from(JSON.stringify(content, null, 2)).toString("base64")

    const putRes = await fetch(fileUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${ghToken}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "chore(cms): update content from admin panel [skip ci]",
        content: contentBase64,
        sha: sha || undefined,
        branch: "main",
      }),
    })

    return putRes.ok
  } catch (err) {
    console.error("GitHub Sync error:", err)
    return false
  }
}

// 3. Read Site Content (Multi-tier resilient fallback)
export async function readSiteContentAsync(): Promise<SiteContent> {
  // Check Cloud KV first
  const cloudData = await fetchCloudKV()
  if (cloudData) {
    globalThis.__genz_content = cloudData
    return cloudData
  }

  // Check In-Memory
  if (globalThis.__genz_content) {
    return globalThis.__genz_content
  }

  // Check /tmp file (Writable on Vercel Lambdas)
  try {
    if (fs.existsSync(tmpContentPath)) {
      const raw = fs.readFileSync(tmpContentPath, "utf8")
      const parsed = JSON.parse(raw) as SiteContent
      globalThis.__genz_content = parsed
      return parsed
    }
  } catch {}

  // Check Local data/content.json
  try {
    if (fs.existsSync(localContentPath)) {
      const raw = fs.readFileSync(localContentPath, "utf8")
      const parsed = JSON.parse(raw) as SiteContent
      globalThis.__genz_content = parsed
      return parsed
    }
  } catch {}

  // Fallback to initial defaults
  const defaultContent = getInitialDefaultContent()
  globalThis.__genz_content = defaultContent
  return defaultContent
}

export function readSiteContent(): SiteContent {
  if (globalThis.__genz_content) {
    return globalThis.__genz_content
  }

  try {
    if (fs.existsSync(tmpContentPath)) {
      const raw = fs.readFileSync(tmpContentPath, "utf8")
      const parsed = JSON.parse(raw) as SiteContent
      globalThis.__genz_content = parsed
      return parsed
    }
  } catch {}

  try {
    if (fs.existsSync(localContentPath)) {
      const raw = fs.readFileSync(localContentPath, "utf8")
      const parsed = JSON.parse(raw) as SiteContent
      globalThis.__genz_content = parsed
      return parsed
    }
  } catch {}

  const defaultContent = getInitialDefaultContent()
  globalThis.__genz_content = defaultContent
  return defaultContent
}

// 4. Write Site Content (Multi-tier resilient saver)
export async function writeSiteContentAsync(newContent: SiteContent): Promise<boolean> {
  // Update in-memory
  globalThis.__genz_content = newContent

  // 1. Try writing to local repo path
  try {
    fs.mkdirSync(path.dirname(localContentPath), { recursive: true })
    fs.writeFileSync(localContentPath, JSON.stringify(newContent, null, 2), "utf8")
  } catch {
    // Expected on Vercel read-only lambda filesystem
  }

  // 2. Try writing to /tmp (Always writable on Vercel lambdas)
  try {
    fs.mkdirSync(path.dirname(tmpContentPath), { recursive: true })
    fs.writeFileSync(tmpContentPath, JSON.stringify(newContent, null, 2), "utf8")
  } catch {}

  // 3. Save to Cloud KV if available
  await saveCloudKV(newContent)

  // 4. Save to GitHub if token available
  syncToGitHub(newContent).catch(() => {})

  return true
}

export function writeSiteContent(newContent: SiteContent): boolean {
  globalThis.__genz_content = newContent

  try {
    fs.mkdirSync(path.dirname(localContentPath), { recursive: true })
    fs.writeFileSync(localContentPath, JSON.stringify(newContent, null, 2), "utf8")
  } catch {}

  try {
    fs.mkdirSync(path.dirname(tmpContentPath), { recursive: true })
    fs.writeFileSync(tmpContentPath, JSON.stringify(newContent, null, 2), "utf8")
  } catch {}

  return true
}
