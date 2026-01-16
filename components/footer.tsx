"use client"

import { Instagram } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold gradient-text bg-gradient-to-r from-purple-400 to-pink-400 mb-3">
              GENZMEDIA
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Creative studio helping business owners and content creators grow with professional design, editing,
              social media management, and Meta Ads.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-slate-400">
              <p>
                📞{" "}
                <a href="tel:+918237020562" className="hover:text-purple-400 transition-colors">
                  +91 8237020562
                </a>
              </p>
              <p>
                📞{" "}
                <a href="tel:+918261899351" className="hover:text-purple-400 transition-colors">
                  +91 8261899351
                </a>
              </p>
              <p>
                📧{" "}
                <a href="mailto:sahilkamdi414@gmail.com" className="hover:text-purple-400 transition-colors">
                  sahilkamdi414@gmail.com
                </a>
              </p>
              <p>
                📧{" "}
                <a href="mailto:navinbankar1788@gmail.com" className="hover:text-purple-400 transition-colors">
                  navinbankar1788@gmail.com
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links & Social */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <p>
                <a href="#home" className="text-slate-400 hover:text-purple-400 transition-colors">
                  Home
                </a>
              </p>
              <p>
                <a href="#about" className="text-slate-400 hover:text-purple-400 transition-colors">
                  About
                </a>
              </p>
              <p>
                <a href="#services" className="text-slate-400 hover:text-purple-400 transition-colors">
                  Services
                </a>
              </p>
              <p>
                <a href="#portfolio" className="text-slate-400 hover:text-purple-400 transition-colors">
                  Portfolio
                </a>
              </p>
              <p className="mt-4 pt-4 border-t border-slate-700">
                <a
                  href="https://www.instagram.com/navin____24k?igsh=MWd4bXJkYzJ1c3ZsOQ=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-pink-400 transition-colors flex items-center gap-2"
                >
                  <Instagram size={16} /> Instagram
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8 mb-8">
          {/* Disclaimer */}
          <p className="text-slate-500 text-xs leading-relaxed mb-6">
            Design, editing, social media management, and advertising services support growth and engagement. Results
            may vary based on content quality, budget, and consistency.
          </p>

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-600 text-sm">© {currentYear} GENZMEDIA. All rights reserved.</p>
            <p className="text-slate-600 text-sm">
              Built with <span className="text-purple-400">✨</span> by GENZMEDIA
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
