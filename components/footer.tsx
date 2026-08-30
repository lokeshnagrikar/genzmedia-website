"use client"

import { Instagram } from "lucide-react"
import { useContent } from "@/hooks/use-content"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { contact } = useContent()

  return (
    <footer className="bg-[#08090E] border-t border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-8">
          {/* Brand */}
          <div>
            <img
              src="/logoo.png"
              alt="GENZMEDIA Logo"
              className="h-16 w-auto object-contain mb-4 drop-shadow-[0_0_20px_rgba(255,46,147,0.4)]"
            />
            <p className="text-slate-400 text-sm leading-relaxed">
              Creative studio helping business owners and content creators grow with professional design, editing,
              social media management, and Meta Ads.
            </p>
          </div>

          {/* Contact (Live Synced) */}
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-slate-400">
              {contact?.phones?.map((phone, idx) => (
                <p key={idx}>
                  📞{" "}
                  <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:text-fuchsia-400 transition-colors">
                    {phone}
                  </a>
                </p>
              ))}
              {contact?.emails?.map((email, idx) => (
                <p key={idx}>
                  📧{" "}
                  <a href={`mailto:${email}`} className="hover:text-cyan-400 transition-colors">
                    {email}
                  </a>
                </p>
              ))}
            </div>
          </div>

          {/* Quick Links & Social */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <p>
                <a href="#home" className="text-slate-400 hover:text-fuchsia-400 transition-colors">
                  Home
                </a>
              </p>
              <p>
                <a href="#about" className="text-slate-400 hover:text-fuchsia-400 transition-colors">
                  About
                </a>
              </p>
              <p>
                <a href="#services" className="text-slate-400 hover:text-fuchsia-400 transition-colors">
                  Services
                </a>
              </p>
              <p>
                <a href="#portfolio" className="text-slate-400 hover:text-fuchsia-400 transition-colors">
                  Portfolio
                </a>
              </p>
              <div className="mt-4 pt-4 border-t border-slate-800 space-y-2">
                {contact?.instagram?.map((item, idx) => (
                  <p key={idx}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-pink-400 transition-colors flex items-center gap-2"
                    >
                      <Instagram size={16} /> {item.handle || "Instagram"}
                    </a>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800/80 pt-8 mb-8">
          {/* Disclaimer */}
          <p className="text-slate-500 text-xs leading-relaxed mb-6">
            Design, editing, social media management, and advertising services support growth and engagement. Results
            may vary based on content quality, budget, and consistency.
          </p>

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-600 text-sm">© {currentYear} GENZMEDIA. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <p className="text-slate-600 text-sm">
                Built with <span className="text-pink-400">✨</span> by GENZMEDIA
              </p>
              <a
                href="/admin"
                className="text-slate-500 hover:text-fuchsia-400 transition-colors text-xs font-semibold px-2.5 py-1 rounded-md bg-[#0D0E15] border border-slate-800 hover:border-fuchsia-500/40"
                title="Admin Studio Portal"
              >
                🔒 Admin
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
