"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useStore } from "@/lib/store"
import { t } from "@/lib/i18n"
import { generateMissions } from "@/lib/mock-data"
import { Target, CheckCircle, Zap, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

export default function MissionsPage() {
  const router = useRouter()
  const { language, user, completeMission, coins, xp } = useStore()
  const [missions, setMissions] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("daily")

  useEffect(() => {
    if (user) {
      setMissions(generateMissions(user.id))
    }
  }, [user])

  const handleClaim = (id: string) => {
    completeMission(id)
    // Update local state to reflect change immediately
    setMissions((prev) => prev.map((m) => (m.id === id ? { ...m, completed: true, progress: m.total } : m)))
  }

  return (
    <div className="min-h-[100dvh] bg-background pb-20 safe-pb">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b p-4 safe-pt">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">{t("nav.missions", language)}</h1>
          <div className="flex items-center gap-2 bg-secondary px-3 py-1 rounded-full">
            <Trophy className="w-4 h-4 text-primary" />
            <span className="font-bold text-sm">{coins.toLocaleString()}</span>
          </div>
        </div>
      </header>

      <main className="p-4">
        <Tabs defaultValue="daily" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3 mb-6">
            <TabsTrigger value="daily">{language === "th" ? "รายวัน" : "Daily"}</TabsTrigger>
            <TabsTrigger value="weekly">{language === "th" ? "รายสัปดาห์" : "Weekly"}</TabsTrigger>
            <TabsTrigger value="seasonal">{language === "th" ? "ซีซั่น" : "Season"}</TabsTrigger>
          </TabsList>

          <div className="space-y-4">
            {missions
              .filter((m) => {
                if (activeTab === "daily") return m.type === "daily"
                if (activeTab === "weekly") return m.type === "weekly"
                return m.type === "seasonal" || m.type === "dynamic"
              })
              .map((mission) => (
                <Card
                  key={mission.id}
                  className={cn(
                    "p-4 transition-all duration-300",
                    mission.completed ? "opacity-75 bg-muted/50" : "hover:shadow-md",
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "p-3 rounded-xl flex-shrink-0",
                        mission.completed ? "bg-green-500/10 text-green-500" : "bg-primary/10 text-primary",
                      )}
                    >
                      {mission.completed ? <CheckCircle className="w-6 h-6" /> : <Target className="w-6 h-6" />}
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-base">
                            {language === "th" ? mission.title.th : mission.title.en}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {language === "th" ? mission.description.th : mission.description.en}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs font-medium">
                        <div className="flex items-center gap-1 text-amber-500">
                          <Trophy className="w-3 h-3" />+{mission.coins}
                        </div>
                        <div className="flex items-center gap-1 text-blue-500">
                          <Zap className="w-3 h-3" />+{mission.xp} XP
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{language === "th" ? "ความคืบหน้า" : "Progress"}</span>
                          <span>
                            {mission.progress} / {mission.total}
                          </span>
                        </div>
                        <Progress value={(mission.progress / mission.total) * 100} className="h-2" />
                      </div>

                      {!mission.completed && mission.progress >= mission.total && (
                        <Button className="w-full mt-2 animate-pulse" size="sm" onClick={() => handleClaim(mission.id)}>
                          {language === "th" ? "รับรางวัล" : "Claim Reward"}
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </Tabs>
      </main>
    </div>
  )
}
