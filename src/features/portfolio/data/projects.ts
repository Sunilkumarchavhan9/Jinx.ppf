import type { Project } from "../types/projects";

export const PROJECTS: Project[] = [
  {
    id: "outcome-sports-market",
    title: "Outcome - Live Sports Prediction Market",
    period: {
      start: "02.2026",
    },
    link: "https://20-poly.vercel.app/",
    impact: "Live market engine with on-chain settlement",
    challenge:
      "Sports prediction UX usually feels like betting, not real-time market trading.",
    outcome:
      "Designed a probability-driven trading flow where users can enter and exit positions live before event resolution.",
    skills: [
      "Solana",
      "Prediction Markets",
      "Sports Markets",
      "On-chain Settlement",
      "Non-custodial Trading",
      "Real-time Pricing",
      "Web3",
      "React",
    ],
    description: `Outcome is a live market platform for trading real-world sports outcomes with real-time pricing.

How Outcome works:
- Each event has a live market where prices reflect the probability of each outcome
- Users enter a position at the current price and can exit whenever the market moves in their favor
- When the event resolves, winning outcomes are redeemed automatically on-chain

No traditional "bet wins" flow. This is a new way to trade what happens next.

Built on Solana with on-chain settlement and a non-custodial architecture.

For the best experience, open on PC or laptop. The current build is not optimized for mobile.

[Start Trading Live Outcomes](https://20-poly.vercel.app/)`,
    isExpanded: true,
  },
  {
    id: "stake-up",
    title: "StakeUp - Commitment Product on Solana",
    period: {
      start: "03.2026",
    },
    link: "https://stake-up.vercel.app/",
    impact: "Goal-based SOL staking with automatic on-chain settlement",
    challenge:
      "Habit tracking alone does not create enough accountability when users can ignore the outcome without consequences.",
    outcome:
      "Built a commitment product where users lock SOL against real-world goals and smart contract rules return or reroute funds based on verified completion.",
    skills: [
      "Solana",
      "Anchor",
      "Smart Contracts",
      "Web3",
      "On-chain Vaults",
      "PDAs",
      "Commitment Product",
      "Goal Verification",
      "Automatic Settlement",
      "React",
    ],
    description: `StakeUp is a Solana-based commitment product that lets users bet SOL on themselves.

Core concept:
- A user sets a real-world goal, such as running 100 km in a week
- The user locks SOL into an on-chain vault tied to that goal
- The funds create financial accountability

How it works:
- If the user completes the goal and it is verified, the staked SOL is returned
- If the user fails, the stake is routed to a pre-selected charity or franchise wallet
- Settlement happens through smart contract rules, not manual custody

Why it is different:
- It is not just a habit tracker
- It attaches real financial consequences to goal completion
- It combines personal discipline, on-chain custody, transparent verification, and automatic fallback routing

On-chain concept:
- Built with Anchor on Solana
- Each goal creates a goal PDA, a vault PDA holding funds, and recipient / verifier state
- The program enforces deadline-based verification, condition-based release, and one-time settlement

Trust model:
- Users can submit manual progress
- Verified progress can come from a backend verifier flow
- The final outcome is controlled by explicit verifier logic, not unchecked user claims alone

[Live Demo](https://stake-up.vercel.app/)
[GitHub Repository](https://github.com/Sunilkumarchavhan9/StakeUp)`,
    isExpanded: true,
  },
  {
    id: "sol-token-launch-pad",
    title: "Sol Token Launch Pad",
    period: {
      start: "02.2026",
      end: "02.2026",
    },
    link: "https://landingpage-roan-rho.vercel.app/",
    impact: "End-to-end token lifecycle in one launchpad",
    challenge:
      "Launching a token often requires multiple fragmented tools and high setup overhead.",
    outcome:
      "Built one workflow for minting, liquidity operations, and swaps with modular React components for fast integration.",
    skills: [
      "Solana",
      "Token Launchpad",
      "Web3",
      "TypeScript",
      "React",
      "Liquidity Pools",
      "Token Minting",
      "DEX Swaps",
      "Modular Components",
    ],
    description: `Sol Token Launch Pad is a platform built to simplify the creation, management, and launch of Solana-based tokens.

Core backend capabilities include:
- Creating new tokens on Solana
- Minting tokens
- Managing liquidity pools (create, add, and swap)
- Enforcing secure and efficient blockchain interactions

The project also includes modular React components for each feature to keep the UI integration fast and maintainable.

[Live Demo](https://landingpage-roan-rho.vercel.app/)
[GitHub Repository](https://github.com/Sunilkumarchavhan9/Sol-Liquidity-Launching-Pad.git)`,
    isExpanded: true,
  },
  {
    id: "settll-telegram-bot",
    title: "Settll Telegram Bot – Blockchain AML Monitoring Tool",
    period: {
      start: "2025",
    },
    link: "https://x.com/FrostbytHitsuG/status/2002446039656378833?s=20",
    impact: "Real-time AML alerting bot for blockchain monitoring",
    challenge:
      "Compliance teams needed instant, actionable risk alerts across EVM and Solana activity.",
    outcome:
      "Implemented webhook-driven alerts with Telegram delivery and Prisma-backed tracking for faster compliance response.",
    skills: [
      "TypeScript",
      "Telegram Bot API",
      "Blockchain",
      "EVM",
      "Solana",
      "Prisma",
      "Database Management",
      "AML Monitoring",
      "Webhooks",
      "Real-time Notifications",
      "Financial Compliance",
    ],
    description: `Settll Telegram Bot is a TypeScript-based automation tool designed to interact with users via Telegram. It integrates with blockchain providers (EVM and Solana), leverages Prisma for database management, and features robust alerting, tracking, and webhook systems. The bot streamlines AML (Anti-Money Laundering) monitoring, provides real-time notifications, and supports seamless integration with external services, making it a valuable asset for financial compliance and blockchain analytics.

 [GitHub Repository](https://github.com/Sunilkumarchavhan9/Settll-telegram-bot)`,
    isExpanded: true,
  },
  {
    id: "link-bird",
    title: "Link Bird – Automated LinkedIn Outreach Platform",
    period: {
      start: "2025",
      end: "done",
    },
    link: "https://linkbird-kandid.vercel.app/",
    skills: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Drizzle ORM",
      "Prisma",
      "Tailwind CSS",
      "ShadCN/UI",
      "Clerk Auth",
      "Neon Tech",
      "SaaS",
    ],
    description: `Built a production-ready SaaS for LinkedIn automation using Next.js and TypeScript, handling 1000+ lead operations safely without bans.

- Elevated user engagement by 25% & reduced bounce rate by 30% through the delivery of a clean, responsive UI using Tailwind CSS & ShadCN/UI, resulting in a 20% improvement in conversion rates within a rapid development cycle
- Integrated PostgreSQL backend with Prisma and Drizzle ORM, improving query performance by 75%

[GitHub Repository](https://github.com/Sunilkumarchavhan9/linkbird--kandid-assignment-)`,
    isExpanded: true,
  },
  {
    id: "v0-draw",
    title: "V(0)Draw – Real-Time Collaborative Drawing Platform",
    period: {
      start: "2025",
    },
    link: "https://github.com/Sunilkumarchavhan9/V-0--draw",
    skills: [
      "Canvas API",
      "WebSockets",
      "Express.js",
      "AWS",
      "Kubernetes",
      "Splunk",
      "ELK Stack",
      "Grafana",
      "Real-time Collaboration",
    ],
    description: `Streamlined an interactive real-time drawing platform utilizing WebSockets & Canvas API to enhance user collaboration & engagement among participants.

- Reduced latency by 40% and improved response time by 100ms with AWS + Kubernetes orchestration
- Orchestrated monitoring with Splunk, ELK Stack, & Grafana, achieving a 20% reduction in system downtime & enhancing operational resilience`,
    isExpanded: true,
  },
  {
    id: "reimagined",
    title: "Reimagined – Data Visualization Platform",
    period: {
      start: "2025",
      end: "done",
    },
    link: "https://zchartscom.vercel.app/",
    skills: [
      "ZCharts",
      "Data Visualization",
      "Real-time Analytics",
      "Interactive Dashboards",
      "High-performance Charting",
      "Dynamic Rendering",
      "TypeScript",
      "Vercel",
    ],
    description: `Reimagined is a modern data-visualization platform built on top of ZCharts, designed to turn raw data into meaningful, interactive, and real-time insights.

- Turn raw data into meaningful, interactive, and real-time insights
- ZCharts-Powered Visuals built on a high-performance charting engine
- Supports dynamic rendering and large datasets without lag
- Offers configurable themes and styling for clean UI/UX
- Real-time Analytics capabilities for tracking performance metrics and analyzing trends

[GitHub Repository](https://github.com/Sunilkumarchavhan9/Zcharts)`,
    isExpanded: true,
  },
  {
    id: "docstart",
    title: "DocStart – Notion-Powered Documentation Platform",
    period: {
      start: "2025",
    },
    link: "https://doc-start-notion-powere-git-3515f1-sunilkumarchavhan9s-projects.vercel.app/",
    skills: [
      "Documentation",
      "Notion API",
      "Developer Tools",
      "Markdown",
      "Responsive Design",
      "Changelog Management",
      "FAQ System",
      "Vercel",
    ],
    description: `DocStart is a modern, developer-centric documentation engine designed to help teams create polished docs, changelogs, and FAQs with the same elegance and structure seen in platforms like Vercel, Supabase, and Linear. It transforms raw content into clean, responsive, production-ready documentation with zero friction.

DocStart makes it easy to:

- Generate beautiful documentation pages instantly
- Create changelogs that highlight updates, fixes & new features
- Build FAQs with grouped categories and smooth interactions
- Maintain consistent branding & typography across all docs
- Publish everything with a single command or deploy pipeline

[GitHub Repository](https://github.com/Sunilkumarchavhan9/DocStart---Notion-Powered-Documentation-Platform)`,
    isExpanded: true,
  },
  {
    id: "kube-credential",
    title: "Kube Credential – Kubernetes-Native Digital Credentials",
    period: {
      start: "2025",
      end: "done",
    },
    link: "https://kube-credentials-1vitsbjx1-sunilkumarchavhan9s-projects.vercel.app/",
    skills: [
      "Kubernetes",
      "Digital Credentials",
      "Cloud Technologies",
      "Security",
      "Cryptography",
      "Compliance",
      "Backend",
      "Frontend",
      "Vercel",
    ],
    description: `Kube Credential is a secure, Kubernetes-native system for issuing and verifying digital credentials at scale. Designed for organizations that require high trust, automation, and reliability, it streamlines the entire credential lifecycle — from generation and storage to verification and auditing.

Built on top of modern cloud technologies, Kube Credential ensures that every credential is tamper-resistant, cryptographically verifiable, and compliant with industry standards.

**Frontend Demo:**

The live version of the project includes a functional frontend interface with a subset of UI features. This is intentional, because the company assignment required:

- A functional frontend demo
- Only a subset of UI features
- Not exposing full internal logic publicly

[GitHub Repository](https://github.com/Sunilkumarchavhan9/Kube-Credential)`,
    isExpanded: true,
  },
  {
    id: "portfolio-v1-2",
    title: "Portfolio v1.2 – Experimental Developer Profile",
    period: {
      start: "2025",
      end: "done",
    },
    link: "https://jinxdev-tau.vercel.app/",
    skills: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "UI/UX",
      "Animations",
    ],
    description: `This is my older personal portfolio where I experimented with layouts, animations, and different UI ideas. It was my first attempt at building a clean, minimal developer profile with project highlights, contact sections, and custom components. I used it to explore new design patterns, try out different tech stacks, and understand how to present my work better before creating my current portfolio.

- Iterated on layouts, motion, and interaction patterns to learn what feels best
- Showcased project highlights, contact sections, and custom components in a minimal UI
- Served as a playground to test stacks and presentation approaches before the current site


[GitHub Repository](https://github.com/Sunilkumarchavhan9/Portfoliov1.2)`,
    isExpanded: true,
  },
];
