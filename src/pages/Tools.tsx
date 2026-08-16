import { Link } from "react-router-dom";
import { 
  ArrowRight, Youtube, Instagram, Hash, 
  MessageSquare, UserCircle, Smile, Type, Palette, 
  FileText, Zap, Sparkles
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ALL_TOOLS } from "@/config/tools";

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export function Tools() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center p-3 bg-indigo-100 rounded-2xl mb-6 shadow-sm border border-indigo-200">
            <Sparkles className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-6 tracking-tight">All Creator Tools</h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Browse our complete collection of tools to supercharge your content creation workflow.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {ALL_TOOLS.map((tool) => (
            <motion.div key={tool.id} variants={itemVariants} className="h-full">
              <Link to={tool.href} className="group flex h-full">
                <Card className="w-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-slate-200 hover:border-indigo-300 bg-white flex flex-col">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-sm">
                        <tool.icon className="w-6 h-6" />
                      </div>
                      <span className="inline-flex items-center rounded-md bg-emerald-50 border border-emerald-100 px-2 py-1 text-xs font-bold text-emerald-700 uppercase tracking-wider">
                        Free
                      </span>
                    </div>
                    <CardTitle className="text-lg font-bold text-slate-900">{tool.name}</CardTitle>
                    <CardDescription className="text-sm mt-2 text-slate-500 leading-relaxed">{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto pt-0 pb-6">
                    <span className="text-sm font-bold text-indigo-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                      Open Tool <ArrowRight className="w-4 h-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
