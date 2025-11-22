"use client"

import { useStore } from "@/lib/store"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Check, ChevronRight, ChevronLeft, Car, Search } from "lucide-react"

// Mock Data
const brands = [
  { id: "toyota", name: "Toyota", logo: "/images/toyota-logo.png" },
  { id: "honda", name: "Honda", logo: "/images/honda-logo.png" },
  { id: "bmw", name: "BMW", logo: "/images/bmw-logo.png" },
  { id: "benz", name: "Mercedes-Benz", logo: "/images/benz-logo.png" },
  { id: "tesla", name: "Tesla", logo: "/images/tesla-logo.png" },
  { id: "byd", name: "BYD", logo: "/images/byd-logo.png" },
]

const models: Record<string, Array<{ id: string; name: string; image: string }>> = {
  toyota: [
    { id: "camry", name: "Camry", image: "/cars/camry.png" },
    { id: "corolla", name: "Corolla Altis", image: "/cars/corolla.png" },
    { id: "yaris", name: "Yaris", image: "/cars/yaris.png" },
    { id: "fortuner", name: "Fortuner", image: "/cars/fortuner.png" },
  ],
  honda: [
    { id: "civic", name: "Civic", image: "/cars/civic.png" },
    { id: "city", name: "City", image: "/cars/city.png" },
    { id: "hrv", name: "HR-V", image: "/cars/hrv.png" },
    { id: "crv", name: "CR-V", image: "/cars/crv.png" },
  ],
  // Fallback for other brands for demo
  default: [
    { id: "sedan", name: "Sedan Model", image: "/cars/sedan.png" },
    { id: "suv", name: "SUV Model", image: "/cars/suv.png" },
  ],
}

const colors = [
  { name: "White", value: "bg-white", hex: "#FFFFFF", price: 0 },
  { name: "Black", value: "bg-black", hex: "#000000", price: 0 },
  { name: "Silver", value: "bg-gray-400", hex: "#C0C0C0", price: 5000 },
  { name: "Red", value: "bg-red-600", hex: "#DC2626", price: 10000 },
  { name: "Blue", value: "bg-blue-600", hex: "#2563EB", price: 10000 },
  { name: "Orange", value: "bg-orange-500", hex: "#F97316", price: 15000 },
]

const wraps = [
  { name: "Carbon Fiber", image: "/textures/carbon.jpg", price: 25000 },
  { name: "Matte Black", image: "/textures/matte-black.jpg", price: 20000 },
  { name: "Camo Green", image: "/textures/camo.jpg", price: 18000 },
  { name: "Chrome", image: "/textures/chrome.jpg", price: 35000 },
]

