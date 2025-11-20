"use client"

import type React from "react"
import { ThemeProvider } from "next-themes"
import { useEffect } from "react"
import { CommandPalette } from "@/components/command-palette"

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize localStorage on mount
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("lycar-store")
      if (!stored) {
        // Initialize with default data
        const defaultStore = {
          user: null,
          plan: "free",
          language: "th",
          cars: [],
          coins: 2450,
          level: 12,
          xp: 8700,
          streak: 5,
          healthScore: 87,
        }
        localStorage.setItem("lycar-store", JSON.stringify(defaultStore))
      }
    }
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      {children}
      <CommandPalette />
    </ThemeProvider>
  )
}
