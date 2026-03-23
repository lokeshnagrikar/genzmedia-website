"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"

import MagneticButton from "./magnetic-button"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Portfolio", href: "#portfolio" },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center cursor-pointer group">
            <span className="text-2xl font-black tracking-tight text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-pink-400 transition-all duration-300">
              GENZMEDIA
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-slate-300 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            
            <MagneticButton>
              <a
                href="#contact"
                className="relative inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-white font-bold shadow-lg shadow-purple-500/20 bg-gradient-to-r from-purple-600 to-pink-600 overflow-hidden group transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-purple-400/20"
              >
                {/* Diagonal Light Sweep */}
                <div className="absolute inset-0 -translate-x-[150%] skew-x-[-30deg] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent w-full h-full" />

                <span className="relative z-10 flex items-center gap-2.5">
                  Get Started
                  {/* Pulsing Availability Dot */}
                  <span className="relative flex h-2.5 w-2.5 pt-0.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                </span>
              </a>
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white p-2">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-6 border-t border-slate-800/50 pt-4 space-y-2 bg-slate-950/95 backdrop-blur-3xl absolute left-0 right-0 px-4 shadow-2xl">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-3 px-4 rounded-lg text-base font-bold text-slate-300 hover:bg-slate-800/50 hover:text-white transition-all"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 pb-2 px-4 w-full">
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold shadow-lg shadow-purple-500/20 active:scale-95 transition-transform"
              >
                Get Started
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
