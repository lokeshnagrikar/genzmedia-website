"use client"

import { Users, Briefcase, User, PlayCircle, Award } from "lucide-react"
import { motion } from "framer-motion"

const audiences = [
  {
    icon: Briefcase,
    label: "Business Owners",
    description: "Scale your brand with professional visuals and strategic ads",
  },
  {
    icon: User,
    label: "Entrepreneurs",
    description: "Build credibility and consistent online presence",
  },
  {
    icon: Users,
    label: "Personal Brands",
    description: "Stand out with unique, professional content",
  },
  {
    icon: PlayCircle,
    label: "Content Creators",
    description: "Grow your audience with high-impact visuals",
  },
  {
    icon: Award,
    label: "Coaches & Educators",
    description: "Establish authority with premium design and editing",
  },
]

// Duplicate the array to create a seamless loop
const marqueeItems = [...audiences, ...audiences, ...audiences]

export default function WhoWeWorkWith() {
  return (
    <section className="relative py-20 md:py-32 bg-slate-950 border-t border-slate-800 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text bg-gradient-to-r from-purple-400 to-pink-400">Who We Work With</span>
          </h2>
          <p className="text-xl text-slate-300">We partner with ambitious creators and businesses ready to grow</p>
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
            duration: 25, // Adjust speed here
          }}
        >
          {marqueeItems.map((audience, index) => {
            const Icon = audience.icon
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700/50 backdrop-blur-md transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.2)] hover:-translate-y-2 w-[350px] shrink-0"
              >
                {/* Glow on hover inside card */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-gradient-to-tr group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300">
                    <Icon size={28} className="text-slate-300 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-wide">
                    {audience.label}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{audience.description}</p>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
