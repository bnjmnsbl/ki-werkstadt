import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

type TimerProps = {
  seconds: number
  onExpire: () => void
}

export default function Timer({ seconds, onExpire }: TimerProps) {
  const [remaining, setRemaining] = useState(seconds)
  const onExpireRef = useRef(onExpire)
  onExpireRef.current = onExpire

  useEffect(() => {
    if (remaining <= 0) {
      onExpireRef.current()
      return
    }
    const id = setTimeout(() => setRemaining(r => r - 1), 1000)
    return () => clearTimeout(id)
  }, [remaining])

  const minutes = Math.floor(remaining / 60)
  const secs = remaining % 60
  const warning = remaining <= 60
  const display = `${minutes}:${String(secs).padStart(2, '0')}`

  return (
    <motion.div
      animate={warning ? { scale: [1, 1.04, 1] } : { scale: 1 }}
      transition={warning ? { repeat: Infinity, duration: 1.2 } : undefined}
      className={`font-mono font-bold text-xl px-4 py-2 rounded-lg border ${
        warning
          ? 'text-[var(--color-danger)] border-[var(--color-danger)]/30 bg-[var(--color-danger)]/10'
          : 'text-[var(--color-text-muted)] border-white/10 bg-white/5'
      }`}
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {display}
    </motion.div>
  )
}
