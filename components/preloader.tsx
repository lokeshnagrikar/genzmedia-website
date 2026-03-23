"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  // Progress logic
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 40)

    return () => clearInterval(interval)
  }, [])

  // Control loading + scroll lock
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
      }, 400)
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
          initial={{ y: 0, opacity: 1 }}
          exit={{
            y: "-100%",
            opacity: 0,
            filter: "blur(10px)",
          }}
          transition={{
            duration: 0.9,
            ease: [0.76, 0, 0.24, 1],
          }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-slate-950 overflow-hidden"
        >
          {/* 🌈 Animated Gradient Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-purple-900 via-slate-950 to-pink-900 opacity-40"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* 🔥 Glow Pulse Loader */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              boxShadow: [
                "0 0 10px rgba(168,85,247,0.5)",
                "0 0 40px rgba(168,85,247,0.9)",
                "0 0 10px rgba(168,85,247,0.5)",
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 mb-8"
          />

          {/* ✨ Animated Text */}
          <div className="flex gap-1 flex-wrap justify-center px-4">
            {text.map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: i * 0.08,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tight"
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* 📝 Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-slate-400 mt-4 text-sm tracking-wide"
          >
            Building the Future of Digital Presence
          </motion.p>

          {/* 📊 Progress Bar */}
          <div className="w-48 md:w-64 h-1 bg-slate-800 rounded-full mt-10 overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeInOut" }}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500"
            />
          </div>

          {/* 🔢 Percentage */}
          <motion.p className="text-xs text-slate-400 mt-3">
            {progress}%
          </motion.p>

          {/* 🎞 Noise Overlay (optional: add noise.png in public folder) */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('/noise.png')]" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}