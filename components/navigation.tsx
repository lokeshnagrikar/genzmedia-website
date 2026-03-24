"use client"

import { useState, useEffect, useRef } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [active, setActive] = useState<number | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef(null)

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
  ]

  // Scroll effect (Apple style)
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-slate-950/70 backdrop-blur-2xl border-b border-white/10 h-16"
          : "bg-transparent h-20"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

        {/* 🔥 LOGO */}
        <Link href="/" className="group relative">
          <span className="text-2xl font-black tracking-tight relative">

            {/* Glow */}
            <span className="absolute inset-0 blur-lg opacity-60 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              GENZMEDIA
            </span>

            {/* Animated Gradient */}
            <span className="relative bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-x group-hover:scale-110 transition">
              GENZMEDIA
            </span>
          </span>
        </Link>

        {/* 🧠 DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-10 relative">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              className="relative text-sm font-semibold text-slate-300 hover:text-white transition"
            >
              {link.label}

              {/* 🔥 Hover underline (Stripe style) */}
              <AnimatePresence>
                {active === i && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500"
                    initial={{ opacity: 0, scaleX: 0.5 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>
            </motion.a>
          ))}
        </div>

        {/* ⚡ CTA BUTTON */}
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:inline-flex items-center px-6 py-2.5 rounded-xl text-white font-bold bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-500/20 hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition-all"
        >
          Get Started
        </motion.a>

        {/* 📱 MOBILE BUTTON */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* 📱 MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-slate-950/95 backdrop-blur-2xl border-t border-white/10"
          >
            <div className="flex flex-col px-6 py-6 space-y-4">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="text-lg font-semibold text-slate-300 hover:text-white transition"
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.a
                href="#contact"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 text-center py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold"
              >
                Get Started
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}