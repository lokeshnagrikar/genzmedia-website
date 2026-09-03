"use client"

import { useState } from "react"
import { Palette, Video, Pen, Share2, TrendingUp, Code, Sparkles, Zap, Flame, Globe, ArrowUpRight, CheckCircle2, LucideIcon } from "lucide-react"
import { motion } from "framer-motion"
import { useContent } from "@/hooks/use-content"
import { ServiceItem } from "@/lib/content"

const iconMap: Record<string, LucideIcon> = {
  Palette,
  Video,
  Pen,
  Share2,
  TrendingUp,
  Code,
  Sparkles,
  Zap,
  Flame,
  Globe,
}

// Deliverable tags for creative media agency credibility
const serviceTags: Record<string, string[]> = {
  "Graphic Designing": ["Brand Identity", "Carousels", "Typography", "Visual System"],
  "Thumbnail Design": ["CTR Psychology", "High Contrast", "Face Enhancements", "A/B Variants"],
  "Video Editing": ["Hook Design", "DaVinci Color Grade", "Sound FX & Foley", "Pacing & Retention"],
  "Social Media Management": ["Content Strategy", "Grid Cohesion", "Viral Scheduling", "Analytics"],
  "Meta Ads Management": ["ROAS Scaling", "Ad Creatives", "Audience Targeting", "Conversion Funnels"],
  "Website Development": ["Next.js & React", "High Performance", "Cinematic Animations", "SEO Ready"],
}

export default function Services() {
  const { services } = useContent()
  const [activeIdx, setActiveIdx] = useState<number>(0)

  return (
    <section id="services" className="relative py-24 md:py-36 bg-[#08090E] border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              <span className="text-xs font-mono tracking-widest text-fuchsia-400 uppercase">
                STUDIO CAPABILITIES
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight">
              WHAT WE{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-400">
                ENGINEER.
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-400 max-w-md font-medium leading-relaxed">
            We don't offer bloated 50-page PDFs. We execute tight, measurable creative assets designed to capture human attention in the first 2 seconds.
          </p>
        </div>

        {/* Editorial Capabilities List */}
        <div className="space-y-4">
          {services?.map((service, index) => {
            const Icon = iconMap[service.iconName] || Sparkles
            const isActive = activeIdx === index
            const tags = serviceTags[service.title] || ["High Quality", "Rapid Delivery", "100% Bespoke"]

            return (
              <motion.div
                key={service.id || index}
                onMouseEnter={() => setActiveIdx(index)}
                className={`group relative rounded-2xl p-6 sm:p-8 transition-all duration-300 border cursor-pointer ${
                  isActive
                    ? "bg-[#0D0E15] border-fuchsia-500/60 shadow-[0_0_40px_rgba(255,46,147,0.2)]"
                    : "bg-[#0B0C12]/80 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  
                  {/* Left: Number, Icon & Title */}
                  <div className="flex items-start sm:items-center gap-5">
                    <span className={`text-xl sm:text-2xl font-mono font-bold transition-colors ${
                      isActive ? "text-pink-400" : "text-slate-600 group-hover:text-slate-400"
                    }`}>
                      0{index + 1}
                    </span>

                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      isActive
                        ? "bg-gradient-to-tr from-violet-600 to-pink-500 text-white shadow-[0_0_20px_rgba(255,46,147,0.4)]"
                        : "bg-slate-900 text-slate-400 group-hover:text-white"
                    }`}>
                      <Icon size={22} />
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-300 group-hover:to-pink-300 transition-all">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Right: Deliverable Tags & Action Arrow */}
                  <div className="flex items-center justify-between lg:justify-end gap-4 pl-12 sm:pl-0">
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-slate-900 border border-slate-800 text-slate-300 group-hover:border-fuchsia-500/40 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isActive
                        ? "bg-gradient-to-tr from-violet-600 to-pink-500 text-white rotate-45 shadow-[0_0_15px_rgba(255,46,147,0.4)]"
                        : "bg-slate-900 text-slate-500 group-hover:text-white"
                    }`}>
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Studio Guarantee */}
        <div className="mt-12 p-6 rounded-2xl bg-[#0D0E15] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={20} className="text-fuchsia-400 shrink-0" />
            <span className="text-xs sm:text-sm font-mono text-slate-300">
              ALL EDITS GRADED IN DAVINCI RESOLVE • 4K EXPORTS • REVISIONS INCLUDED
            </span>
          </div>
          <a
            href="#contact"
            className="text-xs font-mono font-bold text-fuchsia-400 hover:text-pink-300 hover:underline flex items-center gap-1"
          >
            <span>START A PROJECT</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}
