"use client"

import { Palette, Video, Pen, Share2, TrendingUp, Code, Sparkles, Zap, Flame, Globe, LucideIcon } from "lucide-react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { SplitText } from "./split-text"
import { useContent } from "@/hooks/use-content"
import { ServiceItem } from "@/lib/content"

const iconMap: Record<string, LucideIcon> = {
  Palette,
  Video,
  Pen,
  Share2,
  TrendingUp,
  Code,
  Sparkles,
  Zap,
  Flame,
  Globe,
}

export default function Services() {
  const { services } = useContent()

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
      transition: {
        duration: 0.6,
      }
    },
  }

  return (
    <section id="services" className="relative py-20 md:py-32 bg-[#08090E] border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with SplitText */}
        <div className="text-center mb-16">
          <SplitText 
            text="What We Do Best"
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 [&>span]:bg-clip-text [&>span]:text-transparent [&>span]:bg-gradient-to-r [&>span]:from-violet-400 [&>span]:via-fuchsia-400 [&>span]:to-amber-400 pb-2 justify-center drop-shadow-[0_0_25px_rgba(255,46,147,0.3)]"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-300 max-w-2xl mx-auto"
          >
            We focus on services that create measurable impact for your brand and content.
          </motion.p>
        </div>

        {/* Services Grid with 3D Tilt Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services?.map((service, index) => (
            <TiltCard key={service.id || index} service={service} index={index} itemVariants={itemVariants} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function TiltCard({ service, index, itemVariants }: { service: ServiceItem; index: number; itemVariants: any }) {
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

  const Icon = iconMap[service.iconName] || Sparkles

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
      className="group relative bg-gradient-to-br from-[#0D0E15] to-[#12141F] rounded-2xl p-8 border border-slate-800 backdrop-blur-xl transition-all duration-300 hover:border-fuchsia-500/60 cursor-pointer shadow-xl hover:shadow-[0_0_35px_rgba(255,46,147,0.25)]"
    >
      <div style={{ transform: "translateZ(50px)" }}>
        {/* Gradient Glow on Hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${service.color || "from-violet-600 to-fuchsia-600"} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />

        <div className="relative z-10">
          {/* Icon */}
          <div
            className={`w-14 h-14 rounded-xl bg-gradient-to-r ${service.color || "from-violet-600 to-fuchsia-600"} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}
          >
            <Icon size={28} className="text-white" />
          </div>

          {/* Content */}
          <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-300 group-hover:to-pink-300 transition-all duration-300">
            {service.title}
          </h3>
          <p className="text-slate-300 text-base leading-relaxed">{service.description}</p>
        </div>
      </div>
    </motion.div>
  )
}
