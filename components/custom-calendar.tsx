"use client"

import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface CustomCalendarProps {
  weddingDate: Date
}

export default function CustomCalendar({ weddingDate }: CustomCalendarProps) {
  const year = weddingDate.getFullYear()
  const month = weddingDate.getMonth()

  const monthName = weddingDate.toLocaleString("en-US", { month: "long" }).toUpperCase()
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"]

  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const calendarDays = []
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="aspect-square" />)
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const isWeddingDay = day === weddingDate.getDate()
    calendarDays.push(
      <div key={day} className={cn("aspect-square flex items-center justify-center text-sm rounded-full", isWeddingDay ? "relative border-2 border-amber-500" : "text-stone-400")}>
        {isWeddingDay ? <Heart className="w-4 h-4 text-amber-500 fill-amber-500" /> : day}
      </div>
    )
  }

  return (
    <>
      <div className="text-center text-base font-semibold tracking-widest text-stone-700 mb-4">{monthName}</div>
      <div className="grid grid-cols-7 gap-1 text-center text-xs text-stone-500 mb-2">
        {daysOfWeek.map((day) => (<div key={day}>{day}</div>))}
      </div>
      <div className="grid grid-cols-7 gap-1">{calendarDays}</div>
    </>
  )
}