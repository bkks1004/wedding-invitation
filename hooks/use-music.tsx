"use client"

import { createContext, useContext, useState, useRef, useEffect, ReactNode } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

interface MusicContextType {
  isPlaying: boolean
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

interface MusicProviderProps {
  children: ReactNode
}

export const MusicProvider = ({ children }: MusicProviderProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const isMobile = useIsMobile()

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      audio.play().catch((error) => {
        console.error("Audio play failed on user interaction:", error)
      })
    } else {
      audio.pause()
    }
  }

  useEffect(() => {
    if (!isMobile) return

    const playOnFirstInteraction = () => {
      const audio = audioRef.current
      // 사용자가 스크롤이나 터치를 시작했을 때, 오디오가 멈춰있으면 재생을 시도합니다.
      if (audio && audio.paused) {
        // 자동 재생 정책으로 인해 play()가 실패할 수 있으므로 catch()로 에러를 처리합니다.
        audio.play().catch(() => {})
      }
    }

    // 스크롤과 터치 이벤트에 리스너를 추가합니다. once: true로 첫 인터랙션 후에 자동 제거됩니다.
    window.addEventListener("scroll", playOnFirstInteraction, { once: true, passive: true })
    window.addEventListener("touchstart", playOnFirstInteraction, { once: true, passive: true })

    return () => {
      window.removeEventListener("scroll", playOnFirstInteraction)
      window.removeEventListener("touchstart", playOnFirstInteraction)
    }
  }, [isMobile])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    audio.addEventListener("play", handlePlay)
    audio.addEventListener("pause", handlePause)

    // 컴포넌트 언마운트 시 이벤트 리스너를 정리합니다.
    return () => {
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
    }
  }, [])

  return (
    <MusicContext.Provider value={{ isPlaying, togglePlay, audioRef }}>
      <audio
        ref={audioRef}
        src="/music/Its_Beginning_to_Look_a_Lot_Like_Christmas.mp3"
        loop
        preload="auto"
      />
      {children}
    </MusicContext.Provider>
  )
}
