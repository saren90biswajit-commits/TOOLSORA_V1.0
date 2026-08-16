import { useState, FormEvent } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Copy, RefreshCw } from "lucide-react";

export function TikTokContentIdeasGenerator() {
  const [topic, setTopic] = useState("");
  const [niche, setNiche] = useState("");
  const [audience, setAudience] = useState("");
  const [style, setStyle] = useState("Educational");
  const [ideas, setIdeas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateIdeas = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!topic || !niche) {
      setError("Please enter a topic and niche.");
      return;
    }

    setLoading(true);
    setError("");
    setIdeas([]);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolType: "content-ideas",
          payload: { topic, niche, audience, style, platform: "TikTok", count: 5 }
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate ideas.");
      }

      const data = await response.json();
      setIdeas(data);
    } catch (err: any) {
      setError("We couldn't generate results right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const resetForm = () => {
    setTopic("");
    setNiche("");
    setAudience("");
    setStyle("Educational");
    setIdeas([]);
    setError("");
  };

  return (
    <ToolLayout
      title="TikTok Content Ideas Generator"
      description="Generate viral content ideas and concepts tailored for TikTok."
      inputs={
        <form onSubmit={generateIdeas} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Topic</Label>
            <Input
              id="topic"
              placeholder="e.g. Morning routine, Tech review"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="niche">Niche</Label>
            <Input
              id="niche"
              placeholder="e.g. Fitness, Personal Finance"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="audience">Target Audience (Optional)</Label>
            <Input
              id="audience"
              placeholder="e.g. College students, Beginners"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="style">Content Style</Label>
            <select
              id="style"
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            >
              <option>Educational</option>
              <option>Entertaining</option>
              <option>Storytelling</option>
              <option>Vlog / Day in the Life</option>
              <option>Trend-driven</option>
              <option>Controversial / Hot Take</option>
            </select>
          </div>
          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
          <div className="flex gap-2">
            <Button type="submit" className="flex-1" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Ideas"
              )}
            </Button>
            <Button type="button" variant="outline" onClick={resetForm} disabled={loading}>
              Reset
            </Button>
          </div>
        </form>
      }
      results={
        <div className="space-y-6">
          {ideas.length > 0 ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-slate-900">Content Ideas</h3>
              </div>
              {ideas.map((idea, index) => (
                <div key={index} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative group hover:border-indigo-200 transition-colors">
                  <h4 className="font-bold text-indigo-700 mb-2">{idea.concept}</h4>
                  <div className="space-y-2 text-sm text-slate-600">
                    <p><span className="font-semibold text-slate-900">Format:</span> {idea.format}</p>
                    <p><span className="font-semibold text-slate-900">Hook:</span> "{idea.hook}"</p>
                    <p><span className="font-semibold text-slate-900">Description:</span> {idea.description}</p>
                    <p><span className="font-semibold text-slate-900">CTA:</span> {idea.cta}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => copyToClipboard(`Concept: ${idea.concept}\nFormat: ${idea.format}\nHook: ${idea.hook}\nDescription: ${idea.description}\nCTA: ${idea.cta}`)}
                  >
                    <Copy className="w-4 h-4 mr-1" /> Copy
                  </Button>
                </div>
              ))}
              <Button onClick={() => generateIdeas()} className="w-full mt-4" variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate More Ideas
              </Button>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-4">
                <RefreshCw className="w-8 h-8 text-indigo-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Ready to brainstorm?</h3>
              <p className="text-slate-500 max-w-sm mx-auto">
                Fill out the details on the left to generate fresh TikTok content ideas.
              </p>
            </div>
          )}
        </div>
      }
    />
  );
}
