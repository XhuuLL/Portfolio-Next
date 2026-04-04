"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSound } from "@/components/SoundProvider"
import { Play, Pause, SkipForward, SkipBack, Disc3, ChevronDown, ChevronRight } from "lucide-react"
import { Howl, Howler } from "howler"

// --- MUSIC PLAYER DATA ---
const playlist = [
  { id: 1, title: "A little piece of heaven", artist: "Avenged Sevenfold", cover: "/music/cover1.jpg", url: "/music/lagu1.mp3" },
  { id: 2, title: "Cincin", artist: "Hindia", cover: "/music/cover4.jpg", url: "/music/lagu4.mp3" },
  { id: 3, title: "So Far Away", artist: "Avenged Sevenfold", cover: "/music/cover2.png", url: "/music/lagu2.mp3" },
  { id: 4, title: "Evaluasi", artist: "Hindia", cover: "/music/cover5.jpg", url: "/music/lagu5.mp3" },
  { id: 5, title: "Dear God", artist: "Avenged Sevenfold", cover: "/music/cover3.jpg", url: "/music/lagu3.mp3" },
  { id: 6, title: "Rumah Ke Rumah", artist: "Hindia", cover: "/music/cover6.jpg", url: "/music/lagu6.mp3" },
  { id: 7, title: "Secukupnya", artist: "Hindia", cover: "/music/cover7.jpg", url: "/music/lagu7.mp3" },
  { id: 8, title: "Everithing You Are", artist: "Hindia", cover: "/music/cover8.jpg", url: "/music/lagu8.mp3" },
  { id: 9, title: "Untuk Apa", artist: "Hindia", cover: "/music/cover9.jpg", url: "/music/lagu9.mp3" },
  { id: 10, title: "Tarot", artist: ".Feast", cover: "/music/cover10.jpg", url: "/music/lagu10.mp3" },
  { id: 11, title: "Nina", artist: ".Feast", cover: "/music/cover11.jpg", url: "/music/lagu11.mp3" },
  { id: 12, title: "Nightmare", artist: "Avenged Sevenfold", cover: "/music/cover12.jpg", url: "/music/lagu12.mp3" },
  { id: 13, title: "Gungslinger", artist: "Avenged Sevenfold", cover: "/music/cover13.jpg", url: "/music/lagu13.mp3" },
  { id: 14, title: "Seize The Day", artist: "Avenged Sevenfold", cover: "/music/cover14.jpg", url: "/music/lagu14.mp3" },
  { id: 15, title: "o,Tuan", artist: ".Feast", cover: "/music/cover15.jpg", url: "/music/lagu15.mp3" },
  { id: 16, title: "Peradaban", artist: ".Feast", cover: "/music/cover16.jpg", url: "/music/lagu16.mp3" },
  { id: 17, title: "Kami Belum Tentu", artist: ".Feast", cover: "/music/cover17.jpg", url: "/music/lagu17.mp3" },
  { id: 18, title: "Berita Kehilangan", artist: ".Feast", cover: "/music/cover18.jpg", url: "/music/lagu18.mp3" },
  { id: 19, title: "Evakuasi", artist: "Hindia", cover: "/music/cover19.jpg", url: "/music/lagu19.mp3" },
  { id: 20, title: "", artist: "", cover: "/music/cover20.jpg", url: "/music/lagu20.mp3" },
  { id: 21, title: "", artist: "", cover: "/music/cover21.jpg", url: "/music/lagu21.mp3" },
  { id: 22, title: "", artist: "", cover: "/music/cover22.jpg", url: "/music/lagu22.mp3" },
  { id: 23, title: "", artist: "", cover: "/music/cover23.jpg", url: "/music/lagu23.mp3" },
  { id: 24, title: "", artist: "", cover: "/music/cover24.jpg", url: "/music/lagu24.mp3" },
  { id: 25, title: "", artist: "", cover: "/music/cover25.jpg", url: "/music/lagu25.mp3" },
  { id: 26, title: "", artist: "", cover: "/music/cover26.jpg", url: "/music/lagu26.mp3" },
  { id: 27, title: "", artist: "", cover: "/music/cover27.jpg", url: "/music/lagu27.mp3" },
  { id: 28, title: "", artist: "", cover: "/music/cover28.jpg", url: "/music/lagu28.mp3" },
  { id: 29, title: "", artist: "", cover: "/music/cover29.jpg", url: "/music/lagu29.mp3" },
  { id: 30, title: "", artist: "", cover: "/music/cover30.jpg", url: "/music/lagu30.mp3" },
]

