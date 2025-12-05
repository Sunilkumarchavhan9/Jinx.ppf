// Fetch latest posts from X (Twitter) for testimonials
// This is a server-side utility for Next.js API route or getServerSideProps
import type { Testimonial } from "../types/testimonials";

type XUser = {
  id: string;
  profile_image_url?: string;
};

type XTweet = {
  id: string;
  text: string;
  created_at?: string;
  author_id?: string;
};

type XTweetsResponse = {
  data?: XTweet[];
  includes?: { users?: XUser[] };
};

const X_API_URL = "https://api.twitter.com/2/users/by/username/";
const X_USER = "@FrostbytHitsuG"; // Replace with your X username
const X_BEARER_TOKEN = process.env.X_BEARER_TOKEN; // Set in .env.local

export async function fetchXTestimonials(): Promise<Testimonial[]> {
  if (!X_BEARER_TOKEN) throw new Error("Missing X Bearer Token");

  const username = X_USER.replace(/^@/, "");

  // Get user ID
  const userRes = await fetch(`${X_API_URL}${username}`, {
    headers: { Authorization: `Bearer ${X_BEARER_TOKEN}` },
    cache: "no-store",
  });
  if (!userRes.ok) {
    throw new Error(
      `Failed to fetch X user: ${userRes.status} ${userRes.statusText}`
    );
  }
  const userData = (await userRes.json()) as { data?: { id?: string } };
  const userId = userData.data?.id;
  if (!userId) throw new Error("User not found");

  // Get latest tweets
  const tweetsRes = await fetch(
    `https://api.twitter.com/2/users/${userId}/tweets?max_results=5&tweet.fields=created_at&expansions=author_id&user.fields=profile_image_url`,
    {
      headers: { Authorization: `Bearer ${X_BEARER_TOKEN}` },
      cache: "no-store",
    }
  );
  if (!tweetsRes.ok) {
    throw new Error(
      `Failed to fetch tweets: ${tweetsRes.status} ${tweetsRes.statusText}`
    );
  }
  const tweetsData = (await tweetsRes.json()) as XTweetsResponse;
  const tweets = tweetsData.data ?? [];
  const usersById = new Map<string, string | undefined>(
    (tweetsData.includes?.users ?? []).map((u) => [u.id, u.profile_image_url])
  );

  // Filter to only today's posts using India/Kolkata timezone (UTC+05:30)
  const indiaTz = "Asia/Kolkata";
  const todayKolkata = new Date().toLocaleDateString("en-CA", {
    timeZone: indiaTz,
  });
  const todaysTweets = tweets.filter((tweet): tweet is XTweet => {
    if (typeof tweet?.created_at !== "string") return false;
    const tweetDay = new Date(tweet.created_at).toLocaleDateString("en-CA", {
      timeZone: indiaTz,
    });
    return tweetDay === todayKolkata;
  });

  // Map tweets to testimonials
  return todaysTweets.map(
    (tweet): Testimonial => ({
      quote: tweet.text,
      authorName: `@${username}`,
      authorBio: "Posted on X",
      authorAvatar: usersById.get(tweet.author_id ?? "") ?? "",
      url: `https://x.com/${username}/status/${tweet.id}`,
    })
  );
}
