"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Play, Pause, Save, Share2 } from "lucide-react"
import WaveAnimation from "@/components/wave-animation"

export default function PlayerPage() {
  const router = useRouter()
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioName, setAudioName] = useState("Gravação sem título")
  const [isPulsing, setIsPulsing] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Simulando um áudio
    audioRef.current = new Audio("/placeholder-audio.mp3")

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  const togglePlayPause = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }

    setIsPlaying(!isPlaying)
    setIsPulsing(!isPulsing)
  }

  const handleSave = () => {
    // Simulando salvamento
    setTimeout(() => {
      router.push("/memorias")
    }, 1000)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24 bg-black text-white relative overflow-hidden">
      {/* Background wave effect */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-20">
        <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2">
          <WaveAnimation height={400} color="#A78BFA" speed={0.05} amplitude={10} />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center space-y-16 max-w-3xl w-full z-10">
        <h1 className="text-3xl md:text-4xl font-light tracking-tight text-center">A voz reconstruída</h1>

        <div className="flex flex-col items-center space-y-12 w-full">
          <input
            type="text"
            value={audioName}
            onChange={(e) => setAudioName(e.target.value)}
            className="bg-transparent border-b border-white/20 text-center text-xl py-2 focus:outline-none focus:border-primary w-full max-w-md"
            placeholder="Dê um nome a esta gravação"
          />

          <div
            className={`pulse-circle ${isPulsing ? "animate-pulse" : ""} cursor-pointer hover:scale-105 transition-transform duration-300`}
            onClick={togglePlayPause}
          >
            <div className="pulse-inner">
              <div className="pulse-core flex items-center justify-center">
                {isPlaying ? <Pause className="h-5 w-5 text-white" /> : <Play className="h-5 w-5 text-white ml-1" />}
              </div>
            </div>
          </div>

          <div className="waveform w-full max-w-lg">
            <div className="waveform-line"></div>
            <div className="waveform-path">
              {Array.from({ length: 100 }).map((_, i) => (
                <div
                  key={i}
                  className="waveform-segment"
                  style={{
                    height: `${Math.sin(i * 0.2) * 20 + 30}px`,
                    opacity: isPlaying ? 1 : 0.5,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mt-10">
          <Button
            onClick={handleSave}
            className="text-lg px-8 py-6 rounded-lg bg-primary hover:bg-primary/90 text-black transition-all duration-300 flex items-center gap-2"
          >
            <Save className="h-5 w-5" />
            Salvar
          </Button>

          <Button className="text-lg px-8 py-6 rounded-lg bg-transparent hover:bg-white/10 text-white border border-white/30 hover:border-white/60 transition-all duration-300 flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Compartilhar
          </Button>
        </div>
      </div>
    </main>
  )
}
