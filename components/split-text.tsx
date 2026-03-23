import { motion } from 'framer-motion'
import React from 'react'

interface SplitTextProps {
  text: string;
  className?: string;
  once?: boolean;
  delayBefore?: number;
}

export function SplitText({ text, className = '', once = true, delayBefore = 0 }: SplitTextProps) {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: delayBefore + 0.04 * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 15, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 30, // Starting position below mask
      transition: { type: 'spring', damping: 15, stiffness: 100 },
    },
  }

  return (
    <motion.div
      className={`overflow-hidden flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          style={{ marginRight: '0.25em', display: 'inline-block' }}
          key={index}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}
