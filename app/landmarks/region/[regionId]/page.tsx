"use client"

import { useStore } from "@/lib/store"
import { MOCK_LANDMARKS, REGIONS } from "@/lib/landmarks-data"
import { useRouter, useParams } from "next/navigation"
import { ChevronLeft, MapPin, Navigation, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

export default function RegionPage() {
  const { language } = useStore()
  const router = useRouter()
  const params = useParams()
  const regionId = params.regionId as string

  // Find region name efficiently
  let regionName = "Unknown Region"
  Object.values(REGIONS).forEach((countryRegions) => {
    const found = countryRegions.find((r) => r.id === regionId)
    if (found) regionName = found.name
  })

  const regionLandmarks = MOCK_LANDMARKS.filter((l) => l.regionId === regionId)

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b">
        <div className="flex items-center gap-2 p-4 pt-14 md:pt-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold">{regionName}</h1>
            <p className="text-xs text-muted-foreground">
              {regionLandmarks.length} {language === "th" ? "สถานที่น่าสนใจ" : "Points of Interest"}
            </p>
          </div>
          <Button size="sm" variant="outline" className="gap-2 bg-transparent">
            <Navigation className="w-4 h-4" />
            {language === "th" ? "แนะนำเส้นทาง" : "Route"}
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-80px)]">
        {/* Map Placeholder */}
        <div className="h-48 w-full bg-muted relative">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=800&text=Interactive+Map')] bg-cover bg-center opacity-50" />
          <div className="absolute bottom-2 right-2">
            <Button size="sm" className="shadow-md">
              <MapPin className="w-4 h-4 mr-2" />
              {language === "th" ? "ดูแผนที่" : "View Map"}
            </Button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          {regionLandmarks.map((landmark) => (
            <Card
              key={landmark.id}
              className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => router.push(`/landmarks/poi/${landmark.id}`)}
            >
              <div className="flex h-32">
                <div className="w-1/3 relative">
                  <img
                    src={landmark.photos[0] || "/placeholder.svg"}
                    alt={landmark.name}
                    className="w-full h-full object-cover"
                  />
                  {landmark.points >= 30 && (
                    <Badge className="absolute top-1 left-1 bg-yellow-500 hover:bg-yellow-600 border-0 text-[10px]">
                      Hard
                    </Badge>
                  )}
                </div>
                <div className="w-2/3 p-3 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold line-clamp-1">{landmark.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{landmark.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="secondary" className="text-[10px]">
                      {landmark.type}
                    </Badge>
                    <div className="text-sm font-bold text-primary">+{landmark.points} XP</div>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {regionLandmarks.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              <Info className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p>{language === "th" ? "ยังไม่มีข้อมูลในโซนนี้" : "No data for this region yet"}</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
