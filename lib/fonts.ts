import localFont from "next/font/local"

export const customFont = localFont({
    src: "../assets/fonts/tesla.ttf",
	display: "swap",
	variable: "--font-custom",
})

export const maruBuri = localFont({
  src: [
    {
      path: '../assets/fonts/MaruBuri-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../assets/fonts/MaruBuri-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../assets/fonts/MaruBuri-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/MaruBuri-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/MaruBuri-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-maru-buri',
})
