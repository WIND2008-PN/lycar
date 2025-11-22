"use client"

import { useStore } from "@/lib/store"
import { COUNTRIES, REGIONS, MOCK_LANDMARKS } from "@/lib/landmarks-data"
import { useRouter, useParams } from "next/navigation"
import { ChevronLeft, MapPin, Star, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function CountryPage() {
  const { language } = useStore()
  const router = useRouter()
  const params = useParams()
  const countryCode = params.code as string

  const country = COUNTRIES.find((c) => c.code === countryCode)
  const regions = REGIONS[countryCode] || []
  const countryLandmarks = MOCK_LANDMARKS.filter((l) => l.countryCode === countryCode)

  if (!country) return <div>Country not found</div>

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b">
        <div className="flex items-center gap-2 p-4 pt-14 md:pt-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <span className="text-2xl">{country.flag}</span>
            {country.name}
          </h1>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-80px)]">
        <div className="p-4 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-muted/30 rounded-xl">
              <div className="text-2xl font-bold text-primary">{countryLandmarks.length}</div>
              <div className="text-xs text-muted-foreground">{language === "th" ? "สถานที่" : "Landmarks"}</div>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-xl">
              <div className="text-2xl font-bold text-yellow-500 flex items-center justify-center gap-1">
                4.8 <Star className="w-3 h-3 fill-current" />
              </div>
              <div className="text-xs text-muted-foreground">{language === "th" ? "คะแนนเฉลี่ย" : "Avg Rating"}</div>
            </div>
            <div className="text-center p-3 bg-muted/30 rounded-xl">
              <div className="text-2xl font-bold text-blue-500 flex items-center justify-center gap-1">
                <Calendar className="w-4 h-4" />
              </div>
              <div className="text-xs text-muted-foreground">{language === "th" ? "เที่ยวได้ทั้งปี" : "All Year"}</div>
            </div>
          </div>

          {/* Regions */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold">{language === "th" ? "ภูมิภาค" : "Regions"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {regions.map((region) => {
                const regionLandmarkCount = countryLandmarks.filter((l) => l.regionId === region.id).length
                return (
                  <Card
                    key={region.id}
                    className="overflow-hidden hover:bg-muted/50 cursor-pointer transition-colors border-0 shadow-sm bg-muted/20"
                    onClick={() => router.push(`/landmarks/region/${region.id}`)}
                  >
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <div className="font-medium text-lg">{region.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {regionLandmarkCount} {language === "th" ? "สถานที่" : "Landmarks"}
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-background">
                        {language === "th" ? "สำรวจ" : "Explore"}
                      </Badge>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </section>

          {/* Editor's Picks (Mock) */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold">{language === "th" ? "แนะนำโดยบรรณาธิการ" : "Editor's Picks"}</h2>
            <div className="space-y-3">
              {countryLandmarks.slice(0, 3).map((landmark) => (
                <div
                  key={landmark.id}
                  className="flex gap-3 p-2 rounded-xl bg-card border hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => router.push(`/landmarks/poi/${landmark.id}`)}
                >
                  <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={landmark.photos[0] || "/placeholder.svg"}
                      alt={landmark.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center gap-1">
                    <h3 className="font-semibold">{landmark.name}</h3>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="text-[10px] h-5">
                        {landmark.type}
                      </Badge>
                      <Badge variant="outline" className="text-[10px] h-5">
                        {landmark.difficulty}
                      </Badge>
                    </div>
                    <div className="text-sm font-medium text-primary mt-1">+{landmark.points} XP</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </ScrollArea>
    </div>
  )
}
