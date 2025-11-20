"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useStore } from "@/lib/store"
import { t } from "@/lib/i18n"
import { mockAIDiagnosis, type DiagnosisResult } from "@/lib/mock-data"
import { Send, Mic, ImageIcon, Wrench, AlertTriangle, CheckCircle, ArrowLeft } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  type: "text" | "diagnosis"
  data?: DiagnosisResult
}

export default function DiagnosePage() {
  const router = useRouter()
  const { language } = useStore()
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        language === "th"
          ? "สวัสดีครับ ผมคือ AI ผู้ช่วยช่างยนต์ มีอาการรถอะไรให้ช่วยวิเคราะห์ไหมครับ?"
          : "Hello, I am your AI mechanic assistant. What car symptoms can I help analyze?",
      type: "text",
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      type: "text",
    }

    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    // Simulate AI processing
    setTimeout(() => {
      const diagnosis = mockAIDiagnosis(userMsg.content)
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          language === "th" ? "จากการวิเคราะห์เบื้องต้น นี่คือผลลัพธ์ครับ:" : "Based on initial analysis, here are the results:",
        type: "diagnosis",
        data: diagnosis,
      }
      setMessages((prev) => [...prev, aiMsg])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col h-[100dvh] bg-background safe-pb">
      {/* Header */}
      <header className="flex items-center gap-3 p-4 border-b bg-background/80 backdrop-blur sticky top-0 z-10 safe-pt">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="font-bold text-lg">{t("nav.diagnose", language)}</h1>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            AI Online
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4 pb-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-2xl p-4 ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-none"
                    : "bg-muted text-foreground rounded-tl-none"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>

                {msg.type === "diagnosis" && msg.data && (
                  <Card className="mt-3 p-3 bg-background/50 border-none shadow-sm">
                    <div className="flex items-start gap-3 mb-3">
                      <div
                        className={`p-2 rounded-lg ${
                          msg.data.severity === "high"
                            ? "bg-red-500/10 text-red-500"
                            : msg.data.severity === "medium"
                              ? "bg-yellow-500/10 text-yellow-500"
                              : "bg-green-500/10 text-green-500"
                        }`}
                      >
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-sm">
                          {language === "th" ? msg.data.summary.th : msg.data.summary.en}
                        </div>
                        <div
                          className={`text-xs font-medium mt-1 ${
                            msg.data.canDrive ? "text-green-500" : "text-red-500"
                          }`}
                        >
                          {msg.data.canDrive
                            ? language === "th"
                              ? "✅ ขับต่อได้"
                              : "✅ Safe to drive"
                            : language === "th"
                              ? "⛔️ ไม่ควรขับ"
                              : "⛔️ Do not drive"}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="text-xs font-semibold text-muted-foreground uppercase">
                        {language === "th" ? "สาเหตุที่เป็นไปได้" : "Probable Causes"}
                      </div>
                      {msg.data.probableCauses.map((cause, i) => (
                        <div key={i} className="flex items-center justify-between text-sm">
                          <span>{language === "th" ? cause.label.th : cause.label.en}</span>
                          <span className="font-mono text-xs text-muted-foreground">
                            {(cause.probability * 100).toFixed(0)}%
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-semibold text-muted-foreground uppercase">
                        {language === "th" ? "ขั้นตอนถัดไป" : "Next Steps"}
                      </div>
                      {msg.data.nextSteps.map((step, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{language === "th" ? step.th : step.en}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="flex-1" onClick={() => router.push("/shop/booking")}>
                        <Wrench className="w-4 h-4 mr-2" />
                        {language === "th" ? "จองคิวซ่อม" : "Book Service"}
                      </Button>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-2xl rounded-tl-none p-4">
                <div className="flex gap-1">
                  <span
                    className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  />
                  <span
                    className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  />
                  <span
                    className="w-2 h-2 bg-foreground/30 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t bg-background safe-pb">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="flex-shrink-0">
            <ImageIcon className="w-5 h-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="flex-shrink-0">
            <Mic className="w-5 h-5 text-muted-foreground" />
          </Button>
          <Input
            placeholder={language === "th" ? "พิมพ์อาการรถ..." : "Describe symptoms..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <Button size="icon" onClick={handleSend} disabled={!input.trim() || isTyping}>
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
