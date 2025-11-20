"use client"

import { useStore } from "@/lib/store"
import { t } from "@/lib/i18n"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, AlertTriangle, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"

export default function RoutesPage() {
  const { language } = useStore()

  const services = [
    { name: "B-Quik", dist: "1.2 km", type: "Service Center", rating: 4.5 },
    { name: "PTT Station", dist: "2.5 km", type: "Gas Station", rating: 4.2 },
    { name: "Cockpit", dist: "3.8 km", type: "Tire Shop", rating: 4.0 },
  ]

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] pb-16 md:pb-0">
      {/* Map Area */}
      <div className="relative flex-1 bg-muted">
        <Image src="/map-navigation-ui.jpg" alt="Map" fill className="object-cover opacity-50" />

        {/* Search Bar Overlay */}
        <div className="absolute top-4 left-4 right-4 z-10">
          <div className="relative shadow-lg">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder={language === "th" ? "ค้นหาสถานที่..." : "Search places..."}
              className="pl-10 bg-background border-none h-12 rounded-xl"
            />
          </div>
        </div>

        {/* Risk Indicator Overlay */}
        <div className="absolute top-20 right-4 z-10">
          <div className="bg-background/90 backdrop-blur p-3 rounded-xl shadow-lg border border-border">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              <span className="text-xs font-bold">{t("routes.risk", language)}</span>
            </div>
            <div className="text-2xl font-bold text-green-500">Low</div>
          </div>
        </div>
      </div>

      {/* Bottom Sheet / List */}
      <div className="bg-background border-t rounded-t-xl -mt-4 relative z-20 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mb-4" />
        <h2 className="font-bold mb-4">{t("routes.nearby", language)}</h2>
        <div className="space-y-3">
          {services.map((service, i) => (
            <Card key={i} className="border-none bg-muted/50">
              <CardContent className="p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center shadow-sm">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">{service.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {service.type} • {service.rating} ★
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-muted-foreground">{service.dist}</span>
                  <Button size="icon" variant="default" className="h-8 w-8 rounded-full">
                    <Navigation className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
