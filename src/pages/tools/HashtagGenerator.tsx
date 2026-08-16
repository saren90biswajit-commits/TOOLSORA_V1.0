import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, RefreshCw, Loader2, Sparkles, Check, Hash } from "lucide-react";

interface HashtagResults {
  relevant: string[];
  niche: string[];
  broad: string[];
  longTail: string[];
}

export function HashtagGenerator() {
  const [topic, setTopic] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [niche, setNiche] = useState("");
  const [keyword, setKeyword] = useState("");
  const [count, setCount] = useState("15");
  
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<HashtagResults | null>(null);
  const [error, setError] = useState("");
  const [copiedGroup, setCopiedGroup] = useState<string | null>(null);

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
          toolType: "hashtags",
          payload: { topic, platform, niche, keyword, count: parseInt(count) }
        }),
      });

      if (!res.ok) { const errData = await res.json().catch(() => null); throw new Error(errData?.error || "Failed to generate hashtags"); }

      const data = await res.json();
      setResults(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string, group: string) => {
    navigator.clipboard.writeText(text);
    setCopiedGroup(group);
    setTimeout(() => setCopiedGroup(null), 2000);
  };

  const handleCopyAll = () => {
    if (!results) return;
    const all = [
      ...results.relevant,
      ...results.niche,
      ...results.broad,
      ...results.longTail
    ].join(" ");
    handleCopy(all, "all");
  };

  const renderGroup = (title: string, tags: string[], groupKey: string) => {
    if (!tags || tags.length === 0) return null;
    const tagsString = tags.join(" ");
    
    return (
      <div className="mb-6 last:mb-0">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold text-slate-900">{title}</h4>
          <Button variant="ghost" size="sm" className="h-8 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50" onClick={() => handleCopy(tagsString, groupKey)}>
            {copiedGroup === groupKey ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
            {copiedGroup === groupKey ? "Copied" : "Copy"}
          </Button>
        </div>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span key={i} className="inline-block px-3 py-1 bg-white border border-slate-200 rounded-lg text-sm text-slate-700">
              {tag.startsWith('#') ? tag : "#" + tag}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <ToolLayout
      title="Hashtag Generator"
      description="Discover trending and niche hashtags optimized for reach and engagement."
      inputs={
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="topic">Post Topic</Label>
            <Input 
              id="topic" 
              placeholder="e.g. Minimalist desk setup" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="platform">Platform</Label>
            <select 
              id="platform"
              className="flex h-12 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            >
              <option>Instagram</option>
              <option>TikTok</option>
              <option>YouTube</option>
              <option>Facebook</option>
              <option>LinkedIn</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="niche">Your Niche</Label>
            <Input 
              id="niche" 
              placeholder="e.g. Tech Reviewer, Fitness" 
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="keyword">Target Keyword (Optional)</Label>
            <Input 
              id="keyword" 
              placeholder="e.g. #productivity" 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="count">Number of Hashtags</Label>
            <select 
              id="count"
              className="flex h-12 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all"
              value={count}
              onChange={(e) => setCount(e.target.value)}
            >
              <option value="15">15 tags (Recommended)</option>
              <option value="30">30 tags (Max)</option>
              <option value="5">5 tags (Minimal)</option>
            </select>
          </div>

          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

          <div className="pt-4 flex gap-3">
            <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Generate Hashtags
            </Button>
            <Button variant="outline" onClick={() => setTopic("")} disabled={isLoading}>
              Clear
            </Button>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          {!results && !isLoading ? (
            <div className="text-center py-20 px-6 bg-slate-50 border border-slate-200 border-dashed rounded-2xl">
              <Hash className="h-10 w-10 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-1">Hashtags will appear here</h3>
              <p className="text-sm text-slate-500">Provide details about your post to get started.</p>
            </div>
          ) : null}
          
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
              <p className="text-slate-600 font-medium">Finding the best hashtags...</p>
            </div>
          )}

          {!isLoading && results && (
            <Card className="overflow-hidden border-slate-200">
              <CardContent className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900">Generated Hashtags</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleCopyAll}>
                      {copiedGroup === "all" ? <Check className="h-4 w-4 mr-2 text-green-600" /> : <Copy className="h-4 w-4 mr-2" />}
                      {copiedGroup === "all" ? "Copied All!" : "Copy All"}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-slate-500 hover:text-indigo-600" onClick={handleGenerate}>
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {renderGroup("Relevant (Highly targeted)", results.relevant, "relevant")}
                {renderGroup("Niche (Community specific)", results.niche, "niche")}
                {renderGroup("Broad (High volume)", results.broad, "broad")}
                {renderGroup("Long-tail (Low competition)", results.longTail, "longTail")}
                
              </CardContent>
            </Card>
          )}
        </div>
      }
    />
  );
}
