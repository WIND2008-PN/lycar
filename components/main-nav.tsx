"use client"

import { usePathname, useRouter } from "next/navigation"
import { useStore } from "@/lib/store"
import { t } from "@/lib/i18n"
import {
  Home,
  Activity,
  Wrench,
  Target,
  Trophy,
  Menu,
  Plus,
  Search,
  Map,
  Users,
  ShoppingBag,
  Car,
  Settings,
  User,
  Calendar,
  Zap,
  Share2,
  Palette,
  Video,
  BarChart2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"

export function MainNav() {
  const pathname = usePathname()
  const router = useRouter()
  const { language, drawerOpen, setDrawerOpen, commandPaletteOpen, setCommandPaletteOpen } = useStore()
  const [searchQuery, setSearchQuery] = useState("")

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setCommandPaletteOpen(true)
      }
      if (e.altKey && e.key === "d") {
        e.preventDefault()
        setDrawerOpen(true)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [setCommandPaletteOpen, setDrawerOpen])

  // Don't show nav on login page
  if (pathname === "/login") return null

  const navItems = [
    { href: "/home", icon: Home, label: t("nav.home", language) },
    { href: "/feed", icon: Activity, label: t("nav.feed", language) },
    { href: "/diagnose", icon: Wrench, label: t("nav.diagnose", language) },
    { href: "/missions", icon: Target, label: t("nav.missions", language) },
    { href: "/rewards", icon: Trophy, label: t("nav.rewards", language) },
  ]

  const allFeatures = [
    {
      group: language === "th" ? "หลัก" : "Core",
      items: [
        { href: "/home", icon: Home, label: t("nav.home", language) },
        { href: "/feed", icon: Activity, label: t("nav.feed", language) },
        { href: "/diagnose", icon: Wrench, label: t("nav.diagnose", language) },
        { href: "/missions", icon: Target, label: t("nav.missions", language) },
        { href: "/rewards", icon: Trophy, label: t("nav.rewards", language) },
      ],
    },
    {
      group: language === "th" ? "ดูแลรถ" : "Car Care",
      items: [
        { href: "/garage", icon: Car, label: t("nav.garage", language) },
        { href: "/car-health", icon: Activity, label: t("nav.carHealth", language) },
        { href: "/car-fitness", icon: Zap, label: t("nav.carFitness", language) },
        { href: "/trends", icon: BarChart2, label: t("nav.trends", language) },
      ],
    },
    {
      group: language === "th" ? "สังคม" : "Social",
      items: [
        { href: "/communities", icon: Users, label: t("nav.communities", language) },
        { href: "/sharing", icon: Share2, label: t("nav.sharing", language) },
        { href: "/lywheels", icon: Video, label: t("nav.lywheels", language) },
      ],
    },
    {
      group: language === "th" ? "สนุก" : "Fun",
      items: [
        { href: "/games", icon: Trophy, label: t("nav.games", language) },
        { href: "/routes", icon: Map, label: t("nav.routes", language) },
        { href: "/car-colors", icon: Palette, label: t("nav.carColors", language) },
        { href: "/shop", icon: ShoppingBag, label: t("nav.shop", language) },
        { href: "/ranks", icon: Trophy, label: t("nav.ranks", language) },
      ],
    },
    {
      group: language === "th" ? "บัญชี" : "Account",
      items: [
        { href: "/profile", icon: User, label: t("nav.profile", language) },
        { href: "/calendar", icon: Calendar, label: t("nav.calendar", language) },
        { href: "/settings", icon: Settings, label: t("nav.settings", language) },
      ],
    },
  ]

  const filteredFeatures = searchQuery
    ? allFeatures
        .map((group) => ({
          ...group,
          items: group.items.filter((item) => item.label.toLowerCase().includes(searchQuery.toLowerCase())),
        }))
        .filter((group) => group.items.length > 0)
    : allFeatures

  return (
    <>
      {/* Mobile Floating Hamburger Menu Button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full bg-background/20 backdrop-blur-md border border-white/20 text-foreground shadow-sm hover:bg-background/40"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] p-0 flex flex-col h-full overflow-hidden">
            <SheetHeader className="p-4 border-b shrink-0">
              <SheetTitle className="text-left flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Wrench className="w-4 h-4 text-primary-foreground" />
                </div>
                LYCAR
              </SheetTitle>
              <div className="relative mt-2">
                <Search className="absolute left-2 top-2.5 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder={language === "th" ? "ค้นหาเมนู..." : "Search menu..."}
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </SheetHeader>
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-6 pb-8">
                  {filteredFeatures.map((group, i) => (
                    <div key={i}>
                      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
                        {group.group}
                      </h3>
                      <div className="space-y-1">
                        {group.items.map((item) => (
                          <Button
                            key={item.href}
                            variant={pathname === item.href ? "secondary" : "ghost"}
                            className="w-full justify-start"
                            onClick={() => {
                              router.push(item.href)
                              setDrawerOpen(false)
                            }}
                          >
                            <item.icon className="w-4 h-4 mr-2" />
                            {item.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 fixed inset-y-0 left-0 border-r bg-background z-50">
        <div className="p-6 border-b">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Wrench className="w-4 h-4 text-primary-foreground" />
            </div>
            LYCAR
          </div>
        </div>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-6">
            {allFeatures.map((group, i) => (
              <div key={i}>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">
                  {group.group}
                </h3>
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <Button
                      key={item.href}
                      variant={pathname === item.href ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => router.push(item.href)}
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </aside>

      {/* Quick Actions FAB */}
      <div className="fixed bottom-20 right-4 z-40 md:bottom-8 md:right-8">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[50vh] rounded-t-xl">
            <SheetHeader className="mb-4">
              <SheetTitle>{language === "th" ? "การดำเนินการด่วน" : "Quick Actions"}</SheetTitle>
            </SheetHeader>
            <div className="grid grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-auto flex-col gap-2 p-4 bg-transparent"
                onClick={() => router.push("/diagnose")}
              >
                <Wrench className="w-6 h-6 text-primary" />
                <span className="text-xs">{t("nav.diagnose", language)}</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto flex-col gap-2 p-4 bg-transparent"
                onClick={() => router.push("/feed/create")}
              >
                <Activity className="w-6 h-6 text-blue-500" />
                <span className="text-xs">{language === "th" ? "โพสต์" : "Post"}</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto flex-col gap-2 p-4 bg-transparent"
                onClick={() => router.push("/car-health/quick-check")}
              >
                <Zap className="w-6 h-6 text-yellow-500" />
                <span className="text-xs">{language === "th" ? "เช็คด่วน" : "Quick Check"}</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto flex-col gap-2 p-4 bg-transparent"
                onClick={() => router.push("/lywheels")}
              >
                <Video className="w-6 h-6 text-pink-500" />
                <span className="text-xs">LYWheels</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto flex-col gap-2 p-4 bg-transparent"
                onClick={() => router.push("/shop")}
              >
                <ShoppingBag className="w-6 h-6 text-purple-500" />
                <span className="text-xs">{language === "th" ? "ร้านค้า" : "Shop"}</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto flex-col gap-2 p-4 bg-transparent"
                onClick={() => router.push("/calendar")}
              >
                <Calendar className="w-6 h-6 text-green-500" />
                <span className="text-xs">{language === "th" ? "ปฏิทิน" : "Calendar"}</span>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
