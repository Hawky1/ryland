import { Link } from "react-router-dom";
import InfiniteGrid from "@/components/ui/infinite-grid";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SharedHead from "@/components/SharedHead";
import PageMeta from "@/components/PageMeta";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen selection:bg-blue-500/30 selection:text-white antialiased text-slate-900">
      <SharedHead />
      <PageMeta title="Privacy Policy | Ryland Partners" description="Learn how Ryland Partners collects, uses, and protects your personal information." />

      <div className="fixed inset-0 -z-10 overflow-hidden bg-white pointer-events-none">
        <InfiniteGrid baseGridColor="rgba(148, 163, 184, 0.5)" activeGridColor="rgba(59, 130, 246, 0.8)" />
      </div>

      <Navbar showServicesDropdown={false} />

      <main className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-sm text-slate-500 mb-2">Last Updated: February 10, 2026</p>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10 font-['Manrope']">Privacy Policy</h1>

        <div className="space-y-10 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">1. Introduction</h2>
            <p>Ryland Partners ("we," "us," or "our") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or interact with us in any way.</p>
            <p className="mt-3">This policy applies to all services offered by Ryland Partners, including business funding referrals, credit restoration services, and our partner/affiliate program.</p>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">2. Information We Collect</h2>
            <h3 className="text-lg font-medium text-slate-900 mb-3">Personal Information</h3>
            <p>We may collect the following categories of personal information:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong className="text-slate-900">Identifiers:</strong> Name, email address, phone number, mailing address</li>
              <li><strong className="text-slate-900">Financial Information:</strong> Business revenue details, credit-related information (provided voluntarily for service purposes)</li>
              <li><strong className="text-slate-900">Commercial Information:</strong> Records of services requested, purchasing history</li>
              <li><strong className="text-slate-900">Internet Activity:</strong> Browsing history on our site, search history, interaction with our website</li>
              <li><strong className="text-slate-900">Professional Information:</strong> Business name, industry, role/title</li>
            </ul>

            <h3 className="text-lg font-medium text-slate-900 mt-6 mb-3">Automatically Collected Information</h3>
            <p>When you visit our website, we automatically collect certain information through cookies and similar technologies, including:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>IP address and device identifiers</li>
              <li>Browser type and operating system</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring URLs and exit pages</li>
              <li>Click-stream data</li>
            </ul>
            <p className="mt-3">We use Google Tag Manager (GTM-PP86LZ6V) and Google Analytics to collect and analyze this data.</p>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">3. How We Use Your Information</h2>
            <p>We use the information we collect for the following purposes:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>To provide, maintain, and improve our services</li>
              <li>To process funding referrals and credit restoration requests</li>
              <li>To manage our partner/affiliate program</li>
              <li>To communicate with you about our services, updates, and promotions</li>
              <li>To personalize your experience on our website</li>
              <li>To comply with legal obligations</li>
              <li>To detect and prevent fraud or unauthorized activity</li>
              <li>To analyze website usage and improve performance</li>
            </ul>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">4. How We Share Your Information</h2>
            <p>We may share your personal information with the following categories of third parties:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong className="text-slate-900">Funding Partners & Lenders:</strong> To process your funding application or referral</li>
              <li><strong className="text-slate-900">Service Providers:</strong> Companies that assist us in operating our website, conducting business, or servicing you (e.g., CRM, email marketing, analytics)</li>
              <li><strong className="text-slate-900">Credit Bureaus & Credit Service Partners:</strong> In connection with credit restoration services</li>
              <li><strong className="text-slate-900">Legal Authorities:</strong> When required by law, regulation, or legal process</li>
            </ul>
            <p className="mt-3">We do not sell your personal information for monetary consideration. See our <Link to="/ccpa" className="text-blue-600 hover:text-blue-500 underline">CCPA Notice</Link> for more details on your rights.</p>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">5. Your Rights Under the CCPA</h2>
            <p>If you are a California resident, you have the following rights under the California Consumer Privacy Act (CCPA):</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong className="text-slate-900">Right to Know:</strong> You may request the categories and specific pieces of personal information we have collected about you.</li>
              <li><strong className="text-slate-900">Right to Delete:</strong> You may request that we delete the personal information we have collected from you, subject to certain exceptions.</li>
              <li><strong className="text-slate-900">Right to Opt-Out:</strong> You may opt out of the "sale" or "sharing" of your personal information.</li>
              <li><strong className="text-slate-900">Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your CCPA rights.</li>
            </ul>
            <p className="mt-3">To exercise your rights, please visit our <Link to="/ccpa" className="text-blue-600 hover:text-blue-500 underline">CCPA Rights page</Link> or contact us at privacy@rylandpartners.com.</p>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">6. Cookies & Tracking Technologies</h2>
            <p>We use cookies and similar tracking technologies to collect information about your browsing activity. For detailed information about the cookies we use and how to manage your preferences, please visit our <Link to="/cookie-policy" className="text-blue-600 hover:text-blue-500 underline">Cookie Policy</Link>.</p>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">7. Data Retention</h2>
            <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.</p>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">8. Data Security</h2>
            <p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">9. Third-Party Links</h2>
            <p>Our website may contain links to third-party websites or services that are not operated by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services.</p>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">10. Children's Privacy</h2>
            <p>Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we learn we have collected personal information from a child under 18, we will take steps to delete that information.</p>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">11. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. Your continued use of our services after any changes constitutes your acceptance of the updated policy.</p>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">12. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
            <div className="mt-3 p-4 rounded-xl border border-slate-200 bg-slate-50">
              <p className="text-slate-900 font-medium">Ryland Partners</p>
              <p>Email: privacy@rylandpartners.com</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
