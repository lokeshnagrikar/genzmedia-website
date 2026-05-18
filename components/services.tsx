"use client"

import { Palette, Video, Pen, Share2, TrendingUp, Code } from "lucide-react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
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
          {servicesList.map((service, index) => (
            <TiltCard key={index} service={service} index={index} itemVariants={itemVariants} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function TiltCard({ service, index, itemVariants }: any) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const Icon = service.icon

  return (
    <motion.div
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02 }}
      className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-slate-700/50 backdrop-blur-xl transition-colors duration-300 hover:border-purple-500/50 cursor-pointer shadow-xl"
    >
      <div style={{ transform: "translateZ(50px)" }}>
        {/* Gradient Glow on Hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${service.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />

        <div className="relative z-10">
          {/* Icon */}
          <div
            className={`w-14 h-14 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}
          >
            <Icon size={28} className="text-white" />
          </div>

          {/* Content */}
          <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
            {service.title}
          </h3>
          <p className="text-slate-300 text-base leading-relaxed">{service.description}</p>
        </div>
      </div>
    </motion.div>
  )
}
