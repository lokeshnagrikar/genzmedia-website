"use client"

import { useRef, useEffect, useState } from "react"
import { ArrowRight, Phone, Mail, Instagram } from "lucide-react"

export default function CTA() {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.3 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="contact" className="relative py-20 md:py-32 bg-slate-950 border-t border-slate-800 overflow-hidden">
      {/* Animated Background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-slate-950 to-slate-950"
        style={{ animation: "gradient-shift 3s ease infinite", backgroundSize: "200% 200%" }}
      />

      {/* Floating Shapes */}
      <div
        className="absolute top-20 right-10 w-72 h-72 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-3xl"
        style={{ animation: "float 3s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-10 left-10 w-72 h-72 bg-pink-600/20 rounded-full mix-blend-multiply filter blur-3xl"
        style={{ animation: "float 3s ease-in-out infinite 2s" }}
      />

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            <span className="gradient-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              Ready to Upgrade Your Content, Social Media & Ads?
            </span>
          </h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            If you are a business owner or content creator looking for professional thumbnails, clean video editing,
            consistent social media management, Meta Ads for growth, and modern graphic design, let's work together.
          </p>
        </div>

        {/* Contact Button */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-1000 delay-300 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <a
            href="#contact-cards"
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 group"
          >
            Contact GENZMEDIA
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </a>
        </div>

        {/* Contact Cards */}
        <div
          id="contact-cards"
          className={`grid lg:grid-cols-3 gap-6 transition-all duration-1000 delay-500 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Phone Card */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-8 border border-slate-700/50 backdrop-blur hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 group">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Phone size={28} className="text-white" />
              </div>
              <h3 className="text-sm text-slate-400 mb-3 font-semibold">Call Us</h3>
              <div className="space-y-2">
                <a
                  href="tel:+918237020562"
                  className="block text-white font-bold text-base hover:text-purple-400 transition-colors"
                >
                  +91 8237020562
                </a>
                <div className="text-slate-500">|</div>
                <a
                  href="tel:+918261899351"
                  className="block text-white font-bold text-base hover:text-purple-400 transition-colors"
                >
                  +91 8261899351
                </a>
              </div>
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-8 border border-slate-700/50 backdrop-blur hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 group">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mail size={28} className="text-white" />
              </div>
              <h3 className="text-sm text-slate-400 mb-3 font-semibold">Email</h3>
              <div className="space-y-2">
                <a
                  href="mailto:sahilkamdi414@gmail.com"
                  className="block text-white font-bold text-sm hover:text-blue-400 transition-colors"
                >
                  sahilkamdi414@gmail.com
                </a>
                <div className="text-slate-500">|</div>
                <a
                  href="mailto:navinbankar1788@gmail.com"
                  className="block text-white font-bold text-sm hover:text-blue-400 transition-colors"
                >
                  navinbankar1788@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Instagram Card */}
  
<div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-8 border border-slate-700/50 backdrop-blur hover:border-pink-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-pink-500/10 group">
  <div className="flex flex-col items-center text-center">
    <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-pink-600 to-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
      <Instagram size={28} className="text-white" />
    </div>

    <h3 className="text-sm text-slate-400 mb-4 font-semibold">
      Follow Us on Instagram
    </h3>

    <div className="space-y-3">
      <a
        href="https://www.instagram.com/navin____24k?igsh=MWd4bXJkYzJ1c3ZsOQ=="
        target="_blank"
        rel="noopener noreferrer"
        className="block text-white font-bold text-base hover:text-pink-400 transition-colors"
      >
        @navin____24k
      </a>

      <div className="text-slate-600">|</div>

      <a
        href="https://www.instagram.com/sahilkamdi_?igsh=MW5nNmIxYXg3dXBxYw=="
        target="_blank"
        rel="noopener noreferrer"
        className="block text-white font-bold text-base hover:text-pink-400 transition-colors"
      >
        @sahilkamdi_
      </a>
    </div>
  </div>
</div>

        </div>
      </div>
    </section>
  )
}
