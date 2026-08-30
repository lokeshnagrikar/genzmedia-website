"use client"

import { useState, useEffect, useCallback } from "react"
import { SiteContent, getInitialDefaultContent } from "@/lib/content"

// BroadcastChannel for instant cross-tab real-time sync
const SYNC_CHANNEL = "genzmedia_sync_channel"

export function notifyContentUpdated() {
  if (typeof window === "undefined") return
  try {
    const channel = new BroadcastChannel(SYNC_CHANNEL)
    channel.postMessage({ type: "CONTENT_UPDATED", timestamp: Date.now() })
    channel.close()
  } catch {}
  window.dispatchEvent(new CustomEvent("genz_content_updated", { detail: Date.now() }))
  localStorage.setItem("genz_last_sync", Date.now().toString())
}

export function useContent() {
  const [content, setContent] = useState<SiteContent>(getInitialDefaultContent())
  const [isLoading, setIsLoading] = useState(true)

  const fetchLatest = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/content?t=${Date.now()}`, {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      })
      const data = await res.json()
      if (data?.success && data?.data) {
        setContent((prev) => ({
          ...prev,
          ...data.data,
        }))
      }
    } catch (e) {
      console.error("Failed to fetch latest content", e)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // Initial fetch
    fetchLatest()

    // 1. Listen for BroadcastChannel updates (cross-tab real-time)
    let channel: BroadcastChannel | null = null
    try {
      channel = new BroadcastChannel(SYNC_CHANNEL)
      channel.onmessage = (event) => {
        if (event.data?.type === "CONTENT_UPDATED") {
          fetchLatest()
        }
      }
    } catch {}

    // 2. Listen for in-window custom events
    const handleCustomUpdate = () => fetchLatest()
    window.addEventListener("genz_content_updated", handleCustomUpdate)

    // 3. Listen for localStorage changes across tabs
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "genz_last_sync") fetchLatest()
    }
    window.addEventListener("storage", handleStorage)

    // 4. Background auto-polling (every 5 seconds) for real-time live sync across devices
    const interval = setInterval(() => {
      fetchLatest()
    }, 5000)

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
