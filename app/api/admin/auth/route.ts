import { NextResponse } from "next/server"
import { readSiteContent } from "@/lib/content-server"

export async function POST(request: Request) {
  try {
    const { pin } = await request.json()
    const content = readSiteContent()
    const validPin = content.adminPin || "2424"

    if (pin && pin.trim() === validPin.trim()) {
      return NextResponse.json({
        success: true,
        message: "Authenticated successfully",
        token: Buffer.from(`admin_${validPin}_${Date.now()}`).toString("base64"),
      })
    }

    return NextResponse.json({ success: false, message: "Invalid Passcode / PIN" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}
