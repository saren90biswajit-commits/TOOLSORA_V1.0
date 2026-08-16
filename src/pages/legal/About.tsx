import { LegalLayout } from "@/components/layout/LegalLayout";
import { LegalSection } from "@/components/layout/LegalSection";
import { Link } from "react-router-dom";

export function About() {
  return (
    <LegalLayout title="About Us">
      <LegalSection title="About ToolsOra">
        <p><strong>Create Better. Post Smarter. Grow Faster.</strong></p>
        
        <p>Welcome to ToolsOra, an all-in-one toolkit designed to help content creators create, optimize, and manage social media content more easily.</p>
        <p>Creating content consistently can be difficult. Finding the right title, writing an engaging caption, discovering useful hashtags, creating a strong hook, writing a video script, or simply finding the right words for a social media bio can take a lot of time.</p>
        <p>ToolsOra was created to make these everyday creator tasks faster and simpler.</p>
      </LegalSection>

      <LegalSection title="What We Do">
        <p>ToolsOra provides practical tools for creators across popular social platforms, including YouTube, Instagram, TikTok, Facebook, and other content channels.</p>
        <p>Our tools may include:</p>
        <ul>
          <li>YouTube Title Generator</li>
          <li>Thumbnail Downloader</li>
          <li>Hashtag Generator</li>
          <li>Caption Generator</li>
          <li>Bio Generator</li>
          <li>Emoji Picker</li>
          <li>Font Generator</li>
          <li>Color Palette Generator</li>
          <li>Video Script Generator</li>
          <li>Hook Generator</li>
          <li>Content ideas and other creator-focused utilities</li>
        </ul>
        <p>We continuously work to expand the platform with new tools that help creators spend less time on repetitive tasks and more time creating meaningful content.</p>
      </LegalSection>

      <LegalSection title="Built for Creators">
        <p>ToolsOra is designed for:</p>
        <ul>
          <li>YouTubers</li>
          <li>Instagram creators</li>
          <li>TikTok creators</li>
          <li>Influencers</li>
          <li>Bloggers</li>
          <li>Freelancers</li>
          <li>Social media managers</li>
          <li>Digital marketers</li>
          <li>Small businesses</li>
          <li>Personal brands</li>
          <li>Content teams</li>
        </ul>
        <p>Whether you are creating your first social media post or managing content for multiple platforms, ToolsOra aims to make the creative process easier.</p>
      </LegalSection>

      <LegalSection title="Our Philosophy">
        <p>We believe creator tools should be:</p>
        <ul>
          <li><strong>Simple</strong> — You shouldn't need technical knowledge to use them.</li>
          <li><strong>Fast</strong> — Get useful results without unnecessary complexity.</li>
          <li><strong>Accessible</strong> — Essential tools should be available to as many creators as possible.</li>
          <li><strong>Practical</strong> — Every tool should solve a real content-creation problem.</li>
          <li><strong>Creator-focused</strong> — The platform should help you move from idea to published content more efficiently.</li>
        </ul>
      </LegalSection>

      <LegalSection title="AI-Assisted Creation">
        <p>Some ToolsOra features may use artificial intelligence or third-party AI technologies to help generate titles, captions, hooks, scripts, ideas, and other content.</p>
        <p>AI-generated results are suggestions, not guarantees. Users should review generated content before publishing it.</p>
      </LegalSection>

      <LegalSection title="Independent Platform">
        <p>ToolsOra is an independent creator-tools platform.</p>
        <p>We are not affiliated with, endorsed by, or officially connected to YouTube, Instagram, TikTok, Facebook, Google, Meta, or any other social-media platform unless explicitly stated.</p>
      </LegalSection>

      <LegalSection title="Our Goal">
        <p>Our goal is simple:</p>
        <p><strong>Help creators create better content with less effort.</strong></p>
        <p>We are continuously improving ToolsOra and adding useful tools based on creator needs and feedback.</p>
      </LegalSection>

      <LegalSection title="Contact Us">
        <p>If you have questions, suggestions, feedback, or would like to report an issue, please contact us through the <Link to="/contact">contact method</Link> provided on our website.</p>

        <p><strong>ToolsOra</strong><br/>Create Better. Post Smarter. Grow Faster.</p>
      </LegalSection>
    </LegalLayout>
  );
}
