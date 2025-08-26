"use client"

import { MusicProvider } from "@/hooks/use-music"
import MusicToggleButton from "@/components/music-toggle-button"
import { Toaster } from "@/components/ui/toaster"

export function MusicProviderClient({ children }: { children: React.ReactNode }) {
  return (
    <MusicProvider>
      {children}
      <MusicToggleButton />
      <Toaster />
    </MusicProvider>
  )
}