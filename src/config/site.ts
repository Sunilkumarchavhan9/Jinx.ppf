import { USER } from "@/features/portfolio/data/user";
import type { NavItem } from "@/types/nav";

export const SITE_INFO = {
  name: USER.displayName,
  url: process.env.APP_URL || "https://chanhdai.com",
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
};

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

export const MAIN_NAV: NavItem[] = [
  {
    title: "Portfolio",
    href: "/",
  },
  {
    title: "Components",
    href: "/components",
  },
  {
    title: "Blog",
    href: "/blog",
  },
];

export const GITHUB_USERNAME = "Sunilkumarchavhan9";
export const SOURCE_CODE_GITHUB_REPO = "Sunilkumarchavhan9/Jinx.ppf";
export const SOURCE_CODE_GITHUB_URL =
  "https://github.com/Sunilkumarchavhan9/Jinx.ppf";

export const SPONSORSHIP_URL = "https://github.com/sponsors/Sunilkumarchavhan9";

export const UTM_PARAMS = {
  utm_source: "jinx.pf",
  utm_medium: "referral",
  utm_campaign: "portfolio",
};
