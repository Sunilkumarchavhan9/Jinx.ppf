import type { Experience } from "../types/experiences";

export const EXPERIENCES: Experience[] = [
  {
    id: "rektoff",
    companyName: "Rektoff.xyz - School of Solana",
    companyLogo:
      "https://ugc.production.linktr.ee/39fc6b53-0c41-46a7-8af5-e895bc78ac90_YouTube-Avatar.png?io=true&size=avatar-v3_0",
    positions: [
      {
        id: "rektoff-fellow-2025",
        title: "Fellow",
        employmentPeriod: {
          start: "10.2025",
        },
        employmentType: "Fellowship",
        icon: "code",
        description: `- Selected from over 3,000 applicants (only 72 chosen) for an intensive fellowship on Solana ecosystem and blockchain innovation (Season 8, Cohort 2).
        - Drove the development of decentralized applications & on-chain solutions, utilizing Solidity & Web3.js to enhance user interaction.`,
        skills: [
          "Solana",
          "Blockchain",
          "Web3.js",
          "Solidity",
          "Decentralized Applications",
          "Smart Contracts",
        ],
        isExpanded: true,
      },
    ],
    isCurrentEmployer: true,
  },
  {
    id: "github-campus",
    companyName: "GitHub",
    companyLogo:
      "https://cdn3d.iconscout.com/3d/free/thumb/free-github-3d-icon-png-download-5640285.png",
    positions: [
      {
        id: "github-campus-expert-2025",
        title: "Campus Student Expert",
        employmentPeriod: {
          start: "06.2025",
          end: "08.2025",
        },
        employmentType: "Program",
        icon: "code",
        description: `- Enhanced networking opportunities & version control expertise as a member of the elite GitHub Campus Expert Summer 2025 cohort, fostering connections within the developer community.`,
        skills: [
          "Git",
          "GitHub",
          "Version Control",
          "Community Building",
          "Networking",
        ],
      },
    ],
    isCurrentEmployer: false,
  },
];
