import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Idea } from '../lib/types'

type LeaderboardEntry = Pick<Idea, 'id' | 'app_name' | 'scenario_id' | 'data_card_1_id' | 'data_card_2_id' | 'total_chips' | 'review_count'>

export function useLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function load() {
    setLoading(true)
    setError(null)
    const { data, error: err } = await supabase
      .from('ideas')
      .select('id, app_name, scenario_id, data_card_1_id, data_card_2_id, total_chips, review_count')
      .order('total_chips', { ascending: false })
      .limit(50)

    if (err) {
      setError('Leaderboard konnte nicht geladen werden.')
    } else {
      setEntries(data ?? [])
    }
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  return { entries, loading, error, reload: load }
}
