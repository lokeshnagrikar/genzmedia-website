"use client"

import { useState, useEffect } from "react"
import Hero from "@/components/hero"
import About from "@/components/about"
import Services from "@/components/services"
import Portfolio from "@/components/portfolio"
import WhoWeWorkWith from "@/components/who-we-work-with"
import Trust from "@/components/trust"
import CTA from "@/components/cta"
import Footer from "@/components/footer"
import Navigation from "@/components/navigation"

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <main className="bg-slate-950 text-white overflow-x-hidden">
      <Navigation />
      {isVisible && (
        <>
          <Hero />
          <About />
          <Services />
          <Portfolio />
          <WhoWeWorkWith />
          <Trust />
          <CTA />
          <Footer />
        </>
      )}
    </main>
  )
}
