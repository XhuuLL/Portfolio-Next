"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Terminal } from "lucide-react"
import { useSound } from "@/components/SoundProvider"

const Typewriter = ({ text }: { text: string }) => {
  const letters = Array.from(text)
  return (
    <motion.span>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, delay: i * 0.1 }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default function Home() {
  const { playHover, playClick } = useSound()

  return (
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden">
      {/* Parallax Background Glow */}
      <motion.div
        className="absolute -top-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-[var(--color-neon-cyan)]/20 blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-[var(--color-neon-pink)]/20 blur-[120px]"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="z-10 flex flex-col items-center text-center space-y-6 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 text-glow-cyan"
        >
          <Terminal className="h-8 w-8 text-[var(--color-neon-cyan)]" />
          <h2 className="text-xl font-mono text-[var(--color-neon-cyan)]">XhuuLL</h2>
        </motion.div>

        <h1 className="text-5xl font-black tracking-tight sm:text-7xl lg:text-8xl">
          <span className="block text-foreground drop-shadow-md">HELLO, I AM</span>
          <span className="inline-block bg-gradient-to-r from-[var(--color-neon-cyan)] to-[var(--color-neon-pink)] bg-clip-text text-transparent filter drop-shadow-[0_0_15px_rgba(255,0,255,0.5)]">
            <Typewriter text="AKHMAD FATKHUL ARIFIN" />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="max-w-2xl text-lg text-foreground/70"
        >
          Building things on the internet, from serious projects to random midnight ideas. Welcome to my space.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, type: "spring" }}
          className="mt-8 flex gap-4"
        >
          <Link
            href="/about"
            onMouseEnter={playHover}
            onClick={playClick}
            className="group relative flex items-center gap-2 overflow-hidden rounded border border-[var(--color-neon-cyan)] bg-background px-8 py-4 font-mono font-bold text-[var(--color-neon-cyan)] transition-all hover:bg-[var(--color-neon-cyan)] hover:text-black neon-border"
          >
            <span>ENTER SYSTEM</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
