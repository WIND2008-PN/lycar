"use client"

import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { CheckCircle2, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

const checklistItems = [
  { id: "tires", label: { en: "Check tire pressure and tread", th: "ตรวจสอบลมยางและดอกยาง" } },
  { id: "oil", label: { en: "Check engine oil level", th: "ตรวจสอบระดับน้ำมันเครื่อง" } },
  { id: "lights", label: { en: "Check all lights (head, tail, brake)", th: "ตรวจสอบไฟส่องสว่างทั้งหมด" } },
  { id: "wipers", label: { en: "Check wiper blades and fluid", th: "ตรวจสอบใบปัดน้ำฝนและน้ำฉีดกระจก" } },
  { id: "brakes", label: { en: "Check brake fluid level", th: "ตรวจสอบระดับน้ำมันเบรก" } },
]

export default function QuickCheckPage() {
  const { language, addXP } = useStore()
  const router = useRouter()
  const [checkedItems, setCheckedItems] = useState<string[]>([])
  const [completed, setCompleted] = useState(false)

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const handleSubmit = () => {
    setCompleted(true)
    addXP(50) // Award XP for completing the check
    setTimeout(() => {
      router.push("/car-health")
    }, 2000)
  }

  if (completed) {
    return (
      <div className="container max-w-md mx-auto h-screen flex flex-col items-center justify-center p-4 text-center space-y-6">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-2">{language === "th" ? "ตรวจสอบเสร็จสิ้น!" : "Check Complete!"}</h1>
          <p className="text-muted-foreground">
            {language === "th" ? "คุณได้รับ 50 XP สำหรับการดูแลรถของคุณ" : "You earned 50 XP for taking care of your car."}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-md mx-auto pb-24 pt-6 px-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{language === "th" ? "ตรวจเช็คด่วน" : "Quick Check"}</h1>
        <p className="text-muted-foreground">
          {language === "th" ? "ใช้เวลาสักครู่เพื่อตรวจสอบความพร้อมของรถ" : "Take a moment to ensure your car is road-ready."}
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          {checklistItems.map((item) => (
            <div key={item.id} className="flex items-start space-x-3">
              <Checkbox
                id={item.id}
                checked={checkedItems.includes(item.id)}
                onCheckedChange={() => toggleItem(item.id)}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor={item.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {language === "th" ? item.label.th : item.label.en}
                </label>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="bg-blue-50 p-4 rounded-lg flex gap-3 items-start">
        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
        <p className="text-sm text-blue-800">
          {language === "th"
            ? "การตรวจเช็คเป็นประจำช่วยลดโอกาสเกิดอุบัติเหตุและยืดอายุการใช้งานรถของคุณ"
            : "Regular checks reduce the risk of accidents and extend your car's lifespan."}
        </p>
      </div>

      <Button
        className="w-full"
        size="lg"
        disabled={checkedItems.length !== checklistItems.length}
        onClick={handleSubmit}
      >
        {language === "th" ? "ยืนยันการตรวจสอบ" : "Complete Check"}
      </Button>
    </div>
  )
}
