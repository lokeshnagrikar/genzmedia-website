"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion"

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  // Smooth spring physics for following the mouse
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  // Trail effect: keep track of previous positions
  const [trail, setTrail] = useState<{ x: number, y: number }[]>([])

  useEffect(() => {
    // Only show on non-touch devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return

    const moveCursor = (e: MouseEvent) => {
      const x = e.clientX - 16
      const y = e.clientY - 16
      cursorX.set(x)
      cursorY.set(y)
      
      // Update trail
      setTrail(prev => {
        const newTrail = [{ x, y }, ...prev].slice(0, 10)
        return newTrail
      })

      if (!isVisible) setIsVisible(true)
      
      // Check if hovering over clickable element
      const target = e.target as HTMLElement
      const isClickable = target.closest("a, button, [role='button'], .cursor-pointer") !== null
      setIsHovering(isClickable)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    window.addEventListener("mousemove", moveCursor)
    document.documentElement.addEventListener("mouseleave", handleMouseLeave)
    document.documentElement.addEventListener("mouseenter", handleMouseEnter)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave)
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter)
    }
  }, [cursorX, cursorY, isVisible])

  if (!isVisible) return null

  return (
    <>
      {/* cursor dots trail */}
      <AnimatePresence>
        {trail.map((point, index) => (
          <motion.div
            key={index}
            className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9998]"
            style={{
              x: point.x + 12,
              y: point.y + 12,
              backgroundColor: index % 2 === 0 ? "rgba(168, 85, 247, 0.4)" : "rgba(236, 72, 153, 0.4)",
              scale: 1 - index * 0.1,
              opacity: 1 - index * 0.1,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - index * 0.1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          />
        ))}
      </AnimatePresence>

      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-purple-400 mix-blend-screen pointer-events-none z-[9999] flex items-center justify-center backdrop-blur-[2px]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 2 : 1,
          borderColor: isHovering ? "#ec4899" : "#a855f7",
          backgroundColor: isHovering ? "rgba(236, 72, 153, 0.1)" : "rgba(168, 85, 247, 0)",
        }}
        transition={{ duration: 0.2 }}
      >
        <motion.div 
          className="w-1.5 h-1.5 bg-white rounded-full" 
          animate={{ scale: isHovering ? 0 : 1 }}
        />
      </motion.div>
    </>
  )
}
