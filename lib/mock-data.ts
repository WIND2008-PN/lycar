// Seeded random number generator for reproducible mock data
export class SeededRandom {
  private seed: number

  constructor(seed: number) {
    this.seed = seed
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280
    return this.seed / 233280
  }

  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min
  }

  nextFloat(min: number, max: number): number {
    return this.next() * (max - min) + min
  }

  choice<T>(array: T[]): T {
    return array[Math.floor(this.next() * array.length)]
  }
}

// Initialize missions
export function generateMissions(userId: string): any[] {
  const rng = new SeededRandom(hashString(userId))

  return [
    {
      id: "m1",
      title: { th: "เชื่อมต่อ OBD-II", en: "Connect OBD-II" },
      description: { th: "รองรับ OBD-II ผ่านบลูทูธและสายแลน", en: "Connect OBD-II via Bluetooth or cable" },
      type: "daily",
      xp: 100,
      coins: 50,
      progress: 1,
      total: 1,
      completed: true,
    },
    {
      id: "m2",
      title: { th: "ตรวจสอบสุขภาพรถ", en: "Check Car Health" },
      description: { th: "ตรวจสอบสุขภาพรถแบบเรียลไทม์ผ่าน OBD-II", en: "Monitor car health in real-time" },
      type: "daily",
      xp: 150,
      coins: 75,
      progress: 1,
      total: 1,
      completed: true,
    },
    {
      id: "m3",
      title: { th: "AI ประเมิน", en: "AI Valuation" },
      description: { th: "ราคาขายและค่าความเสียหาย AI", en: "Get AI price and damage estimate" },
      type: "weekly",
      xp: 300,
      coins: 150,
      progress: 0,
      total: 1,
      completed: false,
    },
    {
      id: "m4",
      title: { th: "ทำภารกิจและเลเวลแลกเหรียญ", en: "Complete missions and earn coins" },
      description: { th: "ทำภารกิจและเลเวลแลกเหรียญเพื่อรับ 24coin", en: "Complete missions to earn 24coin" },
      type: "dynamic",
      xp: 200,
      coins: 100,
      progress: 2,
      total: 5,
      completed: false,
    },
  ]
}

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return Math.abs(hash)
}

// Mock AI Diagnosis
export interface DiagnosisResult {
  summary: { th: string; en: string }
  probableCauses: Array<{ label: { th: string; en: string }; probability: number }>
  severity: "low" | "medium" | "high"
  canDrive: boolean
  nextSteps: Array<{ th: string; en: string }>
}

export function mockAIDiagnosis(symptom: string): DiagnosisResult {
  const rng = new SeededRandom(hashString(symptom))

  return {
    summary: {
      th: "ตรวจพบอาการเครื่องยนต์สั่นผิดปกติ อาจเกิดจากหัวเทียนหรือระบบจุดระเบิด",
      en: "Detected abnormal engine vibration, possibly caused by spark plugs or ignition system",
    },
    probableCauses: [
      { label: { th: "หัวเทียนชำรุด", en: "Faulty spark plugs" }, probability: 0.65 },
      { label: { th: "คอยล์จุดระเบิดเสีย", en: "Bad ignition coil" }, probability: 0.25 },
      { label: { th: "ฟิลเตอร์อากาศอุดตัน", en: "Clogged air filter" }, probability: 0.1 },
    ],
    severity: "medium",
    canDrive: true,
    nextSteps: [
      { th: "ตรวจสอบหัวเทียนและเปลี่ยนถ้าจำเป็น", en: "Check spark plugs and replace if necessary" },
      { th: "ทดสอบคอยล์จุดระเบิด", en: "Test ignition coil" },
      { th: "นัดหมายช่างภายใน 1-2 สัปดาห์", en: "Schedule mechanic within 1-2 weeks" },
    ],
  }
}

// Mock Battery Guess
export interface BatteryGuess {
  monthsLeft: number
  risk: "low" | "medium" | "high"
  confidence: number
  tips: Array<{ th: string; en: string }>
}

export function mockBatteryGuess(carId: string): BatteryGuess {
  const rng = new SeededRandom(hashString(carId))
  const months = rng.nextInt(3, 18)

  return {
    monthsLeft: months,
    risk: months > 12 ? "low" : months > 6 ? "medium" : "high",
    confidence: rng.nextFloat(0.75, 0.95),
    tips: [
      { th: "ตรวจสอบแรงดันแบตเตอรี่เป็นประจำ", en: "Check battery voltage regularly" },
      { th: "ทำความสะอาดขั้วแบตเตอรี่", en: "Clean battery terminals" },
      { th: "หลีกเลี่ยงการปล่อยรถทิ้งไว้นานเกินไป", en: "Avoid leaving car unused for too long" },
    ],
  }
}

// Mock Feed Posts
export interface Post {
  id: string
  author: {
    name: string
    avatar?: string
    badge?: string
  }
  content: { th: string; en: string }
  image?: string
  likes: number
  comments: number
  timestamp: string
  tags: string[]
}

