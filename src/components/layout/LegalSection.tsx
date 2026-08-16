import { ReactNode } from "react";

interface LegalSectionProps {
  title?: string;
  children: ReactNode;
}

export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section className="bg-white border border-slate-200 shadow-sm rounded-[2rem] p-8 md:p-10 mb-8 hover:border-indigo-200 hover:shadow-md transition-all duration-300 relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-1.5 h-0 bg-gradient-to-b from-indigo-500 to-violet-500 group-hover:h-full transition-all duration-500"></div>
      
      {title && (
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6 pb-5 border-b border-slate-100 flex items-center">
          {title}
        </h2>
      )}
      
      <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-h3:text-xl prose-h3:text-slate-800 prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-indigo-600 hover:prose-a:text-indigo-700 prose-li:text-slate-600 marker:text-indigo-500">
        {children}
      </div>
    </section>
  );
}
