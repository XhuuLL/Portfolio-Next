"use client"

import { motion } from "framer-motion"
import { useSound } from "@/components/SoundProvider"
import { Bot, Sparkles, Cpu, MousePointer2, Cloud, Rocket } from "lucide-react"

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
    name: "Cloud", 
    desc: "Tempat ngelempar beban hidup (dan ratusan file node_modules) biar laptop kentang nggak menjerit.", 
    icon: Cloud, 
    color: "var(--color-neon-pink)" 
  },
  { 
    name: "Antigravity", 
    desc: "AI coding assistant spesial. Mengurangi gravitasi bug di kode sampai rasanya enteng banget melayang ke angkasa.", 
    icon: Rocket, 
    color: "var(--color-neon-purple)" 
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
}

export default function Skills() {
  const { playHover, playClick } = useSound()

  return (
    <div className="flex flex-1 flex-col p-6 sm:p-12 relative min-h-screen items-center">
      <div className="w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-black md:text-5xl text-glow-cyan text-[var(--color-neon-cyan)]">
            AI TOOLKIT
          </h1>
          <p className="mt-4 text-foreground/70">
            Senjata rahasia buat ngoding santai tapi tetep kelar.
          </p>
        </motion.div>

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
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={playHover}
                onClick={playClick}
                className="group relative flex flex-col justify-start overflow-hidden rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-md transition-all sm:p-8 cursor-crosshair"
                style={{
                  '--hover-glow': tool.color,
                  boxShadow: "0 0 0 rgba(0,0,0,0)",
                } as React.CSSProperties}
              >
                {/* Inner Glow Reveal */}
                <div 
                  className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ boxShadow: `inset 0 0 30px var(--hover-glow)` }}
                />

                <div className="relative z-10 flex flex-col items-center text-center">
                  <div 
                    className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/5 border border-white/10 transition-colors duration-300 group-hover:bg-white/10"
                    style={{ borderColor: tool.color, boxShadow: `0 0 15px ${tool.color}40` }}
                  >
                    <Icon className="h-8 w-8" style={{ color: tool.color }} />
                  </div>
                  
                  <h2 
                    className="mb-3 text-xl font-black tracking-wider transition-colors duration-300"
                    style={{ color: tool.color, textShadow: `0 0 10px ${tool.color}80` }}
                  >
                    {tool.name}
                  </h2>
                  
                  <p className="text-sm leading-relaxed text-foreground/80 group-hover:text-white transition-colors duration-300">
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
