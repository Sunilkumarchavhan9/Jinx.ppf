import { format } from "date-fns";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";

import type { Post } from "@/features/blog/types/post";
import { remarkComponent } from "@/lib/remark-component";

const processor = remark().use(remarkMdx).use(remarkComponent).use(remarkGfm);

export async function getLLMText(post: Post) {
  const processed = await processor.process({
    value: post.content,
  });

  const updatedAtRaw = post.metadata.updatedAt ?? post.metadata.date ?? null;
  let updatedAt = updatedAtRaw ? new Date(updatedAtRaw) : new Date();
  if (isNaN(updatedAt.getTime())) updatedAt = new Date();

  return `# ${post.metadata.title}

${post.metadata.description}

${processed.value}

Last updated on ${format(updatedAt, "MMMM d, yyyy")}`;
}
