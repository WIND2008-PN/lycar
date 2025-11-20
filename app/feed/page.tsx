"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import { t } from "@/lib/i18n"
import { generateFeed, type Post } from "@/lib/mock-data"
import { Heart, MessageCircle, Share2, Plus, Filter, Search } from "lucide-react"

export default function FeedPage() {
  const router = useRouter()
  const { language } = useStore()
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading feed
    setTimeout(() => {
      setPosts(generateFeed(1))
      setIsLoading(false)
    }, 1000)
  }, [])

  return (
    <div className="min-h-[100dvh] bg-background pb-20 safe-pb">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur border-b p-4 safe-pt">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">{t("nav.feed", language)}</h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Filter className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {["All", "Maintenance", "Trip", "Help", "Showcase"].map((cat) => (
            <Button
              key={cat}
              variant={cat === "All" ? "default" : "outline"}
              size="sm"
              className="rounded-full whitespace-nowrap"
            >
              {cat}
            </Button>
          ))}
        </div>
      </header>

      {/* Feed Content */}
      <main className="p-4 space-y-4">
        {isLoading
          ? // Skeleton Loading
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-1/3 bg-muted animate-pulse rounded" />
                    <div className="h-3 w-1/4 bg-muted animate-pulse rounded" />
                  </div>
                </div>
                <div className="h-24 bg-muted animate-pulse rounded" />
              </Card>
            ))
          : posts.map((post) => (
              <Card key={post.id} className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {post.author.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold flex items-center gap-2">
                      {post.author.name}
                      {post.author.badge && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                          {post.author.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">{new Date(post.timestamp).toLocaleDateString()}</div>
                  </div>
                </div>

                <p className="text-sm leading-relaxed mb-4">{language === "th" ? post.content.th : post.content.en}</p>

                <div className="flex items-center gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-xs text-primary bg-primary/5 px-2 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500">
                    <Heart className="w-4 h-4 mr-2" />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {post.comments}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    <Share2 className="w-4 h-4 mr-2" />
                    {language === "th" ? "แชร์" : "Share"}
                  </Button>
                </div>
              </Card>
            ))}
      </main>

      {/* Create Post FAB */}
      <Button
        className="fixed bottom-20 right-4 rounded-full w-14 h-14 shadow-lg z-40 md:bottom-8 md:right-24"
        onClick={() => router.push("/feed/create")}
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  )
}
