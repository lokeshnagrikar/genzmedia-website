"use client"

import { useRef, useEffect, useState } from "react"
import { Users, Briefcase, User, PlayCircle, Award } from "lucide-react"

const audiences = [
  {
    icon: Briefcase,
    label: "Business Owners",
    description: "Scale your brand with professional visuals and strategic ads",
  },
  {
    icon: User,
    label: "Entrepreneurs",
    description: "Build credibility and consistent online presence",
  },
  {
    icon: Users,
    label: "Personal Brands",
    description: "Stand out with unique, professional content",
  },
  {
    icon: PlayCircle,
    label: "Content Creators",
    description: "Grow your audience with high-impact visuals",
  },
  {
    icon: Award,
    label: "Coaches & Educators",
    description: "Establish authority with premium design and editing",
  },
]

export default function WhoWeWorkWith() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          audiences.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards((prev) => [...new Set([...prev, index])])
            }, index * 100)
          })
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative py-20 md:py-32 bg-slate-950 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text bg-gradient-to-r from-purple-400 to-pink-400">Who We Work With</span>
          </h2>
          <p className="text-xl text-slate-300">We partner with ambitious creators and businesses ready to grow</p>
        </div>

        {/* Audience Cards */}
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {audiences.map((audience, index) => {
            const Icon = audience.icon
            const isVisible = visibleCards.includes(index)

            return (
              <div
                key={index}
                className={`group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-8 border border-slate-700 backdrop-blur transition-all duration-500 hover:border-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-105 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                {/* Gradient Background on Hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:gradient-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400">
                    {audience.label}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{audience.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
