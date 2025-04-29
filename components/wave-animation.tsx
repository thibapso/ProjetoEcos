"use client"

import { useEffect, useRef } from "react"

interface WaveAnimationProps {
  className?: string
  color?: string
  height?: number
  width?: number
  speed?: number
  amplitude?: number
}

export default function WaveAnimation({
  className = "",
  color = "#A78BFA",
  height = 100,
  width = 1200,
  speed = 0.05,
  amplitude = 20,
}: WaveAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = width
    canvas.height = height

    let animationFrameId: number
    let offset = 0

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.beginPath()

      // Começar no canto inferior esquerdo
      ctx.moveTo(0, canvas.height)

      // Desenhar a primeira onda
      for (let i = 0; i < canvas.width; i++) {
        const y = Math.sin(i * 0.01 + offset) * amplitude + canvas.height / 2
        ctx.lineTo(i, y)
      }

      // Completar o caminho até o canto inferior direito
      ctx.lineTo(canvas.width, canvas.height)
      ctx.closePath()

      // Preencher com gradiente
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, `${color}20`) // Cor com 12.5% de opacidade
      gradient.addColorStop(1, `${color}05`) // Cor com 2% de opacidade
      ctx.fillStyle = gradient
      ctx.fill()

      // Desenhar a linha da onda
      ctx.beginPath()
      for (let i = 0; i < canvas.width; i++) {
        const y = Math.sin(i * 0.01 + offset) * amplitude + canvas.height / 2
        if (i === 0) {
          ctx.moveTo(i, y)
        } else {
          ctx.lineTo(i, y)
        }
      }
      ctx.strokeStyle = color
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Desenhar a segunda onda (mais sutil)
      ctx.beginPath()
      for (let i = 0; i < canvas.width; i++) {
        const y = Math.sin(i * 0.02 - offset * 1.5) * (amplitude * 0.6) + canvas.height / 2 + 10
        if (i === 0) {
          ctx.moveTo(i, y)
        } else {
          ctx.lineTo(i, y)
        }
      }
      ctx.strokeStyle = `${color}40` // Cor com 25% de opacidade
      ctx.lineWidth = 1
      ctx.stroke()

      offset += speed
      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [color, height, width, speed, amplitude])

  return <canvas ref={canvasRef} className={`${className} w-full`} style={{ maxWidth: "100%" }} />
}
