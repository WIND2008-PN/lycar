"use client"

import { useStore } from "@/lib/store"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Plus } from "lucide-react"

const events = [
  {
    id: 1,
    title: "Regular Maintenance",
    date: "2024-06-15",
    time: "10:00 AM",
    location: "Honda Service Center",
    type: "service",
  },
  {
    id: 2,
    title: "Car Insurance Renewal",
    date: "2024-07-01",
    time: "All Day",
    location: "Online",
    type: "renewal",
  },
  {
    id: 3,
    title: "Civic Club Meetup",
    date: "2024-06-20",
    time: "06:00 PM",
    location: "Central World",
    type: "community",
  },
]

export default function CalendarPage() {
  const { language } = useStore()

  return (
    <div className="container max-w-md mx-auto pb-24 pt-6 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{language === "th" ? "ปฏิทิน" : "Calendar"}</h1>
        <Button size="icon" className="rounded-full">
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      {/* Simple Calendar Grid Visualization */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold">June 2024</h2>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                &lt;
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                &gt;
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-sm mb-2">
            <div className="text-muted-foreground">Su</div>
            <div className="text-muted-foreground">Mo</div>
            <div className="text-muted-foreground">Tu</div>
            <div className="text-muted-foreground">We</div>
            <div className="text-muted-foreground">Th</div>
            <div className="text-muted-foreground">Fr</div>
            <div className="text-muted-foreground">Sa</div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {Array.from({ length: 30 }).map((_, i) => {
              const day = i + 1
              const hasEvent = events.some((e) => new Date(e.date).getDate() === day)
              return (
                <div
                  key={i}
                  className={`aspect-square flex items-center justify-center rounded-full cursor-pointer hover:bg-muted ${
                    day === 15 ? "bg-primary text-primary-foreground" : ""
                  }`}
                >
                  <div className="relative">
                    {day}
                    {hasEvent && day !== 15 && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="font-semibold">{language === "th" ? "กิจกรรมเร็วๆ นี้" : "Upcoming Events"}</h3>
        {events.map((event) => (
          <Card key={event.id}>
            <CardContent className="p-4 flex gap-4">
              <div className="flex flex-col items-center justify-center bg-muted rounded-lg w-16 h-16">
                <span className="text-xs font-bold text-primary uppercase">
                  {new Date(event.date).toLocaleString("default", { month: "short" })}
                </span>
                <span className="text-xl font-bold">{new Date(event.date).getDate()}</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold">{event.title}</h4>
                  <Badge variant="outline" className="text-[10px] uppercase">
                    {event.type}
                  </Badge>
                </div>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <Clock className="w-3 h-3 mr-1" />
                  {event.time}
                </div>
                <div className="flex items-center text-sm text-muted-foreground mt-1">
                  <MapPin className="w-3 h-3 mr-1" />
                  {event.location}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
