import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGame } from '../context/GameContext'
import Logo from '../components/Logo'

export default function Done() {
  const navigate = useNavigate()
  const { gameState, resetGame } = useGame()

  function handlePlayAgain() {
    resetGame()
    navigate('/play/cards')
  }

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-4 py-12 max-w-2xl mx-auto w-full text-center">
      <Logo size="md" />

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="text-7xl mt-8 mb-4"
      >
        🎉
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-3xl font-bold text-white mb-4"
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        Danke fürs Mitspielen!
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-[var(--color-text-muted)] mb-3 max-w-sm leading-relaxed"
      >
        Deine Chips wurden verteilt.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-[var(--color-text-muted)] mb-6 max-w-sm leading-relaxed text-sm"
      >
        Deine eigene Idee kann jetzt von anderen Spieler:innen bewertet werden.
        Schau später im Leaderboard vorbei, um zu sehen, wie deine Idee abschneidet!
      </motion.p>

      {gameState.submittedIdeaId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="px-6 py-3 rounded-xl bg-[var(--color-surface)] border border-white/10 mb-8"
        >
          <p className="text-xs text-[var(--color-text-muted)] mb-1">Deine eingereichte Idee</p>
          <p className="text-white font-semibold font-mono text-sm">
            {gameState.submittedIdeaId.slice(0, 8)}…
          </p>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col sm:flex-row gap-3 w-full max-w-xs"
      >
        <button
          onClick={() => navigate('/')}
          className="flex-1 py-3 rounded-xl text-white font-bold"
          style={{ background: 'var(--color-accent)' }}
        >
          Zum Leaderboard
        </button>
        <button
          onClick={handlePlayAgain}
          className="flex-1 py-3 rounded-xl text-[var(--color-text-muted)] border border-white/20 hover:border-white/40 transition-colors"
        >
          Nochmal spielen
        </button>
      </motion.div>
    </div>
  )
}
