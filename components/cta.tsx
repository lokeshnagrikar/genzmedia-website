"use client"

import { ArrowRight, Phone, Mail, Instagram } from "lucide-react"
import { motion } from "framer-motion"
import MagneticButton from "./magnetic-button"
import { SplitText } from "./split-text"

export default function CTA() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="contact" className="relative py-20 md:py-32 bg-slate-950 border-t border-slate-800 overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-slate-950 to-pink-900/10" />

      {/* Dynamic Floating Shapes using Framer Motion */}
      <motion.div
        animate={{ 
          y: [-20, 20, -20],
          x: [-20, 20, -20],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
        className="absolute top-20 right-10 w-[400px] h-[400px] bg-purple-600/20 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none"
      />
      
      <motion.div
        animate={{ 
          y: [20, -20, 20],
          x: [20, -20, 20],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 10, ease: "easeInOut", repeat: Infinity, delay: 1 }}
        className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Main Header */}
          <div className="text-center mb-16">
            <SplitText 
              text="Ready to Upgrade Your Content, Socials & Ads?" 
              className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 [&>span]:bg-clip-text [&>span]:text-transparent [&>span]:bg-gradient-to-r [&>span]:from-purple-400 [&>span]:via-pink-400 [&>span]:to-blue-400 pb-4 justify-center max-w-4xl mx-auto"
            />
            <motion.p 
              variants={itemVariants}
              className="text-xl text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto"
            >
              If you are a business owner or content creator looking for professional thumbnails, clean video editing,
              consistent social media management, Meta Ads for growth, and modern graphic design, let's work together.
            </motion.p>
          </div>

          {/* Contact Button */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-24">
            <MagneticButton>
              <a
                href="#contact-cards"
                className="px-10 py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl hover:shadow-[0_0_40px_rgba(168,85,247,0.5)] transition-all duration-300 flex items-center justify-center gap-3 group border border-purple-400/20"
              >
                Let's Work Together
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <ArrowRight size={24} className="text-white" />
                </motion.div>
              </a>
            </MagneticButton>
          </motion.div>

          {/* Contact Cards */}
          <motion.div 
            id="contact-cards"
            variants={containerVariants}
            className="grid lg:grid-cols-3 gap-6"
          >
            {/* Phone Card */}
            <motion.div 
              variants={itemVariants} 
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl p-8 border border-slate-700 backdrop-blur hover:border-purple-500/50 transition-all duration-300 shadow-xl group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg shadow-purple-500/20">
                  <Phone size={28} className="text-white" />
                </div>
                <h3 className="text-sm text-purple-300/80 uppercase tracking-widest mb-4 font-bold">Call Us</h3>
                <div className="space-y-3 w-full">
                  <a href="tel:+918237020562" className="block text-white font-bold text-lg hover:text-purple-400 transition-colors w-full bg-slate-800/50 py-3 rounded-lg border border-slate-700/50">
                    +91 82370 20562
                  </a>
                  <a href="tel:+918261899351" className="block text-white font-bold text-lg hover:text-purple-400 transition-colors w-full bg-slate-800/50 py-3 rounded-lg border border-slate-700/50">
                    +91 82618 99351
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Email Card */}
            <motion.div 
              variants={itemVariants} 
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl p-8 border border-slate-700 backdrop-blur hover:border-blue-500/50 transition-all duration-300 shadow-xl group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 shadow-lg shadow-blue-500/20">
                  <Mail size={28} className="text-white" />
                </div>
                <h3 className="text-sm text-blue-300/80 uppercase tracking-widest mb-4 font-bold">Email</h3>
                <div className="space-y-3 w-full">
                  <a href="mailto:sahilkamdi414@gmail.com" className="block text-white font-bold text-sm sm:text-base hover:text-blue-400 transition-colors w-full bg-slate-800/50 py-3 rounded-lg border border-slate-700/50 overflow-hidden text-ellipsis px-2">
                    sahilkamdi414@gmail.com
                  </a>
                  <a href="mailto:navinbankar1788@gmail.com" className="block text-white font-bold text-sm sm:text-base hover:text-blue-400 transition-colors w-full bg-slate-800/50 py-3 rounded-lg border border-slate-700/50 overflow-hidden text-ellipsis px-2">
                    navinbankar1788@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Instagram Card */}
            <motion.div 
              variants={itemVariants} 
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl p-8 border border-slate-700 backdrop-blur hover:border-pink-500/50 transition-all duration-300 shadow-xl group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-pink-600 to-rose-500 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg shadow-pink-500/20">
                  <Instagram size={28} className="text-white" />
                </div>
                <h3 className="text-sm text-pink-300/80 uppercase tracking-widest mb-4 font-bold">Follow Us</h3>
                <div className="space-y-3 w-full">
                  <a href="https://www.instagram.com/navin____24k" target="_blank" rel="noopener noreferrer" className="block text-white font-bold text-lg hover:text-pink-400 transition-colors w-full bg-slate-800/50 py-3 rounded-lg border border-slate-700/50">
                    @navin____24k
                  </a>
                  <a href="https://www.instagram.com/sahilkamdi_" target="_blank" rel="noopener noreferrer" className="block text-white font-bold text-lg hover:text-pink-400 transition-colors w-full bg-slate-800/50 py-3 rounded-lg border border-slate-700/50">
                    @sahilkamdi_
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
