"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import { Wrench, Mail, Lock, Chrome } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { setUser, language } = useStore()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Mock login
    setTimeout(() => {
      setUser({
        id: "user-1",
        email: email || "demo@lycar.com",
        displayName: "Demo User",
        avatar: undefined,
      })
      setIsLoading(false)
      router.push("/home")
    }, 1000)
  }

  const handleGoogleLogin = () => {
    setIsLoading(true)
    setTimeout(() => {
      setUser({
        id: "user-google",
        email: "demo@gmail.com",
        displayName: "Demo User",
        avatar: undefined,
      })
      setIsLoading(false)
      router.push("/home")
    }, 1000)
  }

  const handleGuestMode = () => {
    setUser({
      id: "guest",
      email: "guest@lycar.com",
      displayName: "Guest",
      avatar: undefined,
    })
    router.push("/home")
  }

  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4 safe-px safe-pt safe-pb">
      {/* Logo and Brand */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary mb-4">
          <Wrench className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-2">LYCAR</h1>
        <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
          {language === "th" ? "แอปบูรณาการและไวเซอร์แบบมืออาชีพให้เช่น" : "Your Professional Car Care Companion"}
        </p>
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold">{language === "th" ? "เข้าสู่ระบบ" : "Sign In"}</h2>
          <p className="text-sm text-muted-foreground">
            {language === "th" ? "เข้าสู่ระบบเพื่อเริ่มต้นใช้งาน" : "Sign in to start managing your car"}
          </p>
        </div>

        {/* Google Sign In */}
        <Button variant="outline" className="w-full bg-transparent" onClick={handleGoogleLogin} disabled={isLoading}>
          <Chrome className="w-5 h-5 mr-2" />
          {language === "th" ? "เข้าสู่ระบบด้วย Google" : "Sign in with Google"}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">{language === "th" ? "หรือ" : "or"}</span>
          </div>
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{language === "th" ? "อีเมล" : "Email"}</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder={language === "th" ? "demo@lycar.com" : "demo@lycar.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{language === "th" ? "รหัสผ่าน" : "Password"}</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading
              ? language === "th"
                ? "กำลังเข้าสู่ระบบ..."
                : "Signing in..."
              : language === "th"
                ? "เข้าสู่ระบบ"
                : "Sign In"}
          </Button>
        </form>

        <div className="text-center">
          <Button variant="link" onClick={handleGuestMode} className="text-sm">
            {language === "th" ? "ทดลองใช้แบบผู้เยี่ยมชม" : "Continue as Guest"}
          </Button>
        </div>

        <div className="text-xs text-center text-muted-foreground">
          {language === "th"
            ? "การเข้าสู่ระบบแสดงว่าคุณยอมรับข้อกำหนดและนโยบาย"
            : "By signing in, you agree to our Terms and Privacy Policy"}
        </div>
      </Card>

      {/* Safety Banner */}
      <div className="mt-8 px-4 py-3 bg-primary/10 border border-primary/20 rounded-lg max-w-md">
        <p className="text-xs text-center text-foreground font-medium">
          {language === "th"
            ? "⚠️ อย่ากดเล่นขณะขับรถ / Do not interact while driving"
            : "⚠️ Do not interact while driving / อย่ากดเล่นขณะขับรถ"}
        </p>
      </div>
    </div>
  )
}