export default function CarColorsPage() {
  const { language } = useStore()

  // Steps: 1: Brand, 2: Model, 3: Color, 4: License Plate
  const [step, setStep] = useState(1)
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
  const [selectedModel, setSelectedModel] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [selectedWrap, setSelectedWrap] = useState<any>(null)
  const [licensePlate, setLicensePlate] = useState("")
  const [licenseProvince, setLicenseProvince] = useState("")

  const handleNext = () => {
    if (step === 1 && selectedBrand) setStep(2)
    else if (step === 2 && selectedModel) setStep(3)
    else if (step === 3) setStep(4)
    else if (step === 4 && licensePlate) {
      // Finish
      alert("Saved!")
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const getModelList = () => {
    if (!selectedBrand) return []
    return models[selectedBrand] || models.default
  }

  return (
    <div className="container max-w-md mx-auto pb-24 pt-4 px-4 min-h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          {step > 1 && (
            <Button variant="ghost" size="icon" onClick={handleBack} className="-ml-2">
              <ChevronLeft className="w-6 h-6" />
            </Button>
          )}
          <h1 className="text-xl font-bold">
            {step === 1 && (language === "th" ? "เลือกยี่ห้อรถ" : "Select Brand")}
            {step === 2 && (language === "th" ? "เลือกรุ่นรถ" : "Select Model")}
            {step === 3 && (language === "th" ? "เลือกสี/สติ๊กเกอร์" : "Select Color/Wrap")}
            {step === 4 && (language === "th" ? "ระบุทะเบียน" : "License Plate")}
          </h1>
        </div>
        <div className="text-sm text-muted-foreground font-medium">{step}/4</div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1 bg-muted rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      {/* Step 1: Select Brand */}
      {step === 1 && (
        <div className="grid grid-cols-3 gap-4 animate-in fade-in slide-in-from-right-4">
          {brands.map((brand) => (
            <Card
              key={brand.id}
              className={`cursor-pointer transition-all hover:scale-105 hover:border-primary ${
                selectedBrand === brand.id ? "border-primary ring-2 ring-primary/20 bg-primary/5" : ""
              }`}
              onClick={() => setSelectedBrand(brand.id)}
            >
              <CardContent className="p-4 flex flex-col items-center justify-center gap-3 aspect-square">
                <Car className="w-8 h-8 text-muted-foreground" /> {/* Placeholder for Logo */}
                <span className="text-sm font-medium">{brand.name}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Step 2: Select Model */}
      {step === 2 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search model..." className="pl-9" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {getModelList().map((model) => (
              <Card
                key={model.id}
                className={`cursor-pointer transition-all hover:border-primary ${
                  selectedModel === model.id ? "border-primary ring-2 ring-primary/20 bg-primary/5" : ""
                }`}
                onClick={() => setSelectedModel(model.id)}
              >
                <CardContent className="p-4 flex flex-col items-center gap-3">
                  <div className="w-full aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <Car className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <span className="font-medium">{model.name}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Select Color */}
      {step === 3 && (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
          <div className="aspect-video bg-muted rounded-xl flex items-center justify-center relative overflow-hidden shadow-inner">
            {/* Visualizer Layer */}
            <div
              className="absolute inset-0 opacity-30 mix-blend-multiply transition-colors duration-500"
              style={{ backgroundColor: selectedWrap ? "transparent" : selectedColor.hex }}
            />
            {/* Pattern overlay for wraps */}
            {selectedWrap && (
              <div className="absolute inset-0 opacity-40 bg-[url('/placeholder.svg?text=Pattern')] bg-repeat opacity-50 mix-blend-overlay" />
            )}

            <Car className="w-32 h-32 text-foreground/80 relative z-10" />

            <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-md text-foreground px-3 py-1.5 rounded-lg text-xs font-medium border shadow-sm">
              {selectedWrap ? selectedWrap.name : selectedColor.name}
            </div>
          </div>

          <Tabs defaultValue="color" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="color">{language === "th" ? "สีธรรมดา" : "Paint"}</TabsTrigger>
              <TabsTrigger value="wrap">{language === "th" ? "สติ๊กเกอร์/แรป" : "Wrap"}</TabsTrigger>
            </TabsList>

            <TabsContent value="color" className="mt-0">
              <div className="grid grid-cols-5 gap-3">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    className={`w-full aspect-square rounded-full border-2 shadow-sm flex items-center justify-center transition-all ${
                      selectedColor.name === color.name && !selectedWrap
                        ? "border-primary scale-110 ring-2 ring-primary/20"
                        : "border-transparent hover:scale-105"
                    } ${color.value}`}
                    onClick={() => {
                      setSelectedColor(color)
                      setSelectedWrap(null)
                    }}
                  >
                    {selectedColor.name === color.name && !selectedWrap && (
                      <Check
                        className={`w-4 h-4 ${["White", "Silver"].includes(color.name) ? "text-black" : "text-white"}`}
                      />
                    )}
                  </button>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="wrap" className="mt-0">
              <div className="grid grid-cols-3 gap-3">
                {wraps.map((wrap) => (
                  <div
                    key={wrap.name}
                    className={`relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                      selectedWrap?.name === wrap.name
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-transparent hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedWrap(wrap)}
                  >
                    <div className="aspect-square bg-neutral-800 flex items-center justify-center">
                      <span className="text-[10px] text-white font-medium">{wrap.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}

      {/* Step 4: License Plate */}
      {step === 4 && (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 flex-1 flex flex-col justify-center">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">{language === "th" ? "ทะเบียนรถของคุณ" : "Your License Plate"}</h2>
            <p className="text-muted-foreground text-sm">
              {language === "th" ? "เพื่อให้เราจดจำรถของคุณได้ง่ายขึ้น" : "Helps us identify your car properly"}
            </p>
          </div>

          {/* Thai License Plate Design */}
          <div className="w-64 h-32 bg-white border-4 border-black rounded-lg mx-auto relative shadow-xl flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white to-gray-100 -z-10" />
            <div className="text-4xl font-bold tracking-widest text-black uppercase font-mono">
              {licensePlate || "1กก 9999"}
            </div>
            <div className="text-sm font-semibold mt-1 text-black">
              {licenseProvince || (language === "th" ? "กรุงเทพมหานคร" : "Bangkok")}
            </div>
          </div>

          <div className="space-y-4 max-w-xs mx-auto w-full">
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase text-muted-foreground">
                {language === "th" ? "หมายเลขทะเบียน" : "Plate Number"}
              </label>
              <Input
                placeholder="e.g. 1กก 9999"
                className="text-center text-lg font-bold uppercase tracking-wider h-12"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase text-muted-foreground">
                {language === "th" ? "จังหวัด" : "Province"}
              </label>
              <Input
                placeholder={language === "th" ? "กรุงเทพมหานคร" : "Bangkok"}
                className="text-center"
                value={licenseProvince}
                onChange={(e) => setLicenseProvince(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer Actions */}
      <div className="mt-auto pt-6">
        <Button
          className="w-full h-12 text-base font-medium shadow-lg shadow-primary/20 rounded-xl"
          size="lg"
          onClick={handleNext}
          disabled={(step === 1 && !selectedBrand) || (step === 2 && !selectedModel) || (step === 4 && !licensePlate)}
        >
          {step === 4 ? (language === "th" ? "เสร็จสิ้น" : "Finish Setup") : language === "th" ? "ถัดไป" : "Next Step"}
          {step < 4 && <ChevronRight className="w-5 h-5 ml-2" />}
        </Button>
      </div>
    </div>
  )
}
