import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, RefreshCw, Star, Loader2, Sparkles, Check, Youtube } from "lucide-react";

interface GeneratedTitle {
  title: string;
  curiosity: number;
  emotionalAppeal: number;
  improvement: string;
}

export function YouTubeTitleGenerator() {
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [category, setCategory] = useState("Vlog");
  const [tone, setTone] = useState("Viral");
  const [keyword, setKeyword] = useState("");
  const [count, setCount] = useState("5");
  
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<GeneratedTitle[]>([]);
  const [error, setError] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

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
          toolType: "youtube-titles",
          payload: { topic, audience, category, tone, keyword, count: parseInt(count) }
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.error || "Failed to generate titles");
      }

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

  const handleCopyAll = () => {
    if (results.length === 0) return;
    const allTitles = results.map(r => r.title).join("\n");
    navigator.clipboard.writeText(allTitles);
    setCopiedIndex(-1);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <ToolLayout
      title="YouTube Title Generator"
      description="Generate engaging, clickable YouTube titles designed to increase curiosity and improve your content's presentation."
      inputs={
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="topic">Video Topic</Label>
            <Input 
              id="topic" 
              placeholder="e.g. My morning routine in Tokyo" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="audience">Target Audience</Label>
            <Input 
              id="audience" 
              placeholder="e.g. Tech enthusiasts, beginners" 
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Content Category</Label>
            <select 
              id="category"
              className="flex h-12 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Vlog</option>
              <option>Tutorial</option>
              <option>Gaming</option>
              <option>Review</option>
              <option>Essay</option>
              <option>Podcast</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tone">Tone</Label>
            <select 
              id="tone"
              className="flex h-12 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              <option>Viral</option>
              <option>Curiosity</option>
              <option>Professional</option>
              <option>Educational</option>
              <option>Funny</option>
              <option>Emotional</option>
              <option>Dramatic</option>
              <option>Storytelling</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="keyword">Target Keyword (Optional)</Label>
            <Input 
              id="keyword" 
              placeholder="e.g. Productivity" 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="count">Number of Titles</Label>
            <select 
              id="count"
              className="flex h-12 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-400 transition-all"
              value={count}
              onChange={(e) => setCount(e.target.value)}
            >
              <option value="3">3 titles</option>
              <option value="5">5 titles</option>
              <option value="10">10 titles</option>
            </select>
          </div>

          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

          <div className="pt-4 flex gap-3">
            <Button onClick={handleGenerate} disabled={isLoading} className="w-full">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Generate Titles
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
              <Youtube className="h-10 w-10 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-1">No titles generated yet</h3>
              <p className="text-sm text-slate-500">Fill out the form and hit generate to see magic happen.</p>
            </div>
          ) : null}
          
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
              <p className="text-slate-600 font-medium">Crafting the perfect titles...</p>
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-slate-900">Generated Titles</h3>
              <Button variant="outline" size="sm" onClick={handleCopyAll}>
                {copiedIndex === -1 ? <Check className="h-4 w-4 mr-2 text-green-600" /> : <Copy className="h-4 w-4 mr-2" />}
                {copiedIndex === -1 ? "Copied All!" : "Copy All"}
              </Button>
            </div>
          )}

          {!isLoading && results.map((res, index) => (
            <Card key={index} className="overflow-hidden border-slate-200">
              <CardContent className="p-0">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">{res.title}</h3>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant="outline" size="sm" onClick={() => handleCopy(res.title, index)}>
                      {copiedIndex === index ? <Check className="h-4 w-4 mr-2 text-green-600" /> : <Copy className="h-4 w-4 mr-2" />}
                      {copiedIndex === index ? "Copied!" : "Copy"}
                    </Button>
                    <Button variant="outline" size="sm" className="text-slate-600">
                      <RefreshCw className="h-4 w-4 mr-2" /> Regenerate
                    </Button>
                    <Button variant="ghost" size="sm" className="text-amber-500 hover:text-amber-600 hover:bg-amber-50 ml-auto">
                      <Star className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="bg-slate-50 p-6 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Title Analysis</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-slate-700">Curiosity</span>
                        <span className="text-indigo-600 font-bold">{res.curiosity}/10</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(res.curiosity / 10) * 100}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-slate-700">Emotional Appeal</span>
                        <span className="text-indigo-600 font-bold">{res.emotionalAppeal}/10</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(res.emotionalAppeal / 10) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600"><span className="font-medium">Suggestion:</span> {res.improvement}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      }
    />
  );
}
