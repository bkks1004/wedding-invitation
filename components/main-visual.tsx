"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export default function MainVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // 패럴랙스 효과
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "0%"])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* 메인 배경 이미지 */}
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <Image
          src="/images/main-wedding-photo.jpg"
          alt="Wedding couple at sunset"
          fill
          className="object-cover"
          priority
          quality={95}
        />
        {/* 베이지 톤 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/50 via-stone-800/30 to-stone-700/40" />
      </motion.div>

      {/* 하단 컨트롤 (스크롤 & 음악) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="flex flex-col items-center cursor-pointer text-stone-100"
          onClick={() => {
            const nextSection = document.querySelector("section:nth-of-type(2)")
            nextSection?.scrollIntoView({ behavior: "smooth" })
          }}
        >
          <span className="text-xs mb-3 font-light tracking-wider opacity-90">SCROLL ME</span>
          <div className="w-6 h-10 border-2 border-stone-200/80 rounded-full flex justify-center relative">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
              className="w-1 h-3 bg-stone-200/80 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* 메인 텍스트 */}
      <motion.div style={{ opacity }} className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-stone-100 px-6 max-w-lg">
          {/* 장식 라인 */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="h-px bg-stone-300/60 mx-auto mb-8"
          />

          {/* 커플 이름 */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-light mb-4 tracking-wide text-stone-100"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Ohseong & Jueun
          </motion.h1>

          {/* 서브 타이틀 */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl font-light italic mb-8 relative px-8 text-stone-200"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            We are getting married
            {/* 장식 라인 */}
            <span className="absolute left-0 top-1/2 w-6 h-px bg-stone-300/60 transform -translate-y-1/2"></span>
            <span className="absolute right-0 top-1/2 w-6 h-px bg-stone-300/60 transform -translate-y-1/2"></span>
          </motion.p>

          {/* 결혼식 정보 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
            className="space-y-2 text-stone-200"
          >
            <p className="text-base md:text-lg font-medium tracking-wide">2025. 12. 13. SAT 3:30 PM</p>
            <p className="text-sm md:text-base font-light">로프트 가든 344</p>
          </motion.div>

          {/* 장식 라인 */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            transition={{ duration: 1, delay: 0.9 }}
            viewport={{ once: true }}
            className="h-px bg-stone-300/60 mx-auto mt-8"
          />
        </div>
      </motion.div>

      {/* 떠다니는 장식 요소들 - 베이지 톤 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-stone-300/30 rounded-full"
        />
        <motion.div
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-1/3 right-1/3 w-1 h-1 bg-stone-400/40 rounded-full"
        />
        <motion.div
          animate={{
            y: [0, -25, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/3 left-1/5 w-1.5 h-1.5 bg-stone-300/25 rounded-full"
        />
      </div>

      {/* 하단 그라데이션 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-stone-900/60 to-transparent pointer-events-none" />
    </section>
  )
}
