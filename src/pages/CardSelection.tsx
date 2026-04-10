import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useGame } from '../context/GameContext'
import { useCards } from '../hooks/useCards'
import Card from '../components/Card'
import ProgressBar from '../components/ProgressBar'
import Logo from '../components/Logo'

const slideVariants = {
  enter: { x: 80, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -80, opacity: 0 },
}

export default function CardSelection() {
  const navigate = useNavigate()
  const { setScenario, setDataCards, setReflection } = useGame()
  const { scenarios, dataCards, reflections } = useCards()
  const [step, setStep] = useState(1)
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null)
  const [selectedData, setSelectedData] = useState<string[]>([])
  const [selectedReflection, setSelectedReflection] = useState<string | null>(null)

  function handleScenarioSelect(id: string) {
    setSelectedScenario(id)
    setTimeout(() => {
      const s = scenarios.find(s => s.id === id)!
      setScenario(s)
      setStep(2)
    }, 400)
  }

  function toggleDataCard(id: string) {
    setSelectedData(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id)
      if (prev.length >= 2) return prev
      return [...prev, id]
    })
  }

  function handleDataConfirm() {
    const picked = dataCards.filter(d => selectedData.includes(d.id))
    setDataCards(picked)
    setStep(3)
  }

  function handleReflectionSelect(id: string) {
    setSelectedReflection(id)
    setTimeout(() => {
      const r = reflections.find(r => r.id === id)!
      setReflection(r)
      navigate('/play/idea')
    }, 400)
  }

  return (
    <div className="min-h-dvh flex flex-col px-4 py-8 max-w-2xl mx-auto w-full">
      <div className="mb-8 flex items-center gap-6">
        <Logo size="sm" />
        <div className="flex-1">
          <ProgressBar step={step} total={3} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
            <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Wähle ein Szenario
            </h2>
            <p className="text-[var(--color-text-muted)] mb-6">Wähle 1 von 2 Szenario-Karten aus.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {scenarios.map(s => (
                <Card
                  key={s.id}
                  type="scenario"
                  card={s}
                  selected={selectedScenario === s.id}
                  dimmed={selectedScenario !== null && selectedScenario !== s.id}
                  onClick={() => handleScenarioSelect(s.id)}
                />
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
            <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Wähle 2 Datenkarten
            </h2>
            <p className="text-[var(--color-text-muted)] mb-6">
              {selectedData.length}/2 ausgewählt
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {dataCards.map(d => (
                <Card
                  key={d.id}
                  type="data"
                  card={d}
                  selected={selectedData.includes(d.id)}
                  dimmed={selectedData.length === 2 && !selectedData.includes(d.id)}
                  onClick={() => toggleDataCard(d.id)}
                />
              ))}
            </div>
            {selectedData.length === 2 && (
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleDataConfirm}
                className="w-full py-4 rounded-xl text-white font-bold text-lg"
                style={{ background: 'var(--color-accent)' }}
              >
                Weiter →
              </motion.button>
            )}
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
            <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Wähle eine Reflexionskarte
            </h2>
            <p className="text-[var(--color-text-muted)] mb-6">Wähle 1 von 3 Reflexions-Karten aus.</p>
            <div className="flex flex-col gap-4">
              {reflections.map(r => (
                <Card
                  key={r.id}
                  type="reflection"
                  card={r}
                  selected={selectedReflection === r.id}
                  dimmed={selectedReflection !== null && selectedReflection !== r.id}
                  onClick={() => handleReflectionSelect(r.id)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
