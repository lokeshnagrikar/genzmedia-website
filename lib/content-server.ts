import fs from "fs"
import path from "path"
import { SiteContent, getInitialDefaultContent } from "./content"

const contentFilePath = path.join(process.cwd(), "data", "content.json")

export function readSiteContent(): SiteContent {
  try {
    if (!fs.existsSync(contentFilePath)) {
      const defaultContent = getInitialDefaultContent()
      fs.mkdirSync(path.dirname(contentFilePath), { recursive: true })
      fs.writeFileSync(contentFilePath, JSON.stringify(defaultContent, null, 2), "utf8")
      return defaultContent
    }
    const raw = fs.readFileSync(contentFilePath, "utf8")
    return JSON.parse(raw) as SiteContent
  } catch (error) {
    console.error("Error reading site content:", error)
    return getInitialDefaultContent()
  }
}

export function writeSiteContent(newContent: SiteContent): boolean {
  try {
    fs.mkdirSync(path.dirname(contentFilePath), { recursive: true })
    fs.writeFileSync(contentFilePath, JSON.stringify(newContent, null, 2), "utf8")
    return true
  } catch (error) {
    console.error("Error writing site content:", error)
    return false
  }
}
