"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store"
import { t } from "@/lib/i18n"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Home, Activity, Wrench, Target, Trophy, Car, Settings, User, Map, ShoppingBag } from "lucide-react"

export function CommandPalette() {
  const router = useRouter()
  const { language, commandPaletteOpen, setCommandPaletteOpen } = useStore()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandPaletteOpen(!commandPaletteOpen)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [commandPaletteOpen, setCommandPaletteOpen])

  const runCommand = (command: () => void) => {
    setCommandPaletteOpen(false)
    command()
  }

  return (
    <CommandDialog open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen}>
      <CommandInput placeholder={language === "th" ? "พิมพ์คำสั่งหรือค้นหา..." : "Type a command or search..."} />
      <CommandList>
        <CommandEmpty>{language === "th" ? "ไม่พบผลลัพธ์" : "No results found."}</CommandEmpty>
        <CommandGroup heading={language === "th" ? "นำทาง" : "Navigation"}>
          <CommandItem onSelect={() => runCommand(() => router.push("/home"))}>
            <Home className="mr-2 h-4 w-4" />
            {t("nav.home", language)}
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/feed"))}>
            <Activity className="mr-2 h-4 w-4" />
            {t("nav.feed", language)}
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/diagnose"))}>
            <Wrench className="mr-2 h-4 w-4" />
            {t("nav.diagnose", language)}
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/missions"))}>
            <Target className="mr-2 h-4 w-4" />
            {t("nav.missions", language)}
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/rewards"))}>
            <Trophy className="mr-2 h-4 w-4" />
            {t("nav.rewards", language)}
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={language === "th" ? "เครื่องมือ" : "Tools"}>
          <CommandItem onSelect={() => runCommand(() => router.push("/garage"))}>
            <Car className="mr-2 h-4 w-4" />
            {t("nav.garage", language)}
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/routes"))}>
            <Map className="mr-2 h-4 w-4" />
            {t("nav.routes", language)}
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/shop"))}>
            <ShoppingBag className="mr-2 h-4 w-4" />
            {t("nav.shop", language)}
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={language === "th" ? "การตั้งค่า" : "Settings"}>
          <CommandItem onSelect={() => runCommand(() => router.push("/profile"))}>
            <User className="mr-2 h-4 w-4" />
            {t("nav.profile", language)}
          </CommandItem>
          <CommandItem onSelect={() => runCommand(() => router.push("/settings"))}>
            <Settings className="mr-2 h-4 w-4" />
            {t("nav.settings", language)}
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
