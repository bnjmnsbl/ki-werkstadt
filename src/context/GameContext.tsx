import { createContext, useContext, useState, type ReactNode } from 'react'
import type { GameState, Scenario, DataCard, ReflectionCard } from '../lib/types'

type GameContextValue = {
  gameState: GameState
  setScenario: (s: Scenario) => void
  setDataCards: (cards: DataCard[]) => void
  setReflection: (r: ReflectionCard) => void
  setSubmittedIdeaId: (id: string) => void
  resetGame: () => void
}

const initialState: GameState = {
  scenario: null,
  dataCards: [],
  reflection: null,
  submittedIdeaId: null,
}

const GameContext = createContext<GameContextValue | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, setGameState] = useState<GameState>(initialState)

  const setScenario = (scenario: Scenario) =>
    setGameState(s => ({ ...s, scenario }))

  const setDataCards = (dataCards: DataCard[]) =>
    setGameState(s => ({ ...s, dataCards }))

  const setReflection = (reflection: ReflectionCard) =>
    setGameState(s => ({ ...s, reflection }))

  const setSubmittedIdeaId = (submittedIdeaId: string) =>
    setGameState(s => ({ ...s, submittedIdeaId }))

  const resetGame = () => setGameState(initialState)

  return (
    <GameContext.Provider value={{ gameState, setScenario, setDataCards, setReflection, setSubmittedIdeaId, resetGame }}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used inside GameProvider')
  return ctx
}
