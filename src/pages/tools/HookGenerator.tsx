import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, RefreshCw, Loader2, Sparkles, Check, Zap } from "lucide-react";

interface GeneratedHook {
  style: string;
  hook: string;
  score: number;
}

export function HookGenerator() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("TikTok");
  const [audience, setAudience] = useState("");
  const [contentType, setContentType] = useState("Educational");
  const [tone, setTone] = useState("Curiosity");
  
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<GeneratedHook[]>([]);
  const [error, setError] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = async () => {
    if (!topic) {
      setError("Please enter a topic.");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolType: "hook",
          payload: { topic, platform, audience, contentType, tone }
        }),
      });

      if (!res.ok) { const errData = await res.json().catch(() => null); throw new Error(errData?.error || "Failed to generate hooks"); }

      const data = await res.json();
      setResults(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <ToolLayout
      title="Video Hook Generator"
      description="Stop the scroll with strong, psychology-backed hooks tailored for short-form video content."
      inputs={
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="topic">What is your video about?</Label>
            <Input 
              id="topic" 
              placeholder="e.g. 3 ways to fix bad posture while sitting at a desk" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <select 
                id="platform"
                className="flex h-12 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
              >
                <option>TikTok</option>
                <option>Instagram Reel</option>
                <option>YouTube Short</option>
                <option>YouTube Long Form</option>
                <option>LinkedIn Video</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contentType">Content Type</Label>
              <select 
                id="contentType"
                className="flex h-12 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all"
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
              >
                <option>Educational</option>
                <option>Storytime</option>
                <option>Vlog</option>
                <option>Product Showcase</option>
                <option>Entertainment</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="audience">Target Audience</Label>
            <Input 
              id="audience" 
              placeholder="e.g. Office workers, students, programmers" 
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tone">Primary Angle</Label>
            <select 
              id="tone"
              className="flex h-12 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              <option>Curiosity Gap</option>
              <option>Controversial / Unpopular Opinion</option>
              <option>Relatable Problem</option>
              <option>Bold Statement</option>
              <option>Unexpected Fact</option>
            </select>
          </div>

          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

          <div className="pt-4 flex gap-3">
            <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Generate Hooks
            </Button>
            <Button variant="outline" onClick={() => setTopic("")} disabled={isLoading}>
              Clear
            </Button>
          </div>
        </div>
      }
      results={
        <div className="space-y-4">
          {results.length === 0 && !isLoading ? (
            <div className="text-center py-20 px-6 bg-slate-50 border border-slate-200 border-dashed rounded-2xl">
              <Zap className="h-10 w-10 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-1">Waiting to generate hooks</h3>
              <p className="text-sm text-slate-500">Provide details to generate high-retention hooks.</p>
            </div>
          ) : null}
          
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
              <p className="text-slate-600 font-medium">Generating scroll-stopping hooks...</p>
            </div>
          )}

          {!isLoading && results.map((res, index) => (
            <Card key={index} className="overflow-hidden border-slate-200">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                      {res.style}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs font-medium bg-green-50 text-green-700 px-2 py-1 rounded-md border border-green-200">
                      <Zap className="h-3 w-3 fill-green-600" /> Score: {res.score}/10
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-6 leading-relaxed">"{res.hook}"</h3>
                  
                  <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4">
                    <Button variant="outline" size="sm" onClick={() => handleCopy(res.hook, index)}>
                      {copiedIndex === index ? <Check className="h-4 w-4 mr-2 text-green-600" /> : <Copy className="h-4 w-4 mr-2" />}
                      {copiedIndex === index ? "Copied!" : "Copy Hook"}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-slate-500 hover:text-indigo-600">
                      <RefreshCw className="h-4 w-4 mr-2" /> Regenerate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      }
    />
  );
}
