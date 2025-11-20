"use client"

import { useStore } from "@/lib/store"
import { t } from "@/lib/i18n"
import { generateMyCars } from "@/lib/mock-data"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Calendar, Activity, AlertTriangle, CheckCircle } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export default function GaragePage() {
  const { language } = useStore()
  const cars = generateMyCars()

  return (
    <div className="container max-w-md mx-auto pb-24 pt-6 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("garage.title", language)}</h1>
        <Button size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          {t("garage.addCar", language)}
        </Button>
      </div>

      <div className="grid gap-6">
        {cars.map((car) => (
          <Card key={car.id} className="overflow-hidden border-none shadow-lg">
            <div className="relative h-48 w-full bg-muted">
              <Image src={car.image || "/placeholder.svg"} alt={car.model} fill className="object-cover" />
              <div className="absolute top-2 right-2">
                <Badge
                  variant={car.status === "good" ? "default" : car.status === "warning" ? "secondary" : "destructive"}
                  className={
                    car.status === "good" ? "bg-green-500" : car.status === "warning" ? "bg-yellow-500" : "bg-red-500"
                  }
                >
                  {car.status === "good" ? (
                    <CheckCircle className="w-3 h-3 mr-1" />
                  ) : (
                    <AlertTriangle className="w-3 h-3 mr-1" />
                  )}
                  {car.status.toUpperCase()}
                </Badge>
              </div>
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{car.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {car.model} • {car.year}
                  </p>
                </div>
                <Badge variant="outline" className="font-mono">
                  {car.plate}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-primary" />
                <span>{car.mileage.toLocaleString()} km</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{car.nextService}</span>
              </div>
            </CardContent>
            <CardFooter className="grid grid-cols-2 gap-2 bg-muted/50 p-4">
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                {t("garage.history", language)}
              </Button>
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                {t("garage.details", language)}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
