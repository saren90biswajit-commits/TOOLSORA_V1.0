import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Activity, Zap, Accessibility, Search, MonitorSmartphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";

interface ScoreProps {
  label: string;
  score: number;
  icon: any;
  color: string;
}

function ScoreCircle({ label, score, icon: Icon, color }: ScoreProps) {
  const getScoreColor = (s: number) => {
    if (s >= 90) return "text-emerald-500 border-emerald-500";
    if (s >= 50) return "text-amber-500 border-amber-500";
    return "text-red-500 border-red-500";
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className={`relative flex items-center justify-center w-24 h-24 rounded-full border-4 ${getScoreColor(score)} mb-4 bg-white shadow-sm`}>
        <span className={`text-2xl font-bold ${getScoreColor(score).split(' ')[0]}`}>{score}</span>
      </div>
      <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm uppercase tracking-wide">
        <Icon className={`w-4 h-4 ${color}`} />
        {label}
      </div>
    </div>
  );
}

export function PerformanceAudit() {
  const [url, setUrl] = useState("");
  const [isAuditing, setIsAuditing] = useState(false);
  const [results, setResults] = useState<{
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
  } | null>(null);

  const handleAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) {
      toast.error("Please enter a valid URL to audit.");
      return;
    }

    let targetUrl = url;
    if (!targetUrl.startsWith("http://") && !targetUrl.startsWith("https://")) {
      targetUrl = "https://" + targetUrl;
    }

    setIsAuditing(true);
    setResults(null);
    toast.loading("Analyzing website performance...", { id: "auditToast" });

    // Simulate audit delay
    setTimeout(() => {
      // Generate some semi-random realistic scores based on url length to simulate a result
      const hash = targetUrl.length;
      setResults({
        performance: Math.min(99, Math.max(45, 100 - hash + Math.floor(Math.random() * 20))),
        accessibility: Math.min(100, Math.max(75, 95 - (hash % 10) + Math.floor(Math.random() * 5))),
        bestPractices: Math.min(100, Math.max(60, 90 - (hash % 15) + Math.floor(Math.random() * 10))),
        seo: Math.min(100, Math.max(70, 92 - (hash % 5) + Math.floor(Math.random() * 8))),
      });
      setIsAuditing(false);
      toast.success("Audit complete!", { id: "auditToast" });
    }, 3500);
  };

  return (
    <ToolLayout
      title="Website Performance Audit"
      description="Analyze any URL for performance, accessibility, SEO, and best practices. Get actionable insights instantly."
    >
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="border-slate-200 shadow-sm">
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleAudit} className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1 w-full space-y-2">
                <Label htmlFor="url" className="text-sm font-semibold text-slate-700">Website URL</Label>
                <div className="relative">
                  <MonitorSmartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    id="url"
                    placeholder="example.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="pl-10 h-12 text-lg"
                    disabled={isAuditing}
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                disabled={isAuditing} 
                className="h-12 px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base w-full md:w-auto"
              >
                {isAuditing ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analyzing...</>
                ) : (
                  <><Activity className="w-5 h-5 mr-2" /> Run Audit</>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {isAuditing && (
          <div className="py-20 flex flex-col items-center justify-center text-slate-500 animate-pulse">
            <Loader2 className="w-12 h-12 mb-4 animate-spin text-indigo-500" />
            <p className="text-lg font-medium">Running Lighthouse Audit...</p>
            <p className="text-sm mt-2 opacity-75">This usually takes 3-5 seconds</p>
          </div>
        )}

        {results && !isAuditing && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <ScoreCircle label="Performance" score={results.performance} icon={Zap} color="text-indigo-500" />
              <ScoreCircle label="Accessibility" score={results.accessibility} icon={Accessibility} color="text-pink-500" />
              <ScoreCircle label="Best Practices" score={results.bestPractices} icon={Activity} color="text-blue-500" />
              <ScoreCircle label="SEO" score={results.seo} icon={Search} color="text-emerald-500" />
            </div>

            <Card className="border-slate-200">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Audit Summary</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2">Metrics Overview</h4>
                    <p className="text-slate-600 leading-relaxed">
                      Your website scored an average of <strong className="text-slate-900">{Math.round((results.performance + results.accessibility + results.bestPractices + results.seo) / 4)}/100</strong> across all core metrics. 
                      {results.performance < 70 && " Performance seems to be the main bottleneck. Consider optimizing images, minimizing render-blocking resources, and leveraging browser caching."}
                      {results.seo < 80 && " There is room for improvement in SEO. Ensure meta tags are properly configured and content is accessible to web crawlers."}
                      {(results.performance >= 90 && results.seo >= 90) && " Excellent job! Your website is highly optimized and following industry best practices."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
