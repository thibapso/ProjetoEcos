"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play, Plus, Trash2 } from "lucide-react"
import WaveAnimation from "@/components/wave-animation"

type Recording = {
  id: string
  name: string
  date: string
  duration: string
}

export default function MemoriasPage() {
  const [recordings, setRecordings] = useState<Recording[]>([
    {
      id: "1",
      name: "Vovó cantando parabéns, 1998",
      date: "12 de abril, 2024",
      duration: "1:42",
    },
    {
      id: "2",
      name: "História do vovô sobre a fazenda",
      date: "10 de abril, 2024",
      duration: "3:15",
    },
    {
      id: "3",
      name: "Risada da tia Maria",
      date: "5 de abril, 2024",
      duration: "0:32",
    },
    {
      id: "4",
      name: "Meu filho cantando aos 3 anos",
      date: "2 de abril, 2024",
      duration: "1:15",
    },
  ])

  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    setRecordings(recordings.filter((recording) => recording.id !== id))
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-24 bg-black text-white relative overflow-hidden">
      {/* Background wave effect */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-10">
        <div className="absolute bottom-0 left-0 right-0">
          <WaveAnimation height={300} color="#A78BFA" speed={0.05} />
        </div>
      </div>

      <div className="flex flex-col w-full max-w-6xl z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
          <div>
            <h1 className="text-3xl md:text-4xl font-light tracking-tight mb-2">Suas memórias</h1>
            <p className="text-white/60">Vozes preservadas para sempre</p>
          </div>

          <Link href="/vozes">
            <Button className="rounded-lg bg-primary hover:bg-primary/90 text-black transition-all duration-300 flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Nova gravação
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recordings.map((recording) => (
            <div
              key={recording.id}
              className="border border-white/10 rounded-lg p-6 hover:border-primary/30 transition-all duration-300 hover:bg-[#111111]"
              onMouseEnter={() => setHoveredId(recording.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-light mb-2">{recording.name}</h3>
                  <p className="text-white/60 text-sm">{recording.date}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-white/60">{recording.duration}</span>

                  {hoveredId === recording.id && (
                    <div className="flex gap-2">
                      <Button size="icon" className="rounded-full bg-primary hover:bg-primary/80 text-black">
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        className="rounded-full bg-white/10 hover:bg-white/20 text-white"
                        onClick={() => handleDelete(recording.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div className="waveform w-full mt-4">
                <div className="waveform-line"></div>
                <div className="waveform-path">
                  {Array.from({ length: 100 }).map((_, i) => (
                    <div
                      key={i}
                      className="waveform-segment"
                      style={{
                        height: `${Math.sin(i * 0.2 + Number.parseInt(recording.id)) * 15 + 20}px`,
                        opacity: 0.5,
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-white/40 text-center mt-20">"Porque algumas despedidas não precisam ser finais."</p>
      </div>
    </main>
  )
}
