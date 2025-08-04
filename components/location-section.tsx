"use client"

import { motion, useInView, type Variants } from "framer-motion"
import { useRef, useState } from "react"
import Script from "next/script"
import { MapPin, Car, Bus, Train, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import NaverMap from "./naver-map"

const VENUE_INFO = {
  name: "로프트 가든 344",
  address: "서울 양천구 오목로 344 청학빌딩 10층",
  lat: 37.52373, // 위도
  lng: 126.87516, // 경도
  naverMapUrl: "https://naver.me/xyTG8t3T",
  kakaoMapUrl: "https://kko.kakao.com/qdxlst3fgm",
  contact: "02-2644-7823",
}

const TRANSPORTATION_DETAILS = {
  subway: {
    icon: Train,
    color: "text-purple-600",
    title: "지하철",
    lines: ["5호선 오목교역 7번 출구 도보 1분"],
  },
  bus: {
    icon: Bus,
    color: "text-green-600",
    title: "버스",
    stops: [
      { exit: "오목교역 4번 출구", numbers: "5012, 5616, 6211, 640, 650, 6625, 6628, 6629, 6630, N65" },
      { exit: "오목교역 5번 출구", numbers: "5012, 6211, 640, 650, 6628, 6629, 6630, 6640A, N65" },
      { exit: "오목교역 6번 출구", numbers: "6640A" },
      { exit: "오목교역 7번 출구", numbers: "6624, 6640B" },
    ],
  },
  parking: {
    icon: Car,
    color: "text-orange-600",
    title: "주차",
    lots: [
      { name: "전용주차장", address: "서울 양천구 오목로 344 청학빌딩", note: "(2시간 무료 / 300대 주차가능)" },
      { name: "공영주차장", address: "서울 양천구 목동동로 298", note: "(3시간 무료 / 500대 주차가능)" },
    ],
  },
  contact: {
    icon: Phone,
    color: "text-pink-600",
    title: "문의",
    number: VENUE_INFO.contact,
  },
}

export default function LocationSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isMapReady, setIsMapReady] = useState(false)

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <section id="location" ref={ref} className="py-20 px-6 bg-stone-50">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-md mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <MapPin className="w-8 h-8 text-amber-600 mx-auto mb-3" />
          <h2 className="text-2xl font-light text-stone-800" style={{ fontFamily: "var(--font-custom)" }}>Location</h2>
        </motion.div>

        <Script
          strategy="afterInteractive"
          type="text/javascript"
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`}
          onReady={() => setIsMapReady(true)}
        />

        {/* Map Placeholder */}
        <motion.div variants={itemVariants} className="relative mb-8 rounded-2xl overflow-hidden shadow-sm">
          <div className="aspect-video w-full h-full bg-stone-200 border border-stone-200">
            {isMapReady ? (
              <NaverMap mapLat={VENUE_INFO.lat} mapLng={VENUE_INFO.lng} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-stone-500">지도를 불러오는 중...</div>
            )}
          </div>
        </motion.div>

        {/* Address */}
        <motion.div
          variants={itemVariants}
          className="bg-white/80 rounded-2xl p-6 shadow-sm border border-stone-200 mb-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-medium text-stone-800">주소</h3>
          </div>
          <p className="text-stone-700 mb-2">{VENUE_INFO.name}</p>
          <p className="text-sm text-stone-600 mb-4">{VENUE_INFO.address}</p>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="sm"
              className="w-full border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
              onClick={() => window.open(VENUE_INFO.naverMapUrl, "_blank")}
            >
              네이버 지도
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full border-yellow-400 text-yellow-700 hover:bg-yellow-50 bg-transparent"
              onClick={() => window.open(VENUE_INFO.kakaoMapUrl, "_blank")}
            >
              카카오 지도
            </Button>
          </div>
        </motion.div>

        {/* Transportation */}
        <motion.div variants={itemVariants} className="space-y-4">
          {/* Subway */}
          <div className="bg-white/80 rounded-2xl p-6 shadow-sm border border-stone-200">
            <div className="flex items-center gap-3 mb-3">
              <TRANSPORTATION_DETAILS.subway.icon className={`w-5 h-5 ${TRANSPORTATION_DETAILS.subway.color}`} />
              <h3 className="text-lg font-medium text-stone-800">{TRANSPORTATION_DETAILS.subway.title}</h3>
            </div>
            {TRANSPORTATION_DETAILS.subway.lines.map((line, index) => (
              <p key={index} className="text-sm text-stone-700">{line}</p>
            ))}
          </div>

          {/* Bus */}
          <div className="bg-white/80 rounded-2xl p-6 shadow-sm border border-stone-200">
            <div className="flex items-center gap-3 mb-3">
              <TRANSPORTATION_DETAILS.bus.icon className={`w-5 h-5 ${TRANSPORTATION_DETAILS.bus.color}`} />
              <h3 className="text-lg font-medium text-stone-800">{TRANSPORTATION_DETAILS.bus.title}</h3>
            </div>
            <dl className="space-y-2 text-sm text-stone-700">
              {TRANSPORTATION_DETAILS.bus.stops.map((stop, index) => (
                <div key={index} className="flex">
                  <dt className="w-32 shrink-0 font-medium text-stone-600">{stop.exit} :</dt>
                  <dd className="break-words">{stop.numbers}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Parking */}
          <div className="bg-white/80 rounded-2xl p-6 shadow-sm border border-stone-200">
            <div className="flex items-center gap-3 mb-3">
              <TRANSPORTATION_DETAILS.parking.icon className={`w-5 h-5 ${TRANSPORTATION_DETAILS.parking.color}`} />
              <h3 className="text-lg font-medium text-stone-800">{TRANSPORTATION_DETAILS.parking.title}</h3>
            </div>
            <div className="space-y-3 text-sm text-stone-700">
              {TRANSPORTATION_DETAILS.parking.lots.map((lot, index) => (
                <div key={index}>
                  <p className="text-sm text-stone-700">
                    <span className="font-medium text-stone-600">{lot.name}:</span> {lot.address}
                  </p>
                  {lot.note && <p className="pl-2 text-xs text-stone-500">{lot.note}</p>}
                </div>
              ))}
              <p className="pl-2 text-xs text-stone-500">
                * 예식 당일 전용 주차장은 혼잡이 예상되오니 공영주차장 이용을 권장드립니다.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
