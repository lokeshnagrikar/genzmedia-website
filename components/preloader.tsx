"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Progress simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 1.5
      })
    }, 30)

    return () => clearInterval(interval)
  }, [])

  // Exit control
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    if (progress === 100) {
      setTimeout(() => {
        setIsLoading(false)
        window.scrollTo(0, 0)
      }, 500)
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [progress, isLoading])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: "blur(12px)",
          }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-slate-950 overflow-hidden"
        >
          {/* 🌌 Animated Gradient Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-purple-900 via-slate-950 to-pink-900"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* ✨ Floating Particles */}
          {isMounted && [...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              animate={{
                y: ["0%", "100%"],
                x: ["0%", `${Math.random() * 100}%`],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}

          {/* 🔥 🎯 Unified Premium Animated Logo & Spinner */}
          <div className="relative flex items-center justify-center mb-10">
            {/* 🌀 Concentric Animated Rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute w-44 h-44 md:w-56 md:h-56 border border-purple-500/20 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="absolute w-40 h-40 md:w-52 md:h-52 border border-pink-500/20 rounded-full border-dashed"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute w-36 h-36 md:w-48 md:h-48 border-2 border-t-purple-500/40 border-l-transparent border-r-transparent border-b-transparent rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute w-32 h-32 md:w-44 md:h-44 border-2 border-b-pink-500/40 border-l-transparent border-r-transparent border-t-transparent rounded-full"
            />

            {/* Glowing Aura */}
            <motion.div 
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-32 h-32 md:w-44 md:h-44 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
            />

            {/* Logo Container */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative z-10 p-4"
            >
              <img 
                src="/logoo.png" 
                alt="GENZMEDIA Logo" 
                className="h-24 md:h-32 w-auto object-contain drop-shadow-[0_0_30px_rgba(168,85,247,0.6)]" 
              />
              
              {/* Internal Pulse Shadow */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0, 0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-white/10 rounded-full blur-xl -z-10"
              />
            </motion.div>
          </div>

          {/* 💡 Light Sweep */}
          <motion.div
            className="absolute top-1/2 w-40 h-[2px] bg-white/20 blur-md"
            animate={{ x: ["-150%", "150%"] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* 📝 Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-slate-400 mt-6 text-sm tracking-wide"
          >
            Building the Future of Digital Presence
          </motion.p>

          {/* 📊 Progress */}
          <div className="w-52 md:w-72 h-1 bg-slate-800 rounded-full mt-10 overflow-hidden">
            <motion.div
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
            />
          </div>

          <p className="text-xs text-slate-400 mt-3">{progress}%</p>

          {/* 🎞 Subtle Ambient Grid Overlay */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}