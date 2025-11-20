"use client"

import { useStore } from "@/lib/store"
import { t } from "@/lib/i18n"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Coins } from "lucide-react"

const shopItems = [
  {
    id: 1,
    name: "Shell Fuel Voucher",
    price: 500,
    image: "/placeholder.svg?text=Shell",
    category: "coupon",
    description: "100 THB discount on fuel",
  },
  {
    id: 2,
    name: "Car Wash Discount",
    price: 300,
    image: "/placeholder.svg?text=Wash",
    category: "coupon",
    description: "50% off at participating locations",
  },
  {
    id: 3,
    name: "Neon Underglow",
    price: 2500,
    image: "/placeholder.svg?text=Neon",
    category: "item",
    description: "Virtual neon lights for your car avatar",
  },
  {
    id: 4,
    name: "Premium Oil Change",
    price: 5000,
    image: "/placeholder.svg?text=Oil",
    category: "service",
    description: "Full synthetic oil change package",
  },
]

export default function ShopPage() {
  const { language, user } = useStore()

  return (
    <div className="container max-w-md mx-auto pb-24 pt-6 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("nav.shop", language)}</h1>
        <div className="flex items-center gap-2 bg-yellow-500/10 px-3 py-1 rounded-full text-yellow-600 font-bold">
          <Coins className="w-4 h-4 fill-yellow-600" />
          <span>{user?.coins?.toLocaleString() || 0}</span>
        </div>
      </div>

      <div className="relative h-40 rounded-xl overflow-hidden bg-gradient-to-r from-primary to-purple-600 text-white p-6 flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-2">{language === "th" ? "ข้อเสนอพิเศษ!" : "Special Offer!"}</h2>
        <p className="opacity-90 mb-4">
          {language === "th" ? "ลด 50% สำหรับไอเทมแต่งรถ" : "50% OFF on all car customization items"}
        </p>
        <Button variant="secondary" size="sm" className="w-fit">
          {language === "th" ? "ดูเลย" : "Check it out"}
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">{language === "th" ? "ทั้งหมด" : "All"}</TabsTrigger>
          <TabsTrigger value="coupon">{language === "th" ? "คูปอง" : "Coupons"}</TabsTrigger>
          <TabsTrigger value="item">{language === "th" ? "ไอเทม" : "Items"}</TabsTrigger>
          <TabsTrigger value="service">{language === "th" ? "บริการ" : "Services"}</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4 grid grid-cols-2 gap-4">
          {shopItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-square bg-muted flex items-center justify-center relative">
                <span className="text-muted-foreground text-xs">{item.category}</span>
                <Badge className="absolute top-2 right-2 bg-yellow-500 hover:bg-yellow-600 text-white border-none">
                  {item.price} 🪙
                </Badge>
              </div>
              <CardContent className="p-3">
                <h3 className="font-bold text-sm line-clamp-1">{item.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{item.description}</p>
                <Button size="sm" className="w-full mt-3 h-8 text-xs">
                  {language === "th" ? "แลก" : "Redeem"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
