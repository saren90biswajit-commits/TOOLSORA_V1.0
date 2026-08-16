import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Youtube, 
  Instagram, 
  Video, 
  Facebook, 
  FileText, 
  MessageSquare, 
  Hash, 
  UserCircle, 
  Zap, 
  Lightbulb, 
  Users 
} from "lucide-react";

const CATEGORIES = {
  "youtube": {
    name: "YouTube",
    icon: Youtube,
    description: "Grow your channel with AI-powered video tools.",
    color: "from-red-500 to-rose-600",
    tools: [
      { id: "titles", name: "Catchy Title Generator", description: "Create click-worthy titles for your videos.", icon: Youtube, href: "/youtube-tools/title-generator" },
      { id: "hooks", name: "Retention Hooks", description: "Stop the scroll and boost watch time.", icon: Zap, href: "/youtube-tools/retention-hooks" },
      { id: "scripts", name: "Full Script Generator", description: "Generate complete video scripts.", icon: FileText, href: "/youtube-tools/script-generator" },
    ]
  },
  "instagram": {
    name: "Instagram",
    icon: Instagram,
    description: "Dominate the feed with engaging IG content.",
    color: "from-pink-500 to-purple-600",
    tools: [
      { id: "captions", name: "Reel Caption Generator", description: "Write engaging captions for your Reels.", icon: MessageSquare, href: "/instagram-tools/reel-caption-generator" },
      { id: "hashtags", name: "Smart Hashtags", description: "Find relevant hashtags for your niche.", icon: Hash, href: "/instagram-tools/hashtag-generator" },
      { id: "bios", name: "Profile Bio Generator", description: "Create a standout Instagram profile.", icon: UserCircle, href: "/instagram-tools/bio-generator" },
    ]
  },
  "tiktok": {
    name: "TikTok",
    icon: Video,
    description: "Go viral on TikTok with powerful AI creators.",
    color: "from-slate-900 to-slate-800",
    tools: [
      { id: "hooks", name: "Viral Hook Generator", description: "Hooks that stop the FYP scroll.", icon: Zap, href: "/tiktok-tools/viral-hooks" },
      { id: "hashtags", name: "Trending Tags", description: "Relevant hashtag suggestions for reach.", icon: Hash, href: "/tiktok-tools/hashtag-generator" },
      { id: "ideas", name: "Content Ideas", description: "Never run out of viral video concepts.", icon: Lightbulb, href: "/tiktok-tools/content-ideas" },
    ]
  },
  "facebook": {
    name: "Facebook",
    icon: Facebook,
    description: "Build community and engagement on Facebook.",
    color: "from-blue-600 to-indigo-700",
    tools: [
      { id: "captions", name: "Post Caption Generator", description: "Engaging captions for page posts.", icon: MessageSquare, href: "/facebook-tools/post-caption-generator" },
      { id: "group-hooks", name: "Group Hook Generator", description: "Start discussions in your FB Groups.", icon: Users, href: "/facebook-tools/group-hooks" },
      { id: "bios", name: "Page Bio Generator", description: "Professional \"About\" section for Pages.", icon: UserCircle, href: "/facebook-tools/page-bio-generator" },
    ]
  }
};

const containerVariants: any = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export function ToolCategory() {
  const { categoryId } = useParams();
  
  const category = categoryId ? CATEGORIES[categoryId.replace('-tools', '') as keyof typeof CATEGORIES] : null;

  if (!category) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="text-3xl font-bold">Category Not Found</h1>
        <Button asChild className="mt-6"><Link to="/tools">View All Tools</Link></Button>
      </div>
    );
  }

  const CategoryIcon = category.icon;

  return (
    <div className="pt-28 pb-20 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16 text-center max-w-3xl mx-auto"
      >
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} text-white mb-6 shadow-xl`}>
          <CategoryIcon className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          {category.name} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Tools</span>
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          {category.description} Completely free to use.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {category.tools.map((tool) => (
          <motion.div key={tool.id} variants={itemVariants}>
            <Card className="h-full hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 border-slate-200/60 bg-white/50 backdrop-blur-xl group cursor-pointer flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-sm">
                    <tool.icon className="w-6 h-6" />
                  </div>
                  <span className="inline-flex items-center rounded-md bg-emerald-50 border border-emerald-100 px-2 py-1 text-xs font-bold text-emerald-700 uppercase tracking-wider">
                    Free
                  </span>
                </div>
                <CardTitle className="text-xl font-bold text-slate-900">{tool.name}</CardTitle>
                <CardDescription className="text-sm mt-2 text-slate-500 leading-relaxed">{tool.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto pt-6">
                <Button className="w-full shadow-sm group-hover:bg-indigo-700 transition-colors" asChild>
                  <Link to={tool.href}>Use Tool</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
