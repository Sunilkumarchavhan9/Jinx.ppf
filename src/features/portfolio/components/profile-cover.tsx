import { BrandContextMenu } from "@/components/brand-context-menu";
import { ChanhDaiMark } from "@/components/sunil-mark";
import { cn } from "@/lib/utils";

export function ProfileCover() {
  return (
    <BrandContextMenu>
      <div
        className={cn(
          "relative aspect-2/1 overflow-hidden border-x border-edge select-none sm:aspect-3/1",
          "flex items-center justify-center text-black dark:text-white",
          "screen-line-before screen-line-after before:-top-px after:-bottom-px",
          "bg-black/0.75 bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] bg-size-[10px_10px] bg-center [--pattern-foreground:var(--color-zinc-950)]/5 dark:bg-white/0.75 dark:[--pattern-foreground:var(--color-white)]/5"
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-15 mix-blend-soft-light motion-safe:animate-[cover-grain-shift_1.8s_steps(2)_infinite]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.15' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.65'/%3E%3C/svg%3E\")",
          }}
          aria-hidden
        />
        <ChanhDaiMark
          id="js-cover-mark"
          className="relative z-10 h-14 w-28 sm:h-16 sm:w-32"
        />
      </div>
    </BrandContextMenu>
  );
}
