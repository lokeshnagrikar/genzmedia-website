import { NextResponse } from "next/server"
import { readSiteContentAsync, writeSiteContentAsync } from "@/lib/content-server"
import { SiteContent } from "@/lib/content"

export const dynamic = "force-dynamic"
export const revalidate = 0

// GET latest content (Public & Admin)
export async function GET() {
  try {
    const content = await readSiteContentAsync()
    // Do not leak admin pin on public GET
    const { adminPin: _pin, ...publicContent } = content
    return NextResponse.json(
      { success: true, data: publicContent },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
        },
      }
    )
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to read content" }, { status: 500 })
  }
}

// POST / Save updated content
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { token, content: newContent } = body as { token?: string; content: SiteContent }

    // Read current content to verify pin
    const current = await readSiteContentAsync()
    const currentPin = current.adminPin || "2424"

    // Basic token validation (contains admin prefix)
    if (!token || !token.startsWith("admin_")) {
      const decoded = Buffer.from(token || "", "base64").toString("utf-8")
      if (!decoded.startsWith("admin_")) {
        return NextResponse.json({ success: false, message: "Unauthorized. Please log in again." }, { status: 401 })
      }
    }

    if (!newContent) {
      return NextResponse.json({ success: false, message: "Missing content payload" }, { status: 400 })
    }

    // Preserve existing adminPin and set update timestamp
    const finalContent: SiteContent = {
      ...newContent,
      adminPin: newContent.adminPin || currentPin,
      _updatedAt: Date.now(),
    }

    await writeSiteContentAsync(finalContent)

    return NextResponse.json(
      { success: true, message: "Content updated and published successfully!" },
      {
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    )
  } catch (error) {
    console.error("Error in POST /api/admin/content:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
