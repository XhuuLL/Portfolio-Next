"use client"

import { motion, Variants } from "framer-motion"
import { useSound } from "@/components/SoundProvider"
import { Bot, Sparkles, Cpu, MousePointer2, BrainCircuit, Rocket } from "lucide-react"

const aiTools = [
  { 
    name: "ChatGPT", 
    desc: "Teman ngobrol kalau lagi buntu. Kadang bantuin ngetik kode sakti, kadang malah halu dan bikin pusing sendiri.", 
    icon: Bot, 
    color: "var(--color-neon-cyan)" 
  },
  { 
    name: "Gemini", 
    desc: "Saingan berat di tab sebelahnya. Enak buat digest artikel panjang atau kalau lagi cari ide secepat kilat.", 
    icon: Sparkles, 
    color: "var(--color-neon-pink)" 
  },
  { 
    name: "Copilot", 
    desc: "Si copilot pinter yang sering baca pikiran. Auto-complete-nya jago, walau kadang ngaco nabrak tembok pinggir jalan.", 
    icon: Cpu, 
    color: "var(--color-neon-purple)" 
  },
  { 
    name: "Cursor", 
    desc: "Kode editor andalan zaman now. Bikin kerjaan ngoding berasa kayak main co-op game bareng AI pintar.", 
    icon: MousePointer2, 
    color: "var(--color-neon-cyan)" 
  },
  { 
    name: "Claude AI", 
    desc: "Teman diskusi buat mikir panjang dan nulis kode yang rapi. Jawabannya natural, cocok buat ngeberesin bug yang bikin pusing.", 
    icon: BrainCircuit, 
    color: "var(--color-neon-orange)" 
  },
  { 
    name: "Antigravity", 
    desc: "AI coding assistant spesial. Mengurangi gravitasi bug di kode sampai rasanya enteng banget melayang ke angkasa.", 
    icon: Rocket, 
    color: "var(--color-neon-purple)" 
  }
]

// Tambahkan ': Variants' untuk mengatasi error TypeScript
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
}

export default function Skills() {
  const { playHover, playClick } = useSound()

  return (
    <div className="flex flex-1 flex-col p-4 sm:p-8 md:p-12 min-h-screen items-center selection:bg-[var(--color-neon-cyan)] selection:text-black">
      <div className="w-full max-w-6xl">
        
        {/* --- HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-glow-cyan text-[var(--color-neon-cyan)] drop-shadow-[0_0_15px_var(--color-neon-cyan)] mb-4">
            AI TOOLKIT
          </h1>
          <p className="mt-2 text-white/60 text-lg max-w-xl mx-auto">
            Senjata rahasia buat ngoding santai tapi tetep kelar.
          </p>
        </motion.div>

        {/* --- CARDS GRID --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {aiTools.map((tool) => {
            const Icon = tool.icon
            return (
              <motion.div
                key={tool.name}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                onMouseEnter={playHover}
                onClick={playClick}
                className="group relative flex flex-col justify-start overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.04] cursor-crosshair"
                style={{
                  '--hover-color': tool.color,
                } as React.CSSProperties}
              >
                {/* Top Accent Line */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1 z-20 opacity-50 group-hover:opacity-100 transition-opacity duration-300" 
                  style={{ background: `linear-gradient(90deg, transparent, ${tool.color}, transparent)` }} 
                />

                {/* Soft Background Radial Glow on Hover */}
                <div 
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `radial-gradient(circle at center, ${tool.color}15, transparent 70%)` }}
                />

                {/* Border Glow on Hover */}
                <div 
                  className="pointer-events-none absolute inset-0 rounded-3xl border border-transparent transition-colors duration-500 group-hover:border-[var(--hover-color)]/50"
                  style={{ boxShadow: `0 0 30px -10px ${tool.color}40` }}
                />

                <div className="relative z-10 flex flex-col items-center text-center mt-2">
                  
                  {/* Icon Container */}
                  <div 
                    className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-[var(--hover-color)]/10 group-hover:shadow-[0_0_20px_var(--hover-color)30]"
                    style={{ borderColor: `${tool.color}50` }}
                  >
                    <Icon className="h-8 w-8 transition-colors duration-300" style={{ color: tool.color }} />
                  </div>
                  
                  {/* Title */}
                  <h2 
                    className="mb-4 text-2xl font-bold tracking-tight transition-colors duration-300 drop-shadow-sm"
                    style={{ color: "white" }}
                  >
                    <span className="group-hover:text-[var(--hover-color)] transition-colors duration-300">
                      {tool.name}
                    </span>
                  </h2>
                  
                  {/* Description */}
                  <p className="text-sm leading-relaxed text-white/60 group-hover:text-white/90 transition-colors duration-300">
                    {tool.desc}
                  </p>
                  
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}