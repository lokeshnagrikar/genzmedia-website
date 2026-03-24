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

  const text = "GENZMEDIA".split("")

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

          {/* 🔮 Orbital Loader */}
          <div className="relative mb-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border border-purple-500/30 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 border border-pink-500/30 rounded-full"
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              animate={{
                x: [0, 20, 0, -20, 0],
                y: [0, -20, 0, 20, 0],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ translateX: "-50%", translateY: "-50%" }}
            />
          </div>

          {/* 🔥 Animated Logo */}
          <div className="relative flex gap-1 flex-wrap justify-center px-4">
            {text.map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: i * 0.06,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                className="text-4xl md:text-6xl font-black tracking-tight relative"
              >
                {/* Glow */}
                <span className="absolute inset-0 blur-lg opacity-70 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {char}
                </span>

                {/* Main */}
                <span className="relative bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-x">
                  {char}
                </span>
              </motion.span>
            ))}
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

          {/* 🎞 Noise */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/noise.png')]" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}