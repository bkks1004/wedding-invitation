import localFont from "next/font/local"

export const customFont = localFont({
	src: "../assets/fonts/Lora-Italic-VariableFont_wght.ttf",
	display: "swap",
	variable: "--font-custom",
})