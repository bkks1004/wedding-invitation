"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"

import Image from "next/image"
import { motion, type Variants } from "framer-motion";
import { Camera } from "lucide-react";

const images = Array.from({ length: 15 }, (_, i) => `/images/gallery-${i + 1}.jpg`)

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

export default function PhotoGallery() {
  return (
    <section className="py-20 px-6 bg-stone-50">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-12">
          <Camera className="w-8 h-8 text-amber-600 mx-auto mb-3" />
          <h2 className="text-2xl font-light text-stone-800" style={{ fontFamily: "var(--font-custom)" }}>Our Story</h2>
        </motion.div>


        <div className="relative">
          <Swiper
            modules={[Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            pagination={{ clickable: true }}
            className="w-full cursor-grab"
          >
            {images.map((src, idx) => (
              <SwiperSlide key={idx}>
                <div
                  className="
                    relative
                    w-full
                    h-[600px]
                    flex items-center justify-center
                    bg-stone-50
                  "
                >
                  <Image
                    src={src}
                    alt={`gallery-${idx + 1}`}
                    fill
                    className="object-contain rounded-lg"
                    sizes="(max-width: 1024px) 100vw, 800px"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
