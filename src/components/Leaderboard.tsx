import { motion } from 'framer-motion'
import { useLeaderboard } from '../hooks/useLeaderboard'

export default function Leaderboard() {
  const { entries, loading, error, reload } = useLeaderboard()

  if (loading) {
    return (
      <div className="text-center py-12 text-[var(--color-text-muted)]">
        Lade Leaderboard…
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-[var(--color-danger)] mb-4">{error}</p>
        <button
          onClick={reload}
          className="px-4 py-2 rounded-lg bg-[var(--color-surface)] text-white hover:bg-white/10 transition-colors"
        >
          Erneut versuchen
        </button>
      </div>
    )
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-12 text-[var(--color-text-muted)]">
        Noch keine Ideen eingereicht. Sei die Erste!
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {entries.map((entry, i) => (
        <motion.div
          key={entry.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04, duration: 0.3 }}
          className="flex items-center gap-4 p-4 rounded-xl bg-[var(--color-surface)] border border-white/5"
        >
          <div className="text-2xl font-bold text-[var(--color-text-muted)] w-8 text-center"
               style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {i + 1}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-white truncate">{entry.app_name}</div>
            <div className="text-xs text-[var(--color-text-muted)] mt-0.5">
              {entry.scenario_id} · {entry.data_card_1_id} · {entry.data_card_2_id}
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-[var(--color-chip)] font-bold text-lg">
              {entry.total_chips} <span className="text-sm">🪙</span>
            </div>
            <div className="text-xs text-[var(--color-text-muted)]">
              {entry.review_count} Bewertungen
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
