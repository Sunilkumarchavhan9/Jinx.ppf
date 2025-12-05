import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/kibo-ui/marquee";

// Static testimonials removed per request; now we only show live X pulls.
import { fetchXTestimonials } from "../../lib/fetch-x-posts";
import { Panel } from "../panel";
import { TestimonialItem } from "./testimonial-item";

export async function TestimonialsMarquee() {
  const primary = await fetchXTestimonials().catch(() => []);

  if (!primary.length) {
    return null;
  }

  return (
    <Panel
      id="testimonials"
      className="before:z-11 after:z-10 [&_.rfm-initial-child-container]:items-stretch! [&_.rfm-marquee]:items-stretch!"
    >
      <h2 className="sr-only">Testimonials</h2>

      <Marquee>
        <MarqueeFade side="left" />
        <MarqueeFade side="right" />

        <MarqueeContent>
          {primary
            .sort((a, b) => a.authorName.localeCompare(b.authorName))
            .map((item) => (
              <MarqueeItem
                key={item.url}
                className="mx-0 h-full w-xs border-r border-edge"
              >
                <TestimonialItem {...item} />
              </MarqueeItem>
            ))}
        </MarqueeContent>
      </Marquee>

      <div className="screen-line-before screen-line-after relative flex h-4 w-full" />

      {/* Second marquee removed while showing only live X testimonials */}
    </Panel>
  );
}
