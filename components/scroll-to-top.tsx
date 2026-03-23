"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp } from "lucide-react"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // Top: 0 takes us all the way back
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    // Show button if we scroll down 400px
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[5000] p-3 rounded-full bg-slate-800/80 backdrop-blur-md border border-slate-700/50 hover:border-purple-500/50 shadow-lg hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-colors duration-300 group overflow-hidden pointer-events-auto"
          aria-label="Scroll to top"
        >
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          
          <ArrowUp 
            size={24} 
            className="text-slate-300 group-hover:text-white relative z-10 transition-colors duration-300"
            strokeWidth={2.5}
          />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
