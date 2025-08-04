"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import MainVisual from "@/components/main-visual"
import HeroSection from "@/components/hero-section"
import WeddingDetails from "@/components/wedding-details"
import PhotoGallery from "@/components/photo-gallery"
import LocationSection from "@/components/location-section"
import AccountInfo from "@/components/account-info"
import GuestBook from "@/components/guest-book"
import FloatingNavigation from "@/components/floating-navigation"

export default function WeddingInvitation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])

  return (
    <div ref={containerRef} className="relative min-h-screen bg-stone-50">
      {/* Subtle Background Animation */}
      <motion.div className="fixed inset-0 opacity-5 pointer-events-none" style={{ y: backgroundY }}>
        <div className="absolute inset-0 bg-gradient-to-br from-stone-100 via-stone-50 to-stone-100" />
      </motion.div>

      {/* Floating Navigation */}
      <FloatingNavigation />

      {/* Main Content */}
      <div className="relative z-10">
        <MainVisual />
        <HeroSection />
        <WeddingDetails />
        <PhotoGallery />
        <LocationSection />
        <AccountInfo />
        <GuestBook />
      </div>
    </div>
  )
}
