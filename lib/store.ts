import { create } from "zustand"
import { persist } from "zustand/middleware"

export type Language = "th" | "en"
export type Plan = "free" | "plus"

export interface User {
  id: string
  email: string
  displayName: string
  avatar?: string
}

export interface Car {
  id: string
  brand: string
  model: string
  year: number
  plate: string
  color: string
  mileage: number
  addedAt: string
}

export interface Mission {
  id: string
  title: { th: string; en: string }
  description: { th: string; en: string }
  type: "daily" | "weekly" | "dynamic" | "seasonal"
  xp: number
  coins: number
  progress: number
  total: number
  completed: boolean
  expiresAt?: string
}

export interface Achievement {
  code: string
  title: { th: string; en: string }
  description: { th: string; en: string }
  icon: string
  unlockedAt?: string
}

interface AppState {
  // User & Auth
  user: User | null
  setUser: (user: User | null) => void

  // Settings
  language: Language
  setLanguage: (lang: Language) => void
  plan: Plan
  setPlan: (plan: Plan) => void

  // Garage
  cars: Car[]
  addCar: (car: Car) => void
  removeCar: (id: string) => void

  // Gamification
  coins: number
  addCoins: (amount: number) => void
  spendCoins: (amount: number) => boolean
  level: number
  xp: number
  addXP: (amount: number) => void
  streak: number
  healthScore: number

  // Missions
  missions: Mission[]
  completeMission: (id: string) => void

  // Achievements
  achievements: Achievement[]
  unlockAchievement: (code: string) => void

  // Navigation
  drawerOpen: boolean
  setDrawerOpen: (open: boolean) => void
  commandPaletteOpen: boolean
  setCommandPaletteOpen: (open: boolean) => void
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      language: "th",
      plan: "free",
      cars: [],
      coins: 2450,
      level: 12,
      xp: 8700,
      streak: 5,
      healthScore: 87,
      missions: [],
      achievements: [],
      drawerOpen: false,
      commandPaletteOpen: false,

      // Actions
      setUser: (user) => set({ user }),
      setLanguage: (language) => set({ language }),
      setPlan: (plan) => set({ plan }),

      addCar: (car) =>
        set((state) => {
          const maxCars = state.plan === "free" ? 2 : 5
          if (state.cars.length >= maxCars) {
            return state // Don't add, trigger upsell in UI
          }
          return { cars: [...state.cars, car] }
        }),

      removeCar: (id) =>
        set((state) => ({
          cars: state.cars.filter((c) => c.id !== id),
        })),

      addCoins: (amount) =>
        set((state) => ({
          coins: state.coins + amount,
        })),

      spendCoins: (amount) => {
        const state = get()
        if (state.coins >= amount) {
          set({ coins: state.coins - amount })
          return true
        }
        return false
      },

      addXP: (amount) =>
        set((state) => {
          const newXP = state.xp + amount
          const newLevel = Math.floor(newXP / 1000) + 1
          return { xp: newXP, level: newLevel }
        }),

      completeMission: (id) =>
        set((state) => {
          const mission = state.missions.find((m) => m.id === id)
          if (!mission || mission.completed) return state

          return {
            missions: state.missions.map((m) => (m.id === id ? { ...m, completed: true, progress: m.total } : m)),
            coins: state.coins + mission.coins,
            xp: state.xp + mission.xp,
          }
        }),

      unlockAchievement: (code) =>
        set((state) => {
          if (state.achievements.find((a) => a.code === code && a.unlockedAt)) {
            return state
          }
          return {
            achievements: state.achievements.map((a) =>
              a.code === code ? { ...a, unlockedAt: new Date().toISOString() } : a,
            ),
          }
        }),

      setDrawerOpen: (drawerOpen) => set({ drawerOpen }),
      setCommandPaletteOpen: (commandPaletteOpen) => set({ commandPaletteOpen }),
    }),
    {
      name: "lycar-store",
    },
  ),
)
