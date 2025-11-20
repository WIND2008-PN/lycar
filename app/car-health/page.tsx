"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useStore } from "@/lib/store"
import { t } from "@/lib/i18n"
import { generateCarHealth, type CarHealthData } from "@/lib/mock-data"
import { Activity, Battery, Thermometer, Gauge, AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react"

export default function CarHealthPage() {
  const router = useRouter()
  const { language } = useStore()
  const [data, setData] = useState<CarHealthData | null>(null)
  const [isScanning, setIsScanning] = useState(false)

  const scan = () => {
    setIsScanning(true)
    setTimeout(() => {
      setData(generateCarHealth(Date.now()))
      setIsScanning(false)
    }, 2000)
  }

  useEffect(() => {
    scan()
  }, [])

  return (
    <div className="min-h-[100dvh] bg-background pb-20 safe-pb">
      <header className="flex items-center justify-between p-4 border-b bg-background/80 backdrop-blur sticky top-0 z-10 safe-pt">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-bold text-lg">{t("nav.carHealth", language)}</h1>
        </div>
        <Button variant="outline" size="sm" onClick={scan} disabled={isScanning}>
          <RefreshCw className={`w-4 h-4 mr-2 ${isScanning ? "animate-spin" : ""}`} />
          {language === "th" ? "สแกน" : "Scan"}
        </Button>
      </header>

      <main className="p-4 space-y-4">
        {/* Overall Status */}
        <Card className="p-6 text-center relative overflow-hidden">
          <div className={`absolute inset-0 opacity-10 ${data?.dtcCodes.length ? "bg-red-500" : "bg-green-500"}`} />
          <div className="relative z-10">
            <div className="text-sm text-muted-foreground mb-2">
              {language === "th" ? "สถานะภาพรวม" : "Overall Status"}
            </div>
            <div className={`text-3xl font-bold mb-2 ${data?.dtcCodes.length ? "text-red-500" : "text-green-500"}`}>
              {isScanning
                ? "Scanning..."
                : data?.dtcCodes.length
                  ? language === "th"
                    ? "พบปัญหา"
                    : "Issues Found"
                  : language === "th"
                    ? "ปกติ"
                    : "Normal"}
            </div>
            <div className="text-sm text-muted-foreground">{new Date().toLocaleString()}</div>
          </div>
        </Card>

        {/* Live Gauges */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2 text-muted-foreground">
              <Gauge className="w-4 h-4" />
              <span className="text-xs">RPM</span>
            </div>
            <div className="text-2xl font-bold font-mono">{data?.rpm ?? "--"}</div>
            <Progress value={(data?.rpm ?? 0) / 80} className="h-1 mt-2" />
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2 text-muted-foreground">
              <Thermometer className="w-4 h-4" />
              <span className="text-xs">Temp</span>
            </div>
            <div className="text-2xl font-bold font-mono">{data?.coolantTemp ?? "--"}°C</div>
            <Progress value={(data?.coolantTemp ?? 0) / 1.2} className="h-1 mt-2" />
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2 text-muted-foreground">
              <Battery className="w-4 h-4" />
              <span className="text-xs">Battery</span>
            </div>
            <div className="text-2xl font-bold font-mono">{data?.batteryVoltage.toFixed(1) ?? "--"}V</div>
            <Progress value={((data?.batteryVoltage ?? 0) - 10) * 20} className="h-1 mt-2" />
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2 mb-2 text-muted-foreground">
              <Activity className="w-4 h-4" />
              <span className="text-xs">Load</span>
            </div>
            <div className="text-2xl font-bold font-mono">{data?.engineLoad ?? "--"}%</div>
            <Progress value={data?.engineLoad ?? 0} className="h-1 mt-2" />
          </Card>
        </div>

        {/* DTC Codes */}
        {data?.dtcCodes.length ? (
          <Card className="p-4 border-red-500/20 bg-red-500/5">
            <div className="flex items-center gap-2 mb-4 text-red-500 font-bold">
              <AlertTriangle className="w-5 h-5" />
              {language === "th" ? "รหัสปัญหาที่พบ" : "Diagnostic Trouble Codes"}
            </div>
            <div className="space-y-2">
              {data.dtcCodes.map((code) => (
                <div key={code} className="flex items-center justify-between p-3 bg-background rounded-lg border">
                  <span className="font-mono font-bold">{code}</span>
                  <Button size="sm" variant="ghost" onClick={() => router.push(`/car-health/dtc/${code}`)}>
                    {language === "th" ? "ดูรายละเอียด" : "Details"}
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        ) : null}
      </main>
    </div>
  )
}
