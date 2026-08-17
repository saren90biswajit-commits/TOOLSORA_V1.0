/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ComingSoon } from "./components/layout/ComingSoon";
import { SEO } from "./components/SEO";

// Use React.lazy for route optimization
const Home = React.lazy(() => import("./pages/Home").then(module => ({ default: module.Home })));
const Tools = React.lazy(() => import("./pages/Tools").then(module => ({ default: module.Tools })));
const ToolCategory = React.lazy(() => import("./pages/ToolCategory").then(module => ({ default: module.ToolCategory })));

// Legal and Company Pages
const About = React.lazy(() => import("./pages/legal/About").then(module => ({ default: module.About })));
const PrivacyPolicy = React.lazy(() => import("./pages/legal/PrivacyPolicy").then(module => ({ default: module.PrivacyPolicy })));
const TermsAndConditions = React.lazy(() => import("./pages/legal/TermsAndConditions").then(module => ({ default: module.TermsAndConditions })));
const Disclaimer = React.lazy(() => import("./pages/legal/Disclaimer").then(module => ({ default: module.Disclaimer })));
const CookiePolicy = React.lazy(() => import("./pages/legal/CookiePolicy").then(module => ({ default: module.CookiePolicy })));
const Contact = React.lazy(() => import("./pages/Contact").then(module => ({ default: module.Contact })));

// Tool Components
const YouTubeTitleGenerator = React.lazy(() => import("./pages/tools/YouTubeTitleGenerator").then(module => ({ default: module.YouTubeTitleGenerator })));
const VideoScriptGenerator = React.lazy(() => import("./pages/tools/VideoScriptGenerator").then(module => ({ default: module.VideoScriptGenerator })));
const HookGenerator = React.lazy(() => import("./pages/tools/HookGenerator").then(module => ({ default: module.HookGenerator })));
const CaptionGenerator = React.lazy(() => import("./pages/tools/CaptionGenerator").then(module => ({ default: module.CaptionGenerator })));
const HashtagGenerator = React.lazy(() => import("./pages/tools/HashtagGenerator").then(module => ({ default: module.HashtagGenerator })));
const BioGenerator = React.lazy(() => import("./pages/tools/BioGenerator").then(module => ({ default: module.BioGenerator })));
const TikTokContentIdeasGenerator = React.lazy(() => import("./pages/tools/TikTokContentIdeasGenerator").then(module => ({ default: module.TikTokContentIdeasGenerator })));
const FacebookGroupHookGenerator = React.lazy(() => import("./pages/tools/FacebookGroupHookGenerator").then(module => ({ default: module.FacebookGroupHookGenerator })));
const FacebookPageBioGenerator = React.lazy(() => import("./pages/tools/FacebookPageBioGenerator").then(module => ({ default: module.FacebookPageBioGenerator })));

const EmojiPicker = React.lazy(() => import("./pages/tools/EmojiPicker").then(module => ({ default: module.EmojiPicker })));
const FontGenerator = React.lazy(() => import("./pages/tools/FontGenerator").then(module => ({ default: module.FontGenerator })));
const ColorPaletteGenerator = React.lazy(() => import("./pages/tools/ColorPaletteGenerator").then(module => ({ default: module.ColorPaletteGenerator })));
const ThumbnailDownloader = React.lazy(() => import("./pages/tools/ThumbnailDownloader").then(module => ({ default: module.ThumbnailDownloader })));
const PerformanceAudit = React.lazy(() => import("./pages/tools/PerformanceAudit").then(module => ({ default: module.PerformanceAudit })));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <SEO />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="tools" element={<Tools />} />
              
              {/* Category Pages */}
              <Route path=":categoryId" element={<ToolCategory />} />

              {/* YouTube Tools */}
              <Route path="youtube-tools/title-generator" element={<YouTubeTitleGenerator />} />
              <Route path="youtube-tools/retention-hooks" element={<HookGenerator />} />
              <Route path="youtube-tools/script-generator" element={<VideoScriptGenerator />} />

              {/* Instagram Tools */}
              <Route path="instagram-tools/reel-caption-generator" element={<CaptionGenerator />} />
              <Route path="instagram-tools/hashtag-generator" element={<HashtagGenerator />} />
              <Route path="instagram-tools/bio-generator" element={<BioGenerator />} />

              {/* TikTok Tools */}
              <Route path="tiktok-tools/viral-hooks" element={<HookGenerator />} />
              <Route path="tiktok-tools/hashtag-generator" element={<HashtagGenerator />} />
              <Route path="tiktok-tools/content-ideas" element={<TikTokContentIdeasGenerator />} />

              {/* Facebook Tools */}
              <Route path="facebook-tools/post-caption-generator" element={<CaptionGenerator />} />
              <Route path="facebook-tools/group-hooks" element={<FacebookGroupHookGenerator />} />
              <Route path="facebook-tools/page-bio-generator" element={<FacebookPageBioGenerator />} />

              {/* Legacy / Extra Tools */}
              <Route path="tools/thumbnail-downloader" element={<ThumbnailDownloader />} />
              <Route path="tools/emoji-picker" element={<EmojiPicker />} />
              <Route path="tools/font-generator" element={<FontGenerator />} />
              <Route path="tools/color-palette-generator" element={<ColorPaletteGenerator />} />
              <Route path="tools/performance-audit" element={<PerformanceAudit />} />
              
              {/* Legal & Company Pages */}
              <Route path="about" element={<About />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route path="terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="disclaimer" element={<Disclaimer />} />
              <Route path="cookie-policy" element={<CookiePolicy />} />
              <Route path="contact" element={<Contact />} />
              
              {/* Redirect old routes if necessary */}
              <Route path="privacy" element={<Navigate to="/privacy-policy" replace />} />
              <Route path="terms" element={<Navigate to="/terms-and-conditions" replace />} />
              <Route path="cookies" element={<Navigate to="/cookie-policy" replace />} />
              <Route path="tools/youtube-title-generator" element={<Navigate to="/youtube-tools/title-generator" replace />} />
              <Route path="tools/video-script-generator" element={<Navigate to="/youtube-tools/script-generator" replace />} />
              <Route path="tools/hook-generator" element={<Navigate to="/tiktok-tools/viral-hooks" replace />} />
              <Route path="tools/caption-generator" element={<Navigate to="/instagram-tools/reel-caption-generator" replace />} />
              <Route path="tools/hashtag-generator" element={<Navigate to="/instagram-tools/hashtag-generator" replace />} />
              <Route path="tools/bio-generator" element={<Navigate to="/instagram-tools/bio-generator" replace />} />
              
              <Route path="resources" element={<ComingSoon title="Resources" description="Read our latest guides and tutorials." />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
