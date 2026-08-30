"use client"

import { Instagram } from "lucide-react"
import { motion } from "framer-motion"
import { SplitText } from "./split-text"
import { useContent } from "@/hooks/use-content"

export default function Team() {
  const { team } = useContent()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <section id="team" className="relative py-20 md:py-32 bg-[#08090E] border-t border-slate-800/80 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <SplitText 
            text="Meet The Team" 
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 [&>span]:bg-clip-text [&>span]:text-transparent [&>span]:bg-gradient-to-r [&>span]:from-violet-400 [&>span]:via-fuchsia-400 [&>span]:to-amber-400 pb-2 justify-center drop-shadow-[0_0_25px_rgba(255,46,147,0.3)]"
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto"
          >
            The creative minds and strategic experts behind GENZMEDIA
          </motion.p>
        </div>

        {/* Founders */}
        {team?.founders && team.founders.length > 0 && (
          <motion.div
             variants={containerVariants}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-50px" }}
             className="flex flex-wrap justify-center gap-8 mb-12 sm:mb-16"
          >
            {team.founders.map((member, index) => (
              <motion.div
                key={member.id || index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative w-full sm:w-[calc(50%-16px)] lg:w-[420px] max-w-[460px] flex-shrink-0 bg-gradient-to-br from-[#0D0E15] to-[#12141F] rounded-[2rem] p-8 sm:p-10 border border-slate-800 backdrop-blur-xl transition-all duration-300 hover:border-fuchsia-500/60 hover:shadow-[0_0_40px_rgba(255,46,147,0.25)] overflow-hidden"
              >
                {/* Inner Glow Map based on role */}
                <div className={`absolute inset-0 bg-gradient-to-b ${member.color || "from-amber-400 to-rose-500"} opacity-0 group-hover:opacity-15 transition-opacity duration-500`} />

                <div className="relative z-10 flex flex-col items-center text-center h-full justify-between">
                  <div className="w-full">
                    <div className={`relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr items-center justify-center flex mb-8 mx-auto ${member.color || "from-amber-400 to-rose-500"} p-1.5 group-hover:scale-105 shadow-2xl transition-all duration-500 shadow-fuchsia-500/20`}>
                      <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden border-[4px] border-[#08090E] relative">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover relative z-10 transition-opacity duration-500 bg-slate-900"
                          onError={(e) => {
                            e.currentTarget.style.opacity = '0'
                            e.currentTarget.style.backgroundColor = 'transparent'
                          }}
                        />
                        <span className="absolute inset-0 flex items-center justify-center text-5xl font-black text-white uppercase z-0">
                          {member.name?.[0]}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white mb-2 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-300 group-hover:to-pink-300 transition-colors">
                      {member.name}
                    </h3>
                    <p className="font-bold text-sm sm:text-base mb-8 uppercase tracking-widest text-amber-400">
                      {member.role}
                    </p>
                  </div>

                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto px-8 py-4 rounded-xl bg-slate-900/90 border border-slate-700 hover:border-fuchsia-500 flex items-center gap-2 group/btn transition-all w-full justify-center shadow-lg hover:shadow-[0_0_20px_rgba(255,46,147,0.3)]"
                  >
                    <Instagram size={20} className="text-pink-400 group-hover/btn:scale-110 transition-transform" />
                    <span className="text-base font-bold text-slate-200 group-hover/btn:text-white transition-colors">
                      Follow on Instagram
                    </span>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Team Members */}
        {team?.members && team.members.length > 0 && (
          <motion.div
             variants={containerVariants}
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-50px" }}
             className="flex flex-wrap justify-center gap-6"
          >
            {team.members.map((member, index) => (
              <motion.div
                key={member.id || index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[260px] max-w-[320px] flex-shrink-0 bg-gradient-to-br from-[#0D0E15] to-[#12141F] rounded-2xl p-6 border border-slate-800 backdrop-blur-md transition-all duration-300 hover:border-fuchsia-500/50 hover:shadow-[0_0_30px_rgba(255,46,147,0.2)] overflow-hidden"
              >
                {/* Inner Glow */}
                <div className={`absolute inset-0 bg-gradient-to-b ${member.color || "from-violet-500 to-fuchsia-500"} opacity-0 group-hover:opacity-15 transition-opacity duration-500`} />

                <div className="relative z-10 flex flex-col items-center text-center h-full justify-between">
                  <div>
                    <div className={`relative w-28 h-28 rounded-full bg-gradient-to-tr items-center justify-center flex mb-6 mx-auto ${member.color || "from-violet-500 to-fuchsia-500"} p-1 group-hover:scale-110 shadow-xl transition-transform duration-300`}>
                      <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden border-[3px] border-[#08090E] relative">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover relative z-10 transition-opacity duration-500 bg-slate-900"
                          onError={(e) => {
                            e.currentTarget.style.opacity = '0'
                            e.currentTarget.style.backgroundColor = 'transparent'
                          }}
                        />
                        <span className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white uppercase z-0">
                          {member.name?.[0]}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-300 group-hover:to-pink-300 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-fuchsia-400 font-medium text-sm mb-6 uppercase tracking-wider">{member.role}</p>
                  </div>

                  <a
                    href={member.instagram}
                    target={member.instagram !== "#" ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="mt-auto px-6 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-pink-500 flex items-center gap-2 group/btn transition-colors w-full justify-center"
                  >
                    <Instagram size={18} className="text-pink-400 group-hover/btn:text-pink-300 transition-colors" />
                    <span className="text-sm font-semibold text-slate-300 group-hover/btn:text-white transition-colors">
                      Follow
                    </span>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  )
}
