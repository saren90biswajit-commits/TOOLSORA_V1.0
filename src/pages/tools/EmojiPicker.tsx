import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Copy, Search } from "lucide-react";

// Mock emoji database
const EMOJIS = [
  { char: "😀", name: "grinning face", category: "Smileys" },
  { char: "😂", name: "face with tears of joy", category: "Smileys" },
  { char: "😍", name: "smiling face with heart-eyes", category: "Smileys" },
  { char: "🤔", name: "thinking face", category: "Smileys" },
  { char: "😎", name: "smiling face with sunglasses", category: "Smileys" },
  { char: "🙌", name: "raising hands", category: "People" },
  { char: "👏", name: "clapping hands", category: "People" },
  { char: "🔥", name: "fire", category: "Objects" },
  { char: "✨", name: "sparkles", category: "Objects" },
  { char: "🚀", name: "rocket", category: "Travel" },
  { char: "💡", name: "light bulb", category: "Objects" },
  { char: "📈", name: "chart increasing", category: "Objects" },
  { char: "💻", name: "laptop", category: "Objects" },
  { char: "🍕", name: "pizza", category: "Food" },
  { char: "🎉", name: "party popper", category: "Activities" },
];

const CATEGORIES = ["All", "Smileys", "People", "Food", "Travel", "Activities", "Objects"];

export function EmojiPicker() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [collection, setCollection] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const filteredEmojis = EMOJIS.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || e.category === category;
    return matchesSearch && matchesCategory;
  });

  const addToCollection = (char: string) => {
    setCollection([...collection, char]);
  };

  const copyCollection = () => {
    if (collection.length === 0) return;
    navigator.clipboard.writeText(collection.join(""));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearCollection = () => {
    setCollection([]);
  };

  return (
    <ToolLayout
      title="Emoji Picker"
      description="Find and collect the perfect emojis for your social media posts."
      inputs={
        <div className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input 
              placeholder="Search emojis..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          <div>
            <h3 className="text-sm font-medium text-slate-900 mb-3">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    category === cat 
                      ? "bg-indigo-600 text-white" 
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200">
            <h3 className="text-sm font-medium text-slate-900 mb-3">Your Collection</h3>
            <div className="min-h-14 p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center flex-wrap gap-1 mb-4 text-2xl">
              {collection.length > 0 ? collection.map((char, i) => (
                <span key={i}>{char}</span>
              )) : (
                <span className="text-sm text-slate-400 italic">Click emojis to add them here</span>
              )}
            </div>
            
            <div className="flex gap-3">
              <Button onClick={copyCollection} disabled={collection.length === 0} className="w-full">
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? "Copied!" : "Copy Collection"}
              </Button>
              <Button variant="outline" onClick={clearCollection} disabled={collection.length === 0}>
                Clear
              </Button>
            </div>
          </div>
        </div>
      }
      results={
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-4">
            {filteredEmojis.map((emoji, i) => (
              <button
                key={i}
                onClick={() => addToCollection(emoji.char)}
                title={emoji.name}
                className="aspect-square flex items-center justify-center text-3xl hover:bg-slate-100 rounded-xl transition-colors"
              >
                {emoji.char}
              </button>
            ))}
            {filteredEmojis.length === 0 && (
              <div className="col-span-full text-center py-12 text-slate-500">
                No emojis found matching "{search}"
              </div>
            )}
          </div>
        </div>
      }
    />
  );
}
