"use client"

import { useStore } from "@/lib/store"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { Check, RotateCcw } from "lucide-react"

const colors = [
  { name: "White", value: "bg-white", hex: "#FFFFFF" },
  { name: "Black", value: "bg-black", hex: "#000000" },
  { name: "Silver", value: "bg-gray-400", hex: "#C0C0C0" },
  { name: "Red", value: "bg-red-600", hex: "#DC2626" },
  { name: "Blue", value: "bg-blue-600", hex: "#2563EB" },
  { name: "Orange", value: "bg-orange-500", hex: "#F97316" },
]

const wraps = [
  { name: "Carbon", image: "/placeholder.svg?text=Carbon" },
  { name: "Camo", image: "/placeholder.svg?text=Camo" },
  { name: "Matte", image: "/placeholder.svg?text=Matte" },
]

export default function CarColorsPage() {
  const { language } = useStore()
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [selectedWrap, setSelectedWrap] = useState(wraps[0])

  return (
    <div className="container max-w-md mx-auto pb-24 pt-6 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{language === "th" ? "ปรับแต่งสีรถ" : "Car Customization"}</h1>
        <Button variant="outline" size="icon">
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      <div className="aspect-video bg-muted rounded-xl flex items-center justify-center relative overflow-hidden">
        {/* Simulated Car Image with Color Overlay */}
        <div
          className="absolute inset-0 opacity-20 mix-blend-multiply transition-colors duration-500"
          style={{ backgroundColor: selectedColor.hex }}
        />
        <img src="/honda-civic-white.jpg" alt="Car" className="w-full h-full object-cover" />
        <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
          {selectedColor.name}
        </div>
      </div>

      <Tabs defaultValue="color" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="color">{language === "th" ? "สีรถ" : "Paint"}</TabsTrigger>
          <TabsTrigger value="wrap">{language === "th" ? "สติ๊กเกอร์" : "Wrap"}</TabsTrigger>
        </TabsList>
        <TabsContent value="color" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-4 gap-4">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    className={`w-full aspect-square rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedColor.name === color.name ? "border-primary scale-110" : "border-transparent"
                    } ${color.value}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {selectedColor.name === color.name && (
                      <Check
                        className={`w-6 h-6 ${color.name === "White" || color.name === "Silver" ? "text-black" : "text-white"}`}
                      />
                    )}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="wrap" className="mt-4">
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-4">
                {wraps.map((wrap) => (
                  <div
                    key={wrap.name}
                    className={`rounded-lg overflow-hidden border-2 cursor-pointer ${
                      selectedWrap.name === wrap.name ? "border-primary" : "border-transparent"
                    }`}
                    onClick={() => setSelectedWrap(wrap)}
                  >
                    <div className="aspect-square bg-muted flex items-center justify-center text-xs text-muted-foreground">
                      {wrap.name}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button className="w-full" size="lg">
        {language === "th" ? "บันทึกการเปลี่ยนแปลง" : "Save Changes"}
      </Button>
    </div>
  )
}
