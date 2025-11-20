export type Language = "th" | "en"

export const translations = {
  // Navigation
  nav: {
    home: { th: "หน้าหลัก", en: "Home" },
    feed: { th: "ฟีด", en: "Feed" },
    diagnose: { th: "วินิจฉัย", en: "Diagnose" },
    missions: { th: "ภารกิจ", en: "Missions" },
    rewards: { th: "รางวัล", en: "Rewards" },
    games: { th: "เกม", en: "Games" },
    routes: { th: "เส้นทาง", en: "Routes" },
    communities: { th: "ชุมชน", en: "Communities" },
    garage: { th: "โรงรถ", en: "Garage" },
    carHealth: { th: "สุขภาพรถ", en: "Car Health" },
    carFitness: { th: "ฟิตเนสรถ", en: "Car Fitness" },
    trends: { th: "แนวโน้ม", en: "Trends" },
    sharing: { th: "แชร์", en: "Sharing" },
    carColors: { th: "สีรถ", en: "Car Colors" },
    lywheels: { th: "LYWheels", en: "LYWheels" },
    shop: { th: "ร้านค้า", en: "Shop" },
    ranks: { th: "อันดับ", en: "Ranks" },
    profile: { th: "โปรไฟล์", en: "Profile" },
    settings: { th: "ตั้งค่า", en: "Settings" },
    calendar: { th: "ปฏิทิน", en: "Calendar" },
  },

  // Common
  common: {
    welcome: { th: "ยินดีต้อนรับสู่", en: "Welcome to" },
    level: { th: "ระดับ", en: "Level" },
    coins: { th: "เหรียญ", en: "Coins" },
    healthScore: { th: "คะแนนสุขภาพรถ", en: "Health Score" },
    loading: { th: "กำลังโหลด...", en: "Loading..." },
    save: { th: "บันทึก", en: "Save" },
    cancel: { th: "ยกเลิก", en: "Cancel" },
    confirm: { th: "ยืนยัน", en: "Confirm" },
    close: { th: "ปิด", en: "Close" },
    next: { th: "ถัดไป", en: "Next" },
    back: { th: "กลับ", en: "Back" },
    search: { th: "ค้นหา", en: "Search" },
    filter: { th: "กรอง", en: "Filter" },
    sort: { th: "เรียง", en: "Sort" },
    drivingSafety: { th: "อย่ากดเล่นขณะขับรถ", en: "Do not interact while driving" },
  },

  // Home
  home: {
    subtitle: {
      th: "แอปบูรณาการและไวเซอร์แบบมืออาชีพให้เช่น — รักษารถให้แข็งแรง เชื่อมต่อกับชุมชน และรับรางวัล",
      en: "Integrated platform and professional advisor — Keep your car strong, connect with community, and earn rewards",
    },
    aiDiagnose: { th: "วิเคราะห์ด้วย AI", en: "AI Diagnosis" },
    aiDiagnoseDesc: {
      th: "วิเคราะห์อาการรถด้วย AI และรับคำแนะนำทันที",
      en: "Analyze car symptoms with AI and get instant advice",
    },
    carHealth: { th: "สุขภาพรถ", en: "Car Health" },
    carHealthDesc: { th: "ตรวจสอบสุขภาพรถแบบเรียลไทม์ผ่าน OBD-II", en: "Monitor car health in real-time via OBD-II" },
    coinShop: { th: "ร้านค้า 24coin", en: "24coin Shop" },
    coinShopDesc: { th: "ใช้เหรียญแลกของรางวัลและคูปองส่วนลด", en: "Use coins to redeem rewards and discount coupons" },
    missions: { th: "ภารกิจ", en: "Missions" },
    missionsToday: { th: "ภารกิจวันนี้", en: "Today's Missions" },
  },

  // Features
  features: {
    obd: { th: "รองรับ OBD-II ผ่านบลูทูธและสายแลน", en: "OBD-II support via Bluetooth and cable" },
    community: { th: "ชุมชนและสังคมตามรุ่นรถ", en: "Community and social by car model" },
    ai: { th: "AI ประเมิน: ราคาขายและค่าความเสียหาย AI", en: "AI valuation: price and damage estimate" },
    gamification: { th: "ภารกิจและเลเวลแลกเหรียญเพื่อรับ 24coin", en: "Missions and levels to earn 24coin" },
  },

  // Garage
  garage: {
    title: { th: "โรงรถของฉัน", en: "My Garage" },
    addCar: { th: "เพิ่มรถ", en: "Add Car" },
    details: { th: "รายละเอียด", en: "Details" },
    history: { th: "ประวัติ", en: "History" },
    insurance: { th: "ประกันภัย", en: "Insurance" },
    tax: { th: "ภาษี", en: "Tax" },
  },

  // Games
  games: {
    title: { th: "เกมและความท้าทาย", en: "Games & Challenges" },
    leaderboard: { th: "กระดานผู้นำ", en: "Leaderboard" },
    myRank: { th: "อันดับของฉัน", en: "My Rank" },
    play: { th: "เล่น", en: "Play" },
    rewards: { th: "รางวัล", en: "Rewards" },
  },

  // Routes
  routes: {
    title: { th: "เส้นทางและบริการ", en: "Routes & Services" },
    nearby: { th: "ใกล้ฉัน", en: "Nearby" },
    navigate: { th: "นำทาง", en: "Navigate" },
    traffic: { th: "จราจร", en: "Traffic" },
    risk: { th: "ความเสี่ยง", en: "Risk" },
  },
} as const

export function t(key: string, lang: Language = "th"): string {
  const keys = key.split(".")
  let value: any = translations

  for (const k of keys) {
    value = value?.[k]
  }

  if (typeof value === "object" && value !== null) {
    return value[lang] || value.en || key
  }

  return key
}
