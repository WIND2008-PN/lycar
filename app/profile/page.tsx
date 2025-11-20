"use client"

import { cn } from "@/lib/utils"

import type React from "react"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useStore } from "@/lib/store"
import { t } from "@/lib/i18n"
import { Settings, LogOut, ChevronRight, Car, Trophy, Zap, Shield } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const { user, language, setUser, level, xp, coins, plan } = useStore()

  if (!user) return null

  const handleLogout = () => {
    setUser(null)
    router.push("/login")
  }

  return (
    <div className="min-h-[100dvh] bg-background pb-20 safe-pb">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b p-4 safe-pt flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t("nav.profile", language)}</h1>
        <Button variant="ghost" size="icon" onClick={() => router.push("/settings")}>
          <Settings className="w-5 h-5" />
        </Button>
      </header>

      <main className="p-4 space-y-6">
        {/* Profile Header */}
        <div className="flex items-center gap-4">
          <Avatar className="w-20 h-20 border-2 border-primary">
            <AvatarImage src={user.avatar || "/placeholder.svg"} />
            <AvatarFallback className="text-xl bg-primary/10 text-primary">{user.displayName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-bold">{user.displayName}</h2>
            <p className="text-muted-foreground text-sm">{user.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant={plan === "plus" ? "default" : "secondary"}>
                {plan === "plus" ? "LYCAR+" : "Free Plan"}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {language === "th" ? `สมาชิกตั้งแต่ 2024` : `Member since 2024`}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center bg-primary/5 border-primary/20">
            <div className="flex justify-center mb-2">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold">{level}</div>
            <div className="text-xs text-muted-foreground">{t("common.level", language)}</div>
          </Card>
          <Card className="p-4 text-center bg-amber-500/5 border-amber-500/20">
            <div className="flex justify-center mb-2">
              <Trophy className="w-6 h-6 text-amber-500" />
            </div>
            <div className="text-2xl font-bold">{coins.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">{t("common.coins", language)}</div>
          </Card>
          <Card className="p-4 text-center bg-blue-500/5 border-blue-500/20">
            <div className="flex justify-center mb-2">
              <Shield className="w-6 h-6 text-blue-500" />
            </div>
            <div className="text-2xl font-bold">87</div>
            <div className="text-xs text-muted-foreground">{t("common.healthScore", language)}</div>
          </Card>
        </div>

        {/* Menu Items */}
        <Card className="divide-y">
          <div
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => router.push("/garage")}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Car className="w-5 h-5" />
              </div>
              <span className="font-medium">{t("nav.garage", language)}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>

          <div
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => router.push("/rewards/wallet")}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500">
                <Trophy className="w-5 h-5" />
              </div>
              <span className="font-medium">{language === "th" ? "กระเป๋าเหรียญ" : "Coin Wallet"}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </Card>

        <Button variant="destructive" className="w-full" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          {language === "th" ? "ออกจากระบบ" : "Sign Out"}
        </Button>
      </main>
    </div>
  )
}

function Badge({ children, variant = "default" }: { children: React.ReactNode; variant?: "default" | "secondary" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variant === "default"
          ? "bg-primary text-primary-foreground hover:bg-primary/80"
          : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      )}
    >
      {children}
    </span>
  )
}
