import type { TechStack } from "../types/tech-stack";

export const TECH_STACK: TechStack[] = [
  {
    key: "typescript",
    title: "TypeScript",
    href: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
    categories: ["Language"],
  },
  {
    key: "nodejs",
    title: "Node.js",
    href: "https://nodejs.org/",
    categories: ["Runtime"],
  },
  {
    key: "react",
    title: "React",
    href: "https://react.dev/",
    categories: ["Library", "UI"],
  },
  {
    key: "nextjs",
    title: "Next.js",
    href: "https://nextjs.org/",
    categories: ["Framework"],
    theme: true,
  },
  {
    key: "tailwindcss",
    title: "Tailwind CSS",
    href: "https://tailwindcss.com/",
    categories: ["Styling"],
  },
  {
    key: "solidity",
    title: "Solidity",
    href: "https://soliditylang.org/",
    categories: ["Blockchain", "Language"],
  },
  {
    key: "rust",
    title: "Rust",
    href: "https://www.rust-lang.org/",
    categories: ["Blockchain", "Language"],
  },
  {
    key: "solana",
    title: "Solana",
    href: "https://solana.com/",
    categories: ["Blockchain", "Protocol"],
  },
  {
    key: "docker",
    title: "Docker",
    href: "https://www.docker.com/",
    categories: ["Containerization"],
  },
  {
    key: "kubernetes",
    title: "Kubernetes",
    href: "https://kubernetes.io/",
    categories: ["Cloud", "Orchestration"],
  },
  {
    key: "postgresql",
    title: "PostgreSQL",
    href: "https://www.postgresql.org/",
    categories: ["Database"],
  },
  {
    key: "redis",
    title: "Redis",
    href: "https://redis.io/",
    categories: ["Database", "Cache"],
  },
  {
    key: "aws",
    title: "AWS",
    href: "https://aws.amazon.com/",
    iconUrl:
      "https://signin.aws.amazon.com/v2/assets/_next/static/media/aws-logo@2x.7c50e6f9.png",
    categories: ["Cloud"],
  },
  {
    key: "github-actions",
    title: "GitHub Actions",
    href: "https://github.com/features/actions",
    categories: ["CI/CD"],
  },
  {
    key: "Prisma",
    title: "Prisma",
    href: "https://www.prisma.io/",
    categories: ["Database"],
  },
];
