import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useReviews } from '../hooks/useReviews'
import IdeaCard from '../components/IdeaCard'
import ChipAllocator from '../components/ChipAllocator'
import Logo from '../components/Logo'

const TOTAL_CHIPS = 10

export default function Review() {
  const navigate = useNavigate()
  const { ideas, loading, error, submitReviews } = useReviews()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [allocations, setAllocations] = useState<Record<string, number>>({})
  const [showSummary, setShowSummary] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [initialized, setInitialized] = useState(false)

  const allocated = Object.values(allocations).reduce((a, b) => a + b, 0)
  const remaining = TOTAL_CHIPS - allocated

  if (ideas.length > 0 && !initialized) {
    const init: Record<string, number> = {}
    ideas.forEach(idea => { init[idea.id] = 0 })
    setAllocations(init)
    setInitialized(true)
  }

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

  if (showSummary) {
    return (
      <div className="min-h-dvh flex flex-col px-4 py-8 max-w-2xl mx-auto w-full">
        <Logo size="sm" />
        <h2 className="text-2xl font-bold text-white mt-6 mb-6" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Deine Bewertung
        </h2>
        <div className="space-y-4 mb-6">
          {ideas.map(idea => (
            <div key={idea.id} className="flex items-center justify-between p-4 rounded-xl bg-[var(--color-surface)]">
              <span className="text-white font-medium">{idea.app_name}</span>
              <span className="text-[var(--color-chip)] font-bold">{allocations[idea.id] ?? 0} 🪙</span>
            </div>
          ))}
        </div>
        <div className="text-sm text-[var(--color-text-muted)] mb-6 text-center">
          Verbleibend: {remaining} Chips
        </div>
        {remaining > 0 && (
          <button onClick={() => setShowSummary(false)}
                  className="w-full py-3 rounded-xl text-white border border-white/20 mb-3">
            Chips umverteilen
          </button>
        )}
        {submitError && (
          <p className="text-[var(--color-danger)] text-sm mb-3 text-center">{submitError}</p>
        )}
        <button
          onClick={handleSubmit}
          disabled={remaining > 0 || submitting}
          className="w-full py-4 rounded-xl font-bold text-lg text-white disabled:opacity-40"
          style={{ background: 'var(--color-accent)' }}
        >
          {submitting ? 'Wird gespeichert…' : 'Bewertung abschicken →'}
        </button>
      </div>
    )
  }

  const currentIdea = ideas[currentIndex]

  return (
    <div className="min-h-dvh flex flex-col px-4 py-8 max-w-2xl mx-auto w-full">
      <div className="flex items-center justify-between mb-6">
        <Logo size="sm" />
        <div className="text-sm text-[var(--color-text-muted)]">
          {currentIndex + 1} / {ideas.length}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdea.id}
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -80, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 flex flex-col gap-6"
        >
          <IdeaCard idea={currentIdea} />

          <ChipAllocator
            ideaId={currentIdea.id}
            allocated={allocations[currentIdea.id] ?? 0}
            remaining={remaining}
            onChange={handleChange}
          />

          <div className="flex gap-3 mt-auto">
            {currentIndex > 0 && (
              <button onClick={() => setCurrentIndex(i => i - 1)}
                      className="flex-1 py-3 rounded-xl text-white border border-white/20">
                ← Zurück
              </button>
            )}
            {currentIndex < ideas.length - 1 ? (
              <button onClick={() => setCurrentIndex(i => i + 1)}
                      className="flex-1 py-3 rounded-xl text-white font-bold"
                      style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                Weiter →
              </button>
            ) : (
              <button onClick={() => setShowSummary(true)}
                      className="flex-1 py-3 rounded-xl text-white font-bold"
                      style={{ background: 'var(--color-accent)' }}>
                Zur Übersicht →
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
