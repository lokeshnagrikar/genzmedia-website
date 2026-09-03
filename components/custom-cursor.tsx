"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Smooth spring physics for following the mouse
  const springConfig = { damping: 28, stiffness: 250, mass: 0.4 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    // Only show on non-touch devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 14)
      cursorY.set(e.clientY - 14)

      if (!isVisible) setIsVisible(true)

      const target = e.target as HTMLElement
      const isClickable = target.closest("a, button, [role='button'], .cursor-pointer, input, textarea") !== null
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
      className="fixed top-0 left-0 w-7 h-7 rounded-full border border-fuchsia-400/80 pointer-events-none z-[99999] flex items-center justify-center mix-blend-screen"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      animate={{
        scale: isHovering ? 1.8 : 1,
        borderColor: isHovering ? "#ff2e93" : "rgba(232, 121, 249, 0.8)",
        backgroundColor: isHovering ? "rgba(255, 46, 147, 0.15)" : "transparent",
      }}
      transition={{ duration: 0.15 }}
    >
      <motion.div
        className="w-1 h-1 bg-pink-400 rounded-full"
        animate={{ scale: isHovering ? 0 : 1 }}
      />
    </motion.div>
  )
}
