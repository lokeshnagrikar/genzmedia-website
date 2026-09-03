"use client"

import { Instagram, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"
import { useContent } from "@/hooks/use-content"

export default function Team() {
  const { team } = useContent()

  return (
    <section id="team" className="relative py-24 md:py-36 bg-[#08090E] border-t border-slate-800 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              <span className="text-xs font-mono tracking-widest text-fuchsia-400 uppercase">
                THE COLLECTIVE
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight">
              MEET THE{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-400">
                CREATORS.
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-400 max-w-md font-medium leading-relaxed">
            The editors, colorists, and growth strategists behind GENZMEDIA. Dedicated creators obsessing over pacing, hooks, and views.
          </p>
        </div>

        {/* 👑 Founders Cards */}
        {team?.founders && team.founders.length > 0 && (
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            {team.founders.map((member, index) => (
              <motion.div
                key={member.id || index}
                whileHover={{ y: -6 }}
                className="group relative w-full sm:w-[calc(50%-16px)] lg:w-[440px] bg-[#0D0E15] rounded-3xl p-8 sm:p-10 border border-slate-800 hover:border-fuchsia-500/60 transition-all duration-300 shadow-xl hover:shadow-[0_0_40px_rgba(255,46,147,0.2)] flex flex-col justify-between"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Photo Avatar with Studio Border */}
                  <div className={`relative w-36 h-36 sm:w-40 sm:h-40 rounded-full p-1 bg-gradient-to-tr ${member.color || "from-violet-500 via-fuchsia-500 to-pink-500"} mb-6 shadow-xl shadow-fuchsia-500/20 group-hover:scale-105 transition-transform`}>
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden relative border-2 border-[#08090E]">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover relative z-10 transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.style.opacity = "0"
                        }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-4xl font-black text-white uppercase font-mono">
                        {member.name?.[0]}
                      </span>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-md text-[10px] font-mono uppercase font-bold tracking-widest bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/30 mb-3">
                    {member.role}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-6 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-300 group-hover:to-pink-300 transition-colors">
                    {member.name}
                  </h3>
                </div>

                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-xl bg-slate-900 border border-slate-700 hover:border-pink-500 hover:bg-gradient-to-r hover:from-violet-600 hover:to-pink-600 text-slate-200 hover:text-white flex items-center justify-center gap-2 font-mono font-bold text-xs uppercase tracking-wider transition-all duration-300 group/btn shadow-lg"
                >
                  <Instagram size={16} className="text-pink-400 group-hover/btn:text-white" />
                  <span>Follow on Instagram</span>
                  <ArrowUpRight size={14} className="opacity-70 group-hover/btn:opacity-100" />
                </a>
              </motion.div>
            ))}
          </div>
        )}

        {/* 👥 Team Members Grid */}
        {team?.members && team.members.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {team.members.map((member, index) => (
              <motion.div
                key={member.id || index}
                whileHover={{ y: -5 }}
                className="group relative bg-[#0D0E15] rounded-2xl p-6 border border-slate-800 hover:border-fuchsia-500/50 transition-all duration-300 flex flex-col justify-between text-center hover:shadow-[0_0_25px_rgba(255,46,147,0.15)]"
              >
                <div>
                  <div className={`relative w-24 h-24 rounded-full p-1 bg-gradient-to-tr ${member.color || "from-violet-500 to-pink-500"} mx-auto mb-4 group-hover:scale-105 transition-transform`}>
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden relative border border-[#08090E]">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover relative z-10 transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.style.opacity = "0"
                        }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-3xl font-black text-white uppercase font-mono">
                        {member.name?.[0]}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-base font-black text-white uppercase tracking-tight mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-300 group-hover:to-pink-300 transition-colors">
                    {member.name}
                  </h4>
                  <p className="text-[11px] font-mono text-fuchsia-400 uppercase tracking-wider mb-5">
                    {member.role}
                  </p>
                </div>

                <a
                  href={member.instagram}
                  target={member.instagram !== "#" ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 hover:border-pink-500/50 flex items-center justify-center gap-1.5 text-[11px] font-mono transition-colors"
                >
                  <Instagram size={14} className="text-pink-400" />
                  <span>Profile</span>
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
