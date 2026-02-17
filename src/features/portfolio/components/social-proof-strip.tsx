const SOCIAL_PROOF_STATS = [
  { label: "Hackathon Wins", value: "5x" },
  { label: "Solana Finalist", value: "Top 4" },
  { label: "Fellowship Cohort", value: "72 / 3,000" },
  { label: "Campus Expert", value: "GitHub 2025" },
] as const;

export function SocialProofStrip() {
  return (
    <section
      aria-label="Highlights"
      className="screen-line-before screen-line-after border-x border-edge"
    >
      <div className="grid grid-cols-2 divide-x divide-y divide-edge sm:grid-cols-4 sm:divide-y-0">
        {SOCIAL_PROOF_STATS.map((item) => (
          <div
            key={item.label}
            className="group px-4 py-3 transition-colors hover:bg-accent2"
          >
            <p className="[font-family:var(--font-display)] text-lg leading-none font-semibold tracking-tight">
              {item.value}
            </p>
            <p className="mt-1 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
