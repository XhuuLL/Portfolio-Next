"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Terminal } from "lucide-react"
import { useSound } from "@/components/SoundProvider"

const Typewriter = ({ text }: { text: string }) => {
  const letters = Array.from(text)
  return (
    <motion.span className="inline-block">
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.04, ease: "easeOut" }}
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
    <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden font-sans">
      {/* Background Glows - subtle variants */}
      <motion.div
        className="absolute top-0 -z-10 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 -z-10 h-[600px] w-[600px] translate-y-1/2 rounded-full bg-purple-500/10 blur-[120px]"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="z-10 flex flex-col items-center text-center space-y-8 px-6 max-w-4xl">
        {/* Terminal Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-3"
        >
          <Terminal className="h-6 w-6 text-cyan-400" />
          <h2 className="text-lg font-mono text-cyan-400 opacity-80 tracking-wide">
            {`> XhuuLL`}
          </h2>
        </motion.div>

        {/* Main Heading */}
        <div className="space-y-4">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="block text-foreground/80 text-xl md:text-2xl font-light tracking-widest"
          >
            HELLO, I AM
          </motion.span>
          <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold -tracking-tight whitespace-nowrap">
            <span className="inline-block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent opacity-90 pb-2">
              <Typewriter text="AKHMAD FATKHUL ARIFIN" />
            </span>
          </h1>
        </div>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
          className="pt-8 flex flex-col sm:flex-row gap-4"
        >
          <Link
            href="/about"
            onMouseEnter={playHover}
            onClick={playClick}
            className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-8 py-4 font-sans font-medium text-foreground transition-all hover:scale-105 hover:bg-white/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
          >
            <span>Get Started</span>
            <ArrowRight className="h-5 w-5 opacity-70 transition-transform group-hover:translate-x-1 group-hover:opacity-100" />
          </Link>
          <Link
            href="/contact"
            onMouseEnter={playHover}
            onClick={playClick}
            className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-full border border-white/10 bg-black/40 backdrop-blur-md px-8 py-4 font-sans font-medium text-foreground transition-all hover:scale-105 hover:bg-white/5 hover:border-white/30"
          >
            <span>Contact Me</span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
