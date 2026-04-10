export type Scenario = {
  id: string        // 'S1' ... 'S6'
  title: string
  description: string
}

export type DataCard = {
  id: string        // 'D1' ... 'D12'
  title: string
  description: string
  examples: string
}

export type ReflectionCard = {
  id: string        // 'R1' ... 'R16'
  title: string
  condition: string
}

export type Idea = {
  id: string
  created_at: string
  session_id: string
  scenario_id: string
  data_card_1_id: string
  data_card_2_id: string
  reflection_id: string
  app_name: string
  description: string
  opportunity: string
  risk: string
  total_chips: number
  review_count: number
  is_seed: boolean
}

export type IdeaWithCards = Idea & {
  scenario: Scenario | null
  data_card_1: DataCard | null
  data_card_2: DataCard | null
  reflection: ReflectionCard | null
}

export type GameState = {
  scenario: Scenario | null
  dataCards: DataCard[]
  reflection: ReflectionCard | null
  submittedIdeaId: string | null
}
