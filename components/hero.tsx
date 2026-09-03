"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Play, TrendingUp, Sparkles, X, ExternalLink, Zap, Radio, CheckCircle2 } from "lucide-react"
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion"
import MagneticButton from "./magnetic-button"
import { useContent } from "@/hooks/use-content"

export default function Hero() {
  const [isMounted, setIsMounted] = useState(false)
  const [showreelOpen, setShowreelOpen] = useState(false)
  const [timecode, setTimecode] = useState("00:01:24:18")
  const { hero } = useContent()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    setIsMounted(true)

    // Dynamic running camera timecode
    let frame = 18
    let sec = 24
    let min = 1
    const interval = setInterval(() => {
      frame += 1
      if (frame >= 60) {
        frame = 0
        sec += 1
        if (sec >= 60) {
          sec = 0
          min += 1
        }
      }
      setTimecode(
        `00:${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}:${frame.toString().padStart(2, "0")}`
      )
    }, 1000 / 30)

    return () => clearInterval(interval)
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

  // Electric Cyberpunk spotlight aura
  const backgroundGradient = useMotionTemplate`radial-gradient(1000px circle at ${mouseX}px ${mouseY}px, rgba(168, 85, 247, 0.14), rgba(255, 46, 147, 0.10), rgba(0, 240, 255, 0.04), transparent 75%)`

  if (!isMounted) return <div className="min-h-screen bg-[#08090E]" />

  return (
    <section
      id="home"
      className="relative min-h-screen bg-[#08090E] overflow-hidden pt-28 pb-12 flex flex-col justify-between"
      onMouseMove={handleMouseMove}
    >
      {/* 🌌 Dynamic Studio Spotlight */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 opacity-70"
        style={{ background: backgroundGradient }}
      />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

      {/* 📹 CINEMA CAMERA VIEWFINDER HUD FRAME (TOP) */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 mb-6 pointer-events-none">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-[11px] font-mono tracking-widest text-slate-400">
          {/* Left: REC Indicator */}
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-white font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping inline-block" />
              <span className="text-rose-400 font-extrabold">REC</span>
            </span>
            <span className="hidden sm:inline-block text-slate-600">|</span>
            <span className="hidden sm:inline-block font-semibold text-slate-300">4K UHD • 60 FPS</span>
            <span className="hidden md:inline-block text-slate-600">|</span>
            <span className="hidden md:inline-block text-slate-300">SHUTTER 1/120</span>
          </div>

          {/* Center: Live Running Camera Timecode */}
          <div className="flex items-center gap-2 bg-[#0D0E15] px-3 py-1 rounded-md border border-slate-800 text-white font-bold">
            <span className="text-fuchsia-400">TC:</span>
            <span>{timecode}</span>
          </div>

          {/* Right: Audio Wave Equalizer & Studio Status */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-end gap-0.5 h-4 px-1">
              <span className="w-1 bg-fuchsia-400 rounded-sm wave-bar-1" />
              <span className="w-1 bg-fuchsia-400 rounded-sm wave-bar-2" />
              <span className="w-1 bg-fuchsia-400 rounded-sm wave-bar-3" />
              <span className="w-1 bg-fuchsia-400 rounded-sm wave-bar-4" />
              <span className="w-1 bg-fuchsia-400 rounded-sm wave-bar-5" />
            </div>
            <span className="px-2 py-0.5 rounded bg-fuchsia-500/15 text-fuchsia-300 font-bold border border-fuchsia-500/30 text-[10px]">
              STUDIO LIVE
            </span>
          </div>
        </div>
      </div>

      {/* 🎯 MAIN HERO CONTENT */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto">
        {/* 🟢 Live Studio Availability Pill */}
        {hero.availability?.active && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-6"
          >
            <a
              href={hero.availability?.link || "#contact"}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0D0E15] border border-emerald-500/40 text-xs font-semibold text-slate-200 shadow-[0_0_25px_rgba(16,185,129,0.2)] hover:border-emerald-400 transition-all cursor-pointer backdrop-blur-xl group hover:scale-105"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-slate-300">{hero.availability?.text}</span>
              <ArrowRight size={13} className="text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        )}

        {/* ⚡ High-Swagger Studio Headline with Vibrant Gradient */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight uppercase mb-6 drop-shadow-[0_0_35px_rgba(255,46,147,0.25)]">
          WE MAKE CONTENT <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-400">
            PEOPLE CAN'T SCROLL PAST.
          </span>
        </h1>

        {/* Studio Subtitle */}
        <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed mb-10">
          Raw footage in. High-retention viral attention out. We engineer short-form reels, high-CTR thumbnails, and performance creative for ambitious brands that refuse to be boring.
        </p>

        {/* 🚀 Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12">
          <MagneticButton>
            <a
              href="#portfolio"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 text-white font-extrabold text-base tracking-wide flex items-center justify-center gap-2 shadow-[0_0_35px_rgba(255,46,147,0.4)] hover:shadow-[0_0_45px_rgba(255,46,147,0.6)] transition-all hover:scale-105 border border-pink-400/30"
            >
              <span>EXPLORE WORK</span>
              <ArrowRight size={18} />
            </a>
          </MagneticButton>

          <MagneticButton>
            <button
              onClick={() => setShowreelOpen(true)}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#0D0E15] hover:bg-[#13151F] border border-slate-700 hover:border-fuchsia-500/60 text-white font-bold text-base flex items-center justify-center gap-2.5 transition-all hover:scale-105 cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-pink-400">
                <Play size={14} className="fill-current translate-x-0.5" />
              </div>
              <span>WATCH 2026 SHOWREEL</span>
            </button>
          </MagneticButton>
        </div>

        {/* 📊 DYNAMIC STATS BAR */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          {hero.stats?.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-[#0D0E15] border border-slate-800 text-left hover:border-fuchsia-500/50 transition-all hover:-translate-y-1 group hover:shadow-[0_0_30px_rgba(255,46,147,0.15)]"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl sm:text-2xl">{stat.emoji}</span>
                <span className="text-[10px] font-mono text-slate-500 uppercase">#0{idx + 1}</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-300 group-hover:to-pink-300 transition-colors">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-bold text-slate-300 mt-0.5">{stat.label}</div>
              <div className="text-[11px] text-slate-500 mt-1">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 🎞️ SEAMLESS INFINITE MARQUEE TICKER TAPE */}
      <div className="relative z-20 w-full mt-12 py-4 bg-[#0D0E15] border-y border-slate-800 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-xs sm:text-sm font-mono tracking-widest text-slate-300 uppercase">
          <span className="flex items-center gap-2">
            <span className="text-pink-400">🔥</span> 50K+ ORGANIC VIEWS • LITTLE FLOWERS SCHOOL
          </span>
          <span className="text-slate-600">/</span>
          <span className="flex items-center gap-2">
            <span className="text-fuchsia-400">🎬</span> 350+ DELIVERED EDITS
          </span>
          <span className="text-slate-600">/</span>
          <span className="flex items-center gap-2">
            <span className="text-cyan-400">📈</span> 4.2x AVERAGE CTR
          </span>
          <span className="text-slate-600">/</span>
          <span className="flex items-center gap-2">
            <span className="text-pink-400">🎯</span> 120+ ADMISSIONS LEADS • ACUTE PUBLIC SCHOOL
          </span>
          <span className="text-slate-600">/</span>
          <span className="flex items-center gap-2">
            <span className="text-amber-400">⚡</span> NO GENERIC TEMPLATES • 100% BESPOKE PACING
          </span>
          <span className="text-slate-600">/</span>
          <span className="flex items-center gap-2">
            <span className="text-fuchsia-400">👑</span> FOUNDED BY CREATORS FOR BRANDS
          </span>
          <span className="text-slate-600">/</span>
          {/* Repeated for continuous infinite scroll */}
          <span className="flex items-center gap-2">
            <span className="text-pink-400">🔥</span> 50K+ ORGANIC VIEWS • LITTLE FLOWERS SCHOOL
          </span>
          <span className="text-slate-600">/</span>
          <span className="flex items-center gap-2">
            <span className="text-fuchsia-400">🎬</span> 350+ DELIVERED EDITS
          </span>
          <span className="text-slate-600">/</span>
          <span className="flex items-center gap-2">
            <span className="text-cyan-400">📈</span> 4.2x AVERAGE CTR
          </span>
          <span className="text-slate-600">/</span>
          <span className="flex items-center gap-2">
            <span className="text-pink-400">🎯</span> 120+ ADMISSIONS LEADS • ACUTE PUBLIC SCHOOL
          </span>
          <span className="text-slate-600">/</span>
          <span className="flex items-center gap-2">
            <span className="text-amber-400">⚡</span> NO GENERIC TEMPLATES • 100% BESPOKE PACING
          </span>
        </div>
      </div>

      {/* 🎬 IN-BROWSER SHOWREEL POPUP MODAL */}
      <AnimatePresence>
        {showreelOpen && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowreelOpen(false)}
              className="fixed inset-0 bg-[#08090E]/95 backdrop-blur-2xl transition-opacity"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-[#0D0E15] border border-slate-700 rounded-3xl p-5 sm:p-6 shadow-2xl z-10 flex flex-col my-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/30">
                      OFFICIAL 2026 SHOWREEL
                    </span>
                    <span className="text-xs text-slate-400 font-mono">GENZMEDIA</span>
                  </div>
                  <h3 className="text-lg font-bold text-white">Creative Production & High-Retention Edits</h3>
                </div>

                <button
                  onClick={() => setShowreelOpen(false)}
                  className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close Showreel"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Showreel Frame */}
              <div className="relative w-full rounded-2xl overflow-hidden bg-black border border-slate-800 flex items-center justify-center min-h-[460px] sm:min-h-[500px]">
                <iframe
                  src={`https://www.instagram.com/reel/${hero.showreelId || "DapY6qrO-V3"}/embed/`}
                  className="w-full h-[480px] sm:h-[520px] rounded-2xl border-0"
                  allowFullScreen
                  title="GENZMEDIA 2026 Showreel"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-800">
                <span className="text-xs text-slate-400 font-mono">Real Client Work</span>
                <a
                  href={hero.showreelUrl || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-fuchsia-400 hover:underline"
                >
                  <span>Open on Instagram</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
