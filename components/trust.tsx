"use client"

import { useRef, useEffect, useState } from "react"
import { CheckCircle2, ShieldCheck } from "lucide-react"

const values = [
  "No misleading visuals or clickbait tricks",
  "No fake bot views or vanity metrics",
  "Transparent turnaround times & communication",
  "Surgically paced editing that boosts retention",
  "High-contrast thumbnails tested for real clicks",
  "Every project delivered in high-definition 4K",
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
      { threshold: 0.2 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative py-24 md:py-36 bg-[#08090E] border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className="bg-[#0D0E15] rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden"
        >
          {/* Header */}
          <div
            className={`text-center mb-12 transition-all duration-700 ${
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/15 border border-fuchsia-500/30 text-xs font-mono text-fuchsia-300 mb-3">
              <ShieldCheck size={14} />
              <span>THE ZERO-BULLSHIT PLEDGE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-3">
              TRANSPARENCY &{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-400">
                STANDARDS.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-medium max-w-xl mx-auto">
              We believe in honest craft that builds real, compounding attention. We don't overpromise — we outperform.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid sm:grid-cols-2 gap-5">
            {values.map((value, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 p-4 rounded-xl bg-[#08090E] border border-slate-800/80 transition-all duration-500 ${
                  isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <CheckCircle2 size={18} className="text-pink-400 shrink-0 mt-0.5" />
                <p className="text-slate-200 text-sm font-medium">{value}</p>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-10 pt-6 border-t border-slate-800 text-center text-xs font-mono text-slate-500">
            Creative assets scale organic reach and lead volume. Results compound based on content consistency, budget, and audience relevance.
          </div>
        </div>
      </div>
    </section>
  )
}
