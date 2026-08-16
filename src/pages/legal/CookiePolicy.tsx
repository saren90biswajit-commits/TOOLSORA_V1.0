import { LegalLayout } from "@/components/layout/LegalLayout";
import { LegalSection } from "@/components/layout/LegalSection";
import { Link } from "react-router-dom";

export function CookiePolicy() {
  return (
    <LegalLayout title="Cookie Policy" lastUpdated="August 13, 2026">
      <LegalSection>
        <p>This Cookie Policy explains how ToolsOra uses cookies and similar technologies when you visit or use our website.</p>
      </LegalSection>

      <LegalSection title="1. What Are Cookies?">
        <p>Cookies are small text files that websites may store on your device.</p>
        <p>They allow websites to remember information about your visit and can help provide functionality, security, analytics, and personalized experiences.</p>
      </LegalSection>

      <LegalSection title="2. Types of Cookies We May Use">
        <h3>Essential Cookies</h3>
        <p>These cookies may be necessary for the website to operate.</p>
        <p>They may support:</p>
        <ul>
          <li>Login sessions</li>
          <li>Security</li>
          <li>Authentication</li>
          <li>User preferences</li>
          <li>Basic website functionality</li>
        </ul>
        <p>These cookies generally cannot be disabled through our website's cookie controls when they are strictly necessary.</p>

        <h3>Functional Cookies</h3>
        <p>These cookies may remember preferences such as:</p>
        <ul>
          <li>Language</li>
          <li>Interface preferences</li>
          <li>Tool settings</li>
          <li>User experience choices</li>
        </ul>

        <h3>Analytics Cookies</h3>
        <p>Analytics cookies help us understand how visitors use ToolsOra.</p>
        <p>They may help us determine:</p>
        <ul>
          <li>Which pages are visited</li>
          <li>Which tools are popular</li>
          <li>How visitors navigate the website</li>
          <li>Whether pages are performing correctly</li>
          <li>How the website can be improved</li>
        </ul>

        <h3>Advertising Cookies</h3>
        <p>ToolsOra may use third-party advertising services such as Google AdSense.</p>
        <p>Advertising technologies may use cookies or similar technologies to:</p>
        <ul>
          <li>Deliver advertisements</li>
          <li>Measure advertising performance</li>
          <li>Limit repeated advertisements</li>
          <li>Personalize advertisements where permitted</li>
          <li>Understand advertising interactions</li>
        </ul>
        <p>The availability and use of personalized advertising may depend on applicable law and user consent.</p>
      </LegalSection>

      <LegalSection title="3. Third-Party Cookies">
        <p>Some cookies may be placed by third-party service providers.</p>
        <p>These may include providers involved in:</p>
        <ul>
          <li>Advertising</li>
          <li>Analytics</li>
          <li>Security</li>
          <li>Embedded content</li>
          <li>Authentication</li>
          <li>Payments</li>
        </ul>
        <p>Third parties may process information according to their own privacy policies.</p>
      </LegalSection>

      <LegalSection title="4. Cookie Consent">
        <p>Where required by applicable law, ToolsOra will request your consent before placing non-essential cookies or similar tracking technologies.</p>
        <p>You may be able to:</p>
        <ul>
          <li>Accept all cookies</li>
          <li>Reject non-essential cookies</li>
          <li>Customize cookie preferences</li>
        </ul>
        <p>Your choices may be stored so that we can remember your preferences.</p>
      </LegalSection>

      <LegalSection title="5. Managing Cookies">
        <p>You can also manage cookies through your browser settings.</p>
        <p>Depending on your browser, you may be able to:</p>
        <ul>
          <li>Block cookies</li>
          <li>Delete existing cookies</li>
          <li>Block third-party cookies</li>
          <li>Receive notifications before cookies are stored</li>
        </ul>
        <p>Disabling certain cookies may affect website functionality.</p>
      </LegalSection>

      <LegalSection title="6. Local Storage">
        <p>ToolsOra may use browser local storage or similar technologies to store information such as:</p>
        <ul>
          <li>Tool preferences</li>
          <li>Draft content</li>
          <li>Interface settings</li>
          <li>Recent tool states</li>
          <li>Cookie preferences</li>
        </ul>
        <p>Local storage is different from traditional cookies but can serve similar purposes.</p>
      </LegalSection>

      <LegalSection title="7. Advertising and Privacy Choices">
        <p>If ToolsOra uses Google advertising products, additional advertising-related technologies may be controlled by Google and applicable consent mechanisms.</p>
        <p>Users should review the relevant advertising provider's privacy information for additional details.</p>
      </LegalSection>

      <LegalSection title="8. Changes to This Cookie Policy">
        <p>We may update this Cookie Policy when our website, technologies, advertising providers, or legal requirements change.</p>
        <p>The Last Updated date will be changed when the policy is updated.</p>
      </LegalSection>

      <LegalSection title="9. Contact">
        <p>If you have questions about our use of cookies or similar technologies, please contact us through the contact information provided on the ToolsOra website.</p>
        
        <p>For more information on how we handle personal data, please see our <Link to="/privacy-policy">Privacy Policy</Link>.</p>
      </LegalSection>
    </LegalLayout>
  );
}
