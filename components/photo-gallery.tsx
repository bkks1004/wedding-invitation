"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"

import Image from "next/image"

const images = Array.from({ length: 15 }, (_, i) => `/images/gallery-${i + 1}.jpg`)

export default function PhotoGallery() {
  return (
    <section className="py-20 px-6 bg-stone-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-light text-gray-800 text-center mb-10">
          Our Story
        </h2>

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
