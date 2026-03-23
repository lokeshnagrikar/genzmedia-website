"use client"

import { Check } from "lucide-react"
import { motion } from "framer-motion"
import { SplitText } from "./split-text"

export default function About() {
  const values = ["Clear visuals", "Clean editing", "Consistent posting", "Professional online presence"]

  const mindset = [
    "Good design builds trust",
    "Consistency builds brands",
    "Content should look professional",
    "Long-term growth beats trends",
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  }

  const rightItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <section id="about" className="relative py-20 md:py-32 bg-slate-950 border-t border-slate-800 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <SplitText 
              text="Who We Are" 
              className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 [&>span]:bg-clip-text [&>span]:text-transparent [&>span]:bg-gradient-to-r [&>span]:from-purple-400 [&>span]:to-pink-400 pb-2 justify-start"
            />
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              GENZMEDIA is a modern creative brand built for today's digital world. We work with business owners and
              content creators who want their content to look professional, consistent, and growth-ready.
            </p>

            {/* Values */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4 mb-8"
            >
              <h3 className="text-xl font-bold text-white mb-6">Our Focus:</h3>
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                    <Check size={16} className="text-white" />
                  </div>
                  <span className="text-slate-300 text-lg">{value}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700/50 backdrop-blur-md shadow-2xl relative overflow-hidden group">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10 group-hover:bg-purple-500/20 transition-colors duration-500" />
              
              <h3 className="text-2xl font-bold mb-6 gradient-text bg-gradient-to-r from-blue-400 to-purple-400">
                Our Mindset
              </h3>
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-4"
              >
                {mindset.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={rightItemVariants}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] cursor-default"
                  >
                    <p className="text-slate-200 font-medium">{item}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
