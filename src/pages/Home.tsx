import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Youtube,
  Instagram,
  Hash,
  MessageSquare,
  UserCircle,
  Smile,
  Type,
  Palette,
  FileText,
  Zap,
  Search,
  Lightbulb,
  PenTool,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { ALL_TOOLS } from "@/config/tools";

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Home() {
  const navigate = useNavigate();
  const placeholders = [
    "What do you want to create? (e.g. YouTube titles)",
    "What do you want to create? (e.g. Viral TikTok hooks)",
    "What do you want to create? (e.g. Engaging IG captions)",
    "What do you want to create? (e.g. FB Group posts)",
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/tools");
  };

  return (
    <div className="flex flex-col w-full bg-slate-50">
      {/* 100% Free Banner */}
      <div className="w-full py-4 bg-slate-50 relative z-10 border-b border-slate-200/50 flex overflow-hidden">
        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 15,
          }}
          className="flex whitespace-nowrap will-change-transform items-center"
        >
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center">
              <h2 className="font-black text-lg sm:text-xl md:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 px-4 sm:px-8">
                No Sign Up, No Credit Card required to use Tools
              </h2>
              <span className="text-purple-300 mx-2 sm:mx-4 text-xl sm:text-2xl">
                •
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Hero Section & Popular Tools Grid */}
      <section className="py-12 sm:py-20 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Hero & Search */}
            <motion.div
              className="lg:col-span-6 flex flex-col space-y-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider w-fit border border-emerald-100 shadow-sm">
                  <Sparkles className="w-3 h-3 mr-2 text-emerald-500" />
                  Free Forever • No Signup Required
                </div>
                <h1 className="text-5xl sm:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">
                  Create Content That{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-500">
                    Gets Attention.
                  </span>
                </h1>
                <div className="text-lg text-slate-600 leading-relaxed max-w-lg">
                  <p>
                    Powerful free AI tools for creators, YouTubers, influencers,
                    marketers, and social media managers.
                  </p>
                </div>
              </div>

              <form
                onSubmit={handleSearch}
                className="relative max-w-xl group pt-6"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-[1.25rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 mt-6"></div>
                <div className="relative flex items-center bg-white rounded-2xl border border-slate-200/50 shadow-xl shadow-slate-200/50 ring-1 ring-slate-900/5 focus-within:ring-4 focus-within:ring-indigo-500/10 focus-within:border-indigo-400 transition-all p-2">
                  <div className="pl-3 pr-2 flex items-center justify-center">
                    <Search className="w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                  </div>
                  <input
                    type="text"
                    placeholder={placeholders[placeholderIndex]}
                    className="w-full py-3 bg-transparent outline-none text-slate-800 placeholder:text-slate-400 text-base transition-all duration-500"
                  />
                  <Button
                    type="submit"
                    className="shrink-0 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white px-6 rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 h-11 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Explore
                  </Button>
                </div>
              </form>

              {/* Workflow Visualizer */}
              <div className="pt-10">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
                  One Idea, Infinite Posts
                </p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 w-full">
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-3 rounded-2xl shadow-sm hover:border-indigo-200 hover:shadow-md transition-all cursor-default shrink-0"
                  >
                    <div className="w-8 h-8 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500">
                      <Lightbulb className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">
                      Idea
                    </span>
                  </motion.div>

                  <ArrowRight className="w-4 h-4 text-slate-300 shrink-0 hidden sm:block" />

                  <motion.div
                    whileHover={{ y: -4 }}
                    className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-3 rounded-2xl shadow-sm hover:border-indigo-200 hover:shadow-md transition-all cursor-default shrink-0"
                  >
                    <div className="w-8 h-8 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500">
                      <Zap className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">
                      Hook
                    </span>
                  </motion.div>

                  <ArrowRight className="w-4 h-4 text-slate-300 shrink-0 hidden sm:block" />

                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-3 rounded-2xl shadow-lg shadow-indigo-200 cursor-default shrink-0 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-white/20 -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 ease-in-out"></div>
                    <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center text-white backdrop-blur-sm z-10 relative">
                      <PenTool className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-white z-10 relative">
                      Title
                    </span>
                  </motion.div>

                  <ArrowRight className="w-4 h-4 text-slate-300 shrink-0 hidden sm:block" />

                  <motion.div
                    whileHover={{ y: -4 }}
                    className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-3 rounded-2xl shadow-sm hover:border-indigo-200 hover:shadow-md transition-all cursor-default shrink-0"
                  >
                    <div className="w-8 h-8 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">
                      Script
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Tools Grid */}
            <motion.div
              className="lg:col-span-6 flex flex-col"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-slate-900">
                  Popular Creator Tools
                </h2>
                <Link
                  to="/tools"
                  className="text-sm font-semibold text-indigo-600 flex items-center gap-1 hover:text-indigo-700 transition-colors"
                >
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ALL_TOOLS.slice(0, 6).map((tool) => (
                  <motion.div key={tool.id} variants={itemVariants}>
                    <Link
                      to={tool.href}
                      className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col h-full"
                    >
                      <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-3 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <tool.icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-slate-900 mb-1">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-slate-500 leading-normal mb-3 flex-1">
                        {tool.description}
                      </p>
                      <div>
                        <span className="inline-block px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded uppercase tracking-wider">
                          Free
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Platform Tools Section */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4 tracking-tight">
              Tools for Every Platform
            </h2>
            <p className="text-lg text-slate-600">
              Grow your audience wherever they are with our targeted creation
              utilities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* YouTube */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group"
            >
              <Card className="relative overflow-hidden p-8 border-slate-200 hover:border-red-200 hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300 h-full flex flex-col rounded-3xl bg-white z-10">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-red-500/5 blur-3xl group-hover:bg-red-500/10 transition-colors z-0"></div>
                <div className="relative z-10 flex items-center gap-4 mb-8">
                  <div className="flex items-center justify-center w-14 h-14 bg-red-50 group-hover:bg-red-500 group-hover:text-white transition-colors rounded-2xl text-red-600 shadow-sm border border-red-100 group-hover:border-red-500">
                    <Youtube className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                    YouTube
                  </h3>
                </div>
                <ul className="relative z-10 space-y-4 mb-10 flex-1">
                  <li className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-red-500" /> Catchy
                    Titles
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-red-500" /> Retention
                    Hooks
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-red-500" /> Full
                    Scripts
                  </li>
                </ul>
                <Button
                  className="relative z-10 w-full bg-slate-50 hover:bg-red-600 text-slate-800 hover:text-white border border-slate-200 hover:border-red-600 transition-all duration-300 shadow-sm h-12 rounded-xl text-base font-semibold group/btn"
                  asChild
                >
                  <Link to="/tools">
                    Explore YouTube{" "}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </Card>
            </motion.div>
            {/* Instagram */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group"
            >
              <Card className="relative overflow-hidden p-8 border-slate-200 hover:border-pink-200 hover:shadow-xl hover:shadow-pink-500/10 transition-all duration-300 h-full flex flex-col rounded-3xl bg-white z-10">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-pink-500/5 blur-3xl group-hover:bg-pink-500/10 transition-colors z-0"></div>
                <div className="relative z-10 flex items-center gap-4 mb-8">
                  <div className="flex items-center justify-center w-14 h-14 bg-pink-50 group-hover:bg-gradient-to-tr group-hover:from-orange-500 group-hover:via-pink-500 group-hover:to-purple-500 group-hover:text-white transition-all duration-500 rounded-2xl text-pink-600 shadow-sm border border-pink-100 group-hover:border-transparent">
                    <Instagram className="h-7 w-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Instagram
                  </h3>
                </div>
                <ul className="relative z-10 space-y-4 mb-10 flex-1">
                  <li className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-pink-500" /> Reel
                    Captions
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-pink-500" /> Smart
                    Hashtags
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-pink-500" /> Profile
                    Bios
                  </li>
                </ul>
                <Button
                  className="relative z-10 w-full bg-slate-50 hover:bg-pink-600 text-slate-800 hover:text-white border border-slate-200 hover:border-pink-600 transition-all duration-300 shadow-sm h-12 rounded-xl text-base font-semibold group/btn"
                  asChild
                >
                  <Link to="/tools">
                    Explore Instagram{" "}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </Card>
            </motion.div>

            {/* TikTok */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group"
            >
              <Card className="relative overflow-hidden p-8 border-slate-200 hover:border-slate-400 hover:shadow-xl hover:shadow-slate-900/10 transition-all duration-300 h-full flex flex-col rounded-3xl bg-white z-10">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-slate-900/5 blur-3xl group-hover:bg-slate-900/10 transition-colors z-0"></div>
                <div className="relative z-10 flex items-center gap-4 mb-8">
                  <div className="flex items-center justify-center w-14 h-14 bg-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-colors rounded-2xl text-slate-900 shadow-sm border border-slate-200 group-hover:border-slate-900">
                    <svg
                      className="h-7 w-7"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.04.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.12-3.44-3.17-3.8-5.46-.4-2.51.33-5.01 1.95-6.84 1.5-1.67 3.73-2.5 5.96-2.55.02 1.34-.01 2.68.04 4.02-1.04.05-2.06.4-2.87 1.05-.83.67-1.33 1.71-1.36 2.78-.05 1.51 1.05 2.87 2.51 3.2 1.03.24 2.15.09 3.02-.5 1.08-.73 1.7-1.99 1.72-3.29.04-4.8.01-9.6.02-14.41z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                    TikTok
                  </h3>
                </div>
                <ul className="relative z-10 space-y-4 mb-10 flex-1">
                  <li className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-slate-900" /> Viral
                    Hooks
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-slate-900" /> Trending
                    Tags
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-slate-900" /> Content
                    Ideas
                  </li>
                </ul>
                <Button
                  className="relative z-10 w-full bg-slate-50 hover:bg-slate-900 text-slate-800 hover:text-white border border-slate-200 hover:border-slate-900 transition-all duration-300 shadow-sm h-12 rounded-xl text-base font-semibold group/btn"
                  asChild
                >
                  <Link to="/tools">
                    Explore TikTok{" "}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </Card>
            </motion.div>

            {/* Facebook */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="group"
            >
              <Card className="relative overflow-hidden p-8 border-slate-200 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 h-full flex flex-col rounded-3xl bg-white z-10">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-blue-500/5 blur-3xl group-hover:bg-blue-500/10 transition-colors z-0"></div>
                <div className="relative z-10 flex items-center gap-4 mb-8">
                  <div className="flex items-center justify-center w-14 h-14 bg-blue-50 group-hover:bg-blue-600 group-hover:text-white transition-colors rounded-2xl text-blue-600 shadow-sm border border-blue-100 group-hover:border-blue-600">
                    <svg
                      className="h-7 w-7"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Facebook
                  </h3>
                </div>
                <ul className="relative z-10 space-y-4 mb-10 flex-1">
                  <li className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-blue-500" /> Post
                    Captions
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-blue-500" /> Group
                    Hooks
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-blue-500" /> Page Bios
                  </li>
                </ul>
                <Button
                  className="relative z-10 w-full bg-slate-50 hover:bg-blue-600 text-slate-800 hover:text-white border border-slate-200 hover:border-blue-600 transition-all duration-300 shadow-sm h-12 rounded-xl text-base font-semibold group/btn"
                  asChild
                >
                  <Link to="/tools">
                    Explore Facebook{" "}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-tr from-indigo-900 via-indigo-800 to-violet-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl font-black text-white mb-6">
            Ready to create better content?
          </h2>
          <p className="text-xl text-indigo-200 mb-10 max-w-2xl mx-auto">
            Join thousands of creators using ToolsOra to save time and boost
            engagement. Every single tool is 100% free to use.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-indigo-900 hover:bg-slate-100 font-bold px-8"
              asChild
            >
              <Link to="/tools">Start Using Free Tools</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
