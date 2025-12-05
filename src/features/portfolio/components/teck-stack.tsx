import Image from "next/image";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { TECH_STACK } from "../data/tech-stack";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

const ICON_SLUG: Record<string, string> = {
  typescript: "typescript",
  nodejs: "nodedotjs",
  react: "react",
  nextjs: "nextdotjs",
  tailwindcss: "tailwindcss",
  solidity: "solidity",
  rust: "rust",
  solana: "solana",
  docker: "docker",
  kubernetes: "kubernetes",
  postgresql: "postgresql",
  redis: "redis",
  aws: "amazonwebservices",
  "github-actions": "githubactions",
};

const ICON_COLOR: Record<string, string> = {
  aws: "FF9900",
};

export function TeckStack() {
  return (
    <Panel id="stack">
      <PanelHeader>
        <PanelTitle>Stack</PanelTitle>
      </PanelHeader>

      <PanelContent
        className={cn(
          "[--pattern-foreground:var(--color-zinc-950)]/5 dark:[--pattern-foreground:var(--color-white)]/5",
          "bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] bg-size-[10px_10px] bg-center",
          "bg-zinc-950/0.75 dark:bg-white/0.75"
        )}
      >
        <ul className="flex flex-wrap gap-4 select-none">
          {TECH_STACK.map((tech) => {
            const slug = ICON_SLUG[tech.key] ?? tech.key;
            const color = ICON_COLOR[tech.key];
            const iconUrl = tech.iconUrl
              ? tech.iconUrl
              : color
                ? `https://cdn.simpleicons.org/${slug}/${color}`
                : `https://cdn.simpleicons.org/${slug}`;
            return (
              <li key={tech.key} className="flex">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={tech.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={tech.title}
                    >
                      <Image
                        src={iconUrl}
                        alt={`${tech.title} icon`}
                        width={32}
                        height={32}
                        unoptimized
                      />
                      <span className="sr-only">{tech.title}</span>
                    </a>
                  </TooltipTrigger>

                  <TooltipContent>
                    <p>{tech.title}</p>
                  </TooltipContent>
                </Tooltip>
              </li>
            );
          })}
        </ul>
      </PanelContent>
    </Panel>
  );
}
