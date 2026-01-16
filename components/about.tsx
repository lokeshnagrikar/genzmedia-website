"use client"

import { useEffect, useRef, useState } from "react"
import { Check } from "lucide-react"

export default function About() {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const values = ["Clear visuals", "Clean editing", "Consistent posting", "Professional online presence"]

  const mindset = [
    "Good design builds trust",
    "Consistency builds brands",
    "Content should look professional",
    "Long-term growth beats trends",
  ]

  return (
    <section id="about" className="relative py-20 md:py-32 bg-slate-950 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div
            className={`transition-all duration-1000 ${isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text bg-gradient-to-r from-purple-400 to-pink-400">Who We Are</span>
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              GENZMEDIA is a modern creative brand built for today's digital world. We work with business owners and
              content creators who want their content to look professional, consistent, and growth-ready.
            </p>

            {/* Values */}
            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-bold text-white mb-6">Our Focus:</h3>
              {values.map((value, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 transition-all duration-700 ${
                    isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                    <Check size={16} className="text-white" />
                  </div>
                  <span className="text-slate-300 text-lg">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div
            className={`transition-all duration-1000 delay-300 ${isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
          >
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-8 border border-slate-700 backdrop-blur">
              <h3 className="text-2xl font-bold mb-6 gradient-text bg-gradient-to-r from-blue-400 to-purple-400">
                Our Mindset
              </h3>
              <div className="space-y-4">
                {mindset.map((item, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg bg-slate-800/50 border border-slate-700 transition-all duration-500 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 ${
                      isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                    }`}
                    style={{ transitionDelay: `${index * 150}ms` }}
                  >
                    <p className="text-slate-200 font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
