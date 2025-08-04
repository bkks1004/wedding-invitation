"use client"

import { motion, useInView, type Variants } from "framer-motion"
import { useRef } from "react"
import { Calendar, Clock, MapPin } from "lucide-react"

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

  return (
    <section ref={ref} className="py-20 px-6 bg-stone-100/30">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-md mx-auto text-center"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <Calendar className="w-8 h-8 text-amber-600 mx-auto mb-3" />
          <h2 className="text-2xl font-light text-stone-800" style={{ fontFamily: "var(--font-custom)" }}>Wedding Details</h2>
        </motion.div>

        <div className="space-y-6">
          {/* Date & Time */}
          <motion.div variants={itemVariants} className="bg-white/80 rounded-2xl p-6 shadow-sm border border-stone-200">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Clock className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-medium text-stone-800">일시</h3>
            </div>
            <p className="text-stone-700 mb-1">2025년 12월 13일 토요일</p>
            <p className="text-stone-700">오후 3시 30분</p>
          </motion.div>

          {/* Location */}
          <motion.div variants={itemVariants} className="bg-white/80 rounded-2xl p-6 shadow-sm border border-stone-200">
            <div className="flex items-center justify-center gap-3 mb-3">
              <MapPin className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-medium text-stone-800">장소</h3>
            </div>
            <p className="text-stone-700 mb-1">로프트 가든 344</p>
            <p className="text-sm text-stone-600">서울 양천구 오목로 344 청학빌딩 10층</p>
          </motion.div>
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
