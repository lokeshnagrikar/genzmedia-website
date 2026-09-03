"use client"

import { Check, ShieldCheck, Zap, Video, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

export default function About() {
  const pillars = [
    {
      title: "First 2 Seconds Rule",
      desc: "If the visual hook doesn't stop the thumb immediately, the rest of the edit doesn't matter.",
      tag: "HOOK DESIGN",
    },
    {
      title: "Pacing Over Fluff",
      desc: "No boring pauses or generic transition packs. Every cut has intentional rhythm and sound design.",
      tag: "RETENTION CUTS",
    },
    {
      title: "Thumbnails That Command Clicks",
      desc: "High-contrast, psychologically engineered thumbnails tested for maximum click-through rates.",
      tag: "CTR PACKAGING",
    },
    {
      title: "Creator-Native Team",
      desc: "We don't outsource to generic freelancers. Our core creators handle and master every file.",
      tag: "100% IN-HOUSE",
    },
  ]

  return (
    <section id="about" className="relative py-24 md:py-36 bg-[#08090E] border-t border-slate-800 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              <span className="text-xs font-mono tracking-widest text-fuchsia-400 uppercase">
                STUDIO MANIFESTO
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight">
              BRED FOR THE{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-400">
                ALGORITHM.
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-400 max-w-md font-medium leading-relaxed">
            We are not a traditional agency that charges $10,000 for PDF slide decks. We live on TikTok, Reels, and Meta feeds every day — engineering content that dominates attention.
          </p>
        </div>

        {/* 4 Studio Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-[#0D0E15] border border-slate-800 hover:border-fuchsia-500/50 transition-all shadow-xl group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/30">
                  {pillar.tag}
                </span>
                <span className="text-xs font-mono text-slate-600 font-bold">0{idx + 1}</span>
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-300 group-hover:to-pink-300 transition-all">
                {pillar.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
