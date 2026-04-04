"use client"

import { motion } from "framer-motion"
import { useSound } from "@/components/SoundProvider"
import { BatteryMedium, Activity, Bug, Search } from "lucide-react"

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

export default function About() {
  const { playHover } = useSound()

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-6 sm:p-12">
      <div className="mx-auto w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-black md:text-6xl text-glow-cyan text-[var(--color-neon-cyan)]">
            ABOUT ME
          </h1>
          <div className="mt-2 h-1 w-24 mx-auto bg-[var(--color-neon-pink)] shadow-[0_0_10px_var(--color-neon-pink)]" />
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="group rounded border border-white/10 bg-black/40 p-8 backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-neon-pink)] hover:shadow-[0_0_20px_rgba(255,0,255,0.15)]"
          >
            <h2 className="mb-6 text-3xl font-mono font-bold text-[var(--color-neon-pink)]">
              &gt; <TypewriterGlitch text="XhuuLL" />
              <motion.span 
                animate={{ opacity: [1, 0, 1] }} 
                transition={{ duration: 0.8, repeat: Infinity }}
                className="ml-1 inline-block"
              >
                _
              </motion.span>
            </h2>
            <div className="space-y-4 text-foreground/80 leading-relaxed font-mono">
              <p>
                Hello kids, saya Fatkhul. Kadang ngoding pakai AI, kadang rebahan, kadang bingung sendiri.
              </p>
              <p>
                Kadang bikin project keren pakai AI, kadang cuma buka VSCode terus bengong. Ide sering muncul jam 2 pagi, tapi eksekusinya nanti dulu.
              </p>
              <p>
                Kalau lagi semangat bisa ngoding berjam-jam pakai AI, kalau tidak ya buka Facebook dulu bentar hehe (yang ujung-ujungnya 3 jam).
              </p>
              <p className="font-bold text-white/90 pt-2 border-t border-white/10 italic">
                "Saya percaya satu hal: kalau error, berarti masih hidup."
              </p>
            </div>
          </motion.div>

          {/* Stat Cards */}
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.03, borderColor: stat.color }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.2 }}
                  onMouseEnter={playHover}
                  className="group relative flex flex-col items-center justify-center rounded border border-white/10 bg-black/40 p-6 backdrop-blur-sm transition-colors cursor-crosshair text-center"
                  style={{
                    boxShadow: "0 0 0 rgba(0,0,0,0)",
                  }}
                >
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-20" style={{ backgroundColor: stat.color }} />
                  <Icon className="mb-3 h-8 w-8" style={{ color: stat.color }} />
                  <span className="text-xs font-bold tracking-wider text-foreground/50 mb-2">
                    {stat.label}
                  </span>
                  <span className="text-lg md:text-md lg:text-lg font-black tracking-tight leading-tight" style={{ color: stat.color, textShadow: `0 0 10px ${stat.color}` }}>
                    {stat.value}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
