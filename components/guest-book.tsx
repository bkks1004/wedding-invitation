"use client"

import { motion, useInView, type Variants } from "framer-motion"
import { useRef, useState, useEffect, type FormEvent } from "react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { addGuestMessage, getGuestMessages, type GuestMessage } from "@/lib/firestore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {Heart, MessageCircle, User, Loader2, Gift} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// --- 메시지 작성 폼 컴포넌트 ---
const GuestBookForm = ({
  name,
  setName,
  message,
  setMessage,
  isSubmitting,
  onSubmit,
  variants,
}: {
  name: string
  setName: (value: string) => void
  message: string
  setMessage: (value: string) => void
  isSubmitting: boolean
  onSubmit: (e: FormEvent) => Promise<void>
  variants: Variants
}) => (
  <motion.div variants={variants} className="bg-white/80 rounded-2xl p-6 shadow-sm border border-stone-200 mb-8">
    <div className="flex items-center gap-3 mb-4">
      <MessageCircle className="w-5 h-5 text-amber-600" />
      <h3 className="text-lg font-medium text-stone-800">축하 메시지</h3>
    </div>
    <form onSubmit={onSubmit} className="space-y-4">
      <Input
        placeholder="이름을 입력해주세요"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border-stone-300 focus:border-amber-500"
        disabled={isSubmitting}
      />
      <Textarea
        placeholder="따뜻한 축하의 마음을 남겨주세요"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        className="border-stone-300 focus:border-amber-500 resize-none"
        disabled={isSubmitting}
      />
      <Button type="submit" disabled={isSubmitting} className="w-full bg-amber-600 hover:bg-amber-700 text-white">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            등록 중...
          </>
        ) : (
          "메시지 남기기"
        )}
      </Button>
    </form>
  </motion.div>
)

// --- 개별 메시지 아이템 컴포넌트 ---
const MessageItem = ({ msg, index }: { msg: GuestMessage; index: number }) => {
  const formatTimestamp = (timestamp: any): string => {
    if (!timestamp) return ""
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return format(date, "yyyy.MM.dd HH:mm", { locale: ko })
  }

  return (
    <motion.div
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
  )
}

// --- 메인 컴포넌트 ---
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
    <section id="guestbook" ref={ref} className="py-20 px-6 bg-stone-100/30">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="max-w-md mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <MessageCircle className="w-8 h-8 text-amber-600 mx-auto mb-3" />
          <h2 className="text-2xl font-light text-stone-800" style={{ fontFamily: "var(--font-custom)" }}>Guest Book</h2>
        </motion.div>

        {/* Message Form */}
        <GuestBookForm
          name={name}
          setName={setName}
          message={message}
          setMessage={setMessage}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit}
          variants={itemVariants}
        />

        {/* Messages List */}
        <motion.div variants={itemVariants} className="space-y-4">
          {loading ? (
            <div className="text-center py-8 text-stone-600">
              <Loader2 className="mx-auto h-6 w-6 animate-spin text-stone-400 mb-3" />
              <p>메시지를 불러오는 중입니다...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">{error}</div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-4 h-4 text-amber-600 fill-current" />
                <span className="text-sm text-stone-700">{messages.length}개의 축하 메시지</span>
              </div>
              {messages.length > 0 ? (
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <MessageItem key={msg.id} msg={msg} index={index} />
                  ))}
                </div>
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
