import { LegalLayout } from "@/components/layout/LegalLayout";
import { LegalSection } from "@/components/layout/LegalSection";
import { Link } from "react-router-dom";

export function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="August 13, 2026">
      <LegalSection>
        <p>This Privacy Policy explains how ToolsOra ("ToolsOra", "we", "us", or "our") collects, uses, stores, and protects information when you visit or use our website and services.</p>
        <p>By using ToolsOra, you acknowledge that you have read and understood this Privacy Policy.</p>
        <p>If you do not agree with this Privacy Policy, please discontinue use of the website.</p>
      </LegalSection>

      <LegalSection title="1. Information We Collect">
        <p>Depending on how you use ToolsOra, we may collect different categories of information.</p>
        
        <h3>Information You Provide</h3>
        <p>You may voluntarily provide information such as:</p>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>Account information</li>
          <li>Profile information</li>
          <li>Content prompts</li>
          <li>Text entered into our tools</li>
          <li>Feedback</li>
          <li>Support messages</li>
          <li>Other information you voluntarily submit</li>
        </ul>
        <p>If we introduce paid services, payment information may be processed by third-party payment providers rather than being stored directly by ToolsOra.</p>

        <h3>Content You Enter Into Our Tools</h3>
        <p>When you use ToolsOra tools, you may enter information such as:</p>
        <ul>
          <li>Video topics</li>
          <li>Keywords</li>
          <li>Captions</li>
          <li>Content ideas</li>
          <li>Scripts</li>
          <li>Titles</li>
          <li>Social media information</li>
          <li>Prompts</li>
          <li>Other creator-related content</li>
        </ul>
        <p>Depending on the particular tool and its technical implementation, this information may be processed to provide the requested result.</p>

        <h3>Automatically Collected Information</h3>
        <p>When you visit ToolsOra, certain technical information may be automatically collected, such as:</p>
        <ul>
          <li>IP address</li>
          <li>Browser type</li>
          <li>Device type</li>
          <li>Operating system</li>
          <li>Approximate geographic information</li>
          <li>Pages visited</li>
          <li>Referring website</li>
          <li>Date and time of access</li>
          <li>Usage information</li>
          <li>Device and browser identifiers</li>
          <li>Error and diagnostic information</li>
        </ul>
      </LegalSection>

      <LegalSection title="2. How We Use Information">
        <p>We may use information to:</p>
        <ul>
          <li>Provide and operate ToolsOra</li>
          <li>Generate requested content</li>
          <li>Improve our tools</li>
          <li>Maintain and improve website performance</li>
          <li>Personalize the user experience</li>
          <li>Understand how our tools are used</li>
          <li>Detect and prevent abuse</li>
          <li>Maintain security</li>
          <li>Troubleshoot technical problems</li>
          <li>Respond to support requests</li>
          <li>Communicate important service information</li>
          <li>Analyze trends and usage</li>
          <li>Develop new features</li>
          <li>Comply with legal obligations</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. AI Processing">
        <p>Some ToolsOra tools may use artificial intelligence or third-party AI providers.</p>
        <p>When you use an AI-powered tool, information necessary to provide the requested result may be sent to the relevant AI or technology provider.</p>
        <p>We will use reasonable measures to limit information shared with third-party providers to what is necessary for the relevant service.</p>
        <p>You should avoid entering highly sensitive, confidential, financial, authentication, or other information that you do not want processed by an AI service.</p>
        <p>AI-generated results may be inaccurate, incomplete, biased, or unsuitable for a particular purpose. Always review generated content before relying on or publishing it.</p>
      </LegalSection>

      <LegalSection title="4. Cookies and Similar Technologies">
        <p>ToolsOra may use cookies, local storage, pixels, tags, and similar technologies.</p>
        <p>These technologies may be used for:</p>
        <ul>
          <li>Essential website functionality</li>
          <li>Authentication</li>
          <li>Remembering preferences</li>
          <li>Analytics</li>
          <li>Security</li>
          <li>Performance measurement</li>
          <li>Advertising</li>
          <li>Understanding website usage</li>
        </ul>
        <p>More information is available in our <Link to="/cookie-policy">Cookie Policy</Link>.</p>
      </LegalSection>

      <LegalSection title="5. Advertising">
        <p>ToolsOra may display advertisements through third-party advertising providers, including Google AdSense or other advertising partners.</p>
        <p>Advertising providers may use cookies or similar technologies to provide, measure, personalize, or limit advertisements, depending on applicable settings and user consent.</p>
        <p>Where required, ToolsOra will provide appropriate consent mechanisms for applicable users.</p>
        <p>You can manage certain advertising and privacy preferences through the mechanisms provided on our website or by the relevant advertising provider.</p>
      </LegalSection>

      <LegalSection title="6. Analytics">
        <p>We may use analytics services to understand how visitors interact with ToolsOra.</p>
        <p>Analytics information may include:</p>
        <ul>
          <li>Pages visited</li>
          <li>Tools used</li>
          <li>Session information</li>
          <li>Approximate location</li>
          <li>Device information</li>
          <li>Browser information</li>
          <li>Performance information</li>
        </ul>
        <p>We use analytics primarily to understand website performance and improve our services.</p>
      </LegalSection>

      <LegalSection title="7. Third-Party Services">
        <p>ToolsOra may use third-party providers for services such as:</p>
        <ul>
          <li>Hosting</li>
          <li>Analytics</li>
          <li>AI processing</li>
          <li>Authentication</li>
          <li>Advertising</li>
          <li>Payments</li>
          <li>Security</li>
          <li>Email</li>
          <li>Customer support</li>
        </ul>
        <p>These providers may process information according to their own privacy policies and applicable contractual obligations.</p>
      </LegalSection>

      <LegalSection title="8. Information Sharing">
        <p>We do not sell your personal information for money.</p>
        <p>We may share information with service providers when necessary to operate ToolsOra.</p>
        <p>We may also disclose information:</p>
        <ul>
          <li>When required by law</li>
          <li>To comply with legal processes</li>
          <li>To protect our rights</li>
          <li>To protect users</li>
          <li>To prevent fraud or abuse</li>
          <li>To investigate security incidents</li>
          <li>In connection with a merger, acquisition, restructuring, or sale of assets</li>
        </ul>
      </LegalSection>

      <LegalSection title="9. Data Retention">
        <p>We retain information only for as long as reasonably necessary for the purposes described in this Privacy Policy, unless a longer retention period is required by law.</p>
        <p>Retention periods may vary depending on:</p>
        <ul>
          <li>The type of information</li>
          <li>The purpose for which it was collected</li>
          <li>Legal requirements</li>
          <li>Security requirements</li>
          <li>Whether you maintain an account</li>
        </ul>
      </LegalSection>

      <LegalSection title="10. Data Security">
        <p>We use reasonable technical and organizational measures intended to protect information against unauthorized access, alteration, disclosure, or destruction.</p>
        <p>However, no internet-based service can guarantee absolute security.</p>
      </LegalSection>

      <LegalSection title="11. Your Choices">
        <p>Depending on your location and applicable law, you may have rights relating to your personal information, including rights to:</p>
        <ul>
          <li>Request access</li>
          <li>Request correction</li>
          <li>Request deletion</li>
          <li>Object to certain processing</li>
          <li>Restrict certain processing</li>
          <li>Withdraw consent where processing is based on consent</li>
          <li>Request information about how your data is processed</li>
        </ul>
        <p>To make a privacy-related request, contact us using the contact information provided on the website.</p>
      </LegalSection>

      <LegalSection title="12. Children's Privacy">
        <p>ToolsOra is not intended to knowingly collect personal information from children where prohibited by applicable law.</p>
        <p>If you believe a child has provided personal information to us, please contact us so that appropriate action can be taken.</p>
      </LegalSection>

      <LegalSection title="13. International Data Transfers">
        <p>Because ToolsOra may use service providers located in different countries, information may be processed outside your country of residence.</p>
        <p>Where required, we will take appropriate measures for applicable international data transfers.</p>
      </LegalSection>

      <LegalSection title="14. External Websites">
        <p>ToolsOra may contain links to third-party websites.</p>
        <p>We are not responsible for the privacy practices, content, security, or policies of third-party websites.</p>
        <p>We recommend reviewing their privacy policies before providing personal information.</p>
      </LegalSection>

      <LegalSection title="15. Changes to This Privacy Policy">
        <p>We may update this Privacy Policy from time to time.</p>
        <p>When changes are made, we will update the Last Updated date.</p>
        <p>If significant changes are required, we may provide additional notice where appropriate.</p>
      </LegalSection>

      <LegalSection title="16. Contact">
        <p>If you have questions about this Privacy Policy or our data practices, please contact us through the <Link to="/contact">contact information</Link> provided on the ToolsOra website.</p>
        
        <p>For more information, please see our <Link to="/terms-and-conditions">Terms & Conditions</Link>.</p>
      </LegalSection>
    </LegalLayout>
  );
}
