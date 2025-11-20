"use client"

import { useStore } from "@/lib/store"
import { t } from "@/lib/i18n"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ArrowUpRight, TrendingUp, Zap, Activity } from "lucide-react"

const fuelData = [
  { day: "Mon", value: 14.2 },
  { day: "Tue", value: 13.8 },
  { day: "Wed", value: 15.1 },
  { day: "Thu", value: 14.5 },
  { day: "Fri", value: 13.9 },
  { day: "Sat", value: 16.2 },
  { day: "Sun", value: 15.8 },
]

const scoreData = [
  { category: "Braking", score: 85 },
  { category: "Accel", score: 92 },
  { category: "Cornering", score: 78 },
  { category: "Speed", score: 95 },
  { category: "Eco", score: 88 },
]

export default function TrendsPage() {
  const { language } = useStore()

  return (
    <div className="container max-w-md mx-auto pb-24 pt-6 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{t("nav.trends", language)}</h1>
        <div className="flex items-center gap-2 text-sm text-green-500">
          <TrendingUp className="w-4 h-4" />
          <span>+12% {language === "th" ? "เดือนนี้" : "this month"}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div className="text-2xl font-bold">14.8</div>
            <div className="text-xs text-muted-foreground">km/L Avg</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mb-2">
              <Activity className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-2xl font-bold">92</div>
            <div className="text-xs text-muted-foreground">Driving Score</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="fuel" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="fuel">{language === "th" ? "การใช้น้ำมัน" : "Fuel Usage"}</TabsTrigger>
          <TabsTrigger value="score">{language === "th" ? "คะแนนขับขี่" : "Driving Score"}</TabsTrigger>
        </TabsList>
        <TabsContent value="fuel" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{language === "th" ? "ประสิทธิภาพรายวัน" : "Daily Efficiency"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={fuelData}>
                    <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip
                      contentStyle={{ backgroundColor: "hsl(var(--background))", borderColor: "hsl(var(--border))" }}
                      itemStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="score" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">{language === "th" ? "วิเคราะห์พฤติกรรม" : "Behavior Analysis"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={scoreData}>
                    <XAxis dataKey="category" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip
                      cursor={{ fill: "hsl(var(--muted))" }}
                      contentStyle={{ backgroundColor: "hsl(var(--background))", borderColor: "hsl(var(--border))" }}
                      itemStyle={{ color: "hsl(var(--foreground))" }}
                    />
                    <Bar dataKey="score" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="bg-gradient-to-br from-primary/20 to-background border-primary/20">
        <CardContent className="p-4 flex items-start gap-4">
          <div className="p-2 bg-primary rounded-full text-primary-foreground mt-1">
            <ArrowUpRight className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold">{language === "th" ? "คำแนะนำ AI" : "AI Insight"}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {language === "th"
                ? "การขับขี่ของคุณประหยัดน้ำมันขึ้น 5% เมื่อเทียบกับสัปดาห์ที่แล้ว ลองลดการเบรกกะทันหันเพื่อเพิ่มคะแนน"
                : "Your driving is 5% more efficient compared to last week. Try reducing sudden braking to improve your score."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
