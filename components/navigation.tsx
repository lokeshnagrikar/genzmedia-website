"use client"

import { useState, useEffect } from "react"
import { Menu, X, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import MagneticButton from "./magnetic-button"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Capabilities", href: "#services" },
    { label: "Case Studies", href: "#portfolio" },
    { label: "Team", href: "#team" },
  ]

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#08090E]/90 backdrop-blur-2xl border-b border-slate-800/80 h-16"
          : "bg-transparent h-20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        
        {/* ⚡ LOGO */}
        <Link href="/" className="group relative flex items-center">
          <div className="relative flex items-center gap-3">
            <img
              src="/logoo.png"
              alt="GENZMEDIA Logo"
              className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_0_20px_rgba(255,46,147,0.5)]"
            />
            <span className="hidden sm:inline-block font-mono text-[10px] tracking-widest text-fuchsia-300 uppercase font-bold border border-fuchsia-500/30 px-2 py-0.5 rounded bg-fuchsia-500/10">
              STUDIO
            </span>
          </div>
        </Link>

        {/* 🧠 DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-8 relative">
          {navLinks.map((link, i) => (
            <MagneticButton key={link.href} className="px-2 py-1">
              <motion.a
                href={link.href}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className="relative text-xs font-mono uppercase tracking-widest text-slate-300 hover:text-white transition-colors"
              >
                {link.label}

                {/* Gradient Underline */}
                <AnimatePresence>
                  {active === i && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500"
                      initial={{ opacity: 0, scaleX: 0.5 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </AnimatePresence>
              </motion.a>
            </MagneticButton>
          ))}
        </div>

        {/* ⚡ CTA BUTTON */}
        <div className="flex items-center gap-3">
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-white font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 shadow-lg shadow-fuchsia-500/25 hover:shadow-[0_0_35px_rgba(255,46,147,0.5)] transition-all cursor-pointer border border-pink-400/30"
          >
            <span>START A PROJECT</span>
            <ArrowUpRight size={14} />
          </motion.a>

          {/* 📱 MOBILE BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 rounded-lg bg-slate-900 border border-slate-800"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* 📱 MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#08090E]/98 backdrop-blur-2xl border-t border-slate-800"
          >
            <div className="flex flex-col px-6 py-6 space-y-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-sm font-mono uppercase tracking-widest text-slate-300 hover:text-fuchsia-400 transition"
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="mt-4 text-center py-3 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 text-white font-mono font-bold text-xs uppercase tracking-widest"
              >
                START A PROJECT
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}