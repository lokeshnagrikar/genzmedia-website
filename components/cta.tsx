"use client"

import { Phone, Mail, Instagram, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import MagneticButton from "./magnetic-button"
import { useContent } from "@/hooks/use-content"

export default function CTA() {
  const { contact: contactData } = useContent()

  return (
    <section id="contact" className="relative py-24 md:py-36 bg-[#08090E] border-t border-slate-800 overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-fuchsia-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0D0E15] border border-slate-800 text-xs font-mono text-fuchsia-300 mb-4">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            <span>DIRECT ACCESS TO FOUNDERS</span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-4">
            READY TO MAKE CONTENT THAT <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-400">
              ACTUALLY CONVERTS?
            </span>
          </h2>
          <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto font-medium">
            Whether you need a high-retention reel package, a school admissions campaign, or high-CTR thumbnails, talk directly with Sahil and Navin today.
          </p>
        </div>

        {/* 📞 Contact Channel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Phone Card */}
          <div className="bg-[#0D0E15] rounded-2xl p-7 border border-slate-800 hover:border-fuchsia-500/60 transition-all duration-300 shadow-xl group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-violet-600 to-pink-600 flex items-center justify-center mb-6 shadow-md shadow-fuchsia-500/20 group-hover:scale-110 transition-transform">
              <Phone size={22} className="text-white" />
            </div>
            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">Direct Phone</h3>
            <div className="space-y-2">
              {contactData?.phones?.map((phone, idx) => (
                <a
                  key={idx}
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="block text-white font-mono font-bold text-base hover:text-fuchsia-400 transition-colors py-2 px-3 rounded-lg bg-black/40 border border-slate-800/80"
                >
                  {phone}
                </a>
              ))}
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-[#0D0E15] rounded-2xl p-7 border border-slate-800 hover:border-cyan-500/60 transition-all duration-300 shadow-xl group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-600 to-violet-600 flex items-center justify-center mb-6 shadow-md shadow-cyan-500/20 group-hover:scale-110 transition-transform">
              <Mail size={22} className="text-white" />
            </div>
            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">Email Inquiries</h3>
            <div className="space-y-2">
              {contactData?.emails?.map((email, idx) => (
                <a
                  key={idx}
                  href={`mailto:${email}`}
                  className="block text-white font-mono font-bold text-xs sm:text-sm hover:text-cyan-400 transition-colors py-2 px-3 rounded-lg bg-black/40 border border-slate-800/80 overflow-hidden text-ellipsis"
                >
                  {email}
                </a>
              ))}
            </div>
          </div>

          {/* Instagram Card */}
          <div className="bg-[#0D0E15] rounded-2xl p-7 border border-slate-800 hover:border-pink-500/60 transition-all duration-300 shadow-xl group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-pink-600 to-amber-500 flex items-center justify-center mb-6 shadow-md shadow-pink-500/20 group-hover:scale-110 transition-transform">
              <Instagram size={22} className="text-white" />
            </div>
            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-3">Instagram DM</h3>
            <div className="space-y-2">
              {contactData?.instagram?.map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white font-mono font-bold text-sm hover:text-pink-400 transition-colors py-2 px-3 rounded-lg bg-black/40 border border-slate-800/80"
                >
                  {item.handle}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
