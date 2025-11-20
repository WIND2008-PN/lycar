"use client"

import { useStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MapPin, Shield, Star } from "lucide-react"

const sharedCars = [
  {
    id: 1,
    name: "Honda Civic Turbo RS",
    image: "/honda-civic-white.jpg",
    owner: "Somchai",
    rating: 4.8,
    trips: 12,
    price: "1,500",
    location: "Siam Paragon, Bangkok",
    status: "available",
  },
  {
    id: 2,
    name: "Tesla Model 3",
    image: "/electric-car-showroom.png",
    owner: "Sarah",
    rating: 4.9,
    trips: 28,
    price: "2,200",
    location: "Thong Lo, Bangkok",
    status: "busy",
  },
  {
    id: 3,
    name: "Toyota Fortuner",
    image: "/modern-family-suv.png",
    owner: "Prasit",
    rating: 4.7,
    trips: 45,
    price: "1,800",
    location: "Mega Bangna",
    status: "available",
  },
]

export default function SharingPage() {
  const { language } = useStore()

  return (
    <div className="container max-w-md mx-auto pb-24 pt-6 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{language === "th" ? "รถเช่าและแบ่งปัน" : "Car Sharing"}</h1>
          <p className="text-sm text-muted-foreground">
            {language === "th" ? "ค้นหารถที่เหมาะกับการเดินทางของคุณ" : "Find the perfect car for your trip"}
          </p>
        </div>
        <Button variant="outline" size="icon">
          <MapPin className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {["All", "Sedan", "SUV", "EV", "Luxury"].map((type) => (
          <Badge key={type} variant={type === "All" ? "default" : "outline"} className="px-4 py-1 whitespace-nowrap">
            {type}
          </Badge>
        ))}
      </div>

      <div className="space-y-4">
        {sharedCars.map((car) => (
          <Card key={car.id} className="overflow-hidden">
            <div className="relative h-48 bg-muted">
              {/* In a real app, use Next.js Image */}
              <img src={car.image || "/placeholder.svg"} alt={car.name} className="w-full h-full object-cover" />
              <Badge
                className={`absolute top-2 right-2 ${
                  car.status === "available" ? "bg-green-500" : "bg-secondary text-secondary-foreground"
                }`}
              >
                {car.status === "available"
                  ? language === "th"
                    ? "ว่าง"
                    : "Available"
                  : language === "th"
                    ? "ไม่ว่าง"
                    : "Busy"}
              </Badge>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-lg">{car.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-3 h-3 mr-1" />
                    {car.location}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary">฿{car.price}</div>
                  <div className="text-xs text-muted-foreground">/{language === "th" ? "วัน" : "day"}</div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>{car.owner[0]}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <div className="font-medium">{car.owner}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Star className="w-3 h-3 text-yellow-500 mr-1 fill-yellow-500" />
                      {car.rating} • {car.trips} {language === "th" ? "ทริป" : "trips"}
                    </div>
                  </div>
                </div>
                <Button size="sm">{language === "th" ? "จองเลย" : "Book Now"}</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            {language === "th" ? "ประกันภัยคุ้มครอง" : "Insurance Included"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {language === "th"
              ? "ทุกการเช่ามาพร้อมกับประกันภัยชั้น 1 ขับขี่ได้อย่างสบายใจไร้กังวล"
              : "Every rental comes with first-class insurance. Drive with peace of mind."}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
