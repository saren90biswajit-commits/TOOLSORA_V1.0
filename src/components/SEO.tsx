import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type SEOData = {
  title: string;
  description: string;
  canonical: string;
  keywords: string;
};

const BASE_URL = "https://toolsora.in";

const SEO_BY_PATH: Record<string, SEOData> = {
  "/": {
    title: "ToolsOra | Free Creator Tools for YouTube, Instagram, TikTok & Facebook",
    description: "Use free creator tools for YouTube, Instagram, TikTok and Facebook. Generate titles, scripts, hooks, captions, hashtags, bios and content ideas with ToolsOra.",
    canonical: `${BASE_URL}/`,
    keywords: "free creator tools, social media tools, YouTube tools, Instagram tools, TikTok tools, Facebook tools, content creator tools",
  },
  "/tools": {
    title: "Free Creator Tools | ToolsOra",
    description: "Explore free online creator tools for social media, content creation, images and productivity at ToolsOra.",
    canonical: `${BASE_URL}/tools`,
    keywords: "free online tools, creator tools, social media tools, content creation tools",
  },
  "/youtube-tools/title-generator": {
    title: "YouTube Title Generator – Free Catchy Title Ideas | ToolsOra",
    description: "Generate catchy, engaging YouTube video titles for free. Create SEO-friendly title ideas designed to improve clicks and attract viewers.",
    canonical: `${BASE_URL}/youtube-tools/title-generator`,
    keywords: "YouTube title generator, catchy YouTube titles, YouTube SEO title generator, free title generator",
  },
  "/youtube-tools/retention-hooks": {
    title: "YouTube Hook Generator – Create Powerful Video Hooks | ToolsOra",
    description: "Create powerful YouTube hooks that grab attention in the first seconds and help keep viewers watching. Free creator tool.",
    canonical: `${BASE_URL}/youtube-tools/retention-hooks`,
    keywords: "YouTube hook generator, video hooks, YouTube retention hooks, hook ideas",
  },
  "/youtube-tools/script-generator": {
    title: "YouTube Script Generator – Free AI Video Scripts | ToolsOra",
    description: "Generate structured YouTube video scripts with hooks, introductions, main content and calls to action using this free creator tool.",
    canonical: `${BASE_URL}/youtube-tools/script-generator`,
    keywords: "YouTube script generator, AI video script generator, YouTube script writer, free script generator",
  },
  "/instagram-tools/reel-caption-generator": {
    title: "Instagram Reel Caption Generator – Free Captions | ToolsOra",
    description: "Generate engaging Instagram Reel captions for free. Create captions tailored to your topic, tone and audience.",
    canonical: `${BASE_URL}/instagram-tools/reel-caption-generator`,
    keywords: "Instagram caption generator, Reel caption generator, Instagram Reel captions, free caption generator",
  },
  "/instagram-tools/hashtag-generator": {
    title: "Instagram Hashtag Generator – Free Hashtag Ideas | ToolsOra",
    description: "Generate relevant Instagram hashtags for your niche and content. Find broad, niche and long-tail hashtag ideas for free.",
    canonical: `${BASE_URL}/instagram-tools/hashtag-generator`,
    keywords: "Instagram hashtag generator, hashtag ideas, Instagram hashtags, free hashtag generator",
  },
  "/instagram-tools/bio-generator": {
    title: "Instagram Bio Generator – Create a Better Bio | ToolsOra",
    description: "Create professional and engaging Instagram bio ideas for free. Generate bios based on your niche, personality and call to action.",
    canonical: `${BASE_URL}/instagram-tools/bio-generator`,
    keywords: "Instagram bio generator, Instagram bio ideas, free bio generator, creator bio",
  },
  "/tiktok-tools/viral-hooks": {
    title: "TikTok Hook Generator – Create Viral Video Hooks | ToolsOra",
    description: "Generate attention-grabbing TikTok hooks for your videos. Get creative hook ideas for different topics, audiences and tones.",
    canonical: `${BASE_URL}/tiktok-tools/viral-hooks`,
    keywords: "TikTok hook generator, viral TikTok hooks, TikTok hook ideas, video hook generator",
  },
  "/tiktok-tools/hashtag-generator": {
    title: "TikTok Hashtag Generator – Free Hashtag Ideas | ToolsOra",
    description: "Generate TikTok hashtag ideas for your niche and topic. Find relevant hashtags to help organize and discover your content.",
    canonical: `${BASE_URL}/tiktok-tools/hashtag-generator`,
    keywords: "TikTok hashtag generator, TikTok hashtags, hashtag ideas, free hashtag generator",
  },
  "/tiktok-tools/content-ideas": {
    title: "TikTok Content Ideas Generator – Free Ideas | ToolsOra",
    description: "Generate TikTok content ideas with hooks, formats, descriptions and CTA suggestions for your niche and audience.",
    canonical: `${BASE_URL}/tiktok-tools/content-ideas`,
    keywords: "TikTok content ideas, TikTok ideas generator, content idea generator, TikTok video ideas",
  },
  "/facebook-tools/post-caption-generator": {
    title: "Facebook Post Caption Generator – Free Captions | ToolsOra",
    description: "Generate engaging Facebook post captions for your topic, audience and preferred tone with this free creator tool.",
    canonical: `${BASE_URL}/facebook-tools/post-caption-generator`,
    keywords: "Facebook caption generator, Facebook post captions, free caption generator, Facebook content",
  },
  "/facebook-tools/group-hooks": {
    title: "Facebook Group Hook Generator – Free Discussion Hooks | ToolsOra",
    description: "Create engaging Facebook Group discussion hooks for posts, questions, stories and community conversations.",
    canonical: `${BASE_URL}/facebook-tools/group-hooks`,
    keywords: "Facebook Group hook generator, Facebook discussion hooks, group post ideas, Facebook hooks",
  },
  "/facebook-tools/page-bio-generator": {
    title: "Facebook Page Bio Generator – Free Bio Ideas | ToolsOra",
    description: "Generate professional Facebook Page bio ideas for businesses, creators and communities based on your niche and audience.",
    canonical: `${BASE_URL}/facebook-tools/page-bio-generator`,
    keywords: "Facebook Page bio generator, Facebook bio ideas, page bio generator, free bio generator",
  },
  "/tools/thumbnail-downloader": {
    title: "YouTube Thumbnail Downloader – Download Thumbnails Free | ToolsOra",
    description: "Download YouTube video thumbnails online for free with ToolsOra's simple thumbnail downloader.",
    canonical: `${BASE_URL}/tools/thumbnail-downloader`,
    keywords: "YouTube thumbnail downloader, download YouTube thumbnail, thumbnail download tool",
  },
  "/tools/emoji-picker": {
    title: "Emoji Picker – Copy Emojis Online for Free | ToolsOra",
    description: "Browse and copy emojis quickly with this free online emoji picker for social media posts, messages and content.",
    canonical: `${BASE_URL}/tools/emoji-picker`,
    keywords: "emoji picker, copy emojis, emoji tool, online emoji picker",
  },
  "/tools/font-generator": {
    title: "Font Generator – Create Stylish Text Online | ToolsOra",
    description: "Generate stylish Unicode text and copy it for social media bios, captions, posts and messages with this free font generator.",
    canonical: `${BASE_URL}/tools/font-generator`,
    keywords: "font generator, stylish text generator, fancy text generator, Unicode fonts",
  },
  "/tools/color-palette-generator": {
    title: "Color Palette Generator – Create Color Combinations | ToolsOra",
    description: "Create useful color palette ideas online for websites, social media designs, branding and creative projects.",
    canonical: `${BASE_URL}/tools/color-palette-generator`,
    keywords: "color palette generator, color combinations, palette tool, design colors",
  },
  "/tools/performance-audit": {
    title: "Website Performance Audit Tool – Free Online Check | ToolsOra",
    description: "Run a quick website performance audit and identify potential performance issues with this free online creator tool.",
    canonical: `${BASE_URL}/tools/performance-audit`,
    keywords: "website performance audit, performance checker, website audit tool, speed audit",
  },
  "/about": {
    title: "About ToolsOra – Free Tools for Modern Creators",
    description: "Learn about ToolsOra and our mission to provide useful, simple and free online tools for modern content creators.",
    canonical: `${BASE_URL}/about`,
    keywords: "about ToolsOra, creator tools, free online tools",
  },
  "/contact": {
    title: "Contact ToolsOra – Get in Touch",
    description: "Contact ToolsOra for questions, feedback, suggestions, technical issues or other inquiries.",
    canonical: `${BASE_URL}/contact`,
    keywords: "contact ToolsOra, ToolsOra support, creator tools support",
  },
  "/privacy-policy": {
    title: "Privacy Policy | ToolsOra",
    description: "Read the ToolsOra Privacy Policy to learn how information is handled when you use our website and tools.",
    canonical: `${BASE_URL}/privacy-policy`,
    keywords: "ToolsOra privacy policy, privacy policy",
  },
  "/terms-and-conditions": {
    title: "Terms & Conditions | ToolsOra",
    description: "Read the Terms and Conditions governing the use of the ToolsOra website and its online tools.",
    canonical: `${BASE_URL}/terms-and-conditions`,
    keywords: "ToolsOra terms and conditions, terms of use",
  },
  "/disclaimer": {
    title: "Disclaimer | ToolsOra",
    description: "Read the ToolsOra disclaimer and understand the limitations and responsibilities associated with using our online tools.",
    canonical: `${BASE_URL}/disclaimer`,
    keywords: "ToolsOra disclaimer, website disclaimer",
  },
  "/cookie-policy": {
    title: "Cookie Policy | ToolsOra",
    description: "Read the ToolsOra Cookie Policy to learn how cookies and similar technologies may be used on our website.",
    canonical: `${BASE_URL}/cookie-policy`,
    keywords: "ToolsOra cookie policy, cookie policy",
  },
};

const DEFAULT_SEO = SEO_BY_PATH["/"];

function setMeta(name: string, content: string) {
  let element = document.head.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setProperty(property: string, content: string) {
  let element = document.head.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setCanonical(href: string) {
  let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

export function SEO() {
  const location = useLocation();

  useEffect(() => {
    const seo = SEO_BY_PATH[location.pathname] || DEFAULT_SEO;
    document.title = seo.title;
    setMeta("description", seo.description);
    setMeta("keywords", seo.keywords);
    setProperty("og:title", seo.title);
    setProperty("og:description", seo.description);
    setProperty("og:url", seo.canonical);
    setProperty("og:type", "website");
    setMeta("twitter:title", seo.title);
    setMeta("twitter:description", seo.description);
    setMeta("twitter:card", "summary_large_image");
    setCanonical(seo.canonical);
  }, [location.pathname]);

  return null;
}

export function getSEOForPath(pathname: string): SEOData {
  return SEO_BY_PATH[pathname] || DEFAULT_SEO;
}
