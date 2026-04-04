"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useSound } from "./SoundProvider"
import { cn } from "@/lib/utils"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Tools", href: "/skills" },
  { name: "Playlist", href: "/fun-zone" },
  { name: "Certificate", href: "/journey" },
  { name: "Contact", href: "/contact" },
]

export default function Navbar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { playHover, playClick } = useSound()

  // Easter egg states
  const [clickCount, setClickCount] = useState(0)
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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

  const toggleTheme = () => {
    playClick()
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <nav className="fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-background/50 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        {/* Logo / Easter Egg Trigger */}
        <div className="relative">
          <motion.button
            onClick={handleLogoClick}
            onMouseEnter={playHover}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-2xl font-bold tracking-tighter text-glow-cyan"
          >
            ファトクル<span className="text-[var(--color-neon-pink)]">_</span>
          </motion.button>
          
          {/* Easter Egg Message */}
          {showEasterEgg && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute left-0 top-full mt-2 whitespace-nowrap rounded border border-[var(--color-neon-pink)] bg-black/80 px-3 py-1 text-sm text-[var(--color-neon-pink)] neon-border-pink"
            >
              You found the secret! 🤖✨
            </motion.div>
          )}
        </div>

        {/* Desktop Links */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (pathname === "/home" && link.href === "/")
            return (
              <Link
                key={link.name}
                href={link.href}
                onMouseEnter={playHover}
                onClick={playClick}
                className={cn(
                  "relative text-sm font-medium transition-colors hover:text-[var(--color-neon-cyan)]",
                  isActive ? "text-[var(--color-neon-cyan)] text-glow-cyan" : "text-foreground/70"
                )}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--color-neon-cyan)]"
                    style={{ boxShadow: "0 0 8px var(--color-neon-cyan)" }}
                  />
                )}
              </Link>
            )
          })}
        </div>

        {/* Actions (Theme + Mobile Menu) */}
        <div className="flex items-center gap-4">
          {mounted && (
            <motion.button
              onClick={toggleTheme}
              onMouseEnter={playHover}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              className="rounded-full p-2 hover:bg-white/10"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.8)]" />
              ) : (
                <Moon className="h-5 w-5 text-slate-800" />
              )}
            </motion.button>
          )}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden"
            onClick={() => {
              playClick()
              setIsOpen(!isOpen)
            }}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Links Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-b border-white/10 bg-background/95 backdrop-blur-md md:hidden"
        >
          <div className="flex flex-col px-6 py-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (pathname === "/home" && link.href === "/")
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onMouseEnter={playHover}
                  onClick={() => {
                    playClick()
                    setIsOpen(false)
                  }}
                  className={cn(
                    "py-3 text-sm font-medium transition-colors hover:text-[var(--color-neon-cyan)]",
                    isActive ? "text-[var(--color-neon-cyan)]" : "text-foreground/80"
                  )}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>
        </motion.div>
      )}
    </nav>
  )
}
