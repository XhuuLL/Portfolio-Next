"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { Howl } from "howler"

type SoundContextType = {
  playHover: () => void
  playClick: () => void
  isEnabled: boolean
  toggleSound: () => void
}

const SoundContext = createContext<SoundContextType | undefined>(undefined)

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [isEnabled, setIsEnabled] = useState(true)

  // Using simple synthesized sounds built-in to browser AudioContext if no files,
  // but since we want Howler we'll generate base64 data URIs of tiny blips, or use empty placeholders
  // A tiny sine wave beep for hover
  const hoverSound = new Howl({
    src: ['data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAD//wEA//8BAA=='], // Very short pop placeholder
    volume: 0.2,
  })

  const clickSound = new Howl({
    src: ['data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAD//wEA//8BAA=='], // Placeholder for click
    volume: 0.5,
  })

  // We really should use a library or actual mp3s. For now we just implement the player logic
  // Since howler requires valid audio files to not throw errors on play attempt,
  // we will wrap it in a try-catch or provide safe functionality.
  
  const playHover = () => {
    if (isEnabled) {
      try { hoverSound.play() } catch(e) {}
    }
  }

  const playClick = () => {
    if (isEnabled) {
      try { clickSound.play() } catch(e) {}
    }
  }

  const toggleSound = () => setIsEnabled(!isEnabled)

  return (
    <SoundContext.Provider value={{ playHover, playClick, isEnabled, toggleSound }}>
      {children}
    </SoundContext.Provider>
  )
}

export const useSound = () => {
  const context = useContext(SoundContext)
  if (!context) {
    throw new Error("useSound must be used within a SoundProvider")
  }
  return context
}
