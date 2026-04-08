"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Home,
  User,
  Briefcase,
  Wrench,
  Music,
  Award,
  Mail
} from "lucide-react"
import { useSound } from "./SoundProvider"
import { cn } from "@/lib/utils"

const navLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: User },
  { name: "Projects", href: "/projects", icon: Briefcase },
  { name: "Tools", href: "/skills", icon: Wrench },
  { name: "Playlist", href: "/fun-zone", icon: Music },
  { name: "Certificate", href: "/journey", icon: Award },
  { name: "Contact", href: "/contact", icon: Mail },
]

export default function Navbar() {
  const pathname = usePathname()
  const { playHover, playClick } = useSound()

  // Easter egg states
  const [clickCount, setClickCount] = useState(0)
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  const handleLogoClick = () => {
    playClick()
    setClickCount((prev) => {
      const newCount = prev + 1
      if (newCount === 5) {
        setShowEasterEgg(true)
        setTimeout(() => setShowEasterEgg(false), 3000)
        return 0
      }
      return newCount
    })
  }

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[95vw] sm:max-w-max flex justify-center">
      <nav className="flex items-center gap-0.5 sm:gap-1 md:gap-2 justify-start sm:justify-center rounded-full border border-white/10 bg-black/40 px-2 sm:px-3 py-1.5 sm:py-2 md:py-3 shadow-lg backdrop-blur-lg overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

        <div className="relative group flex items-center pr-2 md:pr-4 shrink-0">
          <motion.button
            onClick={handleLogoClick}
            onMouseEnter={playHover}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-base sm:text-lg md:text-xl font-bold tracking-tighter text-foreground hover:text-cyan-400 transition-colors"
          >
            ファトクル<span className="text-pink-400">_</span>
          </motion.button>

          {/* Easter Egg Message */}
          <AnimatePresence>
            {showEasterEgg && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute bottom-full mb-4 left-0 whitespace-nowrap rounded-md border border-pink-400 bg-black/80 px-3 py-1.5 text-sm text-pink-400 shadow-[0_0_10px_rgba(244,114,182,0.3)] backdrop-blur-md"
              >
                You found the secret! 🤖✨
              </motion.div>
            )}
          </AnimatePresence>

          {/* Divider */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-4 sm:h-6 w-px bg-white/20" />
        </div>

        {/* Dock Links */}
        <div className="flex items-center gap-0 sm:gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (pathname === "/home" && link.href === "/")
            const Icon = link.icon

            return (
              <Link
                key={link.name}
                href={link.href}
                onMouseEnter={playHover}
                onClick={playClick}
                className="relative group p-1 md:p-2 shrink-0"
              >
                <motion.div
                  whileHover={{ scale: 1.2, y: -4 }}
                  whileTap={{ scale: 0.9 }}
                  className={cn(
                    "relative flex items-center justify-center rounded-full p-2 sm:p-2.5 transition-colors",
                    isActive
                      ? "bg-white/10 text-cyan-400"
                      : "text-foreground/60 hover:text-foreground hover:bg-white/5"
                  )}
                >
                  {/* Ukuran icon disesuaikan: h-4 w-4 di HP, h-6 w-6 di PC */}
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 stroke-[1.5]" />

                  {/* Active glow dot */}
                  {isActive && (
                    <motion.div
                      layoutId="dock-indicator"
                      className="absolute -bottom-1.5 h-1 w-1 rounded-full bg-cyan-400"
                      style={{ boxShadow: "0 0 8px #22d3ee" }}
                    />
                  )}
                </motion.div>

                {/* Tooltip */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 rounded-md border border-white/10 bg-black/80 px-3 py-1.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 whitespace-nowrap backdrop-blur-md pointer-events-none shadow-xl hidden md:block">
                  {link.name}
                </div>
              </Link>
            )
          })}
        </div>

      </nav>
    </div>
  )
}