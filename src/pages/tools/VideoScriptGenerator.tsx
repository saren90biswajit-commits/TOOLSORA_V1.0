import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, RefreshCw, Loader2, Sparkles, Check, FileText } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface ScriptResult {
  hook: string;
  introduction: string;
  mainContent: string;
  patternInterrupt: string;
  keyTakeaway: string;
  callToAction: string;
}

export function VideoScriptGenerator() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("YouTube");
  const [videoType, setVideoType] = useState("Educational");
  const [audience, setAudience] = useState("");
  const [duration, setDuration] = useState("Short (under 1 min)");
  const [tone, setTone] = useState("Engaging");
  const [cta, setCta] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ScriptResult | null>(null);
  const [error, setError] = useState("");
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic) {
      setError("Please enter a video topic.");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolType: "video-script",
          payload: { topic, platform, videoType, audience, duration, tone, cta }
        }),
      });

      if (!res.ok) { const errData = await res.json().catch(() => null); throw new Error(errData?.error || "Failed to generate script"); }

      const data = await res.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleCopyAll = () => {
    if (!result) return;
    const fullScript = `
HOOK:
${result.hook}

INTRODUCTION:
${result.introduction}

MAIN CONTENT:
${result.mainContent}

PATTERN INTERRUPT:
${result.patternInterrupt}

KEY TAKEAWAY:
${result.keyTakeaway}

CALL TO ACTION:
${result.callToAction}
`.trim();
    handleCopy(fullScript, "all");
  };

  const renderSection = (title: string, content: string, sectionKey: keyof ScriptResult) => {
    if (!content) return null;
    return (
      <div className="mb-8 last:mb-0">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider">{title}</h4>
          <Button variant="ghost" size="sm" className="h-8 text-slate-500 hover:text-indigo-600" onClick={() => handleCopy(content, sectionKey)}>
            {copiedSection === sectionKey ? <Check className="h-4 w-4 mr-1 text-green-600" /> : <Copy className="h-4 w-4 mr-1" />}
            {copiedSection === sectionKey ? "Copied" : "Copy"}
          </Button>
        </div>
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 whitespace-pre-wrap text-slate-800 leading-relaxed text-[15px]">
          {content}
        </div>
      </div>
    );
  };

  return (
    <ToolLayout
      title="Video Script Generator"
      description="Generate structured, engaging video scripts with built-in hooks and retention tactics."
      inputs={
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="topic">Video Topic / Outline</Label>
            <Textarea 
              id="topic" 
              placeholder="e.g. 5 hidden iOS features that save time" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="h-24"
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
                <option>YouTube Long Form</option>
                <option>YouTube Short</option>
                <option>Instagram Reel</option>
                <option>TikTok</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="videoType">Video Type</Label>
              <select 
                id="videoType"
                className="flex h-12 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all"
                value={videoType}
                onChange={(e) => setVideoType(e.target.value)}
              >
                <option>Educational</option>
                <option>Product Review</option>
                <option>Storytelling</option>
                <option>Listicle</option>
                <option>Vlog Structure</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="audience">Target Audience</Label>
              <Input 
                id="audience" 
                placeholder="e.g. Tech lovers" 
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Estimated Duration</Label>
              <select 
                id="duration"
                className="flex h-12 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              >
                <option>Short (under 1 min)</option>
                <option>Medium (3-5 mins)</option>
                <option>Long (8-10 mins)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tone">Tone</Label>
              <select 
                id="tone"
                className="flex h-12 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
              >
                <option>Engaging & Energetic</option>
                <option>Professional & Calm</option>
                <option>Funny & Relatable</option>
                <option>Dramatic & Suspenseful</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cta">Call-to-Action</Label>
              <Input 
                id="cta" 
                placeholder="e.g. Subscribe for more" 
                value={cta}
                onChange={(e) => setCta(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

          <div className="pt-4 flex gap-3">
            <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Generate Script
            </Button>
            <Button variant="outline" onClick={() => setTopic("")} disabled={isLoading}>
              Clear
            </Button>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          {!result && !isLoading ? (
            <div className="text-center py-20 px-6 bg-slate-50 border border-slate-200 border-dashed rounded-2xl">
              <FileText className="h-10 w-10 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-1">Your video script</h3>
              <p className="text-sm text-slate-500">Enter a topic to generate a full script outline.</p>
            </div>
          ) : null}
          
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
              <p className="text-slate-600 font-medium">Writing your script...</p>
            </div>
          )}

          {!isLoading && result && (
            <Card className="overflow-hidden border-slate-200">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900">Script Draft</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleCopyAll}>
                      {copiedSection === "all" ? <Check className="h-4 w-4 mr-2 text-green-600" /> : <Copy className="h-4 w-4 mr-2" />}
                      {copiedSection === "all" ? "Copied All!" : "Copy Full Script"}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-slate-500 hover:text-indigo-600" onClick={handleGenerate}>
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {renderSection("1. The Hook (0:00 - 0:05)", result.hook, "hook")}
                {renderSection("2. Introduction", result.introduction, "introduction")}
                {renderSection("3. Main Content", result.mainContent, "mainContent")}
                {renderSection("4. Pattern Interrupt", result.patternInterrupt, "patternInterrupt")}
                {renderSection("5. Key Takeaway", result.keyTakeaway, "keyTakeaway")}
                {renderSection("6. Call To Action", result.callToAction, "callToAction")}
                
              </CardContent>
            </Card>
          )}
        </div>
      }
    />
  );
}
