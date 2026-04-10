import { useState, useEffect } from 'react'
import { SCENARIOS, DATA_CARDS, REFLECTION_CARDS } from '../data/cards'
import type { Scenario, DataCard, ReflectionCard } from '../lib/types'

function pickRandom<T>(arr: T[], n: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n)
}

export function useCards() {
  const [scenarios, setScenarios] = useState<Scenario[]>([])
  const [dataCards, setDataCards] = useState<DataCard[]>([])
  const [reflections, setReflections] = useState<ReflectionCard[]>([])

  useEffect(() => {
    setScenarios(pickRandom(SCENARIOS, 2))
    setDataCards(pickRandom(DATA_CARDS, 5))
    setReflections(pickRandom(REFLECTION_CARDS, 3))
  }, [])

  return { scenarios, dataCards, reflections }
}
