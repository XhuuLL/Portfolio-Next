"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSound } from "@/components/SoundProvider"
import { Play, Pause, SkipForward, SkipBack, Disc3, ChevronDown, ChevronUp, Volume2 } from "lucide-react"
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
  { id: 8, title: "Everithing You Are", artist: "Hindia", cover: "/music/cover8.png", url: "/music/lagu8.mp3" },
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
  { id: 19, title: "Evakuasi", artist: "Hindia", cover: "/music/cover19.png", url: "/music/lagu19.mp3" },
  { id: 20, title: "Genit", artist: "Tipe-X", cover: "/music/cover20.jpg", url: "/music/lagu20.mp3" },
  { id: 21, title: "Kamu ga Sendirian", artist: "Tipe-X", cover: "/music/cover21.jpg", url: "/music/lagu21.mp3" },
  { id: 22, title: "Mawar Hitam", artist: "Tipe-X", cover: "/music/cover22.jpg", url: "/music/lagu22.mp3" },
  { id: 23, title: "Salam Rindu", artist: "Tipe-X", cover: "/music/cover23.jpg", url: "/music/lagu23.mp3" },
  { id: 24, title: "Sakit Hati", artist: "Tipe-X", cover: "/music/cover24.jpg", url: "/music/lagu24.mp3" },
  { id: 25, title: "Selamat Jalan", artist: "Tipe-X", cover: "/music/cover25.jpg", url: "/music/lagu25.mp3" },
  { id: 26, title: "Roman Picisan", artist: "Dewa 19", cover: "/music/cover26.jpg", url: "/music/lagu26.mp3" },
  { id: 27, title: "Separuh Nafasku", artist: "Dewa 19", cover: "/music/cover27.jpg", url: "/music/lagu27.mp3" },
  { id: 28, title: "Kangen", artist: "Dewa 19", cover: "/music/cover28.jpg", url: "/music/lagu28.mp3" },
  { id: 29, title: "Aku Milikmu", artist: "Dewa 19", cover: "/music/cover29.jpg", url: "/music/lagu29.mp3" },
  { id: 30, title: "Pangeran Cinta", artist: "Dewa 19", cover: "/music/cover30.jpg", url: "/music/lagu30.mp3" },
  { id: 31, title: "EEE A", artist: "Dia", cover: "/music/cover31.webp", url: "/music/lagu31.mp3" },
]

