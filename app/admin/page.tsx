"use client"

import { useState, useEffect } from "react"
import {
  Lock,
  Play,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Sparkles,
  TrendingUp,
  Flame,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Layers,
  Phone,
  Mail,
  Instagram,
  Settings,
  Eye,
  RefreshCw,
  Zap,
  Users,
  Briefcase,
  UserPlus,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  SiteContent,
  PortfolioItem,
  ServiceItem,
  TeamMemberItem,
  StatItem,
  extractInstagramId,
  getInitialDefaultContent,
} from "@/lib/content"
import { notifyContentUpdated } from "@/hooks/use-content"

type TabType = "portfolio" | "hero" | "services" | "team" | "contact" | "settings"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [pinInput, setPinInput] = useState("")
  const [authError, setAuthError] = useState("")
  const [token, setToken] = useState("")
  const [activeTab, setActiveTab] = useState<TabType>("portfolio")

  // Content state
  const [content, setContent] = useState<SiteContent>(getInitialDefaultContent())
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<string | null>(null)
  const [newPin, setNewPin] = useState("")

  // --- Forms for Creating New Items ---
  const [newReel, setNewReel] = useState<PortfolioItem>({
    id: "",
    client: "",
    title: "",
    subtitle: "",
    metric: "50K+ Views",
    tag: "Brand Film",
    url: "",
    thumbnail: "/insta-reel1.png",
    accent: "from-violet-500 via-fuchsia-500 to-pink-500",
    badgeColor: "bg-fuchsia-500/20 border-fuchsia-500/40 text-fuchsia-300",
  })

  const [newService, setNewService] = useState<ServiceItem>({
    id: "",
    iconName: "Sparkles",
    title: "",
    description: "",
    color: "from-violet-600 to-fuchsia-600",
  })

  const [newMember, setNewMember] = useState<TeamMemberItem>({
    id: "",
    name: "",
    role: "",
    instagram: "https://www.instagram.com/",
    image: "/sahil.png",
    color: "from-violet-500 to-fuchsia-500",
    isFounder: false,
  })

  // Check saved session on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("genz_admin_token")
    if (savedToken) {
      setToken(savedToken)
      setIsAuthenticated(true)
    }
    fetchContent()
  }, [])

  async function fetchContent() {
    try {
      setIsLoading(true)
      let localCache: any = null
      if (typeof window !== "undefined") {
        try {
          const cached = localStorage.getItem("genz_site_content_cache")
          if (cached) {
            localCache = JSON.parse(cached)
            if (localCache && localCache.hero) {
              setContent((prev) => ({ ...prev, ...localCache }))
            }
          }
        } catch { }
      }

      const res = await fetch(`/api/admin/content?t=${Date.now()}`, { cache: "no-store" })
      const data = await res.json()
      if (data.success && data.data) {
        const serverData = data.data
        const serverTime = serverData._updatedAt || 0
        const localTime = localCache?._updatedAt || 0

        if (localTime && localTime > serverTime) {
          return
        }

        setContent((prev) => ({
          ...prev,
          ...data.data,
        }))
      }
    } catch (err) {
      console.error("Failed to load content:", err)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setAuthError("")
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pinInput }),
      })
      const data = await res.json()
      if (data.success && data.token) {
        setToken(data.token)
        localStorage.setItem("genz_admin_token", data.token)
        setIsAuthenticated(true)
        setPinInput("")
      } else {
        setAuthError(data.message || "Invalid Passcode")
      }
    } catch {
      setAuthError("Failed to authenticate")
    }
  }

  function handleLogout() {
    localStorage.removeItem("genz_admin_token")
    setToken("")
    setIsAuthenticated(false)
  }

  async function handleSaveAll() {
    setIsSaving(true)
    setSaveStatus(null)
    try {
      const payloadContent = { ...content }
      if (newPin && newPin.trim()) {
        payloadContent.adminPin = newPin.trim()
      }

      const res = await fetch("/api/admin/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          content: payloadContent,
        }),
      })
      const data = await res.json()
      if (data.success) {
        notifyContentUpdated(payloadContent)
        setSaveStatus("Changes instantly saved & published live across the web!")
        if (newPin) setNewPin("")
        setTimeout(() => setSaveStatus(null), 4000)
      } else {
        setSaveStatus("Error saving: " + (data.message || "Unauthorized"))
      }
    } catch (error) {
      setSaveStatus("Failed to connect to server")
    } finally {
      setIsSaving(false)
    }
  }

  // ==========================================
  // 🎬 PORTFOLIO CRUD
  // ==========================================
  function handleUrlChange(url: string) {
    const extractedId = extractInstagramId(url)
    setNewReel((prev) => ({
      ...prev,
      url,
      id: extractedId || prev.id,
    }))
  }

  function handleAddReel() {
    if (!newReel.url || !newReel.client || !newReel.title) {
      alert("Please fill in at least the Reel URL, Client Name, and Title.")
      return
    }

    const reelId = extractInstagramId(newReel.url) || `reel_${Date.now()}`
    const readyReel: PortfolioItem = {
      ...newReel,
      id: reelId,
      thumbnail: newReel.thumbnail || "/insta-reel1.png",
    }

    setContent((prev) => ({
      ...prev,
      portfolio: [readyReel, ...prev.portfolio],
    }))

    setNewReel({
      id: "",
      client: "",
      title: "",
      subtitle: "",
      metric: "50K+ Views",
      tag: "Brand Film",
      url: "",
      thumbnail: "/insta-reel1.png",
      accent: "from-violet-500 via-fuchsia-500 to-pink-500",
      badgeColor: "bg-fuchsia-500/20 border-fuchsia-500/40 text-fuchsia-300",
    })
  }

  function handleDeleteReel(index: number) {
    if (confirm("Are you sure you want to delete this reel?")) {
      setContent((prev) => ({
        ...prev,
        portfolio: prev.portfolio.filter((_, i) => i !== index),
      }))
    }
  }

  function handleMoveReel(index: number, direction: "up" | "down") {
    const newItems = [...content.portfolio]
    const targetIndex = direction === "up" ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= newItems.length) return
    const temp = newItems[index]
    newItems[index] = newItems[targetIndex]
    newItems[targetIndex] = temp
    setContent((prev) => ({ ...prev, portfolio: newItems }))
  }

  function handleUpdateReelField(index: number, field: keyof PortfolioItem, value: string) {
    setContent((prev) => {
      const updated = [...prev.portfolio]
      updated[index] = {
        ...updated[index],
        [field]: value,
      }
      if (field === "url") {
        updated[index].id = extractInstagramId(value) || updated[index].id
      }
      return { ...prev, portfolio: updated }
    })
  }

  // ==========================================
  // 🔥 HERO & STATS CRUD
  // ==========================================
  function handleAddStat() {
    const newStat: StatItem = {
      emoji: "🚀",
      value: "100K+",
      label: "New Metric",
      desc: "Highlight description",
      gradient: "from-purple-500/20 via-pink-500/10 to-transparent",
      border: "border-purple-500/30",
      textGradient: "from-purple-400 to-pink-400",
    }
    setContent((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        stats: [...prev.hero.stats, newStat],
      },
    }))
  }

  function handleDeleteStat(index: number) {
    if (confirm("Delete this stat counter?")) {
      setContent((prev) => ({
        ...prev,
        hero: {
          ...prev.hero,
          stats: prev.hero.stats.filter((_, i) => i !== index),
        },
      }))
    }
  }

  function handleUpdateStat(index: number, field: keyof StatItem, value: string) {
    setContent((prev) => {
      const newStats = [...prev.hero.stats]
      newStats[index] = { ...newStats[index], [field]: value }
      return {
        ...prev,
        hero: { ...prev.hero, stats: newStats },
      }
    })
  }

  // ==========================================
  // ⚡ SERVICES CRUD
  // ==========================================
  function handleAddService() {
    if (!newService.title || !newService.description) {
      alert("Please provide a Service Title and Description.")
      return
    }

    const item: ServiceItem = {
      ...newService,
      id: `srv-${Date.now()}`,
    }

    setContent((prev) => ({
      ...prev,
      services: [...(prev.services || []), item],
    }))

    setNewService({
      id: "",
      iconName: "Sparkles",
      title: "",
      description: "",
      color: "from-violet-600 to-fuchsia-600",
    })
  }

  function handleDeleteService(index: number) {
    if (confirm("Delete this service?")) {
      setContent((prev) => ({
        ...prev,
        services: prev.services.filter((_, i) => i !== index),
      }))
    }
  }

  function handleUpdateService(index: number, field: keyof ServiceItem, value: string) {
    setContent((prev) => {
      const list = [...prev.services]
      list[index] = { ...list[index], [field]: value }
      return { ...prev, services: list }
    })
  }

  // ==========================================
  // 👥 TEAM & FOUNDERS CRUD
  // ==========================================
  function handleAddMember() {
    if (!newMember.name || !newMember.role) {
      alert("Please provide a Name and Role.")
      return
    }

    const item: TeamMemberItem = {
      ...newMember,
      id: `tm-${Date.now()}`,
    }

    setContent((prev) => {
      if (newMember.isFounder) {
        return {
          ...prev,
          team: {
            ...prev.team,
            founders: [...(prev.team?.founders || []), item],
          },
        }
      } else {
        return {
          ...prev,
          team: {
            ...prev.team,
            members: [...(prev.team?.members || []), item],
          },
        }
      }
    })

    setNewMember({
      id: "",
      name: "",
      role: "",
      instagram: "https://www.instagram.com/",
      image: "/sahil.png",
      color: "from-violet-500 to-fuchsia-500",
      isFounder: false,
    })
  }

  function handleDeleteFounder(index: number) {
    if (confirm("Remove founder?")) {
      setContent((prev) => ({
        ...prev,
        team: {
          ...prev.team,
          founders: prev.team.founders.filter((_, i) => i !== index),
        },
      }))
    }
  }

  function handleDeleteMember(index: number) {
    if (confirm("Remove team member?")) {
      setContent((prev) => ({
        ...prev,
        team: {
          ...prev.team,
          members: prev.team.members.filter((_, i) => i !== index),
        },
      }))
    }
  }

  function handleUpdateFounder(index: number, field: keyof TeamMemberItem, value: any) {
    setContent((prev) => {
      const list = [...prev.team.founders]
      list[index] = { ...list[index], [field]: value }
      return { ...prev, team: { ...prev.team, founders: list } }
    })
  }

  function handleUpdateMember(index: number, field: keyof TeamMemberItem, value: any) {
    setContent((prev) => {
      const list = [...prev.team.members]
      list[index] = { ...list[index], [field]: value }
      return { ...prev, team: { ...prev.team, members: list } }
    })
  }

  // ==========================================
  // 📞 CONTACT INFO CRUD
  // ==========================================
  function handleAddPhone() {
    setContent((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        phones: [...prev.contact.phones, "+91 "],
      },
    }))
  }

  function handleDeletePhone(index: number) {
    setContent((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        phones: prev.contact.phones.filter((_, i) => i !== index),
      },
    }))
  }

  function handleAddEmail() {
    setContent((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        emails: [...prev.contact.emails, "hello@genzmedia.com"],
      },
    }))
  }

  function handleDeleteEmail(index: number) {
    setContent((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        emails: prev.contact.emails.filter((_, i) => i !== index),
      },
    }))
  }

  // ----------------------------------------------------
  // 🔒 LOGIN SCREEN
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#08090E] text-white flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/25 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/25 rounded-full blur-[140px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="relative z-10 w-full max-w-md bg-[#0D0E15]/95 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-2xl text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-violet-600 via-fuchsia-600 to-pink-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-fuchsia-500/30">
            <Lock className="w-8 h-8 text-white" />
          </div>

          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Full CRUD Studio Engine
            </span>
          </div>

          <h2 className="text-2xl font-black text-white mb-2">GENZMEDIA Studio Admin</h2>
          <p className="text-slate-400 text-sm mb-6">
            Enter your admin passcode to manage all website sections.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter Passcode: ****"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full px-5 py-3.5 rounded-xl bg-slate-950/90 border border-slate-700 focus:border-fuchsia-500 focus:outline-none text-white text-center tracking-widest text-lg font-bold placeholder:text-slate-600 transition-colors"
                autoFocus
              />
            </div>

            {authError && (
              <div className="flex items-center justify-center gap-2 text-rose-400 text-sm font-medium">
                <AlertCircle size={16} />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 text-white font-bold text-base hover:shadow-[0_0_30px_rgba(255,46,147,0.5)] transition-all transform active:scale-95 cursor-pointer"
            >
              Unlock Dashboard
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>⚡ Instant Live Sync</span>
            <Link href="/" className="hover:text-fuchsia-400 transition-colors">
              ← Return to website
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  // ----------------------------------------------------
  // 🎛️ FULL CRUD DASHBOARD SCREEN
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-[#08090E] text-white flex flex-col font-sans selection:bg-pink-500/30">
      {/* 🧭 Top Admin Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#08090E]/90 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-black text-lg text-white group-hover:text-fuchsia-400 transition-colors">
                GENZMEDIA
              </span>
            </Link>
            <span className="px-2.5 py-0.5 rounded-md bg-violet-500/20 border border-violet-500/30 text-violet-300 text-xs font-bold uppercase tracking-wider">
              Admin Portal
            </span>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-white text-xs font-semibold transition-all"
            >
              <Eye size={14} className="text-cyan-400" />
              <span>Live Site</span>
              <ExternalLink size={12} className="opacity-70" />
            </Link>

            <button
              onClick={handleSaveAll}
              disabled={isSaving}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 text-white font-bold text-sm hover:shadow-[0_0_30px_rgba(255,46,147,0.5)] transition-all disabled:opacity-50 cursor-pointer"
            >
              {isSaving ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <Zap size={16} className="text-amber-300 fill-amber-300" />
                  <span>Publish Live</span>
                </>
              )}
            </button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-rose-400 border border-slate-800 transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 sm:space-x-3 border-t border-slate-800/60 overflow-x-auto">
          {[
            { id: "portfolio", label: "Portfolio Reels", icon: Play },
            { id: "hero", label: "Hero & Live Stats", icon: Flame },
            { id: "services", label: "Services Manager", icon: Briefcase },
            { id: "team", label: "Team & Founders", icon: Users },
            { id: "contact", label: "Studio & Contact", icon: Phone },
            { id: "settings", label: "Admin Security", icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-3.5 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap cursor-pointer ${isActive
                  ? "border-fuchsia-500 text-white bg-fuchsia-500/10"
                  : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"
                  }`}
              >
                <Icon size={16} className={isActive ? "text-pink-400" : "text-slate-400"} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </header>

      {/* Save Notification Toast */}
      <AnimatePresence>
        {saveStatus && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed top-20 right-6 z-50 px-5 py-3 rounded-2xl backdrop-blur-xl border shadow-2xl flex items-center gap-3 text-sm font-bold ${saveStatus.includes("saved")
              ? "bg-emerald-950/95 border-emerald-500/50 text-emerald-200 shadow-[0_0_30px_rgba(16,185,129,0.3)]"
              : "bg-rose-950/95 border-rose-500/50 text-rose-200 shadow-[0_0_30px_rgba(244,63,94,0.3)]"
              }`}
          >
            {saveStatus.includes("saved") ? (
              <CheckCircle2 size={18} className="text-emerald-400" />
            ) : (
              <AlertCircle size={18} className="text-rose-400" />
            )}
            <span>{saveStatus}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 📄 Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">

        {/* ============================================================ */}
        {/* TAB 1: PORTFOLIO & REELS CRUD */}
        {/* ============================================================ */}
        {activeTab === "portfolio" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <Play className="text-pink-400" size={24} />
                Portfolio Reels CRUD Manager
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Create new reels, update metadata, reorder cards, and delete items from your public portfolio.
              </p>
            </div>

            {/* ➕ CREATE: Quick Add Reel */}
            <div className="bg-gradient-to-br from-[#0D0E15] to-[#12141F] border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Plus size={18} className="text-fuchsia-400" />
                Add New Reel (Create)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">
                    Instagram Reel URL *
                  </label>
                  <input
                    type="text"
                    placeholder="https://www.instagram.com/reel/XXXXXX/..."
                    value={newReel.url}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-fuchsia-500 focus:outline-none text-white text-sm"
                  />
                  {newReel.id && (
                    <span className="text-[10px] text-fuchsia-400 mt-1 block font-mono">
                      Auto-detected Reel ID: <strong className="text-white">{newReel.id}</strong>
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">
                    Client / Brand Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Little Flowers School, Acute Public School"
                    value={newReel.client}
                    onChange={(e) => setNewReel({ ...newReel, client: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-fuchsia-500 focus:outline-none text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Brand Storytelling, POV Campus Tour"
                    value={newReel.title}
                    onChange={(e) => setNewReel({ ...newReel, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-fuchsia-500 focus:outline-none text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">
                    Metric Badge (Social Proof)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 50K+ Views, 120+ Leads, 12.4% CTR"
                    value={newReel.metric}
                    onChange={(e) => setNewReel({ ...newReel, metric: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-fuchsia-500 focus:outline-none text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Brand Film, Performance Ads, POV"
                    value={newReel.tag}
                    onChange={(e) => setNewReel({ ...newReel, tag: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-fuchsia-500 focus:outline-none text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">
                    Subtitle / Description
                  </label>
                  <input
                    type="text"
                    placeholder="Short highlight description"
                    value={newReel.subtitle}
                    onChange={(e) => setNewReel({ ...newReel, subtitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-fuchsia-500 focus:outline-none text-white text-sm"
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleAddReel}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 text-white font-bold text-sm hover:shadow-[0_0_25px_rgba(255,46,147,0.5)] transition-all cursor-pointer flex items-center gap-2"
                >
                  <Plus size={16} />
                  <span>Add Reel to Portfolio</span>
                </button>
              </div>
            </div>

            {/* 📝 READ / UPDATE / DELETE: Active Reels List */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center justify-between">
                <span>Active Portfolio Reels ({content.portfolio.length})</span>
                <span className="text-xs text-slate-400">Order from Top to Bottom</span>
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {content.portfolio.map((reel, idx) => (
                  <div
                    key={`${reel.id}-${idx}`}
                    className="bg-[#0D0E15] border border-slate-800 hover:border-fuchsia-500/50 rounded-2xl p-5 shadow-lg flex flex-col lg:flex-row gap-5 items-start lg:items-center justify-between transition-all"
                  >
                    {/* Position & Thumbnail Preview */}
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => handleMoveReel(idx, "up")}
                          disabled={idx === 0}
                          className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-20 text-slate-300 cursor-pointer"
                          title="Move Up"
                        >
                          <ArrowUp size={14} />
                        </button>
                        <button
                          onClick={() => handleMoveReel(idx, "down")}
                          disabled={idx === content.portfolio.length - 1}
                          className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-20 text-slate-300 cursor-pointer"
                          title="Move Down"
                        >
                          <ArrowDown size={14} />
                        </button>
                      </div>

                      <div className="relative w-16 h-24 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0">
                        <img
                          src={reel.thumbnail}
                          alt={reel.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/insta-reel1.png"
                          }}
                        />
                        <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                          <Play size={16} className="text-white fill-white" />
                        </div>
                      </div>

                      <div>
                        <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30">
                          #{idx + 1}
                        </span>
                        <h4 className="font-bold text-white text-base mt-1">{reel.client}</h4>
                        <p className="text-xs text-slate-400">{reel.title}</p>
                      </div>
                    </div>

                    {/* Inline Edit Inputs (UPDATE) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 flex-1 w-full">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-500">Client</label>
                        <input
                          type="text"
                          value={reel.client}
                          onChange={(e) => handleUpdateReelField(idx, "client", e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-500">Title</label>
                        <input
                          type="text"
                          value={reel.title}
                          onChange={(e) => handleUpdateReelField(idx, "title", e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-500">Metric</label>
                        <input
                          type="text"
                          value={reel.metric}
                          onChange={(e) => handleUpdateReelField(idx, "metric", e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-emerald-400 font-bold"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-500">Instagram URL</label>
                        <input
                          type="text"
                          value={reel.url}
                          onChange={(e) => handleUpdateReelField(idx, "url", e.target.value)}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono"
                        />
                      </div>
                    </div>

                    {/* Actions (DELETE / EXTERNAL) */}
                    <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
                      <a
                        href={reel.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        title="Test Instagram Link"
                      >
                        <ExternalLink size={16} />
                      </a>

                      <button
                        onClick={() => handleDeleteReel(idx)}
                        className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/20 transition-colors cursor-pointer"
                        title="Delete Reel"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: HERO & LIVE STATS CRUD */}
        {/* ============================================================ */}
        {activeTab === "hero" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <Flame className="text-amber-400" size={24} />
                Hero Section & Live Stats CRUD
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Customize your live availability pill badge, 2026 studio showreel, and create/update/delete hero stat counters.
              </p>
            </div>

            {/* 🟢 Live Studio Availability Badge */}
            <div className="bg-[#0D0E15] border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                Live Availability Badge Controls
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="badgeActive"
                    checked={content.hero.availability.active}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        hero: {
                          ...prev.hero,
                          availability: {
                            ...prev.hero.availability,
                            active: e.target.checked,
                          },
                        },
                      }))
                    }
                    className="w-5 h-5 accent-emerald-500 rounded cursor-pointer"
                  />
                  <label htmlFor="badgeActive" className="text-sm font-bold text-white cursor-pointer">
                    Show Badge on Homepage
                  </label>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-400 mb-1">
                    Badge Text Copy
                  </label>
                  <input
                    type="text"
                    value={content.hero.availability.text}
                    onChange={(e) =>
                      setContent((prev) => ({
                        ...prev,
                        hero: {
                          ...prev.hero,
                          availability: {
                            ...prev.hero.availability,
                            text: e.target.value,
                          },
                        },
                      }))
                    }
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-emerald-500 focus:outline-none text-white text-sm"
                  />
                </div>
              </div>
            </div>

            {/* 🎬 Hero Showreel Video */}
            <div className="bg-[#0D0E15] border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Play className="text-pink-400" size={18} />
                Hero 2026 Studio Showreel Video
              </h3>

              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">
                  Showreel Instagram URL
                </label>
                <input
                  type="text"
                  value={content.hero.showreelUrl}
                  onChange={(e) => {
                    const url = e.target.value
                    const id = extractInstagramId(url)
                    setContent((prev) => ({
                      ...prev,
                      hero: {
                        ...prev.hero,
                        showreelUrl: url,
                        showreelId: id || prev.hero.showreelId,
                      },
                    }))
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-fuchsia-500 focus:outline-none text-white text-sm font-mono"
                />
                <span className="text-[10px] text-fuchsia-400 mt-1 block font-mono">
                  Active Showreel ID: <strong className="text-white">{content.hero.showreelId}</strong>
                </span>
              </div>
            </div>

            {/* 📊 STATS CARDS CRUD */}
            <div className="bg-[#0D0E15] border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <TrendingUp className="text-cyan-400" size={18} />
                  Hero Stats Counters ({content.hero.stats.length})
                </h3>

                <button
                  type="button"
                  onClick={handleAddStat}
                  className="px-3 py-1.5 rounded-xl bg-violet-600/30 hover:bg-violet-600/50 border border-violet-500/40 text-violet-300 text-xs font-bold flex items-center gap-1 cursor-pointer transition-all"
                >
                  <Plus size={14} />
                  <span>Add Stat Card</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {content.hero.stats.map((stat, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 relative group">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-violet-400 uppercase">Stat #{idx + 1}</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          value={stat.emoji}
                          onChange={(e) => handleUpdateStat(idx, "emoji", e.target.value)}
                          className="w-8 text-center text-base bg-slate-900 border border-slate-700 rounded-lg py-0.5"
                          maxLength={2}
                        />
                        <button
                          onClick={() => handleDeleteStat(idx)}
                          className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                          title="Delete Stat"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500">Value / Number</label>
                      <input
                        type="text"
                        value={stat.value}
                        onChange={(e) => handleUpdateStat(idx, "value", e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-base font-black text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500">Label</label>
                      <input
                        type="text"
                        value={stat.label}
                        onChange={(e) => handleUpdateStat(idx, "label", e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-bold text-slate-200"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500">Description</label>
                      <input
                        type="text"
                        value={stat.desc}
                        onChange={(e) => handleUpdateStat(idx, "desc", e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-400"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: SERVICES CRUD */}
        {/* ============================================================ */}
        {activeTab === "services" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <Briefcase className="text-cyan-400" size={24} />
                Services CRUD Manager
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Add, edit, or remove services displayed in the 3D tilt cards section.
              </p>
            </div>

            {/* ➕ CREATE: Add New Service */}
            <div className="bg-gradient-to-br from-[#0D0E15] to-[#12141F] border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Plus size={18} className="text-cyan-400" />
                Add New Service (Create)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">
                    Service Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. YouTube Video Editing, UGC Ads"
                    value={newService.title}
                    onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-cyan-500 focus:outline-none text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">
                    Icon Type
                  </label>
                  <select
                    value={newService.iconName}
                    onChange={(e) => setNewService({ ...newService, iconName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-cyan-500 focus:outline-none text-white text-sm"
                  >
                    {["Palette", "Video", "Pen", "Share2", "TrendingUp", "Code", "Sparkles", "Zap", "Flame", "Globe"].map(
                      (icon) => (
                        <option key={icon} value={icon}>
                          {icon}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">
                    Gradient Accent
                  </label>
                  <select
                    value={newService.color}
                    onChange={(e) => setNewService({ ...newService, color: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-cyan-500 focus:outline-none text-white text-sm"
                  >
                    <option value="from-violet-600 to-fuchsia-600">Violet to Fuchsia</option>
                    <option value="from-fuchsia-600 to-pink-500">Fuchsia to Pink</option>
                    <option value="from-pink-600 to-amber-500">Pink to Amber</option>
                    <option value="from-cyan-500 to-violet-600">Cyan to Violet</option>
                    <option value="from-amber-500 to-rose-500">Amber to Rose</option>
                  </select>
                </div>

                <div className="md:col-span-3">
                  <label className="block text-xs font-bold text-slate-400 mb-1">
                    Description *
                  </label>
                  <input
                    type="text"
                    placeholder="Clear description explaining what you deliver and how it helps the client"
                    value={newService.description}
                    onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-cyan-500 focus:outline-none text-white text-sm"
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleAddService}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 via-violet-600 to-pink-500 text-white font-bold text-sm hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all cursor-pointer flex items-center gap-2"
                >
                  <Plus size={16} />
                  <span>Add Service Card</span>
                </button>
              </div>
            </div>

            {/* 📝 READ / UPDATE / DELETE: Services List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.services?.map((service, idx) => (
                <div
                  key={service.id || idx}
                  className="bg-[#0D0E15] border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-5 shadow-lg space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      Icon: {service.iconName}
                    </span>
                    <button
                      onClick={() => handleDeleteService(idx)}
                      className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                      title="Delete Service"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-500">Service Title</label>
                    <input
                      type="text"
                      value={service.title}
                      onChange={(e) => handleUpdateService(idx, "title", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-sm font-bold text-white"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-slate-500">Description</label>
                    <textarea
                      rows={2}
                      value={service.description}
                      onChange={(e) => handleUpdateService(idx, "description", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: TEAM & FOUNDERS CRUD */}
        {/* ============================================================ */}
        {activeTab === "team" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <Users className="text-violet-400" size={24} />
                Team & Founders CRUD Manager
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Add, edit, or remove founders and team members showcased on the website.
              </p>
            </div>

            {/* ➕ CREATE: Add Member */}
            <div className="bg-gradient-to-br from-[#0D0E15] to-[#12141F] border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <UserPlus size={18} className="text-violet-400" />
                Add Team Member / Founder (Create)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Sahil Kamdi"
                    value={newMember.name}
                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-violet-500 focus:outline-none text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">
                    Role / Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Founder, Video Creator, Meta Expert"
                    value={newMember.role}
                    onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-violet-500 focus:outline-none text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">
                    Section Type
                  </label>
                  <select
                    value={newMember.isFounder ? "founder" : "member"}
                    onChange={(e) => setNewMember({ ...newMember, isFounder: e.target.value === "founder" })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-violet-500 focus:outline-none text-white text-sm"
                  >
                    <option value="founder">Founder (Large Showcase)</option>
                    <option value="member">Team Member (Grid)</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-400 mb-1">
                    Instagram Profile URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://www.instagram.com/handle"
                    value={newMember.instagram}
                    onChange={(e) => setNewMember({ ...newMember, instagram: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-violet-500 focus:outline-none text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">
                    Avatar Image Path
                  </label>
                  <input
                    type="text"
                    placeholder="/sahil.png or /photo.png"
                    value={newMember.image}
                    onChange={(e) => setNewMember({ ...newMember, image: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-violet-500 focus:outline-none text-white text-sm"
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleAddMember}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 text-white font-bold text-sm hover:shadow-[0_0_25px_rgba(255,46,147,0.5)] transition-all cursor-pointer flex items-center gap-2"
                >
                  <UserPlus size={16} />
                  <span>Add Person</span>
                </button>
              </div>
            </div>

            {/* 📝 READ / UPDATE / DELETE: Founders List */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400">👑</span>
                Founders ({content.team?.founders?.length || 0})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.team?.founders?.map((founder, idx) => (
                  <div
                    key={founder.id || idx}
                    className="bg-[#0D0E15] border border-slate-800 hover:border-amber-500/50 rounded-2xl p-5 shadow-lg space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400 uppercase">Founder #{idx + 1}</span>
                      <button
                        onClick={() => handleDeleteFounder(idx)}
                        className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition-colors"
                        title="Delete Founder"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-500">Name</label>
                        <input
                          type="text"
                          value={founder.name}
                          onChange={(e) => handleUpdateFounder(idx, "name", e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-sm font-bold text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-500">Role</label>
                        <input
                          type="text"
                          value={founder.role}
                          onChange={(e) => handleUpdateFounder(idx, "role", e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-amber-400 font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500">Instagram URL</label>
                      <input
                        type="text"
                        value={founder.instagram}
                        onChange={(e) => handleUpdateFounder(idx, "instagram", e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 📝 READ / UPDATE / DELETE: Team Members List */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Users size={18} className="text-violet-400" />
                Team Members ({content.team?.members?.length || 0})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {content.team?.members?.map((member, idx) => (
                  <div
                    key={member.id || idx}
                    className="bg-[#0D0E15] border border-slate-800 hover:border-violet-500/50 rounded-2xl p-4 shadow-lg space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-violet-400">Member #{idx + 1}</span>
                      <button
                        onClick={() => handleDeleteMember(idx)}
                        className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                        title="Delete Member"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500">Name</label>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => handleUpdateMember(idx, "name", e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-bold text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500">Role</label>
                      <input
                        type="text"
                        value={member.role}
                        onChange={(e) => handleUpdateMember(idx, "role", e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-fuchsia-300"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-slate-500">Instagram URL</label>
                      <input
                        type="text"
                        value={member.instagram}
                        onChange={(e) => handleUpdateMember(idx, "instagram", e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400 font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 5: STUDIO & CONTACT INFO CRUD */}
        {/* ============================================================ */}
        {activeTab === "contact" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <Phone className="text-pink-400" size={24} />
                Studio Phone, Email & Socials CRUD
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Manage all studio contact channels displayed in the CTA section and footer.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone Numbers CRUD */}
              <div className="bg-[#0D0E15] border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Phone size={18} className="text-violet-400" />
                    Phone Numbers
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddPhone}
                    className="px-2.5 py-1 rounded-lg bg-violet-600/30 hover:bg-violet-600/50 text-violet-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={14} /> Add Phone
                  </button>
                </div>

                <div className="space-y-3">
                  {content.contact?.phones?.map((phone, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => {
                          const updated = [...content.contact.phones]
                          updated[idx] = e.target.value
                          setContent((prev) => ({
                            ...prev,
                            contact: { ...prev.contact, phones: updated },
                          }))
                        }}
                        className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeletePhone(idx)}
                        className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
                        title="Delete Phone"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Email Addresses CRUD */}
              <div className="bg-[#0D0E15] border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Mail size={18} className="text-cyan-400" />
                    Email Addresses
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddEmail}
                    className="px-2.5 py-1 rounded-lg bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-300 text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={14} /> Add Email
                  </button>
                </div>

                <div className="space-y-3">
                  {content.contact?.emails?.map((email, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => {
                          const updated = [...content.contact.emails]
                          updated[idx] = e.target.value
                          setContent((prev) => ({
                            ...prev,
                            contact: { ...prev.contact, emails: updated },
                          }))
                        }}
                        className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteEmail(idx)}
                        className="p-2 text-slate-500 hover:text-rose-400 transition-colors"
                        title="Delete Email"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 6: ADMIN SECURITY & PIN */}
        {/* ============================================================ */}
        {activeTab === "settings" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                <Settings className="text-violet-400" size={24} />
                Admin Security Settings
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Change your admin dashboard unlock passcode anytime.
              </p>
            </div>

            <div className="max-w-md bg-[#0D0E15] border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Lock size={18} className="text-pink-400" />
                Change Admin Passcode
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 mb-1">
                    New Passcode / PIN
                  </label>
                  <input
                    type="password"
                    placeholder="Enter new 4+ digit PIN"
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-fuchsia-500 focus:outline-none text-white text-sm"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Click "Publish Live" at the top right to save your new passcode.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
