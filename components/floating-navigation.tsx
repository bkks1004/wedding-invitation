"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useState, useEffect } from "react"
import { useMusic } from "@/hooks/use-music"
import { Home, Eye, Calendar, Camera, MapPin, Gift, MessageCircle, Volume2, VolumeX } from "lucide-react"

export default function FloatingNavigation() {
  const [activeSection, setActiveSection] = useState(0)
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [100, 200], [0, 1])
  const { isPlaying, togglePlay } = useMusic()

  const navItems = [
    { icon: Eye, label: "Main" },
    { icon: Home, label: "Home" },
    { icon: Calendar, label: "Details" },
    { icon: Camera, label: "Gallery" },
    { icon: MapPin, label: "Location" },
    { icon: Gift, label: "Account" },
    { icon: MessageCircle, label: "Guestbook" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section")
      const scrollPosition = window.scrollY + window.innerHeight / 2

      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop
        const sectionBottom = sectionTop + section.offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(index)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (index: number) => {
    const sections = document.querySelectorAll("section")
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <>
      <motion.nav style={{ opacity }} className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/90 backdrop-blur-md rounded-full px-3 py-2 shadow-lg border border-stone-300">
          <div className="flex items-center gap-1">
            {navItems.map((item, index) => {
              const Icon = item.icon
              const isActive = activeSection === index

              return (
                <motion.button
                  key={index}
                  onClick={() => scrollToSection(index)}
                  className={`relative p-2 rounded-full transition-colors ${
                    isActive ? "text-amber-600 bg-amber-50" : "text-stone-500 hover:text-amber-600 hover:bg-stone-100"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-3.5 h-3.5" />

                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute inset-0 bg-amber-50 rounded-full -z-10"
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                </motion.button>
              )
            })}

            {/* 구분선 */}
            {/*<div className="w-px h-5 bg-stone-200 mx-1"></div>*/}

            {/* 음악 제어 버튼 */}
            {/*<motion.button*/}
            {/*  onClick={togglePlay}*/}
            {/*  className="relative p-2 rounded-full text-stone-500 hover:text-amber-600 hover:bg-stone-100 transition-colors"*/}
            {/*  whileHover={{ scale: 1.1 }}*/}
            {/*  whileTap={{ scale: 0.95 }}*/}
            {/*  title={isPlaying ? "음악 일시정지" : "음악 재생"}*/}
            {/*>*/}
            {/*  {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}*/}
            {/*</motion.button>*/}
          </div>
        </div>
      </motion.nav>
    </>
  )
}