export default function FunZone() {
  const { playHover, playClick } = useSound()

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const soundRef = useRef<Howl | null>(null)
  const [expandedArtist, setExpandedArtist] = useState<string | null>(playlist[0].artist);

  // Format time (seconds to mm:ss)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

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
      html5: true, 
      onplay: () => {
        setIsPlaying(true)
        setDuration(soundRef.current?.duration() || 0)
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
      const dur = soundRef.current.duration()
      setCurrentTime(seek)
      setProgress((seek / dur) * 100 || 0)
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
    setCurrentTime(0)

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
    setCurrentTime(0)

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
    if (index === currentTrackIndex) {
      togglePlay();
      return;
    }
    playClick()
    setProgress(0)
    setCurrentTime(0)
    setCurrentTrackIndex(index)
    setTimeout(() => {
      if (soundRef.current) soundRef.current.play()
    }, 100)
  }

  return (
    <div className="flex flex-1 flex-col items-center p-4 sm:p-8 md:p-12 min-h-screen selection:bg-[var(--color-neon-purple)] selection:text-white">
      {/* --- HEADER --- */}
      <div className="mb-10 w-full max-w-6xl text-center md:text-left">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-glow-purple text-[var(--color-neon-purple)] drop-shadow-[0_0_15px_var(--color-neon-purple)] mb-2"
        >
          PLAYLIST
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-white/60 text-lg"
        >
          Welcome to my playlist!
        </motion.p>
      </div>

      <div className="w-full max-w-5xl">
        <motion.div 
          className="w-full rounded-3xl border border-white/10 bg-[#0a0a0c]/80 backdrop-blur-2xl shadow-2xl overflow-hidden relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Subtle background glow based on current state */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-[var(--color-neon-purple)]/10 blur-[100px] rounded-full pointer-events-none" />

          {/* Title Bar */}
          <div className="px-6 py-5 flex items-center justify-between border-b border-white/5 bg-white/[0.02]">
            <h2 className="font-mono text-xl md:text-2xl font-bold flex items-center gap-3 text-white">
              <Disc3 className={`h-6 w-6 text-[var(--color-neon-purple)] ${isPlaying ? 'animate-[spin_3s_linear_infinite]' : ''}`} />
              Now Playing
            </h2>
            <Volume2 className="h-5 w-5 text-white/40" />
          </div>
          
          <div className="flex flex-col lg:flex-row h-full">
            
            {/* --- KIRI: PEMUTAR MUSIK (ARTWORK & CONTROLS) --- */}
            <div className="flex-shrink-0 w-full lg:w-[45%] flex flex-col items-center justify-center p-8 md:p-12 relative border-b lg:border-b-0 lg:border-r border-white/5">
              
              {/* Cover Art - Modern Large Square */}
              <motion.div 
                className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] mb-8"
                animate={isPlaying ? { scale: 1.02, boxShadow: "0 20px 40px -10px rgba(188, 19, 254, 0.3)" } : { scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Glowing ring when playing */}
                {isPlaying && (
                   <div className="absolute inset-0 border-2 border-[var(--color-neon-purple)]/50 rounded-2xl z-10 animate-pulse pointer-events-none" />
                )}
                <img 
                  src={playlist[currentTrackIndex].cover} 
                  alt="Cover" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
                  onError={(e) => { 
                    (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${playlist[currentTrackIndex].id}/400` 
                  }} 
                />
              </motion.div>
              
              {/* Track Info */}
              <div className="text-center w-full mb-8">
                <h3 className="font-bold text-white text-xl md:text-2xl truncate px-4 mb-1">
                  {playlist[currentTrackIndex].title}
                </h3>
                <p className="text-md text-[var(--color-neon-purple)] font-medium">
                  {playlist[currentTrackIndex].artist}
                </p>
              </div>
              
              {/* Progress Bar Area */}
              <div className="w-full max-w-[300px] mb-8">
                {/* Time Indicators */}
                <div className="flex justify-between text-xs font-mono text-white/40 mb-2 px-1">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
                
                {/* The Bar */}
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden cursor-pointer group relative">
                  <div 
                    className="h-full bg-gradient-to-r from-[var(--color-neon-purple)] to-[var(--color-neon-pink)] relative"
                    style={{ width: `${progress}%` }}
                  >
                    {/* Tiny handle head */}
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_white]" />
                  </div>
                </div>
              </div>

              {/* Controls - Modern Circular Layout */}
              <div className="flex items-center justify-center gap-6 md:gap-8">
                <button 
                  onClick={handlePrev} 
                  className="p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all active:scale-90"
                >
                  <SkipBack className="h-6 w-6 fill-current" />
                </button>

                <button 
                  onClick={togglePlay}
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(188,19,254,0.5)] relative group"
                >
                  {/* Subtle background glow on hover */}
                  <div className="absolute inset-0 rounded-full bg-[var(--color-neon-purple)] blur-md opacity-0 group-hover:opacity-50 transition-opacity -z-10" />
                  {isPlaying ? <Pause className="h-7 w-7 fill-current" /> : <Play className="h-7 w-7 fill-current ml-1" />}
                </button>

                <button 
                  onClick={handleNext} 
                  className="p-3 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all active:scale-90"
                >
                  <SkipForward className="h-6 w-6 fill-current" />
                </button>
              </div>
            </div>

            {/* --- KANAN: DAFTAR PLAYLIST (AKORDION) --- */}
            <div className="flex-1 flex flex-col p-6 md:p-8 h-[500px] lg:h-auto overflow-hidden bg-black/20">
              <div className="flex items-center justify-between mb-6 px-2">
                <h3 className="text-white/80 font-semibold text-sm uppercase tracking-wider flex items-center gap-2">
                  Up Next
                </h3>
                <span className="text-xs text-white/40 bg-white/5 px-2 py-1 rounded-full">
                  {playlist.length} Tracks
                </span>
              </div>

              <div className="w-full flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3">
              {Object.entries(groupedPlaylist).map(([artist, tracks]) => {
                const isExpanded = expandedArtist === artist;
                // Cek apakah ada lagu dari artist ini yang sedang diputar
                const isArtistPlaying = tracks.some(t => t.originalIndex === currentTrackIndex);

                return (
                  <div 
                    key={artist} 
                    className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                      isExpanded ? 'bg-white/5 border-white/10' : 'bg-transparent border-transparent hover:bg-white/[0.02]'
                    }`}
                  >
                    {/* Accordion Header */}
                    <button 
                      className="w-full flex justify-between items-center p-4 cursor-pointer focus:outline-none"
                      onClick={() => setExpandedArtist(isExpanded ? null : artist)}
                    >
                      <div className="flex items-center gap-3">
                        {isArtistPlaying && <div className="w-2 h-2 rounded-full bg-[var(--color-neon-purple)] animate-pulse" />}
                        <span className={`font-semibold text-left transition-colors ${isExpanded || isArtistPlaying ? 'text-white' : 'text-white/70'}`}>
                          {artist}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-white/40">
                        <span className="text-xs font-mono">{tracks.length} songs</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>
                    
                    {/* Accordion Content (List Lagu) */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-1 px-3 pb-3">
                            {tracks.map((track) => {
                              const i = track.originalIndex;
                              const isCurrentTrack = i === currentTrackIndex;
                              
                              return (
                                <div 
                                  key={track.id}
                                  onClick={() => playSpecificTrack(i)}
                                  className={`group flex items-center gap-4 p-2.5 rounded-lg cursor-pointer transition-all duration-200 ${
                                    isCurrentTrack 
                                      ? 'bg-gradient-to-r from-[var(--color-neon-purple)]/20 to-transparent border-l-2 border-[var(--color-neon-purple)]' 
                                      : 'hover:bg-white/5 border-l-2 border-transparent'
                                  }`}
                                >
                                  {/* Track Number / Play Icon (Hover) */}
                                  <div className="w-6 flex justify-center text-xs text-white/30 font-mono group-hover:text-white transition-colors relative">
                                    {isCurrentTrack && isPlaying ? (
                                      // Mini EQ Animation
                                      <div className="flex gap-0.5 items-end h-3">
                                        {[1, 2, 3].map((bar) => (
                                          <motion.div 
                                            key={bar} 
                                            className="w-[2px] bg-[var(--color-neon-purple)] rounded-t-sm"
                                            animate={{ height: ["20%", "100%", "20%"] }}
                                            transition={{ duration: 0.6, repeat: Infinity, delay: bar * 0.15 }}
                                          />
                                        ))}
                                      </div>
                                    ) : (
                                      <span className="group-hover:hidden">{(track.originalIndex + 1).toString().padStart(2, '0')}</span>
                                    )}
                                    <Play className={`w-3 h-3 absolute opacity-0 group-hover:opacity-100 fill-current ${isCurrentTrack && isPlaying ? 'hidden' : ''}`} />
                                  </div>

                                  <div className="flex flex-col flex-1 overflow-hidden">
                                    <span className={`text-sm truncate transition-colors ${
                                      isCurrentTrack ? 'text-[var(--color-neon-purple)] font-semibold' : 'text-white/80 group-hover:text-white'
                                    }`}>
                                      {track.title}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
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