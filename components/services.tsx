"use client"

import { useRef, useEffect, useState } from "react"
import { Palette, Video, Pen, Share2, TrendingUp } from "lucide-react"

const servicesList = [
  {
    icon: Palette,
    title: "Graphic Designing",
    description: "Clean, modern designs to help your brand look credible and professional across all platforms",
    color: "from-purple-600 to-pink-600",
  },
  {
    icon: Video,
    title: "Thumbnail Design",
    description: "High-quality thumbnails that grab attention and look premium, perfect for YouTube, Reels, Shorts",
    color: "from-blue-600 to-purple-600",
  },
  {
    icon: Pen,
    title: "Video Editing",
    description: "Professional editing with clean cuts, smooth flow, and strong pacing for short and long-form content",
    color: "from-pink-600 to-orange-600",
  },
  {
    icon: Share2,
    title: "Social Media Management",
    description: "Content planning, consistent posting, visual consistency, and professional presentation",
    color: "from-orange-600 to-pink-600",
  },
  {
    icon: TrendingUp,
    title: "Meta Ads Management",
    description:
      "Result-focused campaigns with ad creative design, audience targeting, and ethical brand-safe advertising",
    color: "from-cyan-600 to-blue-600",
  },
]

export default function Services() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          servicesList.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards((prev) => [...new Set([...prev, index])])
            }, index * 150)
          })
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" className="relative py-20 md:py-32 bg-slate-950 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">What We Do</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Comprehensive creative services designed to help your brand stand out and grow
          </p>
        </div>

        {/* Service Cards */}
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((service, index) => {
            const Icon = service.icon
            const isVisible = visibleCards.includes(index)

            return (
              <div
                key={index}
                className={`group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-slate-700 backdrop-blur transition-all duration-500 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-105 cursor-pointer ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                {/* Gradient Glow on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${service.color} rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon size={24} className="text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                    {service.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{service.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
