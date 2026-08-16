import { ToolLayout } from "@/components/layout/ToolLayout";
import { Hammer } from "lucide-react";

export function ComingSoon({ title, description }: { title: string, description: string }) {
  return (
    <ToolLayout
      title={title}
      description={description}
      inputs={
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Hammer className="h-12 w-12 text-indigo-200 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 mb-2">Under Construction</h3>
          <p className="text-sm text-slate-500">
            We are working hard to bring this tool to you soon. Stay tuned!
          </p>
        </div>
      }
      results={
        <div className="flex items-center justify-center h-full min-h-[300px] border border-slate-200 border-dashed rounded-2xl bg-slate-50 text-slate-400">
          More updates coming soon
        </div>
      }
    />
  );
}
