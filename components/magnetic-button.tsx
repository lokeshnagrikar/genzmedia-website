"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"

export default function MagneticButton({ children, className }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    // Pull the button slightly towards the mouse pointer
    setPosition({ x: middleX * 0.25, y: middleY * 0.25 })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      className={className || "relative z-10"}
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
    >
      {children}
    </motion.div>
  )
}
