import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ToolLayoutProps {
  title: string;
  description: string;
  inputs?: ReactNode;
  results?: ReactNode;
  children?: ReactNode;
}

export function ToolLayout({ title, description, inputs, results, children }: ToolLayoutProps) {
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
    </motion.div>
  );
}
