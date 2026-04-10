import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useReviews } from '../hooks/useReviews'
import IdeaCard from '../components/IdeaCard'
import ChipAllocator from '../components/ChipAllocator'
import Logo from '../components/Logo'

const TOTAL_CHIPS = 10

export default function Review() {
  const navigate = useNavigate()
  const { ideas, loading, error, submitReviews } = useReviews()
  const [allocations, setAllocations] = useState<Record<string, number>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const allocated = Object.values(allocations).reduce((a, b) => a + b, 0)
  const remaining = TOTAL_CHIPS - allocated

  useEffect(() => {
    if (ideas.length > 0) {
      const init: Record<string, number> = {}
      ideas.forEach(idea => { init[idea.id] = 0 })
      setAllocations(init)
    }
  }, [ideas])

  function handleChange(ideaId: string, chips: number) {
    setAllocations(prev => ({ ...prev, [ideaId]: chips }))
  }

  async function handleSubmit() {
    setSubmitting(true)
    setSubmitError(null)
    try {
      await submitReviews(allocations)
      navigate('/play/done')
    } catch {
      setSubmitError('Bewertung konnte nicht gespeichert werden. Bitte versuche es erneut.')
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center text-[var(--color-text-muted)]">
        Lade Ideen…
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-[var(--color-danger)]">{error}</p>
        <button onClick={() => window.location.reload()} className="px-4 py-2 rounded-lg bg-[var(--color-surface)] text-white">
          Erneut versuchen
        </button>
      </div>
    )
  }

  if (ideas.length === 0) {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-white text-lg font-bold">Keine Ideen zum Bewerten</p>
        <p className="text-[var(--color-text-muted)]">Du bist die erste Person — komm später wieder!</p>
        <button onClick={() => navigate('/play/done')} className="px-6 py-3 rounded-xl text-white font-bold"
                style={{ background: 'var(--color-accent)' }}>
          Weiter
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-dvh flex flex-col px-4 py-8 max-w-2xl mx-auto w-full">
      <div className="flex items-center justify-between mb-2">
        <Logo size="sm" />
        <div className="text-sm text-[var(--color-chip)] font-bold">
          Noch {remaining} Chip{remaining !== 1 ? 's' : ''} zu verteilen
        </div>
      </div>

      <p className="text-xs text-[var(--color-text-muted)] mb-6">
        Verteile insgesamt 10 Chips auf die Ideen — du kannst jederzeit umverteilen.
      </p>

      <div className="flex flex-col gap-6">
        {ideas.map((idea, i) => (
          <motion.div
            key={idea.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            <IdeaCard idea={idea} />
            <ChipAllocator
              ideaId={idea.id}
              allocated={allocations[idea.id] ?? 0}
              remaining={remaining}
              onChange={handleChange}
            />
            {i < ideas.length - 1 && (
              <div className="h-px bg-white/10" />
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-8 sticky bottom-4">
        {submitError && (
          <p className="text-[var(--color-danger)] text-sm mb-3 text-center">{submitError}</p>
        )}
        <button
          onClick={handleSubmit}
          disabled={remaining > 0 || submitting}
          className="w-full py-4 rounded-xl font-bold text-lg text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-lg"
          style={{ background: remaining === 0 ? 'var(--color-accent)' : 'var(--color-surface)', border: remaining > 0 ? '1px solid rgba(255,255,255,0.1)' : undefined }}
        >
          {submitting ? 'Wird gespeichert…' : remaining > 0 ? `Noch ${remaining} Chips verteilen` : 'Bewertung abschicken →'}
        </button>
      </div>
    </div>
  )
}
