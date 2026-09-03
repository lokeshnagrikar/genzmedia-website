"use client"

import { Users, Briefcase, User, PlayCircle, Award } from "lucide-react"
import { motion } from "framer-motion"

const audiences = [
  {
    icon: Briefcase,
    label: "Business Owners",
    description: "Scale your revenue with high-retention ads and brand storytelling.",
  },
  {
    icon: User,
    label: "Founders & CEOs",
    description: "Turn your personal LinkedIn & Instagram into an authority engine.",
  },
  {
    icon: Users,
    label: "Schools & Academies",
    description: "Drive record admissions with high-energy student culture reels.",
  },
  {
    icon: PlayCircle,
    label: "Content Creators",
    description: "Save 30+ hours/week with bespoke, surgically paced video edits.",
  },
  {
    icon: Award,
    label: "Coaches & Consultants",
    description: "Establish instant credibility with elite studio-grade thumbnails.",
  },
]

const marqueeItems = [...audiences, ...audiences, ...audiences]

export default function WhoWeWorkWith() {
  return (
    <section className="relative py-24 md:py-36 bg-[#08090E] border-t border-slate-800 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              <span className="text-xs font-mono tracking-widest text-fuchsia-400 uppercase">
                PARTNER ECOSYSTEM
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight">
              BUILT FOR{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-400">
                GROWTH.
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-400 max-w-md font-medium leading-relaxed">
            We partner with ambitious founders, schools, and high-growth creators ready to dominate attention.
          </p>
        </div>
      </div>

      {/* Infinite Marquee Container */}
      <div className="relative w-full overflow-hidden flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <motion.div 
          className="flex gap-6 min-w-max px-3"
          animate={{ x: ["0%", "-33.333333%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 30,
          }}
        >
          {marqueeItems.map((audience, index) => {
            const Icon = audience.icon
            return (
              <div
                key={index}
                className="group relative bg-[#0D0E15] rounded-2xl p-8 border border-slate-800 transition-all duration-300 hover:border-fuchsia-500/60 hover:shadow-[0_0_30px_rgba(255,46,147,0.2)] hover:-translate-y-2 w-[340px] shrink-0 text-left"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-violet-600/30 to-pink-600/30 border border-fuchsia-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon size={22} className="text-pink-400" />
                </div>
                <h3 className="text-lg font-black text-white uppercase tracking-tight mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-300 group-hover:to-pink-300 transition-all">
                  {audience.label}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-medium">
                  {audience.description}
                </p>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
