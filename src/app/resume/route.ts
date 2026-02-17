import { NextResponse } from "next/server";

import { PROJECTS } from "@/features/portfolio/data/projects";
import { USER } from "@/features/portfolio/data/user";
import { decodeEmail, decodePhoneNumber } from "@/utils/string";

export function GET() {
  const topSkills = Array.from(
    new Set(PROJECTS.flatMap((project) => project.skills))
  ).slice(0, 12);

  const highlights = [
    "5x Hackathon Winner",
    "Top 4 Solana Hackathon Finalist",
    "Selected as 1 of 72 fellows from 3,000 applicants",
    "GitHub Campus Expert Summer 2025 cohort",
  ];

  const resume = [
    `# ${USER.firstName} ${USER.lastName}`,
    "",
    `${USER.jobTitle}`,
    `${USER.address}`,
    `Email: ${decodeEmail(USER.email)}`,
    `Phone: ${decodePhoneNumber(USER.phoneNumber)}`,
    `Website: ${USER.website}`,
    "",
    "## Summary",
    USER.bio,
    "",
    "## Highlights",
    ...highlights.map((item) => `- ${item}`),
    "",
    "## Top Skills",
    topSkills.map((skill) => `- ${skill}`).join("\n"),
    "",
    "## Experience",
    ...USER.jobs.map(
      (job) => `- ${job.title}${job.company ? ` @ ${job.company}` : ""}`
    ),
    "",
    "## Selected Projects",
    ...PROJECTS.slice(0, 5).map(
      (project) =>
        `- ${project.title}: ${project.impact || project.description?.split("\n")[0] || project.link}`
    ),
  ].join("\n");

  return new NextResponse(resume, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename=${USER.firstName}-${USER.lastName}-Resume.md`,
    },
  });
}
