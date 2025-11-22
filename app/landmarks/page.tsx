"use client"

import { useState } from "react"
import { useStore } from "@/lib/store"
import { Search, Compass, Trophy, Bookmark, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { COUNTRIES, MOCK_LANDMARKS, type LandmarkType } from "@/lib/landmarks-data"
import { useRouter } from "next/navigation"

export default function LandmarksPage() {
  const { language } = useStore()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  // Featured landmarks (Top Picks Worldwide)
  const topPicks = MOCK_LANDMARKS.slice(0, 5)

  // Filter types
  const landmarkTypes: { id: LandmarkType | "all"; label: string }[] = [
    { id: "all", label: language === "th" ? "ทั้งหมด" : "All" },
    { id: "nature", label: language === "th" ? "ธรรมชาติ" : "Nature" },
    { id: "culture", label: language === "th" ? "วัฒนธรรม" : "Culture" },
    { id: "auto", label: language === "th" ? "ยานยนต์" : "Automotive" },
    { id: "service", label: language === "th" ? "บริการ" : "Service" },
  ]
  const [activeType, setActiveType] = useState<LandmarkType | "all">("all")

  const filteredLandmarks = MOCK_LANDMARKS.filter(
    (l) =>
      (activeType === "all" || l.type === activeType) &&
      (l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        COUNTRIES.find((c) => c.code === l.countryCode)
          ?.name.toLowerCase()
          .includes(searchQuery.toLowerCase())),
  )

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b">
        <div className="flex items-center justify-between p-4 pt-14 md:pt-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Compass className="w-6 h-6 text-primary" />
            {language === "th" ? "แลนด์มาร์ค" : "Landmarks"}
          </h1>
          <Button variant="ghost" size="icon" onClick={() => router.push("/landmarks/my-collection")}>
            <Bookmark className="w-5 h-5" />
          </Button>
        </div>

        {/* Search & Filter */}
        <div className="px-4 pb-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={language === "th" ? "ค้นหาแลนด์มาร์ค, ประเทศ..." : "Search landmarks, countries..."}
              className="pl-9 bg-secondary/50 border-0"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-2">
              {landmarkTypes.map((type) => (
                <Button
                  key={type.id}
                  variant={activeType === type.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveType(type.id)}
                  className="rounded-full"
                >
                  {type.label}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 space-y-8">
          {/* World Map Placeholder (Visual Entry) */}
          <div className="relative rounded-xl overflow-hidden aspect-[2/1] bg-muted group cursor-pointer border border-border/50 shadow-sm">
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=400&text=World+Map')] bg-cover bg-center opacity-70 group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-lg font-bold mb-1">{language === "th" ? "สำรวจโลกกว้าง" : "Explore the World"}</h3>
              <p className="text-sm text-muted-foreground">
                {language === "th"
                  ? "ค้นพบจุดหมายปลายทางที่น่าตื่นเต้นกว่า 190+ แห่ง"
                  : "Discover over 190+ exciting destinations"}
              </p>
            </div>
          </div>

          {/* Top Picks */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                {language === "th" ? "แนะนำทั่วโลก" : "Top Picks Worldwide"}
              </h2>
            </div>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-4 pb-4">
                {topPicks.map((landmark) => (
                  <div
                    key={landmark.id}
                    className="w-[200px] shrink-0 cursor-pointer"
                    onClick={() => router.push(`/landmarks/poi/${landmark.id}`)}
                  >
                    <div className="aspect-[4/3] rounded-xl overflow-hidden mb-2 relative">
                      <img
                        src={landmark.photos[0] || "/placeholder.svg"}
                        alt={landmark.name}
                        className="w-full h-full object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-black/50 backdrop-blur text-white border-0">
                        {landmark.points} XP
                      </Badge>
                    </div>
                    <h3 className="font-semibold truncate">{landmark.name}</h3>
                    <div className="flex items-center text-xs text-muted-foreground gap-1">
                      <span>{COUNTRIES.find((c) => c.code === landmark.countryCode)?.flag}</span>
                      <span>{COUNTRIES.find((c) => c.code === landmark.countryCode)?.name}</span>
                    </div>
                  </div>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </section>

          {/* Countries List */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold">{language === "th" ? "ประเทศ" : "Countries"}</h2>
            <div className="grid grid-cols-2 gap-3">
              {COUNTRIES.map((country) => (
                <Card
                  key={country.code}
                  className="overflow-hidden hover:bg-muted/50 cursor-pointer transition-colors border-0 shadow-sm bg-muted/20"
                  onClick={() => router.push(`/landmarks/country/${country.code}`)}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{country.flag}</span>
                      <span className="font-medium">{country.name}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </ScrollArea>
    </div>
  )
}
