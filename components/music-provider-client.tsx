"use client"

import { MusicProvider } from "@/hooks/use-music"
import MusicToggleButton from "@/components/music-toggle-button"
import { Toaster } from "@/components/ui/toaster"
import React from "react";

export function MusicProviderClient({
  children,
  musicUrl,
}: {
  children: React.ReactNode
  musicUrl?: string
}) {
  return (
    <MusicProvider musicUrl={musicUrl}>
      {children}
      <MusicToggleButton />
      <Toaster />
    </MusicProvider>
  )
}