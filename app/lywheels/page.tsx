"use client"

import { useStore } from "@/lib/store"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, MoreHorizontal, Play } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const videos = [
  {
    id: 1,
    user: "DriftKing",
    avatar: "/placeholder.svg?height=40&width=40",
    description: "Testing the new suspension setup! 🚗💨 #trackday #civic",
    likes: "12.5k",
    comments: "432",
    color: "bg-zinc-800",
  },
  {
    id: 2,
    user: "CarCarePro",
    avatar: "/placeholder.svg?height=40&width=40",
    description: "Quick tip: How to check your oil level correctly. 🔧 #maintenance #diy",
    likes: "8.2k",
    comments: "156",
    color: "bg-zinc-900",
  },
  {
    id: 3,
    user: "JDM_Lover",
    avatar: "/placeholder.svg?height=40&width=40",
    description: "Night run with the crew. The city lights look amazing. 🌃",
    likes: "25k",
    comments: "890",
    color: "bg-zinc-950",
  },
]

export default function LYWheelsPage() {
  const { language } = useStore()
  const [activeVideo, setActiveVideo] = useState(0)

  return (
    <div className="h-[calc(100vh-4rem)] md:h-[calc(100vh-64px)] w-full bg-black overflow-y-scroll snap-y snap-mandatory">
      {videos.map((video, index) => (
        <div
          key={video.id}
          className={cn("w-full h-full snap-start relative flex items-center justify-center", video.color)}
        >
          {/* Video Placeholder */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <Play className="w-24 h-24 text-white" />
          </div>

          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-4 pb-24 md:pb-8 bg-gradient-to-t from-black/80 via-transparent to-transparent">
            <div className="flex items-end justify-between">
              <div className="flex-1 mr-12">
                <div className="flex items-center gap-2 mb-3">
                  <Avatar className="w-10 h-10 border-2 border-white">
                    <AvatarImage src={video.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{video.user[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-bold text-white">@{video.user}</span>
                  <Button variant="secondary" size="sm" className="h-6 text-xs ml-2">
                    {language === "th" ? "ติดตาม" : "Follow"}
                  </Button>
                </div>
                <p className="text-white text-sm mb-4 line-clamp-2">{video.description}</p>
                <div className="flex items-center gap-2 text-white/80 text-xs">
                  <span>♫ Original Sound - {video.user}</span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-6">
                <div className="flex flex-col items-center gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full bg-white/10 hover:bg-white/20 text-white h-12 w-12"
                  >
                    <Heart className="w-6 h-6 fill-white/20" />
                  </Button>
                  <span className="text-xs text-white font-medium">{video.likes}</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full bg-white/10 hover:bg-white/20 text-white h-12 w-12"
                  >
                    <MessageCircle className="w-6 h-6" />
                  </Button>
                  <span className="text-xs text-white font-medium">{video.comments}</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="rounded-full bg-white/10 hover:bg-white/20 text-white h-12 w-12"
                  >
                    <Share2 className="w-6 h-6" />
                  </Button>
                  <span className="text-xs text-white font-medium">{language === "th" ? "แชร์" : "Share"}</span>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full bg-white/10 hover:bg-white/20 text-white h-12 w-12 mt-2"
                >
                  <MoreHorizontal className="w-6 h-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
