"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSound } from "@/components/SoundProvider"
import { Award, X, ZoomIn } from "lucide-react"

const certificateData = {
  title: "Sertifikat Kemalasan",
  issuer: "IMPHNEN",
  year: "2025",
  description: "Sertifikat ini diberikan kepada individu yang telah mencapai tingkat kemalasan tertinggi. Bukti nyata dedikasi dalam seni rebahan dan menunda pekerjaan.",
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
    <div className="flex flex-1 flex-col items-center justify-center p-4 sm:p-8 md:p-12 min-h-screen selection:bg-[var(--color-neon-cyan)] selection:text-black">
      <div className="w-full max-w-4xl text-center">
        
        {/* --- HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-glow-cyan text-[var(--color-neon-cyan)] drop-shadow-[0_0_15px_var(--color-neon-cyan)] mb-4">
            CERTIFICATE
          </h1>
          <p className="mt-2 text-white/60 text-lg max-w-xl mx-auto">
            Penghargaan bergengsi yang (mungkin) patut dibanggakan.
          </p>
        </motion.div>

        {/* --- CERTIFICATE CARD --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative group mx-auto w-full max-w-2xl cursor-default"
        >
          {/* Outer Ambient Glow on Hover */}
          <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[var(--color-neon-cyan)] to-[var(--color-neon-pink)] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20" />
          
          <div className="relative flex flex-col rounded-3xl border border-white/10 bg-[#0a0a0c]/80 backdrop-blur-2xl p-8 md:p-12 transition-all duration-500 group-hover:bg-white/[0.04] group-hover:border-[var(--color-neon-cyan)]/30 overflow-hidden text-left">
            
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-neon-cyan)] to-transparent opacity-50" />

            {/* Header Badge */}
            <div className="mb-10 flex justify-between items-start">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-neon-cyan)]/10 border border-[var(--color-neon-cyan)]/20 text-[var(--color-neon-cyan)] shadow-[0_0_20px_rgba(34,211,238,0.15)] group-hover:scale-110 transition-transform duration-500">
                <Award className="h-8 w-8" />
              </div>
              <span className="rounded-full border border-white/10 bg-white/5 px-5 py-1.5 text-sm font-mono font-bold text-white/80 shadow-sm backdrop-blur-md">
                CLASS OF <span className="text-[var(--color-neon-cyan)]">{certificateData.year}</span>
              </span>
            </div>
            
            {/* Title & Issuer */}
            <h2 className="mb-3 text-3xl md:text-4xl font-black text-white group-hover:text-[var(--color-neon-cyan)] transition-colors duration-300 drop-shadow-sm tracking-tight">
              {certificateData.title}
            </h2>
            <h3 className="mb-8 text-lg font-bold uppercase tracking-widest text-[var(--color-neon-pink)]">
              ISSUED BY: {certificateData.issuer}
            </h3>
            
            {/* Description */}
            <div className="mb-10 border-l-2 border-white/10 pl-5">
              <p className="text-white/60 leading-relaxed text-sm md:text-base">
                {certificateData.description}
              </p>
            </div>

            {/* Modern CTA Button */}
            <button
              onClick={openPreview}
              onMouseEnter={playHover}
              className="group/btn relative flex w-full items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 font-bold text-black transition-all hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
            >
              {/* Button Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-neon-cyan)] to-[var(--color-neon-pink)] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-20" />
              
              <span className="relative z-10 flex items-center gap-2 transition-colors">
                <ZoomIn className="h-5 w-5" /> 
                VIEW FULL CERTIFICATE
              </span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* --- MODAL PREVIEW --- */}
      <AnimatePresence>
        {isPreviewOpen && (
           <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xl p-4 sm:p-8 md:p-12"
             onClick={closePreview}
           >
             <motion.div
               initial={{ scale: 0.95, opacity: 0, y: 10 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.95, opacity: 0, y: 10 }}
               transition={{ type: "spring", damping: 25, stiffness: 300 }}
               className="relative flex items-center justify-center max-h-[90vh] w-full max-w-5xl rounded-2xl bg-[#0a0a0c] shadow-2xl border border-white/10 overflow-hidden"
               onClick={(e) => e.stopPropagation()}
             >
               {/* Close Button */}
               <button
                 onClick={closePreview}
                 onMouseEnter={playHover}
                 className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white/70 backdrop-blur-md transition-all hover:bg-white/10 hover:text-white hover:scale-110 active:scale-90"
               >
                 <X className="h-5 w-5" />
               </button>
               
               <div className="flex w-full items-center justify-center overflow-hidden bg-white/[0.02]">
                  <img 
                     src={certificateData.image} 
                     alt={certificateData.title}
                     className="max-h-[85vh] w-full object-contain"
                     onError={(e) => { 
                       (e.target as HTMLImageElement).src = `https://picsum.photos/seed/sertif/1280/720` 
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