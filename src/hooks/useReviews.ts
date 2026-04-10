import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { getSessionId } from '../lib/session'
import type { IdeaWithCards } from '../lib/types'
import { SCENARIOS, DATA_CARDS, REFLECTION_CARDS } from '../data/cards'

export function useReviews() {
  const [ideas, setIdeas] = useState<IdeaWithCards[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const { data, error: err } = await supabase
        .from('ideas')
        .select('*')
        .neq('session_id', getSessionId())
        .order('review_count', { ascending: true })
        .limit(3)

      if (err) {
        setError('Ideen konnten nicht geladen werden.')
        setLoading(false)
        return
      }

      // Join cards from local static data
      const withCards: IdeaWithCards[] = (data ?? []).map(idea => ({
        ...idea,
        scenario: SCENARIOS.find(s => s.id === idea.scenario_id) ?? null,
        data_card_1: DATA_CARDS.find(d => d.id === idea.data_card_1_id) ?? null,
        data_card_2: DATA_CARDS.find(d => d.id === idea.data_card_2_id) ?? null,
        reflection: REFLECTION_CARDS.find(r => r.id === idea.reflection_id) ?? null,
      }))

      setIdeas(withCards)
      setLoading(false)
    }
    load()
  }, [])

  async function submitReviews(allocations: Record<string, number>): Promise<void> {
    const reviews = Object.entries(allocations).map(([idea_id, chips]) => ({
      reviewer_session_id: getSessionId(),
      idea_id,
      chips,
    }))
    const { error } = await supabase.from('reviews').insert(reviews)
    if (error) throw new Error(error.message)
  }

  return { ideas, loading, error, submitReviews }
}
