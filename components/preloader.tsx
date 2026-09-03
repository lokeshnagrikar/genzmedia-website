"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Preloader() {
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Fast, smooth, clean progress count
  useEffect(() => {
    if (!mounted) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        const jump = Math.floor(Math.random() * 8) + 4
        return Math.min(prev + jump, 100)
      })
    }, 25)

    return () => clearInterval(interval)
  }, [mounted])

  // Lock scroll while loading & smooth exit
  useEffect(() => {
    if (!mounted) return

    if (isLoading) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 350)
      return () => clearTimeout(timer)
    }
  }, [progress, isLoading, mounted])

  // Avoid SSR hydration mismatch
  if (!mounted) return null

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#08090E] text-white select-none"
        >
          {/* Studio Center Container */}
          <div className="flex flex-col items-center max-w-xs w-full px-6">
            
            {/* Clean Logo */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mb-8"
            >
              <img
                src="/logoo.png"
                alt="GENZMEDIA"
                className="h-14 md:h-16 w-auto object-contain drop-shadow-[0_0_25px_rgba(255,46,147,0.5)]"
              />
            </motion.div>

            {/* Minimal Razor-Thin Gradient Progress Track */}
            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden mb-4 relative">
              <motion.div
                className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 shadow-[0_0_15px_rgba(255,46,147,0.7)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Studio Meta Text & Counter */}
            <div className="w-full flex items-center justify-between text-[11px] font-mono tracking-widest text-slate-400 uppercase">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-pulse inline-block" />
                <span className="text-slate-300">GENZMEDIA STUDIO</span>
              </span>
              <span className="text-fuchsia-300 font-bold">{progress.toString().padStart(3, "0")}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}