export type RouteSEO = {
  title: string;
  description: string;
  canonical: string;
};

const BASE_URL = "https://toolsora.in";

export const ROUTE_SEO: Record<string, RouteSEO> = {
  "/": {
    title: "ToolsOra | 100% Free Creator Tools",
    description: "ToolsOra is the ultimate toolkit for modern social media creators. Get free tools to create better content, post smarter, and grow faster across all platforms.",
    canonical: `${BASE_URL}/`,
  },
  "/tools": {
    title: "Free Creator Tools | ToolsOra",
    description: "Explore free online creator tools for social media, content creation, images and productivity at ToolsOra.",
    canonical: `${BASE_URL}/tools`,
  },
  "/youtube-tools/title-generator": {
    title: "YouTube Title Generator – Free Catchy Title Ideas | ToolsOra",
    description: "Generate catchy, engaging YouTube video titles for free. Create SEO-friendly title ideas designed to improve clicks and attract viewers.",
    canonical: `${BASE_URL}/youtube-tools/title-generator`,
  },
  "/youtube-tools/retention-hooks": {
    title: "YouTube Hook Generator – Create Powerful Video Hooks | ToolsOra",
    description: "Create powerful YouTube hooks that grab attention in the first seconds and help keep viewers watching. Free creator tool.",
    canonical: `${BASE_URL}/youtube-tools/retention-hooks`,
  },
  "/youtube-tools/script-generator": {
    title: "YouTube Script Generator – Free AI Video Scripts | ToolsOra",
    description: "Generate structured YouTube video scripts with hooks, introductions, main content and calls to action using this free creator tool.",
    canonical: `${BASE_URL}/youtube-tools/script-generator`,
  },
  "/instagram-tools/reel-caption-generator": {
    title: "Instagram Reel Caption Generator – Free Captions | ToolsOra",
    description: "Generate engaging Instagram Reel captions for free. Create captions tailored to your topic, tone and audience.",
    canonical: `${BASE_URL}/instagram-tools/reel-caption-generator`,
  },
  "/instagram-tools/hashtag-generator": {
    title: "Instagram Hashtag Generator – Free Hashtag Ideas | ToolsOra",
    description: "Generate relevant Instagram hashtags for your niche and content. Find broad, niche and long-tail hashtag ideas for free.",
    canonical: `${BASE_URL}/instagram-tools/hashtag-generator`,
  },
  "/instagram-tools/bio-generator": {
    title: "Instagram Bio Generator – Create a Better Bio | ToolsOra",
    description: "Create professional and engaging Instagram bio ideas for free. Generate bios based on your niche, personality and call to action.",
    canonical: `${BASE_URL}/instagram-tools/bio-generator`,
  },
  "/tiktok-tools/viral-hooks": {
    title: "TikTok Hook Generator – Create Viral Video Hooks | ToolsOra",
    description: "Generate attention-grabbing TikTok hooks for your videos. Get creative hook ideas for different topics, audiences and tones.",
    canonical: `${BASE_URL}/tiktok-tools/viral-hooks`,
  },
  "/tiktok-tools/hashtag-generator": {
    title: "TikTok Hashtag Generator – Free Hashtag Ideas | ToolsOra",
    description: "Generate TikTok hashtag ideas for your niche and topic. Find relevant hashtags to help organize and discover your content.",
    canonical: `${BASE_URL}/tiktok-tools/hashtag-generator`,
  },
  "/tiktok-tools/content-ideas": {
    title: "TikTok Content Ideas Generator – Free Ideas | ToolsOra",
    description: "Generate TikTok content ideas with hooks, formats, descriptions and CTA suggestions for your niche and audience.",
    canonical: `${BASE_URL}/tiktok-tools/content-ideas`,
  },
  "/facebook-tools/post-caption-generator": {
    title: "Facebook Post Caption Generator – Free Captions | ToolsOra",
    description: "Generate engaging Facebook post captions for your topic, audience and preferred tone with this free creator tool.",
    canonical: `${BASE_URL}/facebook-tools/post-caption-generator`,
  },
  "/facebook-tools/group-hooks": {
    title: "Facebook Group Hook Generator – Free Discussion Hooks | ToolsOra",
    description: "Create engaging Facebook Group discussion hooks for posts, questions, stories and community conversations.",
    canonical: `${BASE_URL}/facebook-tools/group-hooks`,
  },
  "/facebook-tools/page-bio-generator": {
    title: "Facebook Page Bio Generator – Free Bio Ideas | ToolsOra",
    description: "Generate professional Facebook Page bio ideas for businesses, creators and communities based on your niche and audience.",
    canonical: `${BASE_URL}/facebook-tools/page-bio-generator`,
  },
  "/tools/thumbnail-downloader": {
    title: "YouTube Thumbnail Downloader – Download Thumbnails Free | ToolsOra",
    description: "Download YouTube video thumbnails online for free with ToolsOra's simple thumbnail downloader.",
    canonical: `${BASE_URL}/tools/thumbnail-downloader`,
  },
  "/tools/emoji-picker": {
    title: "Emoji Picker – Copy Emojis Online for Free | ToolsOra",
    description: "Browse and copy emojis quickly with this free online emoji picker for social media posts, messages and content.",
    canonical: `${BASE_URL}/tools/emoji-picker`,
  },
  "/tools/font-generator": {
    title: "Font Generator – Create Stylish Text Online | ToolsOra",
    description: "Generate stylish Unicode text and copy it for social media bios, captions, posts and messages with this free font generator.",
    canonical: `${BASE_URL}/tools/font-generator`,
  },
  "/tools/color-palette-generator": {
    title: "Color Palette Generator – Create Color Combinations | ToolsOra",
    description: "Create useful color palette ideas online for websites, social media designs, branding and creative projects.",
    canonical: `${BASE_URL}/tools/color-palette-generator`,
  },
  "/tools/performance-audit": {
    title: "Website Performance Audit Tool – Free Online Check | ToolsOra",
    description: "Run a quick website performance audit and identify potential performance issues with this free online creator tool.",
    canonical: `${BASE_URL}/tools/performance-audit`,
  },
  "/about": {
    title: "About ToolsOra – Free Tools for Modern Creators",
    description: "Learn about ToolsOra and our mission to provide useful, simple and free online tools for modern content creators.",
    canonical: `${BASE_URL}/about`,
  },
  "/contact": {
    title: "Contact ToolsOra – Get in Touch",
    description: "Contact ToolsOra for questions, feedback, suggestions, technical issues or other inquiries.",
    canonical: `${BASE_URL}/contact`,
  },
  "/privacy-policy": {
    title: "Privacy Policy | ToolsOra",
    description: "Read the ToolsOra Privacy Policy to learn how information is handled when you use our website and tools.",
    canonical: `${BASE_URL}/privacy-policy`,
  },
  "/terms-and-conditions": {
    title: "Terms & Conditions | ToolsOra",
    description: "Read the Terms and Conditions governing the use of the ToolsOra website and its online tools.",
    canonical: `${BASE_URL}/terms-and-conditions`,
  },
  "/disclaimer": {
    title: "Disclaimer | ToolsOra",
    description: "Read the ToolsOra disclaimer and understand the limitations and responsibilities associated with using our online tools.",
    canonical: `${BASE_URL}/disclaimer`,
  },
  "/cookie-policy": {
    title: "Cookie Policy | ToolsOra",
    description: "Read the ToolsOra Cookie Policy to learn how cookies and similar technologies may be used on our website.",
    canonical: `${BASE_URL}/cookie-policy`,
  },
};

export function getRouteSEO(pathname: string): RouteSEO {
  const normalizedPath = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  return ROUTE_SEO[normalizedPath] || ROUTE_SEO["/"];
}
