"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSound } from "@/components/SoundProvider"
import { Award, X, ZoomIn } from "lucide-react"

const certificateData = {
  title: "Sertifikat Kemalasan",
  issuer: "IMPHNEN",
  year: "2025",
  description: "Sertifikat ini diberikan kepada individu yang telah mencapai tingkat kemalasan tertinggi.",
  image: "/sertifikat/certificate.png"
}

export default function Journey() {
  const { playHover, playClick } = useSound()
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const openPreview = () => {
    playClick()
    setIsPreviewOpen(true)
  }

  const closePreview = () => {
    playClick()
    setIsPreviewOpen(false)
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-6 sm:p-12 min-h-screen">
      <div className="w-full max-w-3xl text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           className="mb-16"
        >
          <h1 className="text-4xl font-black md:text-5xl text-glow-cyan text-[var(--color-neon-cyan)]">
            CERTIFICATE
          </h1>
          
        </motion.div>

        {/* Certificate Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative group mx-auto w-full max-w-xl cursor-default"
        >
          <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-[var(--color-neon-cyan)] to-[var(--color-neon-pink)] opacity-20 blur group-hover:opacity-100 transition duration-500"></div>
          
          <div className="relative flex flex-col rounded-2xl border border-white/10 bg-black/80 backdrop-blur-xl p-8 transition-all text-left group-hover:border-[var(--color-neon-cyan)]/50 group-hover:scale-[1.02]">
            <div className="mb-6 flex justify-between items-start">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--color-neon-cyan)]/20 border border-[var(--color-neon-cyan)]/30 text-[var(--color-neon-cyan)] shadow-[0_0_15px_rgba(0,243,255,0.2)]">
                <Award className="h-7 w-7" />
              </div>
              <span className="rounded-full border border-[var(--color-neon-cyan)]/50 bg-[var(--color-neon-cyan)]/10 px-4 py-1 text-sm font-mono font-bold text-[var(--color-neon-cyan)] shadow-[0_0_10px_rgba(0,243,255,0.2)]">
                {certificateData.year}
              </span>
            </div>
            
            <h2 className="mb-2 text-3xl font-black text-white group-hover:text-[var(--color-neon-cyan)] transition-colors drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
              {certificateData.title}
            </h2>
            <h3 className="mb-5 text-xl font-bold text-[var(--color-neon-pink)] drop-shadow-[0_0_8px_rgba(255,0,255,0.5)]">
              {certificateData.issuer}
            </h3>
            
            <p className="mb-8 text-foreground/80 leading-relaxed">
              {certificateData.description}
            </p>

            <button
              onClick={openPreview}
              onMouseEnter={playHover}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--color-neon-cyan)] bg-[var(--color-neon-cyan)]/10 py-3.5 font-bold text-[var(--color-neon-cyan)] transition-all hover:bg-[var(--color-neon-cyan)] hover:text-black hover:shadow-[0_0_20px_var(--color-neon-cyan)]"
            >
              <ZoomIn className="h-5 w-5" />
              VIEW FULL CERTIFICATE
            </button>
          </div>
        </motion.div>
      </div>

      {/* Modal Preview */}
      <AnimatePresence>
        {isPreviewOpen && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-12"
             onClick={closePreview}
           >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative flex items-center justify-center max-h-[90vh] w-full max-w-5xl rounded-xl border border-[var(--color-neon-cyan)]/50 bg-black/90 p-2 shadow-[0_0_50px_rgba(0,243,255,0.2)] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closePreview}
                  onMouseEnter={playHover}
                  className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white border border-white/20 hover:bg-[var(--color-neon-pink)] hover:text-black hover:border-transparent backdrop-blur-md transition-all shadow-lg hover:shadow-[0_0_15px_var(--color-neon-pink)]"
                >
                  <X className="h-5 w-5" />
                </button>
                
                <div className="flex w-full items-center justify-center overflow-hidden rounded-lg">
                   <img 
                      src={certificateData.image} 
                      alt={certificateData.title}
                      className="max-h-[85vh] w-full object-contain rounded-lg"
                      onError={(e) => { 
                        (e.target as HTMLImageElement).src = `https://picsum.photos/seed/sertif/1000/700` 
                      }} 
                   />
                </div>
              </motion.div>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
