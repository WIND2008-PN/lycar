"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import { Sparkles, ArrowLeft, Share2, Bookmark } from "lucide-react"

export default function DailyCardPage() {
  const router = useRouter()
  const { language } = useStore()

  return (
    <div className="min-h-[100dvh] bg-background safe-px safe-pt safe-pb">
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex items-center gap-2 mb-6">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold">{language === "th" ? "AI การ์ดประจำวัน" : "Daily AI Card"}</h1>
        </div>

        <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary">
              <Sparkles className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <div className="font-semibold">{language === "th" ? "คำแนะนำวันนี้" : "Today's Tip"}</div>
              <div className="text-xs text-muted-foreground">
                {new Date().toLocaleDateString(language === "th" ? "th-TH" : "en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-balance">
              {language === "th" ? "เช็คระดับน้ำมันเครื่องเป็นประจำ" : "Check Your Engine Oil Regularly"}
            </h2>
            <p className="text-muted-foreground leading-relaxed text-pretty">
              {language === "th"
                ? "การตรวจสอบระดับน้ำมันเครื่องอย่างสมํ่าเสมอจะช่วยยืดอายุเครื่องยนต์ของคุณ ควรตรวจสอบทุก 2 สัปดาห์หรือก่อนเดินทางไกล"
                : "Regularly checking your engine oil level helps extend the life of your engine. Check every 2 weeks or before long trips."}
            </p>

            <div className="p-4 bg-muted rounded-lg">
              <div className="font-medium mb-2">{language === "th" ? "วิธีตรวจสอบ:" : "How to check:"}</div>
              <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                <li>{language === "th" ? "จอดรถบนพื้นราบ" : "Park on level ground"}</li>
                <li>{language === "th" ? "ปิดเครื่องยนต์รอ 5-10 นาที" : "Turn off engine, wait 5-10 minutes"}</li>
                <li>{language === "th" ? "ดึงแท่งวัดน้ำมันออกมา" : "Pull out dipstick"}</li>
                <li>{language === "th" ? "เช็ดให้สะอาดแล้วเสียบกลับ" : "Wipe clean and reinsert"}</li>
                <li>{language === "th" ? "ดึงออกมาดูระดับน้ำมัน" : "Pull out to check level"}</li>
              </ol>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 bg-transparent">
                <Bookmark className="w-4 h-4 mr-2" />
                {language === "th" ? "บันทึก" : "Save"}
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                <Share2 className="w-4 h-4 mr-2" />
                {language === "th" ? "แชร์" : "Share"}
              </Button>
            </div>
          </div>
        </Card>

        <div className="mt-6 text-center">
          <Button variant="ghost" onClick={() => router.push("/home")}>
            {language === "th" ? "กลับหน้าหลัก" : "Back to Home"}
          </Button>
        </div>
      </div>
    </div>
  )
}
