"use client"

import { Play } from "lucide-react"
import { motion } from "framer-motion"

import { SplitText } from "./split-text"

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
  const getThumbnailUrl = (reelId: string) => {
    return `https://www.instagram.com/p/${reelId}/media/?size=l`
  }

  const handleOpenReel = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <section id="portfolio" className="relative py-20 md:py-32 bg-slate-950 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <SplitText 
            text="Our Work" 
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 [&>span]:bg-clip-text [&>span]:text-transparent [&>span]:bg-gradient-to-r [&>span]:from-purple-400 [&>span]:via-pink-400 [&>span]:to-blue-400 pb-2 justify-center"
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-300 max-w-2xl mx-auto mb-8"
          >
            Every project follows a clear process: Concept → Design/Edit → Purpose → Audience. We focus on quality,
            clarity, and consistency.
          </motion.p>
        </div>

        {/* Video Grid - Changed to 9:16 ratio portrait layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16"
        >
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              variants={itemVariants}
              className="group relative rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-500"
              onClick={() => handleOpenReel(video.url)}
            >
              <div className="relative w-full aspect-[9/16] bg-slate-800/80 overflow-hidden rounded-xl border border-slate-700/50 group-hover:border-purple-500/80 transition-all duration-300">
                {/* Thumbnail Image with Magic Hover (Grayscale to Color) */}
                <img
                  src={getThumbnailUrl(video.id)}
                  alt={video.title}
                  className="w-full h-full object-cover scale-100 group-hover:scale-110 grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                  onError={(e) => {
                    e.currentTarget.src = video.thumbnail
                  }}
                />

                {/* Animated Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-500 shadow-[0_0_20px_rgba(236,72,153,0.5)]">
                    <Play size={28} className="text-white ml-1 translate-x-0.5" fill="white" />
                  </div>
                </div>

                {/* Title sliding up */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white font-bold text-lg drop-shadow-md">{video.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-xl hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all duration-300 transform hover:-translate-y-1"
          >
            Want to work with us?
          </a>
        </motion.div>
      </div>
    </section>
  )
}
