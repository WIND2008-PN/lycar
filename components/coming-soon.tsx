"use client"

import { Construction } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store"
import { t } from "@/lib/i18n"

export function ComingSoon({ title }: { title: string }) {
  const router = useRouter()
  const { language } = useStore()

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center space-y-6">
      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center animate-pulse">
        <Construction className="w-12 h-12 text-muted-foreground" />
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          {language === "th"
            ? "ฟีเจอร์นี้กำลังอยู่ระหว่างการพัฒนา เตรียมพบกับความตื่นเต้นเร็วๆ นี้!"
            : "This feature is currently under development. Stay tuned for updates!"}
        </p>
      </div>
      <Button onClick={() => router.back()} variant="outline">
        {t("common.back", language)}
      </Button>
    </div>
  )
}
