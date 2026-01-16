"use client"

import { useRef, useEffect, useState } from "react"
import { CheckCircle2 } from "lucide-react"

const values = [
  "No misleading visuals",
  "No fake hype",
  "No guaranteed growth",
  "Design improves reach",
  "Content quality matters",
  "Consistency is key",
]

export default function Trust() {
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
    <section className="relative py-20 md:py-32 bg-slate-950 border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-2xl p-8 md:p-12 border border-slate-700 backdrop-blur"
        >
          {/* Header */}
          <div
            className={`text-center mb-12 transition-all duration-1000 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text bg-gradient-to-r from-purple-400 to-pink-400">Trust & Transparency</span>
            </h2>
            <p className="text-lg text-slate-300">
              We believe in honest work that builds real, lasting growth. No promises we can't keep.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 transition-all duration-700 ${
                  isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                    <CheckCircle2 size={20} className="text-white" />
                  </div>
                </div>
                <p className="text-slate-200 text-lg font-medium">{value}</p>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div
            className={`mt-10 pt-8 border-t border-slate-700 transition-all duration-1000 delay-500 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          >
            <p className="text-slate-400 text-sm leading-relaxed text-center">
              Design, content, and ads improve reach and presentation. Results depend on content quality, budget, and
              consistent effort. We're here to provide the tools and expertise—your success is a partnership.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
