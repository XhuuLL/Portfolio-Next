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
    tech: ["Python", "Gemini API", "Streamlit", "Tensorflow","YOLOv8", "Mysql"],
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
  hidden: { opacity: 0, y: 30 },
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm"
      onClick={() => {
        playClick()
        onClose()
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative w-full max-w-4xl overflow-hidden rounded-xl border-2 bg-black/90 p-2 shadow-2xl"
        style={{ borderColor: color, boxShadow: `0 0 30px ${color}40` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute right-4 top-4 z-10">
          <button
            onClick={() => {
              playClick()
              onClose()
            }}
            onMouseEnter={playHover}
            className="rounded-full bg-black/50 p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-white/5">
          {/* Shimmer loading effect */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent">
              <ImageIcon className="h-12 w-12 text-white/20 animate-pulse" />
            </div>
          )}
          
          <img
            src={image}
            alt={`Preview of ${title}`}
            className={`h-full w-full object-cover transition-opacity duration-500 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setIsLoaded(true)}
            onError={(e) => {
              // Fallback if image not found
              (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${title}/800/450`
            }}
          />
        </div>
        <div className="mt-4 px-2 pb-2">
          <h3 className="font-mono text-xl font-bold" style={{ color }}>{title}</h3>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const { playHover, playClick } = useSound()
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  return (
    <div className="flex flex-1 flex-col p-6 sm:p-12 relative min-h-screen">
      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-black md:text-5xl text-glow-pink text-[var(--color-neon-pink)]">
            PROJECTS
          </h1>
          <p className="mt-4 text-foreground/70 max-w-2xl">
            Kumpulan project random, kadang serius kadang iseng. Ada yang selesai, ada juga yang... ya begitulah.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2"
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              whileHover={{ scale: 1.02, y: -5 }}
              onMouseEnter={playHover}
              className="group relative flex flex-col justify-between overflow-hidden rounded border border-white/10 bg-black/50 p-6 backdrop-blur-md transition-all hover:border-[var(--color-neon-cyan)] shadow-lg"
              style={{
                '--hover-glow': project.color
              } as React.CSSProperties}
            >
              {/* Background glow on hover */}
              <div 
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ boxShadow: `inset 0 0 20px var(--hover-glow)` }}
              />

              {/* Small Image Preview on Hover Background */}
              <div 
                className="absolute right-[-10%] top-[-10%] z-0 h-48 w-48 rounded-full blur-[80px] opacity-0 transition-opacity duration-500 group-hover:opacity-30 pointer-events-none"
                style={{ backgroundColor: project.color }}
              />

              <div className="relative z-10">
                <h3 className="mb-2 text-2xl font-bold font-mono tracking-tight text-white transition-colors group-hover:text-[var(--hover-glow)]">
                  {project.title}
                </h3>
                <p className="mb-6 text-foreground/70">
                  {project.description}
                </p>
              </div>

              <div className="relative z-10">
                <div className="mb-6 flex flex-wrap gap-2">
                  {project.tech.map(t => (
                    <span 
                      key={t} 
                      className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium text-[var(--color-neon-cyan)] group-hover:border-[var(--hover-glow)] transition-colors"
                      style={{ color: "var(--hover-glow)" }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {project.repo && (
                    <a 
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={playClick}
                      className="flex items-center gap-2 text-sm font-bold text-foreground/80 hover:text-[var(--hover-glow)] transition-all hover:drop-shadow-[0_0_8px_var(--hover-glow)]"
                    >
                      <Code2 className="h-4 w-4" /> REPO
                    </a>
                  )}
                  <button 
                    onClick={() => {
                      playClick()
                      setSelectedProject(project)
                    }}
                    className="flex items-center gap-2 rounded bg-white/5 px-3 py-1.5 text-sm font-bold text-white transition-all hover:bg-[var(--hover-glow)] hover:text-black hover:shadow-[0_0_15px_var(--hover-glow)] group-hover:border border-transparent group-hover:border-[var(--hover-glow)]"
                  >
                    <Eye className="h-4 w-4" /> PREVIEW
                  </button>
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
