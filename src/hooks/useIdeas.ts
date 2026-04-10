import { supabase } from '../lib/supabase'
import { getSessionId } from '../lib/session'
import type { GameState } from '../lib/types'

type IdeaFormData = {
  appName: string
  description: string
  opportunity: string
  risk: string
}

export function useIdeas() {
  async function submitIdea(gameState: GameState, formData: IdeaFormData): Promise<string> {
    if (!gameState.scenario || gameState.dataCards.length < 2 || !gameState.reflection) {
      throw new Error('Unvollständiger Spielzustand')
    }

    const { data, error } = await supabase
      .from('ideas')
      .insert({
        session_id: getSessionId(),
        scenario_id: gameState.scenario.id,
        data_card_1_id: gameState.dataCards[0].id,
        data_card_2_id: gameState.dataCards[1].id,
        reflection_id: gameState.reflection.id,
        app_name: formData.appName,
        description: formData.description,
        opportunity: formData.opportunity,
        risk: formData.risk,
      })
      .select('id')
      .single()

    if (error) throw new Error(error.message)
    return data.id
  }

  return { submitIdea }
}
