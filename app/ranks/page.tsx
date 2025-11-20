"use client"

import { useStore } from "@/lib/store"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, Crown } from "lucide-react"

const leaderboard = [
  { rank: 1, name: "DriftKing", xp: 15420, avatar: "/placeholder.svg?key=1", tier: "Diamond" },
  { rank: 2, name: "SpeedDemon", xp: 14200, avatar: "/placeholder.svg?key=2", tier: "Platinum" },
  { rank: 3, name: "EcoDriver", xp: 13850, avatar: "/placeholder.svg?key=3", tier: "Platinum" },
  { rank: 4, name: "CarLover99", xp: 12100, avatar: "/placeholder.svg?key=4", tier: "Gold" },
  { rank: 5, name: "CivicMaster", xp: 11500, avatar: "/placeholder.svg?key=5", tier: "Gold" },
  { rank: 6, name: "User123", xp: 10200, avatar: "/placeholder.svg?key=6", tier: "Silver" },
  { rank: 7, name: "RoadRunner", xp: 9800, avatar: "/placeholder.svg?key=7", tier: "Silver" },
]

export default function RanksPage() {
  const { language, user } = useStore()

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-500 fill-yellow-500" />
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400 fill-gray-400" />
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-700 fill-amber-700" />
    return <span className="font-bold text-muted-foreground w-6 text-center">{rank}</span>
  }

  return (
    <div className="container max-w-md mx-auto pb-24 pt-6 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{language === "th" ? "อันดับ" : "Leaderboard"}</h1>
        <div className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full text-primary font-bold text-sm">
          <Trophy className="w-4 h-4" />
          <span>{language === "th" ? "ลีกแพลตตินัม" : "Platinum League"}</span>
        </div>
      </div>

      <Tabs defaultValue="global" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="global">{language === "th" ? "ทั่วโลก" : "Global"}</TabsTrigger>
          <TabsTrigger value="friends">{language === "th" ? "เพื่อน" : "Friends"}</TabsTrigger>
          <TabsTrigger value="club">{language === "th" ? "คลับ" : "Club"}</TabsTrigger>
        </TabsList>
        <TabsContent value="global" className="mt-4 space-y-4">
          {leaderboard.map((item) => (
            <Card
              key={item.rank}
              className={`border-none shadow-sm ${item.name === user?.name ? "bg-primary/5 border-primary border-2" : ""}`}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className="flex items-center justify-center w-8">{getRankIcon(item.rank)}</div>
                <Avatar className="w-10 h-10 border-2 border-background">
                  <AvatarImage src={item.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{item.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-bold text-sm">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{item.tier}</div>
                </div>
                <div className="font-mono font-bold text-primary">{item.xp.toLocaleString()} XP</div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="friends">
          <div className="text-center py-12 text-muted-foreground">
            {language === "th" ? "เชื่อมต่อกับเพื่อนเพื่อดูอันดับ" : "Connect with friends to see rankings"}
          </div>
        </TabsContent>
        <TabsContent value="club">
          <div className="text-center py-12 text-muted-foreground">
            {language === "th" ? "เข้าร่วมคลับเพื่อดูอันดับ" : "Join a club to see rankings"}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
