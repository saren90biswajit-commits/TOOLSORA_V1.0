import { LegalLayout } from "@/components/layout/LegalLayout";
import { LegalSection } from "@/components/layout/LegalSection";
import { Link } from "react-router-dom";

export function Disclaimer() {
  return (
    <LegalLayout title="Disclaimer" lastUpdated="August 13, 2026">
      <LegalSection>
        <p>The information, tools, generated content, recommendations, and other materials provided through ToolsOra are intended for general informational, creative, and productivity purposes.</p>
      </LegalSection>

      <LegalSection title="1. No Professional Advice">
        <p>ToolsOra does not provide legal, financial, medical, investment, tax, employment, or other professional advice.</p>
        <p>If you need professional advice, consult a qualified professional.</p>
      </LegalSection>

      <LegalSection title="2. AI-Generated Content">
        <p>Some ToolsOra tools may use artificial intelligence.</p>
        <p>AI-generated content can contain errors, inaccuracies, outdated information, or inappropriate suggestions.</p>
        <p>You should independently review all generated content before publishing, sharing, or relying on it.</p>
      </LegalSection>

      <LegalSection title="3. No Guarantee of Results">
        <p>ToolsOra does not guarantee that use of our tools will result in:</p>
        <ul>
          <li>Viral content</li>
          <li>More views</li>
          <li>More followers</li>
          <li>More subscribers</li>
          <li>Increased engagement</li>
          <li>Increased revenue</li>
          <li>Improved search rankings</li>
          <li>Social-media growth</li>
          <li>Business success</li>
        </ul>
        <p>Results vary from creator to creator.</p>
      </LegalSection>

      <LegalSection title="4. Social Media Platforms">
        <p>ToolsOra may provide tools designed for content intended for platforms such as YouTube, Instagram, TikTok, Facebook, LinkedIn, and other services.</p>
        <p>ToolsOra is not affiliated with or endorsed by these platforms unless explicitly stated.</p>
        <p>Platform algorithms, policies, features, and requirements may change at any time.</p>
      </LegalSection>

      <LegalSection title="5. Copyright and Intellectual Property">
        <p>Users are responsible for ensuring that content they upload, generate, modify, or publish does not infringe another person's intellectual property rights.</p>
        <p>AI-generated output may not always be unique.</p>
        <p>Users should conduct appropriate copyright, trademark, licensing, and originality checks when necessary.</p>
      </LegalSection>

      <LegalSection title="6. Third-Party Links and Services">
        <p>ToolsOra may link to or interact with third-party services.</p>
        <p>We do not control and are not responsible for the availability, accuracy, security, policies, or content of third-party services.</p>
      </LegalSection>

      <LegalSection title="7. Tool Accuracy">
        <p>Although we attempt to keep our tools accurate and useful, we do not guarantee that every tool will always produce perfect results.</p>
        <p>Tools may contain limitations, bugs, or technical errors.</p>
      </LegalSection>

      <LegalSection title="8. Advertising">
        <p>ToolsOra may display advertisements from third-party advertising networks.</p>
        <p>We do not necessarily endorse products or services displayed in advertisements.</p>
      </LegalSection>

      <LegalSection title="9. Your Responsibility">
        <p>You are responsible for determining whether information or generated content is appropriate for your particular situation.</p>
        <p>By using ToolsOra, you acknowledge that you use the Services at your own discretion and risk, subject to applicable law.</p>
      </LegalSection>

      <LegalSection title="10. Changes">
        <p>This Disclaimer may be updated as ToolsOra's features and services change.</p>
        <p>For full details governing your use of this site, please review our <Link to="/terms-and-conditions">Terms & Conditions</Link>.</p>
      </LegalSection>
    </LegalLayout>
  );
}
