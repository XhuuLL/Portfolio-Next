"use client"

import { motion, Variants } from "framer-motion"
import { useSound } from "@/components/SoundProvider"
import { BatteryMedium, Activity, Bug, Search, TerminalSquare } from "lucide-react"
import { ScrambleText } from "@/components/react-bits/ScrambleText"

const stats = [
  { label: "LEVEL HIDUP", value: "MASIH BELAJAR", icon: BatteryMedium, color: "var(--color-neon-cyan)" },
  { label: "MOOD NGODING", value: "TERGANTUNG AI", icon: Activity, color: "var(--color-neon-pink)" },
  { label: "BUG DITEMUKAN", value: "SELALU ADA", icon: Bug, color: "var(--color-neon-purple)" },
  { label: "SOLUSI", value: "COPY PASTE AI", icon: Search, color: "var(--color-neon-cyan)" },
]

const TypewriterGlitch = ({ text }: { text: string }) => {
  const letters = Array.from(text)
  return (
    <motion.span>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, delay: i * 0.15 }}
          className="inline-block"
        >
          <motion.span
            animate={{ 
              x: [0, -1, 1, 0, 0],
              opacity: [1, 0.8, 1, 0.7, 1],
              textShadow: [
                "0 0 8px var(--color-neon-pink)",
                "2px 0 1px var(--color-neon-cyan), -2px 0 1px var(--color-neon-purple)",
                "0 0 8px var(--color-neon-pink)",
                "-1px 0 1px var(--color-neon-purple), 1px 0 1px var(--color-neon-cyan)",
                "0 0 8px var(--color-neon-pink)"
              ]
            }}
            transition={{
              duration: 0.2 + Math.random() * 2,
              repeat: Infinity,
              repeatDelay: 1 + Math.random() * 3
            }}
          >
            {letter}
          </motion.span>
        </motion.span>
      ))}
    </motion.span>
  )
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
}

