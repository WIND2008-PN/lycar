"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { t } from "@/lib/i18n"
import {
  Wrench,
  Activity,
  Target,
  Sparkles,
  Heart,
  Trophy,
  Map,
  TrendingUp,
  Users,
  Zap,
  ArrowRight,
  Coins,
} from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function HomePage() {
  const router = useRouter()
  const { user, language, level, xp, coins, healthScore, streak } = useStore()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) return null

  const xpForNextLevel = level * 1000
  const xpProgress = (xp % 1000) / 10

  return (
    <div className="min-h-[100dvh] bg-background pb-24 safe-pb">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-6 safe-px safe-pt">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-1">
                {t("common.welcome", language)} {user.displayName}
              </h1>
              <p className="text-primary-foreground/80 text-sm">{t("home.subtitle", language)}</p>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-full cursor-pointer hover:bg-white/30 transition-colors"
                onClick={() => router.push("/shop")}
              >
                <Coins className="w-4 h-4 text-yellow-300 fill-yellow-300" />
                <span className="text-sm font-bold text-white">{coins.toLocaleString()}</span>
              </div>
              <Avatar className="cursor-pointer border-2 border-white/20" onClick={() => router.push("/profile")}>
                <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                <AvatarFallback>{user?.displayName?.[0] || "U"}</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-2">
            <Link href="/profile/level">
              <Card className="p-3 bg-primary-foreground/10 backdrop-blur border-primary-foreground/20 hover:bg-primary-foreground/20 transition-colors cursor-pointer">
                <div className="text-xs text-primary-foreground/80 mb-1">{t("common.level", language)}</div>
                <div className="text-2xl font-bold">{level}</div>
              </Card>
            </Link>

            <Link href="/rewards/wallet">
              <Card className="p-3 bg-primary-foreground/10 backdrop-blur border-primary-foreground/20 hover:bg-primary-foreground/20 transition-colors cursor-pointer">
                <div className="text-xs text-primary-foreground/80 mb-1">{t("common.coins", language)}</div>
                <div className="text-2xl font-bold">{coins.toLocaleString()}</div>
              </Card>
            </Link>

            <Link href="/profile/streak">
              <Card className="p-3 bg-primary-foreground/10 backdrop-blur border-primary-foreground/20 hover:bg-primary-foreground/20 transition-colors cursor-pointer">
                <div className="text-xs text-primary-foreground/80 mb-1">{language === "th" ? "สตรีค" : "Streak"}</div>
                <div className="text-2xl font-bold">{streak}</div>
              </Card>
            </Link>

            <Link href="/car-health/score">
              <Card className="p-3 bg-primary-foreground/10 backdrop-blur border-primary-foreground/20 hover:bg-primary-foreground/20 transition-colors cursor-pointer">
                <div className="text-xs text-primary-foreground/80 mb-1">{language === "th" ? "คะแนน" : "Score"}</div>
                <div className="text-2xl font-bold">{healthScore}</div>
              </Card>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 space-y-6 safe-px">
        {/* Hero Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/diagnose">
            <Card className="p-6 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-primary-foreground/20">
                  <Wrench className="w-8 h-8" />
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-xl font-bold mb-2">{t("home.aiDiagnose", language)}</h3>
              <p className="text-sm text-primary-foreground/80 leading-relaxed">{t("home.aiDiagnoseDesc", language)}</p>
            </Card>
          </Link>

          <Link href="/home/daily-card">
            <Card className="p-6 bg-gradient-to-br from-accent to-accent/80 text-accent-foreground hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-accent-foreground/10">
                  <Sparkles className="w-8 h-8" />
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="text-xl font-bold mb-2">{language === "th" ? "AI การ์ดประจำวัน" : "Daily AI Card"}</h3>
              <p className="text-sm text-accent-foreground/80 leading-relaxed">
                {language === "th" ? "รับคำแนะนำและเคล็ดลับประจำวันจาก AI" : "Get daily tips and insights from AI"}
              </p>
            </Card>
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/car-health">
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Activity className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold group-hover:text-primary transition-colors">
                  {t("nav.carHealth", language)}
                </h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{t("home.carHealthDesc", language)}</p>
            </Card>
          </Link>

          <Link href="/missions/today">
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold group-hover:text-primary transition-colors">
                  {t("home.missionsToday", language)}
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold text-primary">3</div>
                <span className="text-sm text-muted-foreground">/4 {language === "th" ? "ภารกิจ" : "missions"}</span>
              </div>
            </Card>
          </Link>

          <Link href="/games/leaderboard">
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Trophy className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold group-hover:text-primary transition-colors">
                  {language === "th" ? "ลีดเดอร์บอร์ด" : "Leaderboard"}
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold text-primary">#127</div>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
            </Card>
          </Link>

          <Link href="/routes/nearby">
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Map className="w-5 h-5 text-primary" />
                </div>
                <h4 className="font-semibold group-hover:text-primary transition-colors">
                  {language === "th" ? "เส้นทางใกล้เคียง" : "Nearby Routes"}
                </h4>
              </div>
              <p className="text-sm text-muted-foreground">{language === "th" ? "5 เส้นทางปลอดภัย" : "5 safe routes"}</p>
            </Card>
          </Link>
        </div>

        {/* XP Progress */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <span className="font-semibold">{language === "th" ? "ความคืบหน้าระดับ" : "Level Progress"}</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {xp % 1000} / {xpForNextLevel} XP
            </span>
          </div>
          <Progress value={xpProgress} className="h-2" />
        </Card>

        {/* Recent Feed */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">{language === "th" ? "ฟีดล่าสุด" : "Recent Feed"}</h3>
            <Link href="/feed">
              <Button variant="ghost" size="sm">
                {language === "th" ? "ดูทั้งหมด" : "View All"}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="space-y-3">
            <Link href="/feed/post/1">
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium mb-1">
                      {language === "th" ? "ชุมชน Honda Civic" : "Honda Civic Community"}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {language === "th"
                        ? "เคล็ดลับการดูแลเครื่องยนต์ในช่วงฤดูร้อน แบ่งปันประสบการณ์กัน"
                        : "Tips for engine care during summer. Share your experience"}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" /> 24
                      </span>
                      <span>{language === "th" ? "2 ชม. ที่แล้ว" : "2h ago"}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/feed/post/2">
              <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium mb-1">
                      {language === "th" ? "ชุมชน Toyota Camry" : "Toyota Camry Community"}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {language === "th"
                        ? "แนะนำร้านซ่อมที่ไว้ใจได้ ราคาสมเหตุสมผล บริการดี"
                        : "Recommended trusted repair shops with reasonable prices"}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" /> 18
                      </span>
                      <span>{language === "th" ? "5 ชม. ที่แล้ว" : "5h ago"}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>

        {/* Rank Teaser */}
        <Link href="/ranks">
          <Card className="p-6 bg-gradient-to-br from-amber-500/10 to-amber-600/10 border-amber-500/20 hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-full bg-amber-500/20">
                <Trophy className="w-8 h-8 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-1">{language === "th" ? "อันดับของคุณ" : "Your Rank"}</h3>
                <p className="text-sm text-muted-foreground">
                  {language === "th"
                    ? "Silver Division 2 • ขับ 427 กม. ในสัปดาห์นี้"
                    : "Silver Division 2 • 427 km this week"}
                </p>
              </div>
              <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>
        </Link>
      </main>

      {/* Safety Banner */}
      <div className="fixed bottom-16 left-0 right-0 safe-pb z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-primary/90 backdrop-blur text-primary-foreground px-4 py-2 rounded-lg shadow-lg">
            <p className="text-xs text-center font-medium">{t("common.drivingSafety", language)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
