"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Play, TrendingUp, Palette, MessageCircle } from "lucide-react"
import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from "framer-motion"
import MagneticButton from "./magnetic-button"
import { SplitText } from "./split-text"

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false)
  
  // Mouse tracking for spotlight
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Parallax Scroll Tracking
  const { scrollY } = useScroll()
  const p1 = useTransform(scrollY, [0, 1000], [0, 250])
  const p2 = useTransform(scrollY, [0, 1000], [0, -200])
  const p3 = useTransform(scrollY, [0, 1000], [0, 150])
  const p4 = useTransform(scrollY, [0, 1000], [0, -300])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const backgroundGradient = useMotionTemplate`radial-gradient(1000px circle at ${mouseX}px ${mouseY}px, rgba(168, 85, 247, 0.15), transparent 80%)`

  if (!isMounted) return <div className="min-h-screen bg-slate-950" />

  return (
    <section 
      id="home" 
      className="relative min-h-screen bg-slate-950 overflow-hidden pt-20 flex flex-col justify-center group"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 opacity-50 group-hover:opacity-100"
        style={{ background: backgroundGradient }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      {/* Thematic Floating Icons with Parallax wrappers */}
      
      {/* Video Editing (Play Button) */}
      <motion.div style={{ y: p1 }} className="absolute inset-0 pointer-events-none z-10 hidden lg:block">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [5, 0, 5] }}
          transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
          className="absolute top-32 right-[15%] w-24 h-24 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_30px_rgba(236,72,153,0.15)] flex items-center justify-center pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl" />
          <Play className="w-10 h-10 text-pink-400 fill-pink-400/20 ml-1" />
        </motion.div>
      </motion.div>

      {/* Meta Ads / Performance (TrendingUp) */}
      <motion.div style={{ y: p2 }} className="absolute inset-0 pointer-events-none z-10 hidden lg:block">
        <motion.div
          animate={{ y: [0, 25, 0], rotate: [-10, -5, -10] }}
          transition={{ duration: 7, ease: "easeInOut", repeat: Infinity, delay: 1 }}
          className="absolute bottom-32 right-[20%] w-28 h-28 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_0_30px_rgba(56,189,248,0.15)] flex items-center justify-center pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 rounded-full" />
          <TrendingUp className="w-12 h-12 text-cyan-400" />
        </motion.div>
      </motion.div>

      {/* Graphic Design / Thumbnails (Palette) */}
      <motion.div style={{ y: p3 }} className="absolute inset-0 pointer-events-none z-10 hidden md:block">
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [-15, -5, -15] }}
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, delay: 2 }}
          className="absolute top-40 left-[15%] w-20 h-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_30px_rgba(168,85,247,0.15)] flex items-center justify-center pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-bl from-purple-500/20 to-indigo-500/20 rounded-2xl" />
          <Palette className="w-8 h-8 text-indigo-400" />
        </motion.div>
      </motion.div>

      {/* Social Media (MessageCircle) */}
      <motion.div style={{ y: p4 }} className="absolute inset-0 pointer-events-none z-10 hidden md:block">
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [10, 5, 10] }}
          transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, delay: 1.5 }}
          className="absolute bottom-40 left-[15%] w-24 h-24 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-[0_0_30px_rgba(244,63,94,0.15)] flex items-center justify-center pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-tl from-pink-500/20 to-rose-500/20 rounded-[2rem]" />
          <MessageCircle className="w-10 h-10 text-rose-400 fill-rose-400/20" />
        </motion.div>
      </motion.div>

      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Main Heading */}
          <div className="mb-6 flex flex-col items-center text-center w-full">
            <SplitText 
              text="We Help Business Owners & " 
              delayBefore={0.8}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.15] tracking-tight [&>span]:bg-clip-text [&>span]:text-transparent [&>span]:bg-gradient-to-r [&>span]:from-purple-400 [&>span]:via-pink-400 [&>span]:to-blue-400 justify-center pb-1"
            />
            <SplitText 
              text="Content Creators Grow" 
              delayBefore={1.1}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.15] tracking-tight text-white justify-center"
            />
          </div>

          {/* Subheading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed px-4">
              GENZMEDIA is a creative studio specializing in professional graphic design, high-impact thumbnails, clean
              video editing, reliable social media management, and performance-driven Meta Ads — built to increase
              attention, trust, and engagement.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
          >
            <MagneticButton>
              <a
                href="#portfolio"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 group border border-purple-400/20"
              >
                View Our Work
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href="#contact"
                className="px-8 py-4 rounded-xl border-2 border-purple-500/50 text-white font-bold text-lg hover:bg-purple-500/10 hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center backdrop-blur-md"
              >
                Contact Us
              </a>
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
