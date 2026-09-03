"use client"

import { Instagram, Lock } from "lucide-react"
import { useContent } from "@/hooks/use-content"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { contact } = useContent()

  return (
    <footer className="bg-[#08090E] border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logoo.png"
                alt="GENZMEDIA Logo"
                className="h-12 w-auto object-contain drop-shadow-[0_0_20px_rgba(255,46,147,0.4)]"
              />
              <span className="font-mono text-[10px] tracking-widest text-fuchsia-300 uppercase font-bold border border-fuchsia-500/30 px-2 py-0.5 rounded bg-fuchsia-500/10">
                STUDIO
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              Creative production studio helping business owners and creators dominate feeds with high-retention video editing, thumbnail psychology, and Meta Ads.
            </p>
          </div>

          {/* Contact (Live Synced) */}
          <div>
            <h4 className="text-white font-mono text-xs uppercase tracking-widest mb-4">Direct Contact</h4>
            <div className="space-y-2 text-sm text-slate-400 font-mono">
              {contact?.phones?.map((phone, idx) => (
                <p key={idx}>
                  <a href={`tel:${phone.replace(/\s+/g, "")}`} className="hover:text-fuchsia-400 transition-colors">
                    📞 {phone}
                  </a>
                </p>
              ))}
              {contact?.emails?.map((email, idx) => (
                <p key={idx}>
                  <a href={`mailto:${email}`} className="hover:text-cyan-400 transition-colors">
                    📧 {email}
                  </a>
                </p>
              ))}
            </div>
          </div>

          {/* Quick Links & Social */}
          <div>
            <h4 className="text-white font-mono text-xs uppercase tracking-widest mb-4">Navigation</h4>
            <div className="space-y-2 text-sm font-mono">
              <p>
                <a href="#home" className="text-slate-400 hover:text-fuchsia-400 transition-colors">
                  // Home
                </a>
              </p>
              <p>
                <a href="#about" className="text-slate-400 hover:text-fuchsia-400 transition-colors">
                  // About
                </a>
              </p>
              <p>
                <a href="#services" className="text-slate-400 hover:text-fuchsia-400 transition-colors">
                  // Capabilities
                </a>
              </p>
              <p>
                <a href="#portfolio" className="text-slate-400 hover:text-fuchsia-400 transition-colors">
                  // Case Studies
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
                      <Instagram size={15} /> {item.handle || "Instagram"}
                    </a>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          <p className="text-slate-500 text-xs leading-relaxed mb-6 font-mono">
            Design, editing, short-form video, and advertising services focus on high retention and measurable audience reach. Results scale based on content quality, campaign duration, and budget.
          </p>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-500">
            <p>© {currentYear} GENZMEDIA STUDIO. ALL RIGHTS RESERVED.</p>
            <div className="flex items-center gap-2 text-slate-600">
              <span>CRAFTED FOR HIGH RETENTION</span>
              <a
                href="/admin"
                className="opacity-25 hover:opacity-90 transition-all p-1 inline-flex items-center text-slate-500 hover:text-slate-300"
                aria-label="Access"
              >
                <svg
                  viewBox="0 0 512 512"
                  className="w-3.5 h-3.5 fill-current"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M256 36.6L73.1 113.8v138.5c0 128.3 78 247.9 182.9 283.1 104.9-35.2 182.9-154.8 182.9-283.1V113.8L256 36.6z M256 128c30.9 0 56 25.1 56 56s-25.1 56-56 56-56-25.1-56-56 25.1-56 56-56z M164 382c0-44.2 41.2-76 92-76s92 31.8 92 76c0 24-41.2 44-92 44s-92-20-92-44z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
