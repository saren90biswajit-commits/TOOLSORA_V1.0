import { useState } from "react";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Youtube, Search, Download } from "lucide-react";

export function ThumbnailDownloader() {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState("");

  const extractVideoId = (input: string) => {
    try {
      const parsedUrl = new URL(input);
      if (parsedUrl.hostname.includes("youtube.com")) {
        return parsedUrl.searchParams.get("v");
      }
      if (parsedUrl.hostname.includes("youtu.be")) {
        return parsedUrl.pathname.slice(1);
      }
      return null;
    } catch {
      // If it's not a valid URL, check if it's just an ID
      if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
        return input;
      }
      return null;
    }
  };

  const handleExtract = () => {
    if (!url) {
      setError("Please enter a YouTube URL.");
      setVideoId(null);
      return;
    }

    const id = extractVideoId(url);
    if (!id) {
      setError("Invalid YouTube URL. Please make sure it's correct.");
      setVideoId(null);
      return;
    }

    setError("");
    setVideoId(id);
  };

  const downloadImage = async (imgUrl: string, filename: string) => {
    try {
      // Create a temporary link to trigger download (may be blocked by CORS in some environments,
      // usually requires a proxy for true downloading, but this is a reasonable client approach)
      const response = await fetch(imgUrl);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (e) {
      // Fallback: just open in new tab
      window.open(imgUrl, '_blank');
    }
  };

  return (
    <ToolLayout
      title="YouTube Thumbnail Downloader"
      description="Extract and download high-quality thumbnails from any YouTube video instantly."
      inputs={
        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="url">Paste YouTube Video URL</Label>
            <div className="flex gap-2">
              <Input 
                id="url" 
                placeholder="https://www.youtube.com/watch?v=..." 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleExtract()}
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

          <Button onClick={handleExtract} className="w-full">
            <Search className="mr-2 h-4 w-4" /> Get Thumbnail
          </Button>

          <div className="mt-8 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
            <h4 className="font-semibold text-indigo-900 mb-2">How it works</h4>
            <p className="text-sm text-indigo-800 leading-relaxed">
              YouTube automatically generates different sizes of thumbnails for every video. This tool safely extracts the direct image links from YouTube's servers.
            </p>
          </div>
        </div>
      }
      results={
        <div className="space-y-6">
          {!videoId ? (
            <div className="text-center py-20 px-6 bg-slate-50 border border-slate-200 border-dashed rounded-2xl">
              <Youtube className="h-10 w-10 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-1">Enter a URL to begin</h3>
              <p className="text-sm text-slate-500">The thumbnails will appear here.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Max Res */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <h3 className="font-bold text-slate-900">Maximum Resolution (1080p)</h3>
                  <Button size="sm" onClick={() => downloadImage(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`, `thumbnail-max-${videoId}.jpg`)}>
                    <Download className="h-4 w-4 mr-2" /> Download
                  </Button>
                </div>
                <div className="p-4">
                  <img 
                    src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
                    alt="Maximum resolution thumbnail" 
                    className="w-full h-auto rounded-lg shadow-sm border border-slate-200"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                    }}
                  />
                </div>
              </div>

              {/* High Quality */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                  <h3 className="font-bold text-slate-900">High Quality (720p)</h3>
                  <Button size="sm" onClick={() => downloadImage(`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`, `thumbnail-hq-${videoId}.jpg`)}>
                    <Download className="h-4 w-4 mr-2" /> Download
                  </Button>
                </div>
                <div className="p-4">
                  <img 
                    src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} 
                    alt="High quality thumbnail" 
                    className="w-full max-w-md h-auto rounded-lg shadow-sm border border-slate-200 mx-auto"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      }
    />
  );
}