export function generateFeed(page = 1): Post[] {
  const rng = new SeededRandom(page * 1234)

  const authors = [
    { name: "Somchai Mechanic", badge: "Expert" },
    { name: "Civic Club TH", badge: "Community" },
    { name: "Drift King", badge: "Racer" },
    { name: "EV Lover", badge: "Tech" },
    { name: "Offroad Adventure", badge: "Explorer" },
  ]

  const contents = [
    {
      th: "วันนี้เอารถไปเช็คระยะมา บริการดีมากครับ แนะนำเลย",
      en: "Took my car for service today. Great service, highly recommended.",
    },
    {
      th: "ใครเจอปัญหาแอร์ไม่เย็นบ้างครับ? แก้ยังไงดี",
      en: "Anyone facing AC issues? How to fix?",
    },
    {
      th: "ทริปเขาใหญ่สนุกมาก! ถนนสวย รถวิ่งดี",
      en: "Khao Yai trip was amazing! Beautiful roads, car ran great.",
    },
    {
      th: "เปลี่ยนยางใหม่ นุ่มเงียบขึ้นเยอะ",
      en: "Changed new tires. Much smoother and quieter.",
    },
    {
      th: "ระวังหลุมใหญ่หน้าปากซอย 5 นะครับ",
      en: "Watch out for a big pothole at Soi 5 entrance.",
    },
  ]

  return Array.from({ length: 5 }, (_, i) => {
    const author = rng.choice(authors)
    const content = rng.choice(contents)

    return {
      id: `post-${page}-${i}`,
      author,
      content,
      likes: rng.nextInt(5, 500),
      comments: rng.nextInt(0, 50),
      timestamp: new Date(Date.now() - rng.nextInt(0, 86400000 * 2)).toISOString(),
      tags: ["General", "Maintenance", "Trip"].slice(0, rng.nextInt(1, 3)),
    }
  })
}

// Mock Car Health Data
export interface CarHealthData {
  engineLoad: number
  coolantTemp: number
  rpm: number
  speed: number
  batteryVoltage: number
  fuelLevel: number
  dtcCodes: string[]
}

export function generateCarHealth(seed: number): CarHealthData {
  const rng = new SeededRandom(seed)

  return {
    engineLoad: rng.nextInt(20, 80),
    coolantTemp: rng.nextInt(80, 105),
    rpm: rng.nextInt(800, 4000),
    speed: rng.nextInt(0, 120),
    batteryVoltage: rng.nextFloat(12.2, 14.4),
    fuelLevel: rng.nextInt(10, 100),
    dtcCodes: rng.next() > 0.8 ? ["P0300", "P0171"] : [],
  }
}

// Mock Leaderboard
export interface LeaderboardEntry {
  rank: number
  user: {
    name: string
    avatar?: string
  }
  score: number
  tier: "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond"
  change: "up" | "down" | "same"
}

export function generateLeaderboard(): LeaderboardEntry[] {
  const rng = new SeededRandom(Date.now())
  const tiers = ["Diamond", "Platinum", "Gold", "Silver", "Bronze"] as const

  return Array.from({ length: 20 }, (_, i) => ({
    rank: i + 1,
    user: {
      name: `Racer_${rng.nextInt(1000, 9999)}`,
    },
    score: 10000 - i * rng.nextInt(100, 500),
    tier: tiers[Math.floor(i / 4)],
    change: rng.next() > 0.6 ? "up" : rng.next() > 0.3 ? "down" : "same",
  }))
}

// Mock Route Risk
export interface RouteRisk {
  riskLevel: number // 0-100
  weather: "sunny" | "rain" | "fog"
  incidents: number
  traffic: "low" | "medium" | "high"
}

export function getRouteRisk(lat: number, lng: number): RouteRisk {
  const seed = Math.floor(lat * 1000) + Math.floor(lng * 1000)
  const rng = new SeededRandom(seed)

  return {
    riskLevel: rng.nextInt(0, 100),
    weather: rng.choice(["sunny", "rain", "fog"]),
    incidents: rng.nextInt(0, 3),
    traffic: rng.choice(["low", "medium", "high"]),
  }
}

// Mock data for user cars
export interface Car {
  id: string
  name: string
  model: string
  year: number
  plate: string
  image: string
  status: "good" | "warning" | "critical"
  mileage: number
  nextService: string
}

export function generateMyCars(): Car[] {
  return [
    {
      id: "c1",
      name: "My Daily",
      model: "Honda Civic FE",
      year: 2023,
      plate: "1กก 1234",
      image: "/honda-civic-white.jpg",
      status: "good",
      mileage: 15420,
      nextService: "2024-06-15",
    },
    {
      id: "c2",
      name: "Family SUV",
      model: "Toyota Fortuner",
      year: 2020,
      plate: "2ขข 5678",
      image: "/toyota-fortuner-black.jpg",
      status: "warning",
      mileage: 45200,
      nextService: "2024-02-20",
    },
  ]
}
