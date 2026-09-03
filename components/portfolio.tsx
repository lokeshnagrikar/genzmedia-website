"use client"

import { useState, useEffect } from "react"
import { Play, X, ExternalLink, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
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

  return (
    <section id="portfolio" className="relative py-24 md:py-36 bg-[#08090E] border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              <span className="text-xs font-mono tracking-widest text-fuchsia-400 uppercase">
                SELECTED CASE STUDIES
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight">
              PROOF OVER{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 via-fuchsia-400 to-amber-400">
                PROMISES.
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-slate-400 max-w-md font-medium leading-relaxed">
            Real reels produced for real clients. Millions of organic views, admissions campaigns, and branded stories edited with surgical pacing.
          </p>
        </div>

        {/* 🎬 Video Monitor Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {portfolio?.map((video, idx) => (
            <motion.div
              key={`${video.id}-${idx}`}
              whileHover={{ y: -8 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer bg-[#0D0E15] border border-slate-800 hover:border-fuchsia-500/80 transition-all duration-300 shadow-xl hover:shadow-[0_0_35px_rgba(255,46,147,0.35)]"
              onClick={() => setSelectedVideo(video)}
            >
              {/* 9:16 Video Frame */}
              <div className="relative w-full aspect-[9/16] bg-black overflow-hidden">
                <img
                  src={video.thumbnail || "/insta-reel1.png"}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "/insta-reel1.png"
                  }}
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#08090E] via-black/20 to-black/60 pointer-events-none" />

                {/* Top HUD: Client & Metric Badge */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40 backdrop-blur-md">
                    {video.metric || "Viral Cut"}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-slate-300 backdrop-blur-md">
                    4K 60FPS
                  </span>
                </div>

                {/* Center Play Button on Hover */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-violet-600 via-fuchsia-600 to-pink-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 shadow-[0_0_30px_rgba(255,46,147,0.5)] transition-all duration-300">
                    <Play size={20} className="fill-current translate-x-0.5" />
                  </div>
                </div>

                {/* Bottom Metadata */}
                <div className="absolute bottom-4 inset-x-4 z-10">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-fuchsia-400 font-bold mb-1">
                    {video.client}
                  </div>
                  <h3 className="text-lg font-black text-white leading-tight uppercase group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-300 group-hover:to-pink-300 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-1 font-medium">
                    {video.subtitle || video.tag}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="text-center">
          <a
            href="https://www.instagram.com/navin____24k"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0D0E15] border border-slate-800 hover:border-fuchsia-500/50 text-slate-300 hover:text-white text-xs font-mono font-bold uppercase tracking-widest transition-all"
          >
            <span>WATCH MORE ON INSTAGRAM</span>
            <ExternalLink size={14} className="text-pink-400" />
          </a>
        </div>
      </div>

      {/* 🎬 IN-BROWSER VIDEO MODAL PLAYER */}
      <AnimatePresence>
        {selectedVideo && (
          <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVideo(null)}
              className="fixed inset-0 bg-[#08090E]/95 backdrop-blur-2xl transition-opacity"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-[#0D0E15] border border-slate-700 rounded-3xl p-5 sm:p-6 shadow-2xl z-10 flex flex-col my-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/30">
                      {selectedVideo.metric}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{selectedVideo.client}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white uppercase">{selectedVideo.title}</h3>
                </div>

                <button
                  onClick={() => setSelectedVideo(null)}
                  className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close Player"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Instagram Embed Player */}
              <div className="relative w-full rounded-2xl overflow-hidden bg-black border border-slate-800 flex items-center justify-center min-h-[460px] sm:min-h-[500px]">
                <iframe
                  src={`https://www.instagram.com/reel/${selectedVideo.id}/embed/`}
                  className="w-full h-[480px] sm:h-[520px] rounded-2xl border-0"
                  allowFullScreen
                  title={selectedVideo.title}
                />
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-800">
                <span className="text-xs text-slate-400 font-mono">GENZMEDIA Studio Cut</span>
                <a
                  href={selectedVideo.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-fuchsia-400 hover:underline"
                >
                  <span>Open on Instagram</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
