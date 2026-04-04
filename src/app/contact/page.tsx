"use client"

import { motion } from "framer-motion"
import { useSound } from "@/components/SoundProvider"
import { Send, Code2, Hash, Briefcase, Mail, Camera, Music } from "lucide-react"

export default function Contact() {
  const { playHover, playClick } = useSound()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    playClick()
    alert("Pesan berhasil dikirim via Cyber Space!")
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-black md:text-5xl text-glow-pink text-[var(--color-neon-pink)]">
            TRANSMISSION
          </h1>
          <p className="mt-2 text-foreground/70">
            Kirim sinyal untuk kolaborasi atau sekadar menyapa.
          </p>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h2 className="mb-6 text-2xl font-bold text-white">Hubungkan Sinyal</h2>
            <p className="mb-8 text-foreground/70 leading-relaxed">
              Saya selalu terbuka untuk ngobrol, kolaborasi, atau sekadar kirim meme coding 😄
            </p>

            <div className="flex flex-col gap-4">
              {/* Email */}
              <a
                href="mailto:fatkhuldisini@gmail.com"
                onMouseEnter={playHover}
                onClick={playClick}
                className="group flex items-center gap-4 text-foreground/80 hover:text-[var(--color-neon-cyan)] transition"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors group-hover:border-[var(--color-neon-cyan)] group-hover:bg-[var(--color-neon-cyan)]/10 group-hover:shadow-[0_0_15px_var(--color-neon-cyan)]">
                  <Mail className="h-5 w-5" />
                </div>
                <span className="font-mono">fatkhuldisini@gmail.com</span>
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/XhuuLL"
                target="_blank"
                onMouseEnter={playHover}
                onClick={playClick}
                className="group flex items-center gap-4 text-foreground/80 hover:text-[var(--color-neon-pink)] transition"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors group-hover:border-[var(--color-neon-pink)] group-hover:bg-[var(--color-neon-pink)]/10 group-hover:shadow-[0_0_15px_var(--color-neon-pink)]">
                  <Code2 className="h-5 w-5" />
                </div>
                <span className="font-mono">XhuuLL</span>
              </a>

              {/* Social Icons */}
              <div className="flex gap-4 mt-4">

                {/* LinkedIn */}
                <a
                  href="www.linkedin.com/in/akhmad-fatkhul-arifin-632a383a6"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 hover:text-[#0a66c2] hover:border-[#0a66c2] hover:shadow-[0_0_15px_#0a66c2] transition"
                >
                  <Briefcase className="h-5 w-5" />
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/bwabwa.ba?igsh=MTlxamRuNWM3MXF0Mw=="
                  target="_blank"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 hover:text-pink-500 hover:border-pink-500 hover:shadow-[0_0_15px_#ec4899] transition"
                >
                  <Camera className="h-5 w-5" />
                </a>

                {/* TikTok */}
                <a
                  href="https://www.tiktok.com/@arifinnzz?is_from_webapp=1&sender_device=pc"
                  target="_blank"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-white hover:shadow-[0_0_15px_white] transition"
                >
                  <Music className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl border border-white/10 bg-black/40 p-8 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-neon-cyan)] via-[var(--color-neon-pink)] to-[var(--color-neon-purple)] opacity-50" />

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <input
                type="text"
                required
                placeholder="Nama"
                className="rounded border-b-2 border-white/20 bg-white/5 px-4 py-3 text-white focus:border-[var(--color-neon-cyan)] focus:outline-none"
              />

              <input
                type="email"
                required
                placeholder="Email"
                className="rounded border-b-2 border-white/20 bg-white/5 px-4 py-3 text-white focus:border-[var(--color-neon-pink)] focus:outline-none"
              />

              <textarea
                required
                rows={4}
                placeholder="Isi pesan..."
                className="rounded border-b-2 border-white/20 bg-white/5 px-4 py-3 text-white focus:border-[var(--color-neon-purple)] focus:outline-none"
              />

              <button
                type="submit"
                onMouseEnter={playHover}
                className="flex items-center justify-center gap-2 rounded bg-white px-8 py-4 font-bold text-black hover:bg-[var(--color-neon-cyan)] hover:shadow-[0_0_20px_var(--color-neon-cyan)] transition"
              >
                KIRIM DATA <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}