"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useStore } from "@/lib/store"
import { t } from "@/lib/i18n"
import { Trophy, ArrowRight } from "lucide-react"

export default function RewardsPage() {
  const router = useRouter()
  const { language, coins } = useStore()
  const [activeCategory, setActiveCategory] = useState("all")

  const rewards = [
    {
      id: 1,
      title: { th: "ส่วนลดน้ำมัน 100 บาท", en: "100 THB Fuel Discount" },
      cost: 500,
      image: "⛽️",
      category: "coupon",
      hot: true,
    },
    {
      id: 2,
      title: { th: "ล้างรถฟรี 1 ครั้ง", en: "Free Car Wash" },
      cost: 1200,
      image: "🚿",
      category: "service",
      hot: false,
    },
    {
      id: 3,
      title: { th: "กรอบป้ายทะเบียน LYCAR", en: "LYCAR Plate Frame" },
      cost: 2500,
      image: "🚗",
      category: "item",
      hot: false,
    },
    {
      id: 4,
      title: { th: "กาแฟฟรี 1 แก้ว", en: "Free Coffee" },
      cost: 300,
      image: "☕️",
      category: "coupon",
      hot: true,
    },
  ]

  return (
    <div className="min-h-[100dvh] bg-background pb-20 safe-pb">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b p-4 safe-pt">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">{t("nav.rewards", language)}</h1>
          <div className="flex items-center gap-2 bg-amber-500/10 text-amber-600 px-3 py-1 rounded-full border border-amber-500/20">
            <Trophy className="w-4 h-4" />
            <span className="font-bold text-sm">{coins.toLocaleString()}</span>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {[
            { id: "all", label: language === "th" ? "ทั้งหมด" : "All" },
            { id: "coupon", label: language === "th" ? "คูปอง" : "Coupons" },
            { id: "item", label: language === "th" ? "ของสะสม" : "Items" },
            { id: "service", label: language === "th" ? "บริการ" : "Services" },
          ].map((cat) => (
            <Button
              key={cat.id}
              variant={activeCategory === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat.id)}
              className="rounded-full whitespace-nowrap"
            >
              {cat.label}
            </Button>
          ))}
        </div>
      </header>

      <main className="p-4 grid grid-cols-2 gap-4">
        {rewards
          .filter((r) => activeCategory === "all" || r.category === activeCategory)
          .map((reward) => (
            <Card key={reward.id} className="overflow-hidden group cursor-pointer hover:shadow-md transition-all">
              <div className="aspect-square bg-muted flex items-center justify-center text-6xl relative">
                {reward.image}
                {reward.hot && <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">HOT</Badge>}
              </div>
              <div className="p-3">
                <h3 className="font-medium text-sm line-clamp-2 mb-2 h-10">
                  {language === "th" ? reward.title.th : reward.title.en}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="text-amber-600 font-bold text-sm flex items-center gap-1">
                    <Trophy className="w-3 h-3" />
                    {reward.cost}
                  </div>
                  <Button size="icon" variant="ghost" className="h-6 w-6">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
      </main>
    </div>
  )
}
