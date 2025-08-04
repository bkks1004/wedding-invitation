"use client"

import { useMusic } from "@/hooks/use-music"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function MusicToggleButton() {
  const { isPlaying, showConsent, togglePlay } = useMusic()

  // "BGM 있어요!" 힌트를 표시할 조건:
  // 현재 음악이 재생되고 있지 않고, 최초 동의 팝업도 없을 때
  const shouldShowHint = !isPlaying && !showConsent

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.5 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <div className="relative flex justify-center">
        <AnimatePresence>
          {shouldShowHint && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-full mb-2 bg-stone-800 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg whitespace-nowrap"
            >
              BGM 있어요!
            </motion.div>
          )}
        </AnimatePresence>
        <Button
          onClick={togglePlay}
          variant="outline"
          size="icon"
          className="bg-white/80 backdrop-blur-md rounded-full w-12 h-12 shadow-lg hover:bg-stone-100/90 transition-all duration-300 ease-in-out transform hover:scale-110"
          aria-label={isPlaying ? "Pause music" : "Play music"}
        >
          {isPlaying ? (
            <Volume2 className="h-6 w-6 text-amber-600" />
          ) : (
            <VolumeX className="h-6 w-6 text-stone-500" />
          )}
        </Button>
      </div>
    </motion.div>
  )
}