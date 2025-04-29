"use client"

import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"
import { motion } from "framer-motion"

export default function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <motion.div
        className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
        animate={{ y: [0, 5, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
      >
        <motion.div
          className="w-1.5 h-1.5 bg-primary rounded-full"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
        />
      </motion.div>
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5, delay: 0.2 }}
        className="mt-2"
      >
        <ChevronDown className="h-5 w-5 text-white/60" />
      </motion.div>
    </motion.div>
  )
}
