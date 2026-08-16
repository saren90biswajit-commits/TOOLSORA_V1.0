import { Youtube, Instagram, Hash, MessageSquare, UserCircle, Smile, Type, Palette, FileText, Zap, Activity, LucideIcon } from "lucide-react";

export interface ToolDefinition {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  href: string;
  category: string;
}

export const ALL_TOOLS: ToolDefinition[] = [
  { id: "youtube-titles", name: "YouTube Title Generator", description: "Create catchy titles that get clicks.", icon: Youtube, href: "/youtube-tools/title-generator", category: "YouTube" },
  { id: "thumbnail-downloader", name: "Thumbnail Downloader", description: "Extract high-res thumbnails instantly.", icon: Youtube, href: "/tools/thumbnail-downloader", category: "YouTube" },
  { id: "video-script", name: "Video Script Generator", description: "AI-written scripts for your videos.", icon: FileText, href: "/youtube-tools/script-generator", category: "YouTube" },
  { id: "caption-generator", name: "Caption Generator", description: "Engaging captions for any platform.", icon: MessageSquare, href: "/instagram-tools/reel-caption-generator", category: "Instagram" },
  { id: "hashtag-generator", name: "Hashtag Generator", description: "Discover trending & niche hashtags.", icon: Hash, href: "/instagram-tools/hashtag-generator", category: "Instagram" },
  { id: "bio-generator", name: "Bio Generator", description: "Stand out with a professional bio.", icon: UserCircle, href: "/instagram-tools/bio-generator", category: "Instagram" },
  { id: "hook-generator", name: "Hook Generator", description: "Stop the scroll with strong hooks.", icon: Zap, href: "/tiktok-tools/viral-hooks", category: "TikTok" },
  { id: "emoji-picker", name: "Emoji Picker", description: "Find the perfect emoji quickly.", icon: Smile, href: "/tools/emoji-picker", category: "Creator" },
  { id: "font-generator", name: "Font Generator", description: "Cool Unicode text for social media.", icon: Type, href: "/tools/font-generator", category: "Creator" },
  { id: "color-palette", name: "Color Palette Generator", description: "Beautiful brand color combinations.", icon: Palette, href: "/tools/color-palette-generator", category: "Creator" },
  { id: "performance-audit", name: "Website Performance Audit", description: "Analyze websites for SEO & speed.", icon: Activity, href: "/tools/performance-audit", category: "Creator" },
];
