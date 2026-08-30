"use client"

import { useState, useEffect, useCallback } from "react"
import { SiteContent, getInitialDefaultContent } from "@/lib/content"

// BroadcastChannel for instant cross-tab real-time sync
const SYNC_CHANNEL = "genzmedia_sync_channel"
const STORAGE_KEY = "genz_site_content_cache"
const TIMESTAMP_KEY = "genz_content_last_updated"

export function notifyContentUpdated(updatedContent?: SiteContent) {
  if (typeof window === "undefined") return
  const now = Date.now()
  const contentWithTime = updatedContent ? { ...updatedContent, _updatedAt: now } : undefined

  if (contentWithTime) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contentWithTime))
    } catch {}
  }
  try {
    localStorage.setItem(TIMESTAMP_KEY, now.toString())
  } catch {}

  try {
    const channel = new BroadcastChannel(SYNC_CHANNEL)
    channel.postMessage({ type: "CONTENT_UPDATED", timestamp: now, data: contentWithTime })
    channel.close()
  } catch {}

  window.dispatchEvent(new CustomEvent("genz_content_updated", { detail: contentWithTime || now }))
}

export function useContent() {
  const [content, setContent] = useState<SiteContent>(() => {
    // Initial sync from local storage cache if available
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem(STORAGE_KEY)
        if (cached) {
          const parsed = JSON.parse(cached)
          if (parsed && typeof parsed === "object" && parsed.hero && parsed.portfolio) {
            return parsed as SiteContent
          }
        }
      } catch {}
    }
    return getInitialDefaultContent()
  })

  const [isLoading, setIsLoading] = useState(true)

  const fetchLatest = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/content?t=${Date.now()}`, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      })
      const data = await res.json()
      if (data?.success && data?.data) {
        const serverData = data.data as SiteContent

        // Check local cache timestamp
        let localTimestamp = 0
        try {
          const storedTime = localStorage.getItem(TIMESTAMP_KEY)
          if (storedTime) localTimestamp = parseInt(storedTime, 10)
        } catch {}

        const serverTimestamp = serverData._updatedAt || 0

        // If local timestamp is newer than server data (e.g. serverless cold start static fallback), preserve local
        if (localTimestamp && localTimestamp > serverTimestamp) {
          // Keep local state
          return
        }

        setContent((prev) => {
          const merged = { ...prev, ...serverData }
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
          } catch {}
          return merged
        })
      }
    } catch (e) {
      console.error("Failed to fetch latest content", e)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // 1. Initial fetch from API
    fetchLatest()

    // 2. Listen for BroadcastChannel updates (cross-tab real-time)
    let channel: BroadcastChannel | null = null
    try {
      channel = new BroadcastChannel(SYNC_CHANNEL)
      channel.onmessage = (event) => {
        if (event.data?.type === "CONTENT_UPDATED") {
          if (event.data?.data) {
            setContent(event.data.data)
          } else {
            fetchLatest()
          }
        }
      }
    } catch {}

    // 3. Listen for in-window custom events
    const handleCustomUpdate = (e: any) => {
      if (e?.detail && typeof e.detail === "object" && e.detail.hero) {
        setContent(e.detail)
      } else {
        fetchLatest()
      }
    }
    window.addEventListener("genz_content_updated", handleCustomUpdate)

    // 4. Listen for localStorage changes across tabs
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue)
          if (parsed && parsed.hero) setContent(parsed)
        } catch {}
      } else if (e.key === TIMESTAMP_KEY) {
        fetchLatest()
      }
    }
    window.addEventListener("storage", handleStorage)

    // 5. Polling fallback (every 8 seconds)
    const interval = setInterval(() => {
      fetchLatest()
    }, 8000)

    return () => {
      if (channel) channel.close()
      window.removeEventListener("genz_content_updated", handleCustomUpdate)
      window.removeEventListener("storage", handleStorage)
      clearInterval(interval)
    }
  }, [fetchLatest])

  return {
    content,
    hero: content.hero,
    portfolio: content.portfolio,
    services: content.services,
    team: content.team,
    contact: content.contact,
    isLoading,
    refresh: fetchLatest,
  }
}
