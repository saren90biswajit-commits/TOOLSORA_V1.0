import { useState, FormEvent } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Copy, RefreshCw, Check } from "lucide-react";

export function FacebookGroupHookGenerator() {
  const [groupTopic, setGroupTopic] = useState("");
  const [postTopic, setPostTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("Engaging");
  const [hooks, setHooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateHooks = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    if (!groupTopic || !postTopic) {
      setError("Please enter the group topic and post topic.");
      return;
    }

    setLoading(true);
    setError("");
    setHooks([]);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolType: "facebook-group-hooks",
          payload: { groupTopic, postTopic, audience, tone, platform: "Facebook" }
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate hooks.");
      }

      const data = await response.json();
      setHooks(data);
    } catch (err: any) {
      setError("We couldn't generate results right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const resetForm = () => {
    setGroupTopic("");
    setPostTopic("");
    setAudience("");
    setTone("Engaging");
    setHooks([]);
    setError("");
  };

  return (
    <ToolLayout
      title="Facebook Group Hook Generator"
      description="Create conversation-starting hooks to boost engagement in your Facebook Groups."
      inputs={
        <form onSubmit={generateHooks} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="groupTopic">Group Topic / Niche</Label>
            <Input
              id="groupTopic"
              placeholder="e.g. Local Business Owners, Dog Trainers"
              value={groupTopic}
              onChange={(e) => setGroupTopic(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="postTopic">What is this post about?</Label>
            <Input
              id="postTopic"
              placeholder="e.g. Getting the first 10 clients"
              value={postTopic}
              onChange={(e) => setPostTopic(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="audience">Target Audience (Optional)</Label>
            <Input
              id="audience"
              placeholder="e.g. Beginners"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tone">Tone</Label>
            <select
              id="tone"
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
            >
              <option>Engaging & Friendly</option>
              <option>Controversial / Debate</option>
              <option>Helpful & Educational</option>
              <option>Vulnerable & Honest</option>
              <option>Urgent</option>
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
                "Generate Hooks"
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
          {hooks.length > 0 ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-slate-900">Generated Group Hooks</h3>
              </div>
              {hooks.map((item, index) => (
                <div key={index} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative group hover:border-indigo-200 transition-colors">
                  <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-bold text-indigo-700 uppercase tracking-wider mb-2">
                    {item.category}
                  </span>
                  <p className="text-lg font-medium text-slate-900 mb-3 leading-relaxed">"{item.hook}"</p>
                  <p className="text-sm text-slate-500"><span className="font-semibold text-slate-700">Why it works:</span> {item.rationale}</p>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => copyToClipboard(item.hook, index)}
                  >
                    {copiedIndex === index ? (
                      <span className="flex items-center text-emerald-600"><Check className="w-4 h-4 mr-1" /> Copied</span>
                    ) : (
                      <span className="flex items-center"><Copy className="w-4 h-4 mr-1" /> Copy</span>
                    )}
                  </Button>
                </div>
              ))}
              <Button onClick={() => generateHooks()} className="w-full mt-4" variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Generate More Hooks
              </Button>
            </div>
          ) : (
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-12 text-center h-full flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-4">
                <RefreshCw className="w-8 h-8 text-indigo-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Engage Your Group</h3>
              <p className="text-slate-500 max-w-sm mx-auto">
                Fill out the details on the left to generate opening lines that encourage comments and discussions.
              </p>
            </div>
          )}
        </div>
      }
    />
  );
}
