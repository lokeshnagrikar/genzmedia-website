"use client"

import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section id="home" className="relative min-h-screen bg-slate-950 overflow-hidden pt-20">
      {/* Animated Background Gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-slate-950 to-slate-950"
        style={{ animation: "gradient-shift 3s ease infinite", backgroundSize: "200% 200%" }}
      />

      {/* Floating Shapes */}
      <div
        className="absolute top-20 left-10 w-72 h-72 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-3xl"
        style={{ animation: "float 3s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-40 right-10 w-72 h-72 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-3xl"
        style={{ animation: "float 3s ease-in-out infinite 2s" }}
      />
      <div
        className="absolute top-1/2 left-1/3 w-72 h-72 bg-pink-600/20 rounded-full mix-blend-multiply filter blur-3xl"
        style={{ animation: "float 3s ease-in-out infinite 4s" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center justify-center">
        <div className="text-center space-y-8">
          {/* Main Heading */}
          <div
            className={`transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span
                className="gradient-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"
                style={{ backgroundSize: "200% 200%", animation: "gradient-shift 3s ease infinite" }}
              >
                We Help Business Owners &
              </span>
              <br />
              <span className="text-white">Content Creators Grow</span>
            </h1>
          </div>

          {/* Subheading */}
          <div
            className={`transition-all duration-1000 delay-200 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              GENZMEDIA is a creative studio specializing in professional graphic design, high-impact thumbnails, clean
              video editing, reliable social media management, and performance-driven Meta Ads — built to increase
              attention, trust, and engagement.
            </p>
          </div>

          {/* CTA Buttons */}
          <div
  className={`flex flex-col sm:flex-row gap-6 justify-center pt-8 transition-all duration-1000 delay-300 ${
    isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
  }`}
>
  {/* View Our Work */}
  <a
    href="#portfolio"
    className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group"
  >
    View Our Work
    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
  </a>

  {/* Contact Us */}
  <a
    href="#contact"
    className="px-8 py-4 rounded-lg border-2 border-purple-500 text-white font-bold text-lg hover:bg-purple-500/10 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
  >
    Contact Us
  </a>
</div>

        </div>
      </div>
    </section>
  )
}
