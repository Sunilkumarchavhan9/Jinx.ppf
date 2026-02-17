"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

type GlowPoint = {
  top: string;
  left: string;
  glow: number;
  core: number;
};

type CatchBurst = {
  id: number;
  top: string;
  left: string;
  size: number;
};

const DIAMOND_GLOWS: GlowPoint[] = [
  { top: "14%", left: "8%", glow: 22, core: 4 },
  { top: "24%", left: "18%", glow: 18, core: 3 },
  { top: "12%", left: "32%", glow: 26, core: 4 },
  { top: "35%", left: "42%", glow: 20, core: 3 },
  { top: "18%", left: "56%", glow: 24, core: 4 },
  { top: "42%", left: "66%", glow: 17, core: 3 },
  { top: "22%", left: "77%", glow: 21, core: 4 },
  { top: "33%", left: "88%", glow: 19, core: 3 },
  { top: "62%", left: "12%", glow: 23, core: 4 },
  { top: "72%", left: "28%", glow: 18, core: 3 },
  { top: "66%", left: "48%", glow: 25, core: 4 },
  { top: "82%", left: "62%", glow: 20, core: 3 },
  { top: "76%", left: "74%", glow: 22, core: 4 },
  { top: "64%", left: "90%", glow: 16, core: 3 },
];

const HUNTER_STEP_MS = 220;
const MAX_VISIBLE_BURSTS = 6;
const BURST_LIFETIME_MS = 440;

function pickRandomGlows(min: number, max: number) {
  const total = DIAMOND_GLOWS.length;
  const lower = Math.min(min, total);
  const upper = Math.min(Math.max(max, lower), total);
  const count = lower + Math.floor(Math.random() * (upper - lower + 1));

  const indices = Array.from({ length: total }, (_, index) => index);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = indices[i];
    indices[i] = indices[j];
    indices[j] = temp;
  }

  return indices.slice(0, count);
}

function shuffleIndices(indices: number[]) {
  const copy = [...indices];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[j];
    copy[j] = temp;
  }
  return copy;
}

export function DiamondGlowField() {
  const [activeGlows, setActiveGlows] = useState<number[]>([]);
  const [catchBursts, setCatchBursts] = useState<CatchBurst[]>([]);
  const glowTimerRef = useRef<number | null>(null);
  const chaseIntervalRef = useRef<number | null>(null);
  const burstIdRef = useRef(0);
  const burstTimeoutsRef = useRef<number[]>([]);
  const reducedMotion = useSyncExternalStore(
    (notify) => {
      if (typeof window === "undefined") {
        return () => {};
      }

      const media = window.matchMedia("(prefers-reduced-motion: reduce)");
      media.addEventListener("change", notify);

      return () => {
        media.removeEventListener("change", notify);
      };
    },
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
  const reducedMotionGlows = useMemo(() => pickRandomGlows(6, 6), []);

  useEffect(() => {
    const clearTimer = () => {
      if (glowTimerRef.current !== null) {
        window.clearTimeout(glowTimerRef.current);
      }
    };

    if (reducedMotion) {
      return clearTimer;
    }

    const runSequence = () => {
      setActiveGlows(pickRandomGlows(5, 10));
      const nextDuration = 450 + Math.floor(Math.random() * 900);
      glowTimerRef.current = window.setTimeout(() => {
        runSequence();
      }, nextDuration);
    };

    glowTimerRef.current = window.setTimeout(() => {
      runSequence();
    }, 0);

    return clearTimer;
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || activeGlows.length === 0) {
      return;
    }

    const shuffled = shuffleIndices(activeGlows);
    let pointer = 0;

    const chaseTimer = window.setTimeout(() => {
      const setNextTarget = () => {
        const nextTarget = shuffled[pointer];
        const nextPoint = DIAMOND_GLOWS[nextTarget];
        const burstId = burstIdRef.current++;
        const burst: CatchBurst = {
          id: burstId,
          top: nextPoint.top,
          left: nextPoint.left,
          size: 22 + Math.floor(Math.random() * 12),
        };

        setCatchBursts((previous) =>
          [burst, ...previous].slice(0, MAX_VISIBLE_BURSTS)
        );

        const removeBurstTimeout = window.setTimeout(() => {
          setCatchBursts((previous) =>
            previous.filter((item) => item.id !== burstId)
          );
        }, BURST_LIFETIME_MS);
        burstTimeoutsRef.current.push(removeBurstTimeout);

        pointer = (pointer + 1) % shuffled.length;
      };

      setNextTarget();
      chaseIntervalRef.current = window.setInterval(
        setNextTarget,
        HUNTER_STEP_MS
      );
    }, 0);

    return () => {
      window.clearTimeout(chaseTimer);
      if (chaseIntervalRef.current !== null) {
        window.clearInterval(chaseIntervalRef.current);
      }

      burstTimeoutsRef.current.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
      burstTimeoutsRef.current = [];
    };
  }, [activeGlows, reducedMotion]);

  const activeSet = new Set(reducedMotion ? reducedMotionGlows : activeGlows);

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {DIAMOND_GLOWS.map((glow, index) => {
        const isActive = activeSet.has(index);

        return (
          <span
            key={`${glow.top}-${glow.left}`}
            className="absolute"
            style={{ top: glow.top, left: glow.left }}
            aria-hidden
          >
            <span
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300/45 blur-[10px] transition-all duration-500 dark:bg-sky-200/35"
              style={{
                width: `${glow.glow}px`,
                height: `${glow.glow}px`,
                opacity: isActive ? 1 : 0,
                transform: isActive
                  ? "translate(-50%, -50%) scale(1)"
                  : "translate(-50%, -50%) scale(0.55)",
              }}
            />
            <span
              className="absolute -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-[1px] bg-white transition-all duration-500"
              style={{
                width: `${glow.core}px`,
                height: `${glow.core}px`,
                opacity: isActive ? 1 : 0,
                boxShadow: isActive
                  ? "0 0 12px rgba(125, 211, 252, 0.9)"
                  : "0 0 0 rgba(125, 211, 252, 0)",
              }}
            />
          </span>
        );
      })}

      {catchBursts.map((burst) => (
        <span
          key={burst.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-200/90 opacity-0 motion-safe:animate-[goku-catch-burst_420ms_ease-out]"
          style={{
            top: burst.top,
            left: burst.left,
            width: `${burst.size}px`,
            height: `${burst.size}px`,
            boxShadow: "0 0 18px rgba(186, 230, 253, 0.8)",
          }}
          aria-hidden
        />
      ))}
    </div>
  );
}
