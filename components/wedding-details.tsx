"use client"

import { motion, useInView, type Variants } from "framer-motion"
import { useRef } from "react"
import { Calendar as CalendarIcon, Clock, MapPin } from "lucide-react"
import CustomCalendar from "./custom-calendar"
import DetailCard from "./detail-card"

export default function WeddingDetails() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const weddingDate = new Date(2025, 11, 13)

  return (
    <section ref={ref} className="py-20 px-6 bg-stone-100/30">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-md mx-auto text-center"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <CalendarIcon className="w-8 h-8 text-amber-600 mx-auto mb-3" />
          <h2 className="text-2xl font-light text-stone-800" style={{ fontFamily: "var(--font-custom)" }}>Wedding Details</h2>
        </motion.div>

        <div className="space-y-6">
          {/* Date & Time */}
          <DetailCard variants={itemVariants} icon={Clock} title="일시">
            <CustomCalendar weddingDate={weddingDate} />
            <div className="w-1/4 h-px bg-stone-300 mx-auto my-4" />
            <p className="text-stone-700">2025년 12월 13일 토요일 오후 3시 30분</p>
          </DetailCard>

          {/* Location */}
          <DetailCard variants={itemVariants} icon={MapPin} title="장소">
            <p className="text-stone-700 mb-1">로프트 가든 344</p>
            <p className="text-sm text-stone-600">서울 양천구 오목로 344 청학빌딩 10층</p>
          </DetailCard>
        </div>

        {/* Message */}
        <motion.div variants={itemVariants} className="mt-12 p-6 bg-white/80 rounded-2xl border border-stone-200">
          <p className="text-sm text-stone-700 leading-relaxed">
            "두 사람이 만나 하나가 되는
            <br />
            아름다운 순간을 함께 축복해 주세요"
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
