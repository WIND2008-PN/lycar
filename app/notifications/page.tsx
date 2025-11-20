"use client"

import { useStore } from "@/lib/store"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Check, MessageCircle, Tag, AlertTriangle } from "lucide-react"

const notifications = [
  {
    id: 1,
    title: "Maintenance Alert",
    message: "Your engine oil check is due in 3 days.",
    time: "2h ago",
    type: "alert",
    read: false,
  },
  {
    id: 2,
    title: "New Comment",
    message: "DriftKing commented on your post: 'Nice ride!'",
    time: "5h ago",
    type: "social",
    read: true,
  },
  {
    id: 3,
    title: "Special Offer",
    message: "Get 20% off on your next car wash.",
    time: "1d ago",
    type: "promo",
    read: true,
  },
  {
    id: 4,
    title: "Mission Complete",
    message: "You completed 'Weekly Driver' and earned 500 XP.",
    time: "2d ago",
    type: "system",
    read: true,
  },
]

export default function NotificationsPage() {
  const { language } = useStore()

  const getIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      case "social":
        return <MessageCircle className="w-5 h-5 text-blue-500" />
      case "promo":
        return <Tag className="w-5 h-5 text-green-500" />
      default:
        return <Bell className="w-5 h-5 text-primary" />
    }
  }

  return (
    <div className="container max-w-md mx-auto pb-24 pt-6 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{language === "th" ? "การแจ้งเตือน" : "Notifications"}</h1>
        <Button variant="ghost" size="sm" className="text-xs">
          <Check className="w-4 h-4 mr-1" />
          {language === "th" ? "อ่านทั้งหมด" : "Mark all read"}
        </Button>
      </div>

      <div className="space-y-2">
        {notifications.map((notification) => (
          <Card key={notification.id} className={notification.read ? "opacity-70" : "border-l-4 border-l-primary"}>
            <CardContent className="p-4 flex gap-4">
              <div className={`p-2 rounded-full ${notification.read ? "bg-muted" : "bg-primary/10"}`}>
                {getIcon(notification.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className={`text-sm ${notification.read ? "font-medium" : "font-bold"}`}>{notification.title}</h3>
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
