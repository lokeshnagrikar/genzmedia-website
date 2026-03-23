"use client"

import { Instagram } from "lucide-react"
import { motion } from "framer-motion"
import { SplitText } from "./split-text"

const teamMembers = [
  {
    name: "Rohan Sahare",
    role: "Meta Expert",
    instagram: "https://www.instagram.com/etz.rohan",
    color: "from-blue-600 to-cyan-600",
    image: "/rohan.png",
  },
  {
    name: "Jaya Kharwade",
    role: "Graphics Designer",
    instagram: "https://www.instagram.com/jaya__0403",
    color: "from-purple-600 to-pink-600",
    image: "/jaya.png",
  },
  {
    name: "Palak Bankar",
    role: "Influencer",
    instagram: "https://www.instagram.com/infowithpallu",
    color: "from-pink-600 to-orange-600",
    image: "/palak.png",
  },
  {
    name: "Jitesh Katankar",
    role: "Video Creator",
    instagram: "https://www.instagram.com/createwith_jit?igsh=dTg4am1wenJodXZt",
    color: "from-orange-600 to-red-600",
    image: "/jitesh.png",
  },
  {
    name: "Lokesh Nagrikar",
    role: "Web Developer",
    instagram: "https://www.instagram.com/hey.__ritik/",
    color: "from-indigo-600 to-purple-600",
    image: "/lokesh.png",
  },
]

export default function Team() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <section id="team" className="relative py-20 md:py-32 bg-slate-950 border-t border-slate-800 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <SplitText 
            text="Meet The Team" 
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 [&>span]:bg-clip-text [&>span]:text-transparent [&>span]:bg-gradient-to-r [&>span]:from-purple-400 [&>span]:via-pink-400 [&>span]:to-blue-400 pb-2 justify-center"
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-wrap justify-center gap-6"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[260px] max-w-[320px] flex-shrink-0 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-md transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] overflow-hidden"
            >
              {/* Inner Glow */}
              <div className={`absolute inset-0 bg-gradient-to-b ${member.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

              <div className="relative z-10 flex flex-col items-center text-center h-full justify-between">
                <div>
                  <div className={`relative w-28 h-28 rounded-full bg-gradient-to-tr items-center justify-center flex mb-6 mx-auto ${member.color} p-1 group-hover:scale-110 shadow-xl transition-transform duration-300`}>
                    <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center overflow-hidden border-[3px] border-slate-950 relative">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover relative z-10 transition-opacity duration-500 bg-slate-800"
                        onError={(e) => {
                          e.currentTarget.style.opacity = '0'
                          e.currentTarget.style.backgroundColor = 'transparent'
                        }}
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white uppercase z-0">
                        {member.name[0]}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-pink-200 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-purple-400 font-medium text-sm mb-6 uppercase tracking-wider">{member.role}</p>
                </div>

                <a
                  href={member.instagram}
                  target={member.instagram !== "#" ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="mt-auto px-6 py-3 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-pink-500 flex items-center gap-2 group/btn transition-colors w-full justify-center"
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
      </div>
    </section>
  )
}
