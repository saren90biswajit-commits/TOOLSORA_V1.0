import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

interface ToolLayoutProps {
  title: string;
  description: string;
  inputs?: ReactNode;
  results?: ReactNode;
  children?: ReactNode;
}

const RELATED_TOOLS: Record<string, { href: string; label: string }[]> = {
  "/youtube-tools/title-generator": [
    { href: "/youtube-tools/script-generator", label: "YouTube Script Generator" },
    { href: "/youtube-tools/retention-hooks", label: "YouTube Hook Generator" },
    { href: "/tools/thumbnail-downloader", label: "YouTube Thumbnail Downloader" },
  ],
  "/youtube-tools/script-generator": [
    { href: "/youtube-tools/title-generator", label: "YouTube Title Generator" },
    { href: "/youtube-tools/retention-hooks", label: "YouTube Hook Generator" },
    { href: "/tools/thumbnail-downloader", label: "YouTube Thumbnail Downloader" },
  ],
  "/youtube-tools/retention-hooks": [
    { href: "/youtube-tools/title-generator", label: "YouTube Title Generator" },
    { href: "/youtube-tools/script-generator", label: "YouTube Script Generator" },
  ],
  "/instagram-tools/reel-caption-generator": [
    { href: "/instagram-tools/hashtag-generator", label: "Instagram Hashtag Generator" },
    { href: "/instagram-tools/bio-generator", label: "Instagram Bio Generator" },
    { href: "/tiktok-tools/content-ideas", label: "TikTok Content Ideas" },
  ],
  "/instagram-tools/hashtag-generator": [
    { href: "/instagram-tools/reel-caption-generator", label: "Instagram Reel Caption Generator" },
    { href: "/instagram-tools/bio-generator", label: "Instagram Bio Generator" },
    { href: "/tiktok-tools/hashtag-generator", label: "TikTok Hashtag Generator" },
  ],
  "/instagram-tools/bio-generator": [
    { href: "/instagram-tools/reel-caption-generator", label: "Instagram Reel Caption Generator" },
    { href: "/instagram-tools/hashtag-generator", label: "Instagram Hashtag Generator" },
  ],
  "/tiktok-tools/viral-hooks": [
    { href: "/tiktok-tools/hashtag-generator", label: "TikTok Hashtag Generator" },
    { href: "/tiktok-tools/content-ideas", label: "TikTok Content Ideas" },
    { href: "/youtube-tools/retention-hooks", label: "YouTube Hook Generator" },
  ],
  "/tiktok-tools/hashtag-generator": [
    { href: "/tiktok-tools/viral-hooks", label: "TikTok Hook Generator" },
    { href: "/tiktok-tools/content-ideas", label: "TikTok Content Ideas" },
    { href: "/instagram-tools/hashtag-generator", label: "Instagram Hashtag Generator" },
  ],
  "/tiktok-tools/content-ideas": [
    { href: "/tiktok-tools/viral-hooks", label: "TikTok Hook Generator" },
    { href: "/tiktok-tools/hashtag-generator", label: "TikTok Hashtag Generator" },
  ],
  "/facebook-tools/post-caption-generator": [
    { href: "/facebook-tools/group-hooks", label: "Facebook Group Hook Generator" },
    { href: "/facebook-tools/page-bio-generator", label: "Facebook Page Bio Generator" },
    { href: "/instagram-tools/reel-caption-generator", label: "Instagram Reel Caption Generator" },
  ],
  "/facebook-tools/group-hooks": [
    { href: "/facebook-tools/post-caption-generator", label: "Facebook Post Caption Generator" },
    { href: "/facebook-tools/page-bio-generator", label: "Facebook Page Bio Generator" },
  ],
  "/facebook-tools/page-bio-generator": [
    { href: "/facebook-tools/post-caption-generator", label: "Facebook Post Caption Generator" },
    { href: "/facebook-tools/group-hooks", label: "Facebook Group Hook Generator" },
  ],
  "/tools/thumbnail-downloader": [
    { href: "/youtube-tools/title-generator", label: "YouTube Title Generator" },
    { href: "/youtube-tools/script-generator", label: "YouTube Script Generator" },
    { href: "/tools", label: "All Creator Tools" },
  ],
  "/tools/emoji-picker": [
    { href: "/tools/font-generator", label: "Font Generator" },
    { href: "/tools/color-palette-generator", label: "Color Palette Generator" },
    { href: "/tools", label: "All Creator Tools" },
  ],
  "/tools/font-generator": [
    { href: "/tools/emoji-picker", label: "Emoji Picker" },
    { href: "/tools/color-palette-generator", label: "Color Palette Generator" },
    { href: "/tools", label: "All Creator Tools" },
  ],
  "/tools/color-palette-generator": [
    { href: "/tools/font-generator", label: "Font Generator" },
    { href: "/tools/emoji-picker", label: "Emoji Picker" },
    { href: "/tools", label: "All Creator Tools" },
  ],
  "/tools/performance-audit": [
    { href: "/tools", label: "All Creator Tools" },
    { href: "/tools/color-palette-generator", label: "Color Palette Generator" },
  ],
};

export function ToolLayout({ title, description, inputs, results, children }: ToolLayoutProps) {
  const location = useLocation();
  const relatedTools = RELATED_TOOLS[location.pathname] || [{ href: "/tools", label: "Explore All Creator Tools" }];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-7xl"
    >
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">{title}</h1>
        <p className="text-lg text-slate-600 leading-relaxed">{description}</p>
      </div>

      {children ? (
        children
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-5 xl:col-span-4 sticky top-24">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 transition-shadow hover:shadow-md">
              {inputs}
            </div>
          </div>
          
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {results}
          </div>
        </div>
      )}

      <nav aria-label="Related creator tools" className="mt-14 border-t border-slate-200 pt-8">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Related Creator Tools</h2>
        <div className="flex flex-wrap gap-3">
          {relatedTools.map((tool) => (
            <Link
              key={tool.href}
              to={tool.href}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-indigo-300 hover:text-indigo-700 hover:bg-indigo-50 transition-colors"
            >
              {tool.label}
            </Link>
          ))}
        </div>
      </nav>
    </motion.div>
  );
}
