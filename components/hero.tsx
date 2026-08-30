"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Play, TrendingUp, Palette, MessageCircle, Sparkles, X, ExternalLink } from "lucide-react"
import { motion, AnimatePresence, useMotionTemplate, useMotionValue, useScroll, useTransform } from "framer-motion"
import MagneticButton from "./magnetic-button"
import { SplitText } from "./split-text"
import { useContent } from "@/hooks/use-content"

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false)
  const [showreelOpen, setShowreelOpen] = useState(false)
  const { hero } = useContent()
  
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

  // Close showreel with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowreelOpen(false)
    }
    if (showreelOpen) {
      window.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [showreelOpen])

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  // Electric Cyberpunk & Neo-Tokyo dynamic aura
  const backgroundGradient = useMotionTemplate`radial-gradient(1200px circle at ${mouseX}px ${mouseY}px, rgba(139, 92, 246, 0.16), rgba(255, 46, 147, 0.12), rgba(0, 240, 255, 0.05), transparent 80%)`
  const spotlightGradient = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.12), transparent 100%)`

  if (!isMounted) return <div className="min-h-screen bg-[#08090E]" />

  return (
    <section 
      id="home" 
      className="relative min-h-screen bg-[#08090E] overflow-hidden pt-24 pb-16 flex flex-col justify-center group"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 opacity-60 group-hover:opacity-100"
        style={{ background: backgroundGradient }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

      {/* Thematic Floating Icons with Parallax wrappers */}
      
      {/* Video Editing (Play Button) */}
      <motion.div style={{ y: p1 }} className="absolute inset-0 pointer-events-none z-10 hidden lg:block">
        <motion.div
          animate={{ 
            y: [0, -20, 0], 
            rotate: [5, 0, 5],
            rotateX: [0, 10, 0],
            rotateY: [0, 10, 0]
          }}
          transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
          className="absolute top-32 right-[15%] w-24 h-24 bg-[#0D0E15]/80 backdrop-blur-xl border border-fuchsia-500/30 rounded-2xl shadow-[0_0_35px_rgba(255,46,147,0.25)] flex items-center justify-center pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-pink-500/20 rounded-2xl" />
          <Play className="w-10 h-10 text-pink-400 fill-pink-400/20 ml-1" />
        </motion.div>
      </motion.div>

      {/* Meta Ads / Performance (TrendingUp) */}
      <motion.div style={{ y: p2 }} className="absolute inset-0 pointer-events-none z-10 hidden lg:block">
        <motion.div
          animate={{ 
            y: [0, 25, 0], 
            rotate: [-10, -5, -10],
            rotateX: [0, -5, 0],
            rotateY: [0, 5, 0]
          }}
          transition={{ duration: 7, ease: "easeInOut", repeat: Infinity, delay: 1 }}
          className="absolute bottom-32 right-[20%] w-28 h-28 bg-[#0D0E15]/80 backdrop-blur-xl border border-cyan-500/30 rounded-full shadow-[0_0_35px_rgba(0,240,255,0.2)] flex items-center justify-center pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-violet-500/20 rounded-full" />
          <TrendingUp className="w-12 h-12 text-cyan-400" />
        </motion.div>
      </motion.div>

      {/* Graphic Design / Thumbnails (Palette) */}
      <motion.div style={{ y: p3 }} className="absolute inset-0 pointer-events-none z-10 hidden md:block">
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [-15, -5, -15] }}
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, delay: 2 }}
          className="absolute top-40 left-[15%] w-20 h-20 bg-[#0D0E15]/80 backdrop-blur-xl border border-violet-500/30 rounded-2xl shadow-[0_0_35px_rgba(139,92,246,0.25)] flex items-center justify-center pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-bl from-violet-500/20 to-amber-500/10 rounded-2xl" />
          <Palette className="w-8 h-8 text-violet-400" />
        </motion.div>
      </motion.div>

      {/* Social Media (MessageCircle) */}
      <motion.div style={{ y: p4 }} className="absolute inset-0 pointer-events-none z-10 hidden md:block">
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [10, 5, 10] }}
          transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, delay: 1.5 }}
          className="absolute bottom-40 left-[15%] w-24 h-24 bg-[#0D0E15]/80 backdrop-blur-xl border border-rose-500/30 rounded-[2rem] shadow-[0_0_35px_rgba(244,63,94,0.2)] flex items-center justify-center pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-tl from-rose-500/20 to-amber-500/20 rounded-[2rem]" />
          <MessageCircle className="w-10 h-10 text-rose-400 fill-rose-400/20" />
        </motion.div>
      </motion.div>

      <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          
          {/* 🟢 Live Studio Availability Badge */}
          {hero.availability?.active && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="flex justify-center"
            >
              <a
                href={hero.availability?.link || "#contact"}
                className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-[#0D0E15]/90 border border-emerald-500/40 text-xs sm:text-sm font-semibold text-slate-200 shadow-[0_0_25px_rgba(16,185,129,0.25)] hover:border-emerald-400 hover:shadow-[0_0_35px_rgba(16,185,129,0.4)] transition-all cursor-pointer backdrop-blur-xl group hover:scale-105"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span>{hero.availability?.text}</span>
                <ArrowRight size={14} className="text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
              </a>
            </motion.div>
          )}

          {/* Main Heading with Electric Cyberpunk Gradient */}
          <div className="relative mb-6 flex flex-col items-center text-center w-full">
            <motion.div
              className="absolute inset-0 z-10 pointer-events-none mix-blend-overlay"
              style={{ background: spotlightGradient }}
            />
            <SplitText 
              text="We Help Business Owners & " 
              delayBefore={0.6}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.15] tracking-tight [&>span]:bg-clip-text [&>span]:text-transparent [&>span]:bg-gradient-to-r [&>span]:from-violet-400 [&>span]:via-fuchsia-400 [&>span]:to-amber-400 justify-center pb-1 drop-shadow-[0_0_25px_rgba(255,46,147,0.35)]"
            />
            <SplitText 
              text="Content Creators Grow" 
              delayBefore={0.9}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.15] tracking-tight text-white justify-center drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]"
            />
          </div>

          {/* Subheading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed px-4">
              GENZMEDIA is a creative studio specializing in professional graphic design, high-impact thumbnails, clean
              video editing, reliable social media management, and performance-driven Meta Ads — built to increase
              attention, trust, and engagement.
            </p>
          </motion.div>

          {/* CTA Buttons + Mini Showreel Trigger */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center items-center pt-6"
          >
            {/* Showreel Preview Button */}
            <button
              onClick={() => setShowreelOpen(true)}
              className="px-7 py-4 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 text-white font-bold text-base sm:text-lg hover:shadow-[0_0_35px_rgba(255,46,147,0.5)] transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3 group border border-pink-400/30 cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play size={16} className="text-white ml-0.5 fill-white" />
              </div>
              <span>Watch 2026 Showreel</span>
            </button>

            <MagneticButton>
              <a
                href="#portfolio"
                className="px-7 py-4 rounded-xl bg-[#0D0E15]/80 hover:bg-slate-900 text-white font-bold text-base sm:text-lg border border-slate-800 hover:border-violet-500/60 hover:shadow-[0_0_30px_rgba(139,92,246,0.35)] transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 group backdrop-blur-md"
              >
                View Our Work
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </a>
            </MagneticButton>

            <MagneticButton>
              <a
                href="#contact"
                className="px-7 py-4 rounded-xl border border-slate-800 hover:border-fuchsia-500/60 text-slate-200 hover:text-white font-bold text-base sm:text-lg hover:bg-fuchsia-500/10 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center backdrop-blur-md"
              >
                Contact Us
              </a>
            </MagneticButton>
          </motion.div>

          {/* 🔥 Dynamic Stats Bar (Real-Time Live Synced) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2, ease: [0.16, 1, 0.3, 1] }}
            className="pt-12 sm:pt-16 max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {hero.stats?.map((stat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6, scale: 1.03 }}
                  transition={{ duration: 0.25 }}
                  className={`relative p-5 sm:p-6 rounded-2xl bg-gradient-to-b ${stat.gradient} bg-[#0D0E15]/80 backdrop-blur-xl border ${stat.border} shadow-xl hover:shadow-[0_0_35px_rgba(255,46,147,0.25)] text-left group overflow-hidden`}
                >
                  <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 group-hover:scale-125 transition-all text-2xl">
                    {stat.emoji}
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl sm:text-2xl">{stat.emoji}</span>
                    <span className={`text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r ${stat.textGradient} bg-clip-text text-transparent tracking-tight`}>
                      {stat.value}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white tracking-wide">
                    {stat.label}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    {stat.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* 🎬 2026 Showreel Modal */}
      <AnimatePresence>
        {showreelOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowreelOpen(false)}
              className="fixed inset-0 bg-[#08090E]/90 backdrop-blur-2xl transition-opacity"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-[#0D0E15]/95 border border-slate-700/80 rounded-3xl p-4 sm:p-6 shadow-2xl z-10 backdrop-blur-2xl flex flex-col my-auto"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-gradient-to-r from-violet-500/20 to-pink-500/20 border border-fuchsia-500/40 text-fuchsia-300">
                      ⚡ Official 2026 Showreel
                    </span>
                    <span className="text-xs text-slate-400">GENZMEDIA Studio</span>
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Creative Production & Growth Edits
                  </h3>
                </div>

                <button
                  onClick={() => setShowreelOpen(false)}
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700 shrink-0 cursor-pointer"
                  aria-label="Close Showreel"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Showreel Video Frame */}
              <div className="relative w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center min-h-[460px] sm:min-h-[500px]">
                <iframe
                  src={`https://www.instagram.com/reel/${hero.showreelId || "DapY6qrO-V3"}/embed/`}
                  className="w-full h-[480px] sm:h-[520px] rounded-2xl border-0"
                  allowFullScreen
                  title="GENZMEDIA 2026 Showreel"
                />
              </div>

              {/* Footer CTA */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-800">
                <a
                  href="#portfolio"
                  onClick={() => setShowreelOpen(false)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-sm font-semibold transition-colors border border-slate-700"
                >
                  <span>Explore All Projects</span>
                  <ArrowRight size={14} />
                </a>

                <a
                  href="#contact"
                  onClick={() => setShowreelOpen(false)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 text-white text-sm font-bold shadow-lg shadow-fuchsia-500/25 hover:shadow-fuchsia-500/45 transition-all"
                >
                  <Sparkles size={16} />
                  <span>Start Your Project</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
