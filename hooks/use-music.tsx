"use client"

import { createContext, useContext, useState, useRef, useEffect, ReactNode } from "react"
import { Button } from "@/components/ui/button"

type MusicPreference = "play" | "dont-play" | null

interface MusicContextType {
  isPlaying: boolean
  showConsent: boolean
  togglePlay: () => void
  audioRef: React.RefObject<HTMLAudioElement | null>
}

const MusicContext = createContext<MusicContextType | undefined>(undefined)

export const useMusic = () => {
  const context = useContext(MusicContext)
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider")
  }
  return context
}

export const MusicProvider = ({ children }: React.PropsWithChildren) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showConsent, setShowConsent] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const storedPref = localStorage.getItem("musicPreference") as MusicPreference

    if (!storedPref) {
      setShowConsent(true)
    } else if (storedPref === "play") {
      const playOnFirstInteraction = () => {
        const audio = audioRef.current
        if (audio && audio.paused) {
          audio.play().catch(() => {})
        }
        window.removeEventListener("scroll", playOnFirstInteraction)
        window.removeEventListener("click", playOnFirstInteraction)
        window.removeEventListener("touchstart", playOnFirstInteraction)
      }

      window.addEventListener("scroll", playOnFirstInteraction, { once: true, passive: true })
      window.addEventListener("click", playOnFirstInteraction, { once: true })
      window.addEventListener("touchstart", playOnFirstInteraction, { once: true, passive: true })

      return () => {
        window.removeEventListener("scroll", playOnFirstInteraction)
        window.removeEventListener("click", playOnFirstInteraction)
        window.removeEventListener("touchstart", playOnFirstInteraction)
      }
    }
  }, [])

  const handleConsent = (consent: boolean) => {
    const newPref: MusicPreference = consent ? "play" : "dont-play"
    localStorage.setItem("musicPreference", newPref)
    if (consent) {
      audioRef.current?.play().catch(() => {})
    }
    setShowConsent(false)
  }

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    const newPref: MusicPreference = audio.paused ? "play" : "dont-play"
    localStorage.setItem("musicPreference", newPref)

    if (newPref === "play") {
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    audio.addEventListener("play", handlePlay)
    audio.addEventListener("pause", handlePause)
    return () => {
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
    }
  }, [])

  return (
    <MusicContext.Provider value={{ isPlaying, showConsent, togglePlay, audioRef }}>
      <audio ref={audioRef} src="/music/Its_Beginning_to_Look_a_Lot_Like_Christmas.mp3" loop preload="auto" />
      {children}
      {showConsent && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm mx-4 text-center">
            <h3 className="text-lg font-semibold text-stone-800 mb-2">배경 음악 안내</h3>
            <p className="text-stone-600 mb-4 text-sm">배경 음악과 함께 청첩장을 감상하시겠어요?</p>
            <div className="flex justify-center gap-3">
              <Button onClick={() => handleConsent(true)} className="bg-amber-500 hover:bg-amber-600 text-white rounded-full px-6">
                네, 들을래요
              </Button>
              <Button onClick={() => handleConsent(false)} variant="ghost" className="text-stone-500 hover:bg-stone-100 rounded-full px-6">
                아니요
              </Button>
            </div>
          </div>
        </div>
      )}
    </MusicContext.Provider>
  )
}
