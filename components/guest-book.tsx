"use client"

import { motion, useInView, type Variants } from "framer-motion"
import { useRef, useState, useEffect, FormEvent } from "react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { addGuestMessage, getGuestMessages, type GuestMessage } from "@/lib/firestore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function GuestBook() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { toast } = useToast()

  const [messages, setMessages] = useState<GuestMessage[]>([])
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(true) // 메시지 목록 로딩 상태
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)


  // useEffect(() => {
  //   const mockMessages: GuestMessage[] = [
  //     {
  //       id: "1",
  //       name: "김철수",
  //       message: "두 분의 결혼을 진심으로 축하드립니다! 행복하세요 💕",
  //       timestamp: new Date("2025-12-10"),
  //     },
  //     {
  //       id: "2",
  //       name: "이영희",
  //       message: "오랜 친구의 결혼식에 참석할 수 있어서 너무 기뻐요. 평생 행복하길 바라요!",
  //       timestamp: new Date("2025-12-11"),
  //     },
  //   ]
  //   setMessages(mockMessages)
  // }, [])

  // Firestore에서 메시지를 가져오는 함수
  const fetchMessages = async () => {
    setLoading(true)
    try {
      const fetchedMessages = await getGuestMessages()
      setMessages(fetchedMessages)
    } catch (err) {
      console.error(err)
      setError("메시지를 불러오는 데 실패했습니다. 페이지를 새로고침 해주세요.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isInView) {
      fetchMessages()
    }
  }, [isInView])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !message.trim()) {
      toast({
        title: "입력 오류",
        description: "이름과 메시지를 모두 입력해주세요.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      await addGuestMessage(name, message)
      setName("")
      setMessage("")

      toast({
        title: "메시지 등록 완료",
        description: "소중한 축하 메시지 감사합니다!",
      })
      await fetchMessages()
    } catch (error) {
      toast({
        title: "오류 발생",
        description: "메시지 등록 중 오류가 발생했습니다.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatTimestamp = (timestamp: any): string => {
    if (!timestamp) return ""
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return format(date, "yyyy.MM.dd HH:mm", { locale: ko })
  }

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
    <section ref={ref} className="py-20 px-6 bg-stone-100/30">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-md mx-auto"
      >
        <motion.h2 variants={itemVariants} className="text-2xl font-light text-stone-800 text-center mb-12">
          Guest Book
        </motion.h2>

        {/* Message Form */}
        <motion.div
          variants={itemVariants}
          className="bg-white/80 rounded-2xl p-6 shadow-sm border border-stone-200 mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle className="w-5 h-5 text-amber-600" />
            <h3 className="text-lg font-medium text-stone-800">축하 메시지</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="이름을 입력해주세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-stone-300 focus:border-amber-500"
            />
            <Textarea
              placeholder="따뜻한 축하의 마음을 남겨주세요"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="border-stone-300 focus:border-amber-500 resize-none"
            />
            <Button type="submit" disabled={isSubmitting} className="w-full bg-amber-600 hover:bg-amber-700 text-white">
              {isSubmitting ? "등록 중..." : "메시지 남기기"}
            </Button>
          </form>
        </motion.div>

        {/* Messages List */}
        <motion.div variants={itemVariants} className="space-y-4">

          {loading ? (
            <div className="text-center py-8 text-stone-600">
              <p>메시지를 불러오는 중입니다...</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-4 h-4 text-amber-600 fill-current" />
                <span className="text-sm text-stone-700">{messages.length}개의 축하 메시지</span>
              </div>

              {messages.length > 0 ? (
                messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white/80 rounded-xl p-4 shadow-sm border border-stone-200"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-stone-500" />
                      <span className="text-sm font-medium text-stone-800">{msg.name}</span>
                      <span className="text-xs text-stone-500 ml-auto">{formatTimestamp(msg.timestamp)}</span>
                    </div>
                    <p className="text-sm text-stone-700 leading-relaxed">{msg.message}</p>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8">
                  <MessageCircle className="w-12 h-12 text-stone-400 mx-auto mb-3" />
                  <p className="text-stone-600">첫 번째 축하 메시지를 남겨주세요!</p>
                </div>
              )}
            </>
          )}
        </motion.div>

        {/* Thank You Message */}
        <motion.div
          variants={itemVariants}
          className="mt-12 text-center p-6 bg-white/80 rounded-2xl border border-stone-200"
        >
          <Heart className="w-6 h-6 text-amber-600 fill-current mx-auto mb-3" />
          <p className="text-sm text-stone-700 leading-relaxed">
            소중한 시간 내어 축하해 주셔서
            <br />
            진심으로 감사드립니다
          </p>
          <p className="text-xs text-stone-600 mt-2">오성 & 주은 올림</p>
        </motion.div>
      </motion.div>
    </section>
  )
}
