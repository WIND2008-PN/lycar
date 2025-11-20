"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useStore } from "@/lib/store"
import { t } from "@/lib/i18n"
import { useTheme } from "next-themes"
import { ArrowLeft, Globe, Moon, Bell, Shield, Smartphone } from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()
  const { language, setLanguage } = useStore()
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-[100dvh] bg-background pb-20 safe-pb">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b p-4 safe-pt flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold">{t("nav.settings", language)}</h1>
      </header>

      <main className="p-4 space-y-6">
        {/* Appearance */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-1">
            {language === "th" ? "การแสดงผล" : "Appearance"}
          </h2>
          <Card className="divide-y">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-muted-foreground" />
                <div className="space-y-0.5">
                  <Label>{language === "th" ? "ภาษา" : "Language"}</Label>
                  <p className="text-xs text-muted-foreground">{language === "th" ? "ไทย" : "English"}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setLanguage(language === "th" ? "en" : "th")}>
                {language === "th" ? "EN" : "TH"}
              </Button>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-muted-foreground" />
                <div className="space-y-0.5">
                  <Label>{language === "th" ? "โหมดมืด" : "Dark Mode"}</Label>
                  <p className="text-xs text-muted-foreground">
                    {language === "th" ? "ปรับแต่งธีมของแอป" : "Customize app theme"}
                  </p>
                </div>
              </div>
              <Switch checked={theme === "dark"} onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} />
            </div>
          </Card>
        </section>

        {/* Notifications */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-1">
            {language === "th" ? "การแจ้งเตือน" : "Notifications"}
          </h2>
          <Card className="divide-y">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <div className="space-y-0.5">
                  <Label>{language === "th" ? "แจ้งเตือนทั่วไป" : "Push Notifications"}</Label>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-muted-foreground" />
                <div className="space-y-0.5">
                  <Label>{language === "th" ? "แจ้งเตือนความปลอดภัย" : "Security Alerts"}</Label>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </Card>
        </section>

        {/* Devices */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-1">
            {language === "th" ? "อุปกรณ์" : "Devices"}
          </h2>
          <Card className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-muted-foreground" />
              <div className="space-y-0.5">
                <Label>OBD-II Simulator</Label>
                <p className="text-xs text-green-500 font-medium">{language === "th" ? "เชื่อมต่อแล้ว" : "Connected"}</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              {language === "th" ? "ตั้งค่า" : "Config"}
            </Button>
          </Card>
        </section>

        <div className="text-center text-xs text-muted-foreground pt-4">LYCAR v1.0.0 (Build 2024.1)</div>
      </main>
    </div>
  )
}