export default function About() {
  const { playHover } = useSound()

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4 sm:p-8 md:p-12 min-h-screen selection:bg-[var(--color-neon-cyan)] selection:text-black">
      <div className="mx-auto w-full max-w-6xl">
        
        {/* --- HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-glow-cyan text-[var(--color-neon-cyan)] drop-shadow-[0_0_15px_var(--color-neon-cyan)] mb-4">
            ABOUT ME
          </h1>
          <p className="mt-2 text-white/60 text-lg max-w-xl mx-auto">
            Terminal log initialization... Fetching user data.
          </p>
        </motion.div>

        {/* PERUBAHAN: items-stretch memastikan tinggi kolom kiri & kanan sama */}
        <div className="grid gap-6 lg:grid-cols-12 items-stretch">
          
          {/* --- BIO SECTION (Kiri, lebih lebar) --- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 group relative rounded-3xl border border-white/10 bg-[#0a0a0c]/80 p-8 md:p-10 backdrop-blur-2xl shadow-2xl transition-all duration-500 hover:border-[var(--color-neon-pink)]/50 hover:shadow-[0_0_40px_-15px_var(--color-neon-pink)] overflow-hidden h-full flex flex-col justify-center"
          >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-neon-pink)]/5 blur-[100px] rounded-full pointer-events-none" />

            {/* Terminal Header */}
            <div className="flex flex-wrap items-center justify-between border-b border-white/10 pb-5 mb-8">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/80 shadow-[0_0_5px_rgba(239,68,68,0.5)]" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/80 shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
                <div className="h-3 w-3 rounded-full bg-green-500/80 shadow-[0_0_5px_rgba(34,197,94,0.5)]" />
              </div>
              <div className="flex gap-4 text-[10px] sm:text-xs font-mono text-white/40 tracking-wider">
                <span className="flex items-center gap-1"><TerminalSquare className="w-3 h-3" /> ROOT</span>
                <span className="hidden sm:inline">|</span>
                <span className="text-[var(--color-neon-cyan)]">ファトクル</span>
              </div>
            </div>

            <h2 className="mb-8 text-3xl md:text-4xl font-mono font-bold text-[var(--color-neon-pink)] drop-shadow-[0_0_8px_rgba(255,0,255,0.3)]">
              &gt; <TypewriterGlitch text="XhuuLL" />
              <motion.span 
                animate={{ opacity: [1, 0, 1] }} 
                transition={{ duration: 0.8, repeat: Infinity }}
                className="ml-1 inline-block text-white"
              >
                _
              </motion.span>
            </h2>

            <div className="space-y-6 text-white/70 leading-relaxed font-mono text-sm md:text-base flex flex-col relative z-10">
              <p className="pl-4 border-l-2 border-white/10 hover:border-[var(--color-neon-cyan)] transition-colors duration-300">
                <ScrambleText delay={0} text="Hello kids, saya Fatkhul. Kadang ngoding pakai AI, kadang rebahan, kadang bingung sendiri." />
              </p>
              <p className="pl-4 border-l-2 border-white/10 hover:border-[var(--color-neon-pink)] transition-colors duration-300">
                <ScrambleText delay={1} text="Kadang bikin project keren pakai AI, kadang cuma buka VSCode terus bengong. Ide sering muncul jam 2 pagi, tapi eksekusinya nanti dulu." />
              </p>
              <p className="pl-4 border-l-2 border-white/10 hover:border-[var(--color-neon-purple)] transition-colors duration-300">
                <ScrambleText delay={2} text="Kalau lagi semangat bisa ngoding berjam-jam pakai AI, kalau tidak ya buka Facebook dulu bentar hehe (yang ujung-ujungnya 3 jam)." />
              </p>
              
              {/* Quote Section */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="font-bold text-white text-lg italic text-center relative">
                  <span className="absolute -left-2 -top-4 text-4xl text-[var(--color-neon-cyan)]/20">&quot;</span>
                  <ScrambleText delay={3} text="Saya percaya satu hal: kalau error, berarti masih hidup." />
                  <span className="absolute -right-2 -bottom-4 text-4xl text-[var(--color-neon-cyan)]/20">&quot;</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* --- STAT CARDS (Kanan, Grid 2x2 sejajar tinggi) --- */}
          {/* PERUBAHAN: Menambahkan h-full dan grid-rows-2 agar merenggang rata */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 grid gap-4 grid-cols-2 grid-rows-2 h-full"
          >
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  onMouseEnter={playHover}
                  className="group relative h-full w-full flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.04] cursor-crosshair text-center overflow-hidden"
                  style={{
                    '--hover-color': stat.color
                  } as React.CSSProperties}
                >
                  {/* Hover Background Glow */}
                  <div 
                    className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" 
                    style={{ background: `radial-gradient(circle at center, ${stat.color}15, transparent 70%)` }} 
                  />
                  
                  {/* Border Glow on Hover */}
                  <div 
                    className="absolute inset-0 rounded-3xl border border-transparent transition-colors duration-300 group-hover:border-[var(--hover-color)]/50 pointer-events-none"
                  />

                  {/* Icon Circle */}
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/5 border border-white/10 transition-transform duration-300 group-hover:scale-110 group-hover:bg-[var(--hover-color)]/10">
                    <Icon className="h-6 w-6 transition-colors duration-300" style={{ color: stat.color }} />
                  </div>

                  <span className="text-xs font-bold tracking-widest text-white/40 mb-2 uppercase">
                    {stat.label}
                  </span>
                  
                  <span 
                    className="text-sm md:text-md font-black tracking-tight leading-tight transition-all duration-300" 
                    style={{ color: stat.color, textShadow: `0 0 10px ${stat.color}40` }}
                  >
                    {stat.value}
                  </span>
                </motion.div>
              )
            })}
          </motion.div>

        </div>
      </div>
    </div>
  )
}