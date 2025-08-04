import { motion, type Variants } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

interface DetailCardProps {
  variants: Variants
  icon: LucideIcon
  title: string
  children: ReactNode
}

export default function DetailCard({ variants, icon: Icon, title, children }: DetailCardProps) {
  return (
    <motion.div variants={variants} className="bg-white/80 rounded-2xl p-6 shadow-sm border border-stone-200">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Icon className="w-5 h-5 text-amber-600" />
        <h3 className="text-lg font-medium text-stone-800">{title}</h3>
      </div>
      {children}
    </motion.div>
  )
}