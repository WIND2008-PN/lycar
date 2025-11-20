"use client"

import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ImageIcon, MapPin, Smile, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CreatePostPage() {
  const { language, user } = useStore()
  const router = useRouter()
  const [content, setContent] = useState("")

  const handlePost = () => {
    // In a real app, this would send data to an API
    router.push("/feed")
  }

  return (
    <div className="container max-w-md mx-auto h-screen flex flex-col bg-background">
      <div className="flex items-center justify-between p-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <X className="w-6 h-6" />
        </Button>
        <Button onClick={handlePost} disabled={!content.trim()} className="rounded-full px-6">
          {language === "th" ? "โพสต์" : "Post"}
        </Button>
      </div>

      <div className="flex-1 p-4">
        <div className="flex gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user?.avatar || "/placeholder.svg"} />
            <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-bold mb-1">{user?.name || "User"}</div>
            <Textarea
              placeholder={language === "th" ? "มีอะไรเกิดขึ้นบ้าง?" : "What's happening?"}
              className="min-h-[150px] border-none resize-none p-0 text-lg focus-visible:ring-0"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="p-4 border-t mt-auto">
        <div className="flex items-center gap-2 text-primary">
          <Button variant="ghost" size="icon" className="text-primary">
            <ImageIcon className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary">
            <MapPin className="w-6 h-6" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary">
            <Smile className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}
