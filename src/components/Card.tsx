import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Scenario, DataCard, ReflectionCard } from '../lib/types'

type CardType = 'scenario' | 'data' | 'reflection'

type CardProps = {
  type: CardType
  card: Scenario | DataCard | ReflectionCard
  selected?: boolean
  dimmed?: boolean
  mini?: boolean
  expandable?: boolean
  onClick?: () => void
}

const typeConfig = {
  scenario: {
    label: 'Szenario',
    border: 'border-[var(--color-scenario)]',
    bg: 'from-[var(--color-scenario-bg)] to-[#1a3a5c]',
    tag: 'bg-[var(--color-scenario)]',
    nr: 'text-[#5ba3d9]',
    glow: 'shadow-[0_0_20px_rgba(45,106,160,0.5)]',
  },
  data: {
    label: 'Daten',
    border: 'border-[var(--color-data)]',
    bg: 'from-[var(--color-data-bg)] to-[#1a4a32]',
    tag: 'bg-[var(--color-data)]',
    nr: 'text-[#5bc480]',
    glow: 'shadow-[0_0_20px_rgba(45,138,85,0.5)]',
  },
  reflection: {
    label: 'Reflexion',
    border: 'border-[var(--color-reflection)]',
    bg: 'from-[var(--color-reflection-bg)] to-[#5a2e10]',
    tag: 'bg-[var(--color-reflection)]',
    nr: 'text-[var(--color-accent-light)]',
    glow: 'shadow-[0_0_20px_rgba(192,104,32,0.5)]',
  },
}

function getCardBody(card: Scenario | DataCard | ReflectionCard, type: CardType): string {
  if (type === 'scenario') return (card as Scenario).description
  if (type === 'data') return (card as DataCard).description
  return (card as ReflectionCard).condition
}

export default function Card({ type, card, selected, dimmed, mini, expandable, onClick }: CardProps) {
  const cfg = typeConfig[type]
  const [showDetail, setShowDetail] = useState(false)

  if (mini) {
    return (
      <>
        <div
          onClick={expandable ? () => setShowDetail(true) : onClick}
          className={`
            rounded-lg border ${cfg.border} bg-gradient-to-br ${cfg.bg}
            p-2 select-none shrink-0
            ${expandable || onClick ? 'cursor-pointer' : ''}
            ${selected ? cfg.glow : ''}
            ${dimmed ? 'opacity-40' : ''}
          `}
          style={{ minWidth: 72 }}
        >
          <div className={`text-xs font-bold ${cfg.nr}`}>{card.id}</div>
          <div className="text-xs text-white font-medium leading-tight">{card.title}</div>
          {expandable && (
            <div className="text-[10px] text-white/40 mt-0.5">Tippen für Details</div>
          )}
        </div>

        <AnimatePresence>
          {showDetail && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ background: 'rgba(0,0,0,0.7)' }}
              onClick={() => setShowDetail(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.15 }}
                onClick={e => e.stopPropagation()}
                className={`
                  relative rounded-xl border-2 ${cfg.border} bg-gradient-to-br ${cfg.bg}
                  p-5 flex flex-col gap-2 w-full max-w-sm
                `}
              >
                <span className={`self-start text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${cfg.tag} text-white`}>
                  {cfg.label}
                </span>
                <div className={`text-2xl font-bold ${cfg.nr}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {card.id}
                </div>
                <div className="text-lg font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {card.title}
                </div>
                <div className="h-px bg-white/20 my-1" />
                <div className="text-sm text-white/80 leading-relaxed">
                  {getCardBody(card, type)}
                </div>
                {type === 'data' && (card as DataCard).examples && (
                  <div className="text-xs text-white/50 mt-1">
                    <span className="font-semibold">Beispiele: </span>
                    {(card as DataCard).examples}
                  </div>
                )}
                <button
                  onClick={() => setShowDetail(false)}
                  className="mt-3 text-xs text-white/50 hover:text-white/80 transition-colors self-center"
                >
                  Schließen
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    )
  }

  return (
    <motion.div
      onClick={onClick}
      whileHover={onClick ? { scale: 1.02 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      animate={{
        opacity: dimmed ? 0.4 : 1,
        scale: selected ? 1.03 : 1,
      }}
      transition={{ duration: 0.2 }}
      className={`
        relative rounded-xl border-2 ${cfg.border} bg-gradient-to-br ${cfg.bg}
        p-5 flex flex-col gap-2 min-h-[280px]
        ${onClick ? 'cursor-pointer' : ''}
        ${selected ? cfg.glow : ''}
      `}
      style={{ minWidth: 200 }}
    >
      <span className={`
        self-start text-[10px] font-bold uppercase tracking-widest
        px-2 py-0.5 rounded ${cfg.tag} text-white
      `}>
        {cfg.label}
      </span>
      <div className={`text-2xl font-bold ${cfg.nr}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {card.id}
      </div>
      <div className="text-lg font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {card.title}
      </div>
      <div className="h-px bg-white/20 my-1" />
      <div className="text-sm text-white/80 leading-relaxed flex-1">
        {getCardBody(card, type)}
      </div>
      {type === 'data' && (card as DataCard).examples && (
        <div className="text-xs text-white/50 mt-auto">
          <span className="font-semibold">Beispiele: </span>
          {(card as DataCard).examples}
        </div>
      )}
      {selected && (
        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white flex items-center justify-center">
          <span className="text-xs text-black font-bold">&#x2713;</span>
        </div>
      )}
    </motion.div>
  )
}
