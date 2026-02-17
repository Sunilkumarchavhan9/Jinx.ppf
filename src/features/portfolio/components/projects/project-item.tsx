import {
  CircleGaugeIcon,
  ImageIcon,
  InfinityIcon,
  LinkIcon,
  SparklesIcon,
  TargetIcon,
} from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import { Icons } from "@/components/icons";
import { Markdown } from "@/components/markdown";
import {
  CollapsibleChevronsIcon,
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleWithContext,
} from "@/components/ui/collapsible";
import { Tag } from "@/components/ui/tag";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProseMono } from "@/components/ui/typography";
import { UTM_PARAMS } from "@/config/site";
import { cn } from "@/lib/utils";
import { addQueryParams } from "@/utils/url";

import type { Project } from "../../types/projects";

export function ProjectItem({
  className,
  project,
}: {
  className?: string;
  project: Project;
}) {
  const { start, end } = project.period;
  const isOngoing = !end;
  const isSinglePeriod = end === start;
  const ogCardUrl = `/og/portfolio?title=${encodeURIComponent(project.title)}&kicker=Project${project.impact ? `&metric=${encodeURIComponent(project.impact)}` : ""}`;

  return (
    <CollapsibleWithContext defaultOpen={project.isExpanded} asChild>
      <div
        className={cn(
          "transition-transform duration-200 motion-safe:hover:-translate-y-px",
          className
        )}
      >
        <div className="flex items-center transition-all duration-200 hover:bg-accent2 hover:shadow-[inset_0_0_0_1px_var(--color-edge)]">
          {project.logo ? (
            <Image
              src={project.logo}
              alt={project.title}
              width={32}
              height={32}
              quality={100}
              className="mx-4 flex size-6 shrink-0 select-none"
              unoptimized
              aria-hidden="true"
            />
          ) : (
            <div
              className="mx-4 flex size-6 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-edge ring-offset-1 ring-offset-background select-none"
              aria-hidden="true"
            >
              <Icons.project className="size-4" />
            </div>
          )}

          <div className="flex-1 border-l border-dashed border-edge">
            <CollapsibleTrigger className="flex w-full items-center gap-4 p-4 pr-2 text-left">
              <div className="flex-1">
                <h3 className="mb-1 leading-snug font-medium text-balance">
                  {project.title}
                </h3>

                {project.impact && (
                  <p className="mb-1 line-clamp-1 font-mono text-xs text-info">
                    {project.impact}
                  </p>
                )}

                <dl className="text-sm text-muted-foreground">
                  <dt className="sr-only">Period</dt>
                  <dd className="flex items-center gap-0.5">
                    <span>{start}</span>
                    {!isSinglePeriod && (
                      <>
                        <span className="font-mono">—</span>
                        {isOngoing ? (
                          <>
                            <InfinityIcon
                              className="size-4.5 translate-y-[0.5px]"
                              aria-hidden
                            />
                            <span className="sr-only">Present</span>
                          </>
                        ) : (
                          <span>{end}</span>
                        )}
                      </>
                    )}
                  </dd>
                </dl>
              </div>

              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      className="relative flex size-6 shrink-0 items-center justify-center text-muted-foreground after:absolute after:-inset-2 hover:text-foreground"
                      href={addQueryParams(project.link, UTM_PARAMS)}
                      target="_blank"
                      rel="noopener"
                    >
                      <LinkIcon className="pointer-events-none size-4" />
                      <span className="sr-only">Open Project Link</span>
                    </a>
                  </TooltipTrigger>

                  <TooltipContent>
                    <p>Open Project Link</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      className="relative flex size-6 shrink-0 items-center justify-center text-muted-foreground after:absolute after:-inset-2 hover:text-foreground"
                      href={ogCardUrl}
                      target="_blank"
                      rel="noopener"
                    >
                      <ImageIcon className="pointer-events-none size-4" />
                      <span className="sr-only">Open Project Share Card</span>
                    </a>
                  </TooltipTrigger>

                  <TooltipContent>
                    <p>Open Project Share Card</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              <div
                className="shrink-0 text-muted-foreground [&_svg]:size-4"
                aria-hidden
              >
                <CollapsibleChevronsIcon />
              </div>
            </CollapsibleTrigger>
          </div>
        </div>

        <CollapsibleContent className="group overflow-hidden duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <div className="border-t border-edge shadow-inner">
            <div className="space-y-4 p-4 duration-300 group-data-[state=closed]:animate-fade-out group-data-[state=open]:animate-fade-in">
              {(project.impact || project.challenge || project.outcome) && (
                <div className="grid gap-2 sm:grid-cols-3">
                  {project.impact && (
                    <CaseStudyBlock
                      icon={<CircleGaugeIcon className="size-3.5" />}
                      label="Impact"
                      value={project.impact}
                    />
                  )}
                  {project.challenge && (
                    <CaseStudyBlock
                      icon={<TargetIcon className="size-3.5" />}
                      label="Challenge"
                      value={project.challenge}
                    />
                  )}
                  {project.outcome && (
                    <CaseStudyBlock
                      icon={<SparklesIcon className="size-3.5" />}
                      label="Outcome"
                      value={project.outcome}
                    />
                  )}
                </div>
              )}

              {project.description && (
                <ProseMono>
                  <Markdown>{project.description}</Markdown>
                </ProseMono>
              )}

              {project.skills.length > 0 && (
                <ul className="flex flex-wrap gap-1.5">
                  {project.skills.map((skill, index) => (
                    <li key={index} className="flex">
                      <Tag>{skill}</Tag>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </CollapsibleWithContext>
  );
}

function CaseStudyBlock({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <article className="rounded-lg border border-edge bg-muted/30 p-2.5">
      <h4 className="mb-1 flex items-center gap-1.5 font-mono text-[11px] tracking-wide text-muted-foreground uppercase">
        {icon}
        {label}
      </h4>
      <p className="text-xs leading-relaxed">{value}</p>
    </article>
  );
}
