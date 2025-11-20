"use client"

import { useStore } from "@/lib/store"
import { t } from "@/lib/i18n"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Users, MessageSquare } from "lucide-react"

const communities = [
  {
    id: 1,
    name: "Honda Civic Thailand",
    members: "12.5k",
    active: "1.2k",
    image: "/classic-honda-civic.png",
    description: "Official community for Civic lovers in Thailand.",
    joined: true,
  },
  {
    id: 2,
    name: "EV Owners Club",
    members: "8.2k",
    active: "850",
    image: "/ev.jpg",
    description: "Sharing tips and charging spots for EV drivers.",
    joined: false,
  },
  {
    id: 3,
    name: "JDM Street Racing",
    members: "45k",
    active: "3.5k",
    image: "/jdm.jpg",
    description: "Underground car culture and meetups.",
    joined: false,
  },
  {
    id: 4,
    name: "DIY Car Maintenance",
    members: "15k",
    active: "500",
    image: "/mechanic-at-work.png",
    description: "Learn how to fix and maintain your car yourself.",
    joined: true,
  },
]

export default function CommunitiesPage() {
  const { language } = useStore()

  return (
    <div className="container max-w-md mx-auto pb-24 pt-6 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("nav.communities", language)}</h1>
        <Button variant="ghost" size="icon">
          <MessageSquare className="w-5 h-5" />
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder={language === "th" ? "ค้นหาคลับ..." : "Search clubs..."}
          className="pl-9 bg-muted/50 border-none"
        />
      </div>

      <div className="space-y-4">
        <h2 className="font-semibold text-lg">{language === "th" ? "คลับของคุณ" : "Your Clubs"}</h2>
        <div className="grid gap-4">
          {communities
            .filter((c) => c.joined)
            .map((community) => (
              <Card
                key={community.id}
                className="flex items-center p-4 gap-4 hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <Avatar className="w-12 h-12 rounded-lg">
                  <AvatarImage src={community.image || "/placeholder.svg"} />
                  <AvatarFallback>{community.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-bold">{community.name}</h3>
                  <div className="flex items-center text-xs text-muted-foreground gap-2">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" /> {community.members}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                    <span className="text-green-500">{community.active} online</span>
                  </div>
                </div>
                <Badge variant="secondary" className="ml-auto">
                  {language === "th" ? "เข้าชม" : "Visit"}
                </Badge>
              </Card>
            ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-semibold text-lg">{language === "th" ? "แนะนำสำหรับคุณ" : "Recommended"}</h2>
        <div className="grid gap-4">
          {communities
            .filter((c) => !c.joined)
            .map((community) => (
              <Card key={community.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-12 h-12 rounded-lg">
                      <AvatarImage src={community.image || "/placeholder.svg"} />
                      <AvatarFallback>{community.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-bold">{community.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{community.description}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center text-xs text-muted-foreground gap-1">
                          <Users className="w-3 h-3" /> {community.members}
                        </div>
                        <Button size="sm" variant="outline" className="h-7 ml-auto bg-transparent">
                          {language === "th" ? "เข้าร่วม" : "Join"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  )
}
