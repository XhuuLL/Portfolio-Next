"use client"

import { motion, Variants } from "framer-motion"
import { useSound } from "@/components/SoundProvider"
import { Send, Code2, Briefcase, Mail, Camera, Music } from "lucide-react"

export default function Contact() {
  const { playHover, playClick } = useSound()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    playClick()
    alert("Pesan berhasil dikirim via Cyber Space!")
  }


  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4 sm:p-8 md:p-12 min-h-screen selection:bg-[var(--color-neon-pink)] selection:text-white">
      <div className="w-full max-w-6xl">
        
        {/* --- HEADER --- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-black text-glow-pink text-[var(--color-neon-pink)] drop-shadow-[0_0_15px_var(--color-neon-pink)] mb-4">
            TRANSMISSION
          </h1>
          <p className="mt-2 text-white/60 text-lg max-w-xl mx-auto">
            Kirim sinyal untuk kolaborasi atau sekadar menyapa di ruang siber.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 items-center">
          
          {/* --- INFO CONTACT --- */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-center order-2 lg:order-1"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="mb-4 text-3xl font-bold text-white">Hubungkan Sinyal</h2>
              <p className="mb-10 text-white/60 leading-relaxed text-lg">
                Saya selalu terbuka untuk ngobrol, kolaborasi project, atau sekadar kirim meme coding
              </p>
            </motion.div>

            <div className="flex flex-col gap-5">
              {/* Email Card */}
              <motion.a
                variants={fadeInUp}
                href="mailto:fatkhuldisini@gmail.com"
                onMouseEnter={playHover}
                onClick={playClick}
                className="group flex items-center gap-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 hover:border-[var(--color-neon-cyan)] hover:bg-white/[0.05] hover:shadow-[0_0_30px_-10px_var(--color-neon-cyan)]"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--color-neon-cyan)]/10 text-[var(--color-neon-cyan)] transition-transform duration-300 group-hover:scale-110">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-white/40 mb-1">Email</p>
                  <p className="font-mono text-white transition-colors group-hover:text-[var(--color-neon-cyan)] text-sm sm:text-base">
                    fatkhulhehe@gmail.com
                  </p>
                </div>
              </motion.a>

              {/* GitHub Card */}
              <motion.a
                variants={fadeInUp}
                href="https://github.com/XhuuLL"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                onClick={playClick}
                className="group flex items-center gap-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-all duration-300 hover:border-[var(--color-neon-pink)] hover:bg-white/[0.05] hover:shadow-[0_0_30px_-10px_var(--color-neon-pink)]"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--color-neon-pink)]/10 text-[var(--color-neon-pink)] transition-transform duration-300 group-hover:scale-110">
                  <Code2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-white/40 mb-1">GitHub</p>
                  <p className="font-mono text-white transition-colors group-hover:text-[var(--color-neon-pink)] text-sm sm:text-base">
                    XhuuLL
                  </p>
                </div>
              </motion.a>

              {/* Social Icons Section */}
              <motion.div variants={fadeInUp} className="mt-8 pt-8 border-t border-white/10">
                <p className="mb-4 text-sm font-semibold text-white/50">Atau temukan saya di:</p>
                <div className="flex gap-4">
                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/akhmad-fatkhul-arifin-632a383a6"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={playHover}
                    onClick={playClick}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/60 transition-all hover:-translate-y-1 hover:border-[#0a66c2] hover:bg-[#0a66c2]/10 hover:text-[#0a66c2] hover:shadow-[0_0_20px_-5px_#0a66c2]"
                  >
                    <Briefcase className="h-5 w-5" />
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/bwabwa.ba?igsh=MTlxamRuNWM3MXF0Mw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={playHover}
                    onClick={playClick}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/60 transition-all hover:-translate-y-1 hover:border-pink-500 hover:bg-pink-500/10 hover:text-pink-500 hover:shadow-[0_0_20px_-5px_#ec4899]"
                  >
                    <Camera className="h-5 w-5" />
                  </a>

                  {/* TikTok */}
                  <a
                    href="https://www.tiktok.com/@arifinnzz?is_from_webapp=1&sender_device=pc"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={playHover}
                    onClick={playClick}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/60 transition-all hover:-translate-y-1 hover:border-white hover:bg-white/10 hover:text-white hover:shadow-[0_0_20px_-5px_white]"
                  >
                    <Music className="h-5 w-5" />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* --- FORM SECTION --- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="order-1 lg:order-2 relative"
          >
            {/* Soft Glow Background behind form */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-[var(--color-neon-purple)]/20 to-[var(--color-neon-cyan)]/20 blur-[80px] rounded-full" />

            <div className="rounded-3xl border border-white/10 bg-[#0a0a0c]/80 p-8 md:p-12 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
              
              {/* Top Gradient Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-neon-cyan)] via-[var(--color-neon-pink)] to-[var(--color-neon-purple)]" />

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-white/50 uppercase tracking-wider pl-1">Nama</label>
                  <input
                    type="text"
                    required
                    placeholder="Masukkan Nama"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder-white/20 outline-none transition-all focus:border-[var(--color-neon-cyan)] focus:bg-white/10 focus:shadow-[0_0_15px_rgba(0,255,255,0.15)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-white/50 uppercase tracking-wider pl-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="Masukkan Email"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder-white/20 outline-none transition-all focus:border-[var(--color-neon-pink)] focus:bg-white/10 focus:shadow-[0_0_15px_rgba(255,0,255,0.15)]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-white/50 uppercase tracking-wider pl-1">Pesan</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Ketik pesan you di sini..."
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder-white/20 outline-none transition-all resize-none custom-scrollbar focus:border-[var(--color-neon-purple)] focus:bg-white/10 focus:shadow-[0_0_15px_rgba(188,19,254,0.15)]"
                  />
                </div>

                <button
                  type="submit"
                  onMouseEnter={playHover}
                  className="mt-4 group relative flex w-full items-center justify-center gap-3 rounded-xl bg-white px-8 py-4 font-bold text-black transition-all hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
                >
                  {/* Button Hover Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-neon-cyan)] to-[var(--color-neon-pink)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  
                  <span className="relative z-10 flex items-center gap-2 transition-colors group-hover:text-white">
                    KIRIM <Send className="h-5 w-5" />
                  </span>
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}