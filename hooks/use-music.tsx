import { createContext, useContext, useState, useRef, useEffect } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
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
      <AlertDialog open={showConsent} onOpenChange={setShowConsent}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>배경 음악 안내</AlertDialogTitle>
            <AlertDialogDescription>청첩장과 어울리는 배경 음악과 함께 보실래요?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <Button onClick={() => handleConsent(false)} variant="outline">
                아니요
              </Button>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <Button onClick={() => handleConsent(true)}>네, 들을래요</Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </MusicContext.Provider>
  )
}
