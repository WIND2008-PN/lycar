"use client"

import { useStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Activity, Zap, Gauge, Timer } from "lucide-react"

export default function CarFitnessPage() {
  const { language } = useStore()

  return (
    <div className="container max-w-md mx-auto pb-24 pt-6 px-4 space-y-6">
      <h1 className="text-2xl font-bold">{language === "th" ? "สมรรถนะรถยนต์" : "Car Fitness"}</h1>

      <Card className="bg-gradient-to-br from-primary to-orange-600 text-white border-none">
        <CardContent className="p-6 flex flex-col items-center justify-center text-center">
          <div className="text-6xl font-bold mb-2">94</div>
          <div className="text-lg opacity-90">{language === "th" ? "คะแนนความฟิต" : "Fitness Score"}</div>
          <div className="mt-4 w-full bg-white/20 h-2 rounded-full overflow-hidden">
            <div className="bg-white h-full w-[94%]" />
          </div>
          <p className="text-sm mt-2 opacity-80">
            {language === "th" ? "ยอดเยี่ยม! รถของคุณอยู่ในสภาพดีมาก" : "Excellent! Your car is in great shape."}
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Zap className="w-8 h-8 text-yellow-500 mb-2" />
            <div className="text-2xl font-bold">14.2</div>
            <div className="text-xs text-muted-foreground">km/L</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Gauge className="w-8 h-8 text-blue-500 mb-2" />
            <div className="text-2xl font-bold">120</div>
            <div className="text-xs text-muted-foreground">HP Used</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Activity className="w-8 h-8 text-green-500 mb-2" />
            <div className="text-2xl font-bold">98%</div>
            <div className="text-xs text-muted-foreground">Engine Health</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Timer className="w-8 h-8 text-red-500 mb-2" />
            <div className="text-2xl font-bold">2.4h</div>
            <div className="text-xs text-muted-foreground">Driving Time</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{language === "th" ? "การบำรุงรักษา" : "Maintenance Status"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{language === "th" ? "น้ำมันเครื่อง" : "Engine Oil"}</span>
              <span className="text-muted-foreground">85%</span>
            </div>
            <Progress value={85} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{language === "th" ? "ยางรถยนต์" : "Tires"}</span>
              <span className="text-muted-foreground">92%</span>
            </div>
            <Progress value={92} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>{language === "th" ? "แบตเตอรี่" : "Battery"}</span>
              <span className="text-muted-foreground">78%</span>
            </div>
            <Progress value={78} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
