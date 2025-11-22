export type LandmarkType = "nature" | "culture" | "auto" | "service"
export type Difficulty = "easy" | "med" | "hard"
export type Season = "Q1" | "Q2" | "Q3" | "Q4"
export type TimeOfDay = "morning" | "afternoon" | "evening"

export interface Landmark {
  id: string
  name: string
  type: LandmarkType
  countryCode: string
  regionId: string
  districtId: string
  lat: number
  lng: number
  difficulty: Difficulty
  bestSeasons: Season[]
  bestTimes: TimeOfDay[]
  points: number
  tips: string[]
  photos: string[]
  description?: string
}

export interface LandmarkReview {
  id: string
  landmarkId: string
  userId: string
  rating: 1 | 2 | 3 | 4 | 5
  text: string
  photos: string[]
  createdAt: string
}

export interface LandmarkVisit {
  id: string
  landmarkId: string
  userId: string
  visitedAt: string
  proof: "lywheel" | "photo" | "manual"
  sourceMeta?: Record<string, any>
}

export interface LandmarkUserStats {
  userId: string
  totalPoints: number
  visitedCount: number
  countriesVisited: number
  lastVisitAt?: string
  collectedLandmarks: string[]
}

export const COUNTRIES = [
  { code: "TH", name: "Thailand", flag: "🇹🇭" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "US", name: "USA", flag: "🇺🇸" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "UK", name: "United Kingdom", flag: "🇬🇧" },
  { code: "CN", name: "China", flag: "🇨🇳" },
]

export const REGIONS: Record<string, { id: string; name: string; countryCode: string }[]> = {
  TH: [
    { id: "th-bkk", name: "Bangkok", countryCode: "TH" },
    { id: "th-cmi", name: "Chiang Mai", countryCode: "TH" },
    { id: "th-hkt", name: "Phuket", countryCode: "TH" },
    { id: "th-cbn", name: "Chon Buri", countryCode: "TH" },
  ],
  JP: [
    { id: "jp-tyo", name: "Tokyo", countryCode: "JP" },
    { id: "jp-osa", name: "Osaka", countryCode: "JP" },
  ],
  // Add more as needed for demo
}

// Seed Data Generator
const DESCRIPTIONS = [
  "A breathtaking view of the city skyline.",
  "Ancient ruins with a mysterious past.",
  "A popular spot for car enthusiasts.",
  "Quiet and serene, perfect for relaxation.",
  "Bustling market with local delicacies.",
]

export const generateMockLandmarks = (): Landmark[] => {
  const landmarks: Landmark[] = []
  let idCounter = 1

  COUNTRIES.forEach((country) => {
    const regions = REGIONS[country.code] || [
      { id: `${country.code.toLowerCase()}-main`, name: "Main Region", countryCode: country.code },
    ]

    regions.forEach((region) => {
      const count = country.code === "TH" ? 8 : 4 // Higher density for TH

      for (let i = 0; i < count; i++) {
        const type = ["nature", "culture", "auto", "service"][Math.floor(Math.random() * 4)] as LandmarkType
        landmarks.push({
          id: `lm-${idCounter++}`,
          name: `${region.name} Point ${i + 1}`,
          type,
          countryCode: country.code,
          regionId: region.id,
          districtId: `dist-${Math.floor(Math.random() * 5)}`,
          lat: 0, // Mock coords
          lng: 0,
          difficulty: ["easy", "med", "hard"][Math.floor(Math.random() * 3)] as Difficulty,
          bestSeasons: ["Q1", "Q4"],
          bestTimes: ["morning", "evening"],
          points: [10, 20, 30][Math.floor(Math.random() * 3)],
          tips: ["Bring water", "Best at sunset", "Parking available"],
          photos: [`/placeholder.svg?height=300&width=400&text=${region.name}+${i + 1}`],
          description: DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)],
        })
      }
    })
  })

  return landmarks
}

export const MOCK_LANDMARKS = generateMockLandmarks()
