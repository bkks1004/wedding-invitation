"use client"

import { useEffect, useRef } from "react"

interface NaverMapProps {
	mapLat: number
	mapLng: number
}

export default function NaverMap({ mapLat, mapLng }: NaverMapProps) {
	const mapElement = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const { naver } = window
		if (!mapElement.current || !naver) return

		// 지도 생성
		const location = new naver.maps.LatLng(mapLat, mapLng)
		const mapOptions: naver.maps.MapOptions = {
			center: location,
			zoom: 17,
			zoomControl: true,
			zoomControlOptions: {
				position: naver.maps.Position.TOP_RIGHT,
			},
		}
		const map = new naver.maps.Map(mapElement.current, mapOptions)

		// 마커 생성
		new naver.maps.Marker({
			position: location,
			map,
		})
	}, [mapLat, mapLng])

	return <div ref={mapElement} style={{ minHeight: "100%", width: "100%" }} />
}