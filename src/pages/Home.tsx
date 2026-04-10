import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import Logo from '../components/Logo'
import Leaderboard from '../components/Leaderboard'

export default function Home() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [showLeaderboard, setShowLeaderboard] = useState(searchParams.get('leaderboard') === '1')

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: 'var(--color-bg)' }}>
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 max-w-2xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Logo size="lg" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-[var(--color-text-muted)] text-center mb-2 text-lg"
        >
          Ein Kartenspiel über KI im öffentlichen Sektor
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-[var(--color-text)] text-center mb-10 text-base max-w-md leading-relaxed"
        >
          Kombiniere Daten und Szenarien zu einer KI-Idee für Berlin. Pitche deine Idee und bewerte die Vorschläge anderer. Die besten Ideen steigen im Leaderboard auf.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/play/cards')}
          className="px-10 py-4 rounded-2xl text-white font-bold text-xl mb-6 transition-all"
          style={{ background: 'var(--color-accent)', fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Spiel starten
        </motion.button>

        <button
          onClick={() => setShowLeaderboard(v => !v)}
          className="text-[var(--color-text-muted)] hover:text-white transition-colors text-sm underline underline-offset-4"
        >
          {showLeaderboard ? 'Leaderboard ausblenden' : 'Leaderboard ansehen'}
        </button>

        {showLeaderboard && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full mt-8"
          >
            <h2 className="text-xl font-bold text-white mb-4"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Leaderboard
            </h2>
            <Leaderboard />
          </motion.div>
        )}
      </main>

      <footer className="text-center text-xs text-[var(--color-text-muted)] py-6">
        Ein Projekt von CityLAB Berlin · Technologiestiftung Berlin
      </footer>
    </div>
  )
}
