"use client"

import { useRef, useEffect, useState } from "react"
import { Play } from "lucide-react"

const videos = [
  {
    id: "DNX9D-5y5yo",
    title: "Reel 1",
    url: "https://www.instagram.com/reel/DNX9D-5y5yo/?igsh=MW5xdjhsaGRramd5ag==",
    thumbnail: "/insta-reel1.png",
  },
  {
    id: "DNfxBfKMQsU",
    title: "Reel 2",
    url: "https://www.instagram.com/reel/DNfxBfKMQsU/?igsh=MTl1cWRqMnp2OHExeQ==",
    thumbnail: "/insta-reel2.png",
  },
  {
    id: "DTGJ9FMksZv",
    title: "Reel 3",
    url: "https://www.instagram.com/reel/DTGJ9FMksZv/?igsh=MWd3cWd5ZHdyY3Q0eg==",
    thumbnail: "/insta-reel3.png",
  },
  {
    id: "DQKNZXWDOy3",
    title: "Reel 4",
    url: "https://www.instagram.com/reel/DQKNZXWDOy3/?igsh=b3loeTE3cjQ5Zm9u",
    thumbnail: "/insta-reel4.png",
  },
]


export default function Portfolio() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videos.forEach((_, index) => {
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

  const getThumbnailUrl = (reelId: string) => {
    return `https://www.instagram.com/p/${reelId}/media/?size=l`
  }

  const handleOpenReel = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <section id="portfolio" className="relative py-20 md:py-32 bg-slate-950 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Our Work
            </span>
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Every project follows a clear process: Concept → Design/Edit → Purpose → Audience. We focus on quality,
            clarity, and consistency.
          </p>
        </div>

        {/* Video Grid - Changed to 9:16 ratio portrait layout */}
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
          {videos.map((video, index) => {
            const isVisible = visibleCards.includes(index)

            return (
              <div
                key={video.id}
                className={`group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                onClick={() => handleOpenReel(video.url)}
              >
                <div className="relative w-full aspect-[9/16] bg-slate-800 overflow-hidden rounded-xl border border-slate-700 group-hover:border-purple-500/50 transition-all duration-300">
                  {/* Thumbnail Image */}
                  <img
  src={getThumbnailUrl(video.id)}
  alt={video.title}
  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
  onError={(e) => {
    e.currentTarget.src = video.thumbnail
  }}
/>


                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                      <Play size={32} className="text-white ml-1" fill="white" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
                    <h3 className="text-white font-bold text-sm md:text-base">{video.title}</h3>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <a
            href="#contact"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
          >
            Want to work with us?
          </a>
        </div>
      </div>
    </section>
  )
}
