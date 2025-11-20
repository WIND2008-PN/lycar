"use client"

import { useStore } from "@/lib/store"
import { t } from "@/lib/i18n"
import { generateLeaderboard } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Gamepad2, TrendingUp, TrendingDown, Minus, Crown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GamesPage() {
  const { language } = useStore()
  const leaderboard = generateLeaderboard()

  return (
    <div className="container max-w-md mx-auto pb-24 pt-6 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("games.title", language)}</h1>
        <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full">
          <Trophy className="w-4 h-4 text-primary" />
          <span className="font-bold text-primary">Rank #42</span>
        </div>
      </div>

      {/* Featured Game */}
      <Card className="bg-gradient-to-br from-primary to-orange-600 text-white border-none overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl" />
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gamepad2 className="w-6 h-6" />
            Eco-Driving Challenge
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-white/90">
            {language === "th"
              ? "ขับรถประหยัดน้ำมันที่สุดในสัปดาห์นี้เพื่อชิงรางวัลใหญ่!"
              : "Drive most efficiently this week to win big prizes!"}
          </p>
          <Button variant="secondary" className="w-full font-bold">
            {t("games.play", language)}
          </Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="leaderboard" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="leaderboard">{t("games.leaderboard", language)}</TabsTrigger>
          <TabsTrigger value="challenges">{t("missions.title", language)}</TabsTrigger>
        </TabsList>
        <TabsContent value="leaderboard" className="space-y-4 mt-4">
          {leaderboard.map((entry) => (
            <div key={entry.rank} className="flex items-center justify-between p-3 bg-card rounded-lg border shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 font-bold text-center text-muted-foreground">
                  {entry.rank <= 3 ? (
                    <Crown
                      className={`w-5 h-5 mx-auto ${
                        entry.rank === 1 ? "text-yellow-500" : entry.rank === 2 ? "text-gray-400" : "text-amber-700"
                      }`}
                    />
                  ) : (
                    entry.rank
                  )}
                </div>
                <Avatar className="h-10 w-10 border-2 border-background">
                  <AvatarImage src={`/diverse-avatars.png?height=40&width=40&query=avatar${entry.rank}`} />
                  <AvatarFallback>{entry.user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{entry.user.name}</p>
                  <p className="text-xs text-muted-foreground">{entry.tier}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">{entry.score.toLocaleString()}</p>
                <div className="flex items-center justify-end text-xs">
                  {entry.change === "up" ? (
                    <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                  ) : entry.change === "down" ? (
                    <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                  ) : (
                    <Minus className="w-3 h-3 text-muted-foreground mr-1" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="challenges">
          <div className="text-center py-8 text-muted-foreground">
            {language === "th" ? "ดูที่หน้าภารกิจ" : "Check Missions Page"}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
