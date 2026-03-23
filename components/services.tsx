"use client"

import { Palette, Video, Pen, Share2, TrendingUp, Code } from "lucide-react"
import { motion } from "framer-motion"
import { SplitText } from "./split-text"

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
  {
    icon: Code,
    title: "Website Development",
    description: "High-performance, beautifully animated custom websites tailored to scale your brand",
    color: "from-indigo-600 to-purple-600",
  },
]

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6 } 
    },
  }

  return (
    <section id="services" className="relative py-20 md:py-32 bg-slate-950 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <SplitText 
            text="What We Do" 
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 [&>span]:bg-clip-text [&>span]:text-transparent [&>span]:bg-gradient-to-r [&>span]:from-purple-400 [&>span]:via-pink-400 [&>span]:to-blue-400 pb-2 justify-center"
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto"
          >
            Comprehensive creative services designed to help your brand stand out and grow
          </motion.p>
        </div>

        {/* Service Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {servicesList.map((service, index) => {
            const Icon = service.icon

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-slate-700 backdrop-blur transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] cursor-pointer"
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
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
