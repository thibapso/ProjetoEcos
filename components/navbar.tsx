"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Detectar scroll para mudar o estilo da navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Fechar menu mobile ao navegar
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-white font-light text-xl flex items-center">
          <span className="text-primary mr-1">•</span> Ecos
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink href="/" active={pathname === "/"}>
            Início
          </NavLink>
          <NavLink href="/vozes" active={pathname === "/vozes"}>
            Vozes
          </NavLink>
          <NavLink href="/memorias" active={pathname === "/memorias"}>
            Memórias
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white hover:bg-white/10"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-b border-white/10">
          <nav className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            <NavLink href="/" active={pathname === "/"} mobile>
              Início
            </NavLink>
            <NavLink href="/vozes" active={pathname === "/vozes"} mobile>
              Vozes
            </NavLink>
            <NavLink href="/memorias" active={pathname === "/memorias"} mobile>
              Memórias
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}

interface NavLinkProps {
  href: string
  active: boolean
  children: React.ReactNode
  mobile?: boolean
}

function NavLink({ href, active, children, mobile = false }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`${mobile ? "text-base py-2" : "text-sm"} ${
        active ? "text-white" : "text-white/80"
      } hover:text-white relative group transition-colors duration-300`}
    >
      {children}
      <span
        className={`absolute left-0 right-0 bottom-0 h-0.5 bg-primary transform origin-left transition-transform duration-300 ${
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        }`}
      ></span>
    </Link>
  )
}
