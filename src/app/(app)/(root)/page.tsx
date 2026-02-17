import type { ProfilePage as PageSchema, WithContext } from "schema-dts";

import { SITE_INFO } from "@/config/site";
import { About } from "@/features/portfolio/components/about";
import { Awards } from "@/features/portfolio/components/awards";
import { Blog } from "@/features/portfolio/components/blog";
import { Bookmarks } from "@/features/portfolio/components/bookmarks";
import { Brand } from "@/features/portfolio/components/brand";
import { Experiences } from "@/features/portfolio/components/experiences";
import { GitHubContributions } from "@/features/portfolio/components/github-contributions";
import { Overview } from "@/features/portfolio/components/overview";
import { ProfileCover } from "@/features/portfolio/components/profile-cover";
import { ProfileHeader } from "@/features/portfolio/components/profile-header";
import { Projects } from "@/features/portfolio/components/projects";
import { SocialLinks } from "@/features/portfolio/components/social-links";
import { SocialProofStrip } from "@/features/portfolio/components/social-proof-strip";
import { TeckStack } from "@/features/portfolio/components/teck-stack";
import { TestimonialsMarquee } from "@/features/portfolio/components/testimonials-marquee";
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links";
import { USER } from "@/features/portfolio/data/user";
import { cn } from "@/lib/utils";

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd()).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto md:max-w-3xl *:[[id]]:scroll-mt-22">
        <ProfileCover />
        <ProfileHeader />
        <SocialProofStrip />
        <Separator />

        <Overview />
        <Separator />

        <SocialLinks />
        <Separator />

        <About />
        <Separator />

        <TestimonialsMarquee />
        <Separator />

        <GitHubContributions />
        <Separator />

        <TeckStack />
        <Separator />

        <Blog />
        <Separator />

        <Experiences />
        <Separator />

        <Projects />
        <Separator />

        <Awards />
        <Separator />

        <Bookmarks />
        <Separator />

        <Brand />
        <Separator />
      </div>
    </>
  );
}

function getPageJsonLd(): WithContext<PageSchema> {
  const sameAs = Array.from(
    new Set([USER.website, ...SOCIAL_LINKS.map((link) => link.href)])
  );
  const imageUrl = USER.avatar.startsWith("http")
    ? USER.avatar
    : `${SITE_INFO.url}${USER.avatar}`;

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: SITE_INFO.url,
    inLanguage: "en",
    dateCreated: new Date(USER.dateCreated).toISOString(),
    dateModified: new Date().toISOString(),
    mainEntity: {
      "@type": "Person",
      name: USER.displayName,
      givenName: USER.firstName,
      familyName: USER.lastName,
      identifier: USER.username,
      description: USER.bio,
      jobTitle: USER.jobTitle,
      url: SITE_INFO.url,
      image: imageUrl,
      sameAs,
      address: {
        "@type": "PostalAddress",
        addressLocality: USER.address,
      },
    },
  };
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full border-x border-edge",
        "before:absolute before:-left-[100vw] before:-z-1 before:h-8 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56",
        className
      )}
    />
  );
}
