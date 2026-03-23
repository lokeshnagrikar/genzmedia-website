"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  
  // Smooth spring physics for following the mouse
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Only show on non-touch devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
      if (!isVisible) setIsVisible(true)
      
      // Check if hovering over clickable element
      const target = e.target as HTMLElement
      const isClickable = target.closest("a, button, [role='button']") !== null
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
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-purple-400 mix-blend-screen pointer-events-none z-[9999] flex items-center justify-center backdrop-blur-[2px]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={{
        scale: isHovering ? 1.5 : 1,
        backgroundColor: isHovering ? "rgba(168, 85, 247, 0.2)" : "rgba(168, 85, 247, 0)",
      }}
      transition={{ duration: 0.2 }}
    >
      <motion.div 
        className="w-2 h-2 bg-pink-400 rounded-full" 
        animate={{ scale: isHovering ? 0 : 1 }}
      />
    </motion.div>
  )
}
