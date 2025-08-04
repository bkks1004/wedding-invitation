"use client"

import { motion, useInView, type Variants } from "framer-motion"
import { useRef } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Copy, Gift } from "lucide-react"

const GROOM_ACCOUNTS = [
  { name: "신랑 김오성", bank: "국민은행", accountNumber: "917702-01-28337" },
  { name: "아버지 김성대", bank: "신한은행", accountNumber: "407-12-029340" },
  { name: "어머니 곽현주", bank: "SC제일은행", accountNumber: "754-20-043803" },
]

const BRIDE_ACCOUNTS = [
  { name: "신부 차주은", bank: "국민은행", accountNumber: "527802-01-411933" },
  { name: "어머니 정선미", bank: "농협", accountNumber: "352016-52-90903" },
]

// 메인 컴포넌트
export default function AccountInfo() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { toast } = useToast()

  const handleCopy = (accountNumber: string) => {
    navigator.clipboard.writeText(accountNumber).then(
      () => {
        toast({
          title: "복사 완료",
          description: "계좌번호가 클립보드에 복사되었습니다.",
        })
      },
      (err) => {
        console.error("Could not copy text: ", err)
        toast({
          title: "복사 실패",
          description: "계좌번호 복사에 실패했습니다.",
          variant: "destructive",
        })
      }
    )
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="account" ref={ref} className="py-20 px-6 bg-stone-50">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-md mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <Gift className="w-8 h-8 text-amber-600 mx-auto mb-3" />
          <h2 className="text-2xl font-light text-stone-800" style={{ fontFamily: "var(--font-custom)" }}>Wedding Gift</h2>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white/80 rounded-2xl shadow-sm border border-stone-200 overflow-hidden"
        >
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="groom" className="px-6">
              <AccordionTrigger className="text-lg font-medium text-stone-800 hover:no-underline">
                신랑측 계좌번호
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2 pb-4">
                  {GROOM_ACCOUNTS.map((account, index) => (
                    <div key={index} className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm text-stone-700">{`${account.bank} | ${account.name}`}</p>
                        <p className="text-xs text-stone-500 mt-1">{account.accountNumber}</p>
                      </div>
                      <Button size="sm" variant="outline" className="shrink-0" onClick={() => handleCopy(account.accountNumber)}>
                        <Copy className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="bride" className="border-b-0 px-6">
              <AccordionTrigger className="text-lg font-medium text-stone-800 hover:no-underline">
                신부측 계좌번호
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 pt-2 pb-4">
                  {BRIDE_ACCOUNTS.map((account, index) => (
                    <div key={index} className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm text-stone-700">{`${account.bank} | ${account.name}`}</p>
                        <p className="text-xs text-stone-500 mt-1">{account.accountNumber}</p>
                      </div>
                      <Button size="sm" variant="outline" className="shrink-0" onClick={() => handleCopy(account.accountNumber)}>
                        <Copy className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </motion.div>
    </section>
  )
}