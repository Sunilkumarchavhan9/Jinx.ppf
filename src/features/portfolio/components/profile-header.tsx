import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links";
import { USER } from "@/features/portfolio/data/user";
import { FlipSentences } from "@/registry/flip-sentences";

import { PronounceMyName } from "./pronounce-my-name";
import { VerifiedIcon } from "./verified-icon";

const TRUST_BADGES = [
  "5x Hackathon Winner",
  "Top 4 Solana Finalist",
  "GitHub Campus Expert",
] as const;

const PRIMARY_CTA =
  SOCIAL_LINKS.find((link) => link.title === "LinkedIn")?.href || USER.website;

export function ProfileHeader() {
  return (
    <div className="screen-line-after flex flex-col border-x border-edge sm:flex-row">
      <div className="shrink-0 border-b border-edge sm:border-r sm:border-b-0">
        <div className="relative my-[3px] mr-auto ml-3 w-fit sm:mx-0.5">
          <img
            className="size-28 rounded-full ring-1 ring-border ring-offset-2 ring-offset-background select-none sm:size-40"
            alt={`${USER.displayName}'s avatar`}
            src={USER.avatar}
            fetchPriority="high"
          />
          <a
            href="https://www.india.gov.in"
            target="_blank"
            rel="noreferrer"
            className="absolute top-0 left-0"
          >
            {/* Flag of India */}
            <svg
              className="h-7 sm:h-9"
              viewBox="0 0 30 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Flag of India</title>
              <rect width="30" height="6.67" fill="#FF9933" />
              <rect y="6.67" width="30" height="6.67" fill="#FFFFFF" />
              <rect y="13.33" width="30" height="6.67" fill="#138808" />
              <circle
                cx="15"
                cy="10"
                r="2.5"
                fill="none"
                stroke="#000080"
                strokeWidth="0.3"
              />
              <circle cx="15" cy="10" r="0.3" fill="#000080" />
              {/* Ashoka Chakra spokes */}
              <g stroke="#000080" strokeWidth="0.15">
                {[...Array(24)].map((_, i) => {
                  const angle = (i * 15 * Math.PI) / 180;
                  const x1 = 15 + 0.5 * Math.cos(angle);
                  const y1 = 10 + 0.5 * Math.sin(angle);
                  const x2 = 15 + 2.3 * Math.cos(angle);
                  const y2 = 10 + 2.3 * Math.sin(angle);
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
                })}
              </g>
            </svg>
          </a>
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="hidden grow items-end pb-1 pl-4 sm:flex">
          <div className="line-clamp-1 font-mono text-xs text-zinc-300 select-none max-sm:hidden dark:text-zinc-800">
            {"text-3xl "}
            <span className="inline dark:hidden">text-zinc-950</span>
            <span className="hidden dark:inline">text-zinc-50</span>
            {" font-medium"}
          </div>
        </div>

        <div className="border-t border-edge">
          <div className="flex items-center gap-2 px-3 py-2 sm:py-0 sm:pl-4">
            <h1 className="-translate-y-px [font-family:var(--font-display)] text-2xl leading-none font-semibold tracking-tight sm:text-3xl">
              {USER.displayName}
            </h1>

            <VerifiedIcon
              className="size-4.5 text-info select-none"
              aria-label="Verified"
            />

            {USER.namePronunciationUrl && (
              <PronounceMyName
                namePronunciationUrl={USER.namePronunciationUrl}
              />
            )}
          </div>

          <div className="min-h-11 border-t border-edge px-3 py-1 sm:h-9 sm:pl-4">
            <FlipSentences
              className="font-mono text-xs text-balance text-muted-foreground sm:text-sm"
              variants={{
                initial: { y: -10, opacity: 0 },
                animate: { y: -1, opacity: 1 },
                exit: { y: 10, opacity: 0 },
              }}
            >
              {USER.flipSentences}
            </FlipSentences>
          </div>

          <div className="flex flex-col gap-2 border-t border-edge p-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:pl-4">
            <div className="flex flex-wrap items-center gap-2">
              {TRUST_BADGES.map((badge) => (
                <span
                  key={badge}
                  className="rounded-sm border border-border bg-muted/70 px-2 py-0.5 font-mono text-[11px] text-foreground/85"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between gap-2 sm:justify-start">
              <span className="inline-flex items-center gap-1 rounded-sm border border-success/40 bg-success/10 px-2 py-1 text-[11px] font-medium text-success">
                <span className="size-1.5 rounded-full bg-success motion-safe:animate-pulse" />
                {USER.availability}
              </span>

              <a
                href={PRIMARY_CTA}
                target="_blank"
                rel="noreferrer"
                className="rounded-sm border border-info/60 bg-info/12 px-2.5 py-1 text-xs font-medium text-info transition-colors hover:bg-info/20"
              >
                Hire Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
