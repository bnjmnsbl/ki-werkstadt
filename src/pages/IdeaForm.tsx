import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGame } from '../context/GameContext'
import { useIdeas } from '../hooks/useIdeas'
import Timer from '../components/Timer'
import Card from '../components/Card'
import Logo from '../components/Logo'

type FormData = {
  appName: string
  description: string
  opportunity: string
  risk: string
}

const TIMER_SECONDS = 5 * 60

function CharCount({ current, max }: { current: number; max: number }) {
  const warning = current > max * 0.9
  return (
    <span className={`text-xs ${warning ? 'text-[var(--color-warning)]' : 'text-[var(--color-text-muted)]'}`}>
      {current}/{max}
    </span>
  )
}

export default function IdeaForm() {
  const navigate = useNavigate()
  const { gameState, setSubmittedIdeaId } = useGame()
  const { submitIdea } = useIdeas()
  const [form, setForm] = useState<FormData>({ appName: '', description: '', opportunity: '', risk: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [timerExpired, setTimerExpired] = useState(false)

  const isValid =
    form.appName.length >= 3 &&
    form.description.length >= 10 &&
    form.opportunity.length >= 5 &&
    form.risk.length >= 5

  async function handleSubmit() {
    if (!isValid || submitting) return
    setSubmitting(true)
    setError(null)
    try {
      const id = await submitIdea(gameState, {
        appName: form.appName,
        description: form.description,
        opportunity: form.opportunity,
        risk: form.risk,
      })
      setSubmittedIdeaId(id)
      setSuccess(true)
      setTimeout(() => navigate('/play/review'), 2000)
    } catch {
      setError('Etwas ist schiefgelaufen. Bitte versuche es erneut.')
      setSubmitting(false)
    }
  }

  function handleTimerExpire() {
    setTimerExpired(true)
    if (isValid) {
      handleSubmit()
    }
  }

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }))

  return (
    <div className="min-h-dvh flex flex-col px-4 py-8 max-w-2xl mx-auto w-full">
      <div className="flex items-center justify-between mb-6">
        <Logo size="sm" />
        <Timer seconds={TIMER_SECONDS} onExpire={handleTimerExpire} />
      </div>

      {/* Mini-Karten Referenz — antippen für Details */}
      {gameState.scenario && (
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          <Card type="scenario" card={gameState.scenario} mini expandable />
          {gameState.dataCards.map(d => (
            <Card key={d.id} type="data" card={d} mini expandable />
          ))}
          {gameState.reflection && (
            <Card type="reflection" card={gameState.reflection} mini expandable />
          )}
        </div>
      )}

      {success ? (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex-1 flex flex-col items-center justify-center gap-4"
        >
          <div className="text-6xl">✅</div>
          <p className="text-white font-bold text-xl">Idee eingereicht!</p>
        </motion.div>
      ) : (
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Deine KI-Idee
          </h2>

          {timerExpired && !isValid && (
            <div className="p-3 rounded-lg bg-[var(--color-warning)]/10 border border-[var(--color-warning)]/30 text-[var(--color-warning)] text-sm">
              Zeit abgelaufen! Bitte fülle noch die Pflichtfelder aus. Du hast 30 Sekunden.
            </div>
          )}

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm text-[var(--color-text-muted)]">Name der Anwendung *</label>
              <CharCount current={form.appName.length} max={80} />
            </div>
            <input
              value={form.appName}
              onChange={set('appName')}
              maxLength={80}
              placeholder="z.B. BerlinAssist"
              className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] text-white border border-white/10 focus:border-[var(--color-accent)] outline-none transition-colors"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm text-[var(--color-text-muted)]">Was macht die Anwendung? *</label>
              <CharCount current={form.description.length} max={500} />
            </div>
            <textarea
              value={form.description}
              onChange={set('description')}
              maxLength={500}
              rows={4}
              placeholder="Beschreibe kurz deine KI-Idee…"
              className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] text-white border border-white/10 focus:border-[var(--color-accent)] outline-none transition-colors resize-none"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm text-[var(--color-text-muted)]">Größte Chance *</label>
              <CharCount current={form.opportunity.length} max={200} />
            </div>
            <textarea
              value={form.opportunity}
              onChange={set('opportunity')}
              maxLength={200}
              rows={2}
              placeholder="Was ist der größte Mehrwert?"
              className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] text-white border border-white/10 focus:border-[var(--color-accent)] outline-none transition-colors resize-none"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm text-[var(--color-text-muted)]">Größtes Risiko *</label>
              <CharCount current={form.risk.length} max={200} />
            </div>
            <textarea
              value={form.risk}
              onChange={set('risk')}
              maxLength={200}
              rows={2}
              placeholder="Was könnte schiefgehen?"
              className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] text-white border border-white/10 focus:border-[var(--color-accent)] outline-none transition-colors resize-none"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-[var(--color-danger)]/10 border border-[var(--color-danger)]/30 text-[var(--color-danger)] text-sm flex justify-between items-center">
              <span>{error}</span>
              <button onClick={handleSubmit} className="underline ml-2">Erneut</button>
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={!isValid || submitting}
            className="w-full py-4 rounded-xl font-bold text-lg text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed mt-2"
            style={{ background: isValid ? 'var(--color-accent)' : 'var(--color-surface)' }}
          >
            {submitting ? 'Wird eingereicht…' : 'Idee einreichen →'}
          </button>
        </div>
      )}
    </div>
  )
}
