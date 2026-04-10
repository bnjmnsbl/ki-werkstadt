type LogoSize = 'sm' | 'md' | 'lg'

const sizes: Record<LogoSize, { text: string; sub: string; bar: string }> = {
  sm: { text: 'text-xl',  sub: 'text-xs',  bar: 'h-5 w-0.5' },
  md: { text: 'text-3xl', sub: 'text-sm',  bar: 'h-8 w-0.5' },
  lg: { text: 'text-5xl', sub: 'text-base', bar: 'h-12 w-[3px]' },
}

export default function Logo({ size = 'md' }: { size?: LogoSize }) {
  const s = sizes[size]
  return (
    <div className="inline-flex flex-col">
      <div className={`flex items-center gap-2 font-bold tracking-tight ${s.text}`}
           style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        <span className="text-white">KI-WERK</span>
        <span className={`${s.bar} bg-[var(--color-accent)] rounded-full`} />
        <span className="text-[var(--color-accent)]">STADT</span>
      </div>
      <div className={`${s.sub} text-[var(--color-accent)] text-right tracking-widest uppercase`}
           style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        Berlin
      </div>
    </div>
  )
}
