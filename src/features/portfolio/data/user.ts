import type { User } from "@/features/portfolio/types/user";

export const USER: User = {
  firstName: "Sunil",
  lastName: "Chavhan",
  displayName: "Jinx-SunilChavhan",
  username: "Chavhan",
  gender: "male",
  pronouns: "he/him",
  bio: "I build production-ready Web2 x Web3 products with Next.js, Node.js, Solana, and Rust.",
  flipSentences: [
    "Full-Stack + Blockchain Engineer",
    "Shipping production-ready dApps",
    "Building on Solana + TypeScript",
    "5x Hackathon Winner",
  ],
  address: "Bengaluru",
  phoneNumber: "NjM2MzY5NzYwMA==", // E.164 format, base64 encoded (https://t.io.vn/base64-string-converter)
  email: "Y2hhdmhhbnN1bmlsa3VtYXI3NTNAZ21haWwuY29t", // base64 encoded
  website: "https://www.linkedin.com/in/sunil-kumar-chavhan-269195299",
  jobTitle: "Full-Stack & Blockchain Engineer",
  availability: "Open to freelance and internship roles",
  resumeUrl: "/resume",
  jobs: [
    {
      title: "Web-2 and Web-3 Polymath Developer",
      company: "solanaturbine",
      website: "https://x.com/solanaturbine",
    },
  ],
  currentProject: {
    name: "20.poly",
    url: "https://20-poly.vercel.app/",
  },

  about: `
I’m Sunil Kumar Chavhan — a Full-Stack & Blockchain Polymath who loves building systems that scale, ship fast, and break limits. I work across the entire stack: TypeScript, Next.js, Node.js, and cloud-native infrastructure, while also crafting secure on-chain solutions using Solana, Rust, and Solidity.

I have been a 5x Hackathon Winner and Top 4 Solana Hackathon Finalist, selected as one of only 72 fellows from 3,000 applicants, and part of the GitHub Campus Expert Summer 2025 cohort. I thrive at the intersection of Web2 × Web3—where real-time systems, microservices, and decentralized architectures meet.
`,
  avatar: "/jinx1.jpeg",
  ogImage: "/jinx1.jpeg",
  timeZone: "Asia/Kolkata",
  keywords: [
    "sunil kumar chavhan",
    "sunilkumar",
    "sunil chavhan",
    "sunilkumarchavhan9",
    "sunil-kumar-chavhan",
    "full-stack developer",
    "blockchain developer",
    "solana",
    "rust",
    "solidity",
    "nextjs",
    "typescript",
  ],
  dateCreated: "2025-11-02", // YYYY-MM-DD
};
