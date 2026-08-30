"use client"

import { useState, useEffect } from "react"
import { Play, X, ExternalLink, Sparkles, TrendingUp, ArrowRight, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { SplitText } from "./split-text"
import { PortfolioItem } from "@/lib/content"
import { useContent } from "@/hooks/use-content"

export default function Portfolio() {
  const { portfolio } = useContent()
  const [selectedVideo, setSelectedVideo] = useState<PortfolioItem | null>(null)

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedVideo(null)
    }
    if (selectedVideo) {
      window.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [selectedVideo])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.92, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="portfolio" className="relative py-20 md:py-32 bg-[#08090E] border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <SplitText
            text="Our Work"
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 [&>span]:bg-clip-text [&>span]:text-transparent [&>span]:bg-gradient-to-r [&>span]:from-violet-400 [&>span]:via-fuchsia-400 [&>span]:to-amber-400 pb-2 justify-center drop-shadow-[0_0_25px_rgba(255,46,147,0.3)]"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-300 max-w-2xl mx-auto mb-4"
          >
            Every project follows a clear process: Concept → Design/Edit → Purpose → Audience. We focus on quality,
            clarity, and quantifiable growth.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/25 text-xs font-semibold text-fuchsia-300"
          >
            <Sparkles size={14} className="text-pink-400" />
            Click any reel to play directly in-app
          </motion.div>
        </div>

        {/* Video Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {portfolio.map((video, idx) => (
            <motion.div
              key={`${video.id}-${idx}`}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer shadow-xl hover:shadow-[0_0_35px_rgba(255,46,147,0.35)] transition-all duration-500"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="relative w-full aspect-[9/16] bg-[#0D0E15] overflow-hidden rounded-2xl border border-slate-800 group-hover:border-fuchsia-500/80 transition-all duration-300">
                {/* Thumbnail Image with Grayscale to Color hover effect */}
                <img
                  src={video.thumbnail || "/insta-reel1.png"}
                  alt={`${video.client} - ${video.title}`}
                  className="w-full h-full object-cover scale-100 group-hover:scale-105 grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                  onError={(e) => {
                    e.currentTarget.src = "/insta-reel1.png"
                  }}
                />

                {/* Dark Gradient Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090E] via-[#08090E]/40 to-[#08090E]/70 opacity-90 group-hover:opacity-75 transition-opacity duration-500" />

                {/* Top Badges: Client Name + Metric Badge */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                  <span className="px-2.5 py-1 rounded-lg bg-[#08090E]/85 backdrop-blur-md border border-white/10 text-[11px] font-bold text-slate-200 truncate max-w-[55%]">
                    {video.client}
                  </span>
                  <span className={`px-2.5 py-1 rounded-lg backdrop-blur-md border text-[11px] font-extrabold flex items-center gap-1 shrink-0 ${video.badgeColor || "bg-fuchsia-500/20 border-fuchsia-500/40 text-fuchsia-300"}`}>
                    <TrendingUp size={12} />
                    {video.metric}
                  </span>
                </div>

                {/* Center Glowing Play Button */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-violet-600 via-fuchsia-600 to-pink-500 flex items-center justify-center transform scale-90 group-hover:scale-110 transition-all duration-300 shadow-[0_0_30px_rgba(255,46,147,0.6)] group-hover:rotate-6">
                    <Play size={26} className="text-white ml-1 fill-white" />
                  </div>
                  <span className="mt-3 text-xs font-semibold text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#08090E]/90 px-3 py-1 rounded-full backdrop-blur-sm border border-fuchsia-500/30">
                    Watch Preview
                  </span>
                </div>

                {/* Bottom Content Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 z-10 bg-gradient-to-t from-[#08090E] via-[#08090E]/90 to-transparent pt-8">
                  <span className="inline-block px-2 py-0.5 mb-2 rounded text-[10px] uppercase font-extrabold tracking-wider bg-white/10 text-slate-300 backdrop-blur-sm">
                    {video.tag}
                  </span>
                  <h3 className="text-white font-black text-lg leading-snug drop-shadow-md group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-300 group-hover:to-pink-300 transition-all">
                    {video.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                    {video.subtitle}
                  </p>
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
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 text-white font-bold text-lg rounded-xl hover:shadow-[0_0_35px_rgba(255,46,147,0.5)] transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"
          >
            <span>Want high-impact content like this?</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>

      {/* 🎬 Sleek In-Browser Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVideo(null)}
              className="fixed inset-0 bg-[#08090E]/85 backdrop-blur-xl transition-opacity"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-[#0D0E15]/95 border border-slate-700/80 rounded-3xl p-4 sm:p-6 shadow-2xl z-10 backdrop-blur-2xl flex flex-col my-auto"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-fuchsia-400 uppercase tracking-wider">
                      {selectedVideo.client}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${selectedVideo.badgeColor || "bg-fuchsia-500/20 border-fuchsia-500/40 text-fuchsia-300"}`}>
                      {selectedVideo.metric}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {selectedVideo.title}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedVideo(null)}
                  className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700 shrink-0 cursor-pointer"
                  aria-label="Close Modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* In-Browser Video Player Embed */}
              <div className="relative w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center min-h-[460px] sm:min-h-[500px]">
                <iframe
                  src={`https://www.instagram.com/reel/${selectedVideo.id}/embed/`}
                  className="w-full h-[480px] sm:h-[520px] rounded-2xl border-0"
                  allowFullScreen
                  title={selectedVideo.title}
                />
              </div>

              {/* Modal Footer Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-800">
                <a
                  href={selectedVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-sm font-semibold transition-colors border border-slate-700"
                >
                  <ExternalLink size={16} />
                  <span>Open on Instagram</span>
                </a>

                <a
                  href="#contact"
                  onClick={() => setSelectedVideo(null)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 text-white text-sm font-bold shadow-lg shadow-fuchsia-500/25 hover:shadow-fuchsia-500/45 transition-all"
                >
                  <span>Book Project Like This</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