export default function FunZone() {
  const { playHover, playClick } = useSound()

  // ============================
  // --- 1. MUSIC PLAYER STATE ---
  // ============================
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const soundRef = useRef<Howl | null>(null)
  const [expandedArtist, setExpandedArtist] = useState<string | null>(playlist[0].artist);

  // Group playlist by artist
  const groupedPlaylist = useMemo(() => {
    return playlist.reduce((acc, track, index) => {
      if (!acc[track.artist]) {
        acc[track.artist] = [];
      }
      acc[track.artist].push({ ...track, originalIndex: index });
      return acc;
    }, {} as Record<string, (typeof playlist[0] & { originalIndex: number })[]>);
  }, []);

  // Initialize Howler
  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.unload()
    }

    soundRef.current = new Howl({
      src: [playlist[currentTrackIndex].url],
      html5: true, // Force HTML5 Audio to allow streaming large files
      onplay: () => {
        setIsPlaying(true)
        requestAnimationFrame(updateProgress)
      },
      onend: () => {
        handleNext()
      },
      onpause: () => setIsPlaying(false),
      onstop: () => setIsPlaying(false),
      onloaderror: () => {
        console.warn(`Gagal memuat ${playlist[currentTrackIndex].url}. Silakan tambahkan file mp3 ke folder public/music.`)
      }
    })

    return () => {
      if (soundRef.current) soundRef.current.unload()
    }
  }, [currentTrackIndex])

  const updateProgress = () => {
    if (soundRef.current && soundRef.current.playing()) {
      const seek = soundRef.current.seek() as number
      const duration = soundRef.current.duration()
      setProgress((seek / duration) * 100 || 0)
      requestAnimationFrame(updateProgress)
    }
  }

  const togglePlay = () => {
    playClick()
    if (!soundRef.current) return
    if (isPlaying) {
      soundRef.current.pause()
    } else {
      soundRef.current.play()
    }
  }

  const handleNext = () => {
    playClick()
    setProgress(0)

    const currentArtist = playlist[currentTrackIndex].artist
    const artistTracks = groupedPlaylist[currentArtist]
    
    const currentIndexInGroup = artistTracks.findIndex(t => t.originalIndex === currentTrackIndex)
    const nextIndexInGroup = (currentIndexInGroup + 1) % artistTracks.length
    
    setCurrentTrackIndex(artistTracks[nextIndexInGroup].originalIndex)

    setTimeout(() => {
      if (soundRef.current) soundRef.current.play()
    }, 100)
  }

  const handlePrev = () => {
    playClick()
    setProgress(0)

    const currentArtist = playlist[currentTrackIndex].artist
    const artistTracks = groupedPlaylist[currentArtist]
    
    const currentIndexInGroup = artistTracks.findIndex(t => t.originalIndex === currentTrackIndex)
    const prevIndexInGroup = (currentIndexInGroup - 1 + artistTracks.length) % artistTracks.length
    
    setCurrentTrackIndex(artistTracks[prevIndexInGroup].originalIndex)

    setTimeout(() => {
      if (soundRef.current) soundRef.current.play()
    }, 100)
  }

  const playSpecificTrack = (index: number) => {
    if (index === currentTrackIndex) return
    playClick()
    setProgress(0)
    setCurrentTrackIndex(index)
    setTimeout(() => {
      if (soundRef.current) soundRef.current.play()
    }, 100)
  }

  return (
    <div className="flex flex-1 flex-col items-center p-6 sm:p-12 min-h-screen">
      <div className="mb-8 w-full max-w-6xl">
        <h1 className="text-3xl font-black md:text-5xl text-glow-purple text-[var(--color-neon-purple)]">
          Playlist
        </h1>
        <p className="mt-2 text-foreground/70">Welcome to my playground!</p>
      </div>

      <div className="w-full max-w-5xl flex justify-center mt-4">
        
        {/* ============================ */}
        {/* 1. MUSIC PLAYER              */}
        {/* ============================ */}
        <motion.div 
          className="w-full flex flex-col rounded-2xl border border-[var(--color-neon-pink)] bg-black/60 p-8 backdrop-blur shadow-[0_0_20px_rgba(255,0,255,0.15)] transition-all hover:shadow-[0_0_30px_rgba(255,0,255,0.25)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-8 flex items-center justify-between text-[var(--color-neon-pink)] border-b border-white/10 pb-4">
            <h2 className="font-mono text-2xl font-black flex items-center gap-3 drop-shadow-[0_0_10px_var(--color-neon-pink)]">
              <Disc3 className={`h-6 w-6 ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`} />
              Music Player
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10 items-stretch min-h-[400px]">
            
            {/* --- KIRI: PEMUTAR MUSIK --- */}
            <div className="flex flex-col items-center justify-center p-6 bg-white/5 rounded-xl border border-white/10 relative h-full">
            {/* Cover Art */}
            <motion.div 
              className="flex h-32 w-32 items-center justify-center rounded-lg bg-gradient-to-br from-[#ff00ff20] to-[#00f3ff20] text-6xl shadow-inner mb-4 border border-white/10 overflow-hidden relative"
              animate={isPlaying ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <img 
                src={playlist[currentTrackIndex].cover} 
                alt="Cover" 
                className="h-full w-full object-cover" 
                onError={(e) => { 
                  (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${playlist[currentTrackIndex].id}/200` 
                }} 
              />
            </motion.div>
            
            <h3 className="font-bold text-white text-lg text-center" style={{ textShadow: "0 0 10px var(--color-neon-pink)" }}>
              {playlist[currentTrackIndex].title}
            </h3>
            <p className="text-sm text-white/50 mb-4">{playlist[currentTrackIndex].artist}</p>
            
            {/* Progress */}
            <div className="w-full h-1.5 bg-white/10 rounded-full mb-6 overflow-hidden">
              <div 
                className="h-full bg-[var(--color-neon-pink)] transition-all duration-200 shadow-[0_0_8px_var(--color-neon-pink)]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-6 mb-6">
              <button onClick={handlePrev} className="text-white hover:text-[var(--color-neon-pink)] hover:scale-110 transition">
                <SkipBack className="h-6 w-6" />
              </button>
              <button 
                onClick={togglePlay}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-neon-pink)] text-black hover:scale-105 shadow-[0_0_15px_var(--color-neon-pink)] transition"
              >
                {isPlaying ? <Pause className="h-7 w-7" /> : <Play className="h-7 w-7 ml-1" />}
              </button>
              <button onClick={handleNext} className="text-white hover:text-[var(--color-neon-pink)] hover:scale-110 transition">
                <SkipForward className="h-6 w-6" />
              </button>
            </div>
          </div>

            {/* --- KANAN: DAFTAR PLAYLIST --- */}
            <div className="flex flex-col w-full h-full max-h-[420px]">
              <h3 className="text-white/70 font-mono text-sm mb-4 flex items-center gap-2">
                🎵 Daftar Lagu
              </h3>
              <div className="w-full flex flex-col gap-3 overflow-y-auto custom-scrollbar pr-2 pb-2 h-full">
              {Object.entries(groupedPlaylist).map(([artist, tracks]) => {
                const isExpanded = expandedArtist === artist;
                return (
                  <div key={artist} className="bg-white/5 rounded border border-white/10 overflow-hidden text-sm">
                    <div 
                      className="flex justify-between items-center p-3 cursor-pointer hover:bg-white/10 transition-colors"
                      onClick={() => setExpandedArtist(isExpanded ? null : artist)}
                    >
                      <span className="font-bold text-[var(--color-neon-cyan)] drop-shadow-[0_0_5px_var(--color-neon-cyan)]">{artist}</span>
                      <span className="text-xs text-white/50">{tracks.length} lagu {isExpanded ? '▲' : '▼'}</span>
                    </div>
                    
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="flex flex-col gap-1 px-2 pb-2 max-h-[180px] overflow-y-auto custom-scrollbar"
                        >
                          {tracks.map((track) => {
                            const i = track.originalIndex;
                            const isCurrentTrack = i === currentTrackIndex;
                            return (
                              <div 
                                key={track.id}
                                onClick={() => playSpecificTrack(i)}
                                className={`flex items-center gap-3 p-2 rounded cursor-pointer transition-colors ${
                                  isCurrentTrack ? 'bg-[var(--color-neon-pink)]/20 border border-[var(--color-neon-pink)]/50' : 'hover:bg-white/5 border border-transparent'
                                }`}
                              >
                                <img 
                                  src={track.cover} 
                                  alt="Cover Mini" 
                                  className="h-8 w-8 rounded object-cover shadow-sm" 
                                  onError={(e) => { 
                                    (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${track.id}/100` 
                                  }} 
                                />
                                <div className="flex flex-col flex-1 overflow-hidden">
                                  <span className={`text-xs font-bold truncate ${isCurrentTrack ? 'text-[var(--color-neon-pink)]' : 'text-white'}`}>
                                    {track.title}
                                  </span>
                                </div>
                                {isCurrentTrack && isPlaying && (
                                  <motion.div className="flex gap-1 h-3 items-end">
                                    {[1, 2, 3].map((bar) => (
                                      <motion.div key={bar} className="w-1 bg-[var(--color-neon-pink)]"
                                        animate={{ height: ["20%", "100%", "20%"] }}
                                        transition={{ duration: 0.8, repeat: Infinity, delay: bar * 0.2 }}
                                      />
                                    ))}
                                  </motion.div>
                                )}
                              </div>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  )
}
