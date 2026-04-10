import { motion } from 'framer-motion'

type ChipAllocatorProps = {
  ideaId: string
  allocated: number
  remaining: number
  onChange: (ideaId: string, chips: number) => void
}

export default function ChipAllocator({ ideaId, allocated, remaining, onChange }: ChipAllocatorProps) {
  const total = 10
  const chips = Array.from({ length: total }, (_, i) => i < allocated)

  function handleClick(index: number) {
    const newValue = index < allocated ? index : index + 1
    if (newValue > allocated && remaining === 0) return
    onChange(ideaId, newValue)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="text-[var(--color-text-muted)]">Chips vergeben</span>
        <span className="font-bold text-[var(--color-chip)]">{allocated} / {total}</span>
      </div>
      <div className="flex gap-2 flex-wrap">
        {chips.map((filled, i) => (
          <motion.button
            key={i}
            onClick={() => handleClick(i)}
            whileTap={{ scale: 0.85 }}
            disabled={!filled && remaining === 0}
            className={`w-8 h-8 rounded-full border-2 transition-all ${
              filled
                ? 'border-[var(--color-chip)] bg-[var(--color-chip)] shadow-[0_0_8px_rgba(245,158,11,0.4)]'
                : remaining > 0
                ? 'border-white/20 bg-transparent hover:border-[var(--color-chip)]/50'
                : 'border-white/10 bg-transparent opacity-40 cursor-not-allowed'
            }`}
            aria-label={`Chip ${i + 1}`}
          />
        ))}
      </div>
      {remaining > 0 && (
        <p className="text-xs text-[var(--color-text-muted)]">
          Noch {remaining} Chip{remaining !== 1 ? 's' : ''} zu verteilen
        </p>
      )}
    </div>
  )
}
