import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import CustomCursor from "@/components/custom-cursor"
import Preloader from "@/components/preloader"
import SmoothScroll from "@/components/smooth-scroll"
import ScrollToTop from "@/components/scroll-to-top"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GENZMEDIA - Creative Studio for Growth",
  description:
    "Professional graphic design, video editing, social media management, and Meta Ads for business owners and content creators.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased bg-slate-950 text-white cursor-auto md:cursor-none`}>
        <SmoothScroll>
          <Preloader />
          <CustomCursor />
          <ScrollToTop />
          {children}
          <Analytics />
        </SmoothScroll>
      </body>
    </html>
  )
}
