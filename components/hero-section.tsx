"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { Heart, Calendar, ChevronDown } from "lucide-react"

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9])

  return (
    <section
      id="hero"
      ref={ref}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-stone-50"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-stone-50 via-stone-25 to-stone-50" />

      <motion.div
        className="text-center px-6 max-w-sm mx-auto relative z-10 flex-1 flex flex-col justify-center"
        style={{ y, opacity, scale }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-amber-600" />
            <span className="text-xs text-stone-600 font-light tracking-wider uppercase">Wedding Invitation</span>
          </div>
          <p className="text-sm text-stone-700 font-light">2025년 12월 13일 토요일 오후 3시 30분</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8"
        >
          <div className="relative">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "60px" }}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-px bg-amber-400 mx-auto mb-6"
            />

            <motion.h1 className="text-3xl font-light text-stone-800 mb-4 leading-tight">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="block"
              >
                김오성
              </motion.span>

              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="flex items-center justify-center my-3"
              >
                <div className="w-8 h-px bg-amber-400"></div>
                <Heart className="w-4 h-4 text-amber-600 fill-current mx-3" />
                <div className="w-8 h-px bg-amber-400"></div>
              </motion.div>

              <motion.span
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="block"
              >
                차주은
              </motion.span>
            </motion.h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "60px" }}
              transition={{ duration: 1, delay: 1.2 }}
              className="h-px bg-amber-400 mx-auto mt-6"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mb-12"
        >
          <p className="text-sm text-stone-600 leading-relaxed px-4">
            2100일의 연애를 마치고
            <br />
            저희 두 사람이 사랑의 결실을 맺고자 합니다.
            <br />
            <br />
            새롭게 시작하는 저희의 멋진 날,
            <br />
            귀한 발걸음해 주시어 축복해 주시면 감사하겠습니다.
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
