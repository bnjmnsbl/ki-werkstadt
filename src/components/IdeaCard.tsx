import type { IdeaWithCards } from '../lib/types'
import Card from './Card'

export default function IdeaCard({ idea }: { idea: IdeaWithCards }) {
  return (
    <div className="rounded-2xl bg-[var(--color-surface)] border border-white/5 p-5 space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {idea.scenario && <Card type="scenario" card={idea.scenario} mini />}
        {idea.data_card_1 && <Card type="data" card={idea.data_card_1} mini />}
        {idea.data_card_2 && <Card type="data" card={idea.data_card_2} mini />}
        {idea.reflection && <Card type="reflection" card={idea.reflection} mini />}
      </div>
      <h3 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {idea.app_name}
      </h3>
      <p className="text-[var(--color-text)] text-sm leading-relaxed">{idea.description}</p>
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-lg bg-[var(--color-success)]/5 border border-[var(--color-success)]/20">
          <div className="text-xs text-[var(--color-success)] font-semibold mb-1">Größte Chance</div>
          <div className="text-sm text-white">{idea.opportunity}</div>
        </div>
        <div className="p-3 rounded-lg bg-[var(--color-danger)]/5 border border-[var(--color-danger)]/20">
          <div className="text-xs text-[var(--color-danger)] font-semibold mb-1">Größtes Risiko</div>
          <div className="text-sm text-white">{idea.risk}</div>
        </div>
      </div>
    </div>
  )
}
