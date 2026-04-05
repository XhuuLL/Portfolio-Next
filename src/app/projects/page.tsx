"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSound } from "@/components/SoundProvider"
import { Code2, Eye, X, Image as ImageIcon } from "lucide-react"

const projects = [
  {
    title: "AI Study Assistant",
    description: "AI Study Assistant adalah platform pembelajaran berbasis kecerdasan buatan yang dirancang untuk membantu siswa belajar dengan lebih efektif.",
    tech: ["Next.js", "TailwindCSS", "MongoDB", "OpenAI API"],
    color: "var(--color-neon-cyan)",
    image: "/projects/ai-study.png",
    repo: "https://github.com/XhuuLL/AI-Student.git"
  },
  {
    title: "Absensi QR Code",
    description: "Absensi QR Code adalah platform absensi berbasis QR code yang dirancang untuk membantu siswa absensi dengan lebih efektif.",
    tech: ["Next.js", "Supabase", "TailwindCSS"],
    color: "var(--color-neon-pink)",
    image: "/projects/absensi.png",
    repo: "https://github.com/XhuuLL/Absensi-Qr.git"
  },
  {
    title: "SIGAP",
    description: "SIGAP adalah platform pengaduan masyarakat yang dirancang untuk membantu masyarakat melaporkan masalah yang mereka hadapi.",
    tech: ["React", "Supabase", "TailwindCSS", "Framer Motion"],
    color: "var(--color-neon-purple)",
    image: "/projects/sigap.png",
    repo: "https://github.com/XhuuLL/Sistem-Pengaduan-Masyarakat.git"
  },
  {
    title: "Deteksi Penyakit Tomat",
    description: "Deteksi Penyakit Tomat adalah platform berbasis kecerdasan buatan yang dirancang untuk membantu petani mendeteksi penyakit pada tanaman tomat.",
    tech: ["Python", "Gemini API", "Streamlit", "Tensorflow", "YOLOv8", "Mysql"],
    color: "var(--color-neon-cyan)",
    image: "/projects/tomatos.png",
    repo: "https://github.com/XhuuLL/Deteksi-Penyakit-Tomat.git"
  }
]

// Variants for staggered animation
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
}

function ProjectPreviewModal({ 
  image, 
  title, 
  onClose, 
  color 
}: { 
  image: string; 
  title: string; 
  onClose: () => void;
  color: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const { playClick, playHover } = useSound()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur-xl"
      onClick={() => {
        playClick()
        onClose()
      }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#0f0f11] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle top glow line based on project color */}
        <div 
          className="absolute top-0 left-0 right-0 h-1 z-20 opacity-70" 
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} 
        />

        <div className="absolute right-4 top-4 z-20">
          <button
            onClick={() => {
              playClick()
              onClose()
            }}
            onMouseEnter={playHover}
            className="rounded-full bg-black/50 p-2 text-white/60 backdrop-blur-md transition-all hover:bg-white/10 hover:text-white hover:scale-110 active:scale-90"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative aspect-video w-full overflow-hidden bg-white/[0.02]">
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent">
              <ImageIcon className="h-8 w-8 text-white/20 animate-pulse" />
            </div>
          )}
          
          <img
            src={image}
            alt={`Preview of ${title}`}
            className={`h-full w-full object-cover transition-opacity duration-700 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setIsLoaded(true)}
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${title}/1280/720`
            }}
          />
          
          {/* Bottom gradient to blend image with text area smoothly */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f0f11] to-transparent" />
        </div>
        
        <div className="relative -mt-6 px-8 pb-8 z-10">
          <h3 className="text-2xl font-bold tracking-tight text-white drop-shadow-md" style={{ color }}>{title}</h3>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const { playHover, playClick } = useSound()
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  return (
    <div className="flex flex-1 flex-col p-6 sm:p-12 relative min-h-screen selection:bg-[var(--color-neon-cyan)] selection:text-black">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 md:mb-20 text-center md:text-left"
        >
          {/* Header dikembalikan ke style glow-pink bawaan Anda */}
          <h1 className="mb-4 text-4xl font-black md:text-5xl text-glow-pink text-[var(--color-neon-pink)] drop-shadow-[0_0_15px_var(--color-neon-pink)]">
            PROJECTS
          </h1>
          <p className="mt-4 text-white/60 max-w-2xl text-lg leading-relaxed mx-auto md:mx-0">
            Kumpulan project random, kadang serius kadang iseng. Ada yang selesai, ada juga yang... ya begitulah.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-6 sm:grid-cols-2 lg:gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              onMouseEnter={playHover}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-xl transition-all duration-500 hover:border-[var(--hover-glow)] hover:bg-white/[0.04] hover:shadow-[0_0_40px_-15px_var(--hover-glow)]"
              style={{
                '--hover-glow': project.color
              } as React.CSSProperties}
            >
              {/* Soft Background glow on hover */}
              <div 
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `radial-gradient(circle at top right, ${project.color}15, transparent 50%)` }}
              />

              <div className="relative z-10">
                <h3 className="mb-3 text-2xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-[var(--hover-glow)]">
                  {project.title}
                </h3>
                <p className="mb-8 text-white/60 leading-relaxed text-sm">
                  {project.description}
                </p>
              </div>

              <div className="relative z-10 mt-auto">
                <div className="mb-8 flex flex-wrap gap-2">
                  {project.tech.map(t => (
                    <span 
                      key={t} 
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 transition-colors duration-300 group-hover:border-[var(--hover-glow)]/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-5 pt-4 border-t border-white/5">
                  <button 
                    onClick={() => {
                      playClick()
                      setSelectedProject(project)
                    }}
                    className="flex items-center gap-2 rounded-xl bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[var(--hover-glow)] hover:text-black hover:scale-105 active:scale-95"
                  >
                    <Eye className="h-4 w-4" /> Preview
                  </button>
                  
                  {project.repo && (
                    <a 
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={playClick}
                      className="flex items-center gap-2 text-sm font-semibold text-white/50 hover:text-[var(--hover-glow)] transition-colors duration-300"
                    >
                      <Code2 className="h-4 w-4" /> Source
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectPreviewModal
            image={selectedProject.image}
            title={selectedProject.title}
            color={selectedProject.color}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}