import { useEffect } from "react";
import { Link } from "react-router-dom";
import logoWhite from "@/assets/logo-white.png";
import InfiniteGrid from "@/components/ui/infinite-grid";

const TermsOfService = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen selection:bg-blue-500/30 selection:text-white antialiased text-slate-900">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap" />

      <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: '#ffffff' }}>
        <InfiniteGrid baseGridColor="rgba(148, 163, 184, 0.12)" activeGridColor="rgba(59, 130, 246, 0.3)" />
      </div>

      <header className="sticky z-20 top-0 backdrop-blur-md bg-white/80 border-b border-slate-200">
        <div className="flex max-w-7xl mx-auto py-4 px-6 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoWhite} alt="Ryland Partners" className="h-8 w-auto" />
          </Link>
          <Link to="/" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">← Back to Home</Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-sm text-slate-500 mb-2">Last Updated: February 10, 2026</p>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10 font-['Manrope']">Terms of Service</h1>

        <div className="space-y-10 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">1. Acceptance of Terms</h2>
            <p>By accessing or using the Ryland Partners website and services ("Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you may not access or use our Services. These Terms constitute a legally binding agreement between you and Ryland Partners.</p>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">2. Description of Services</h2>
            <p>Ryland Partners provides the following services:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong className="text-slate-900">Funding Referrals:</strong> We connect business owners with lending partners and funding sources. Ryland Partners acts as a referral service and is not a direct lender.</li>
              <li><strong className="text-slate-900">Credit Restoration:</strong> We offer credit restoration and credit education services to help individuals improve their credit profiles. Results vary by individual.</li>
              <li><strong className="text-slate-900">Partner/Affiliate Program:</strong> We offer a referral-based partner program where approved partners can earn commissions by referring qualified business owners to our funding services.</li>
            </ul>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">3. Eligibility</h2>
            <p>You must be at least 18 years of age and have the legal capacity to enter into binding agreements to use our Services. By using our Services, you represent and warrant that you meet these requirements.</p>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">4. User Responsibilities</h2>
            <p>When using our Services, you agree to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Provide accurate, current, and complete information</li>
              <li>Not misrepresent your identity or business information</li>
              <li>Not use the Services for any unlawful purpose</li>
              <li>Not interfere with or disrupt the Services</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not engage in any deceptive or misleading practices when referring others to our Services</li>
            </ul>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">5. Intellectual Property</h2>
            <p>All content, trademarks, logos, and intellectual property displayed on this website are the property of Ryland Partners or its licensors. You may not reproduce, distribute, modify, or create derivative works from any content without our express written permission.</p>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">6. Telemarketing Sales Rule (TSR) Compliance</h2>
            <p>In connection with any telemarketing activities related to our Services, we comply with the Federal Trade Commission's Telemarketing Sales Rule (TSR). This includes:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Clearly identifying ourselves at the beginning of any telemarketing call</li>
              <li>Disclosing the nature and purpose of the call</li>
              <li>Disclosing all material terms of any offer before requesting payment</li>
              <li>Honoring the National Do Not Call Registry and our internal Do Not Call list</li>
              <li>Restricting calling hours to 8:00 AM – 9:00 PM in the recipient's local time zone</li>
              <li>Not charging advance fees for credit repair services as prohibited by the TSR</li>
            </ul>
            <p className="mt-3">For full TSR disclosures, please visit our <Link to="/tsr-compliance" className="text-blue-600 hover:text-blue-500 underline">TSR Compliance page</Link>.</p>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">7. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, Ryland Partners and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Services, including but not limited to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Loss of profits, revenue, or business opportunities</li>
              <li>Decisions made based on information provided through our Services</li>
              <li>Actions or inactions of third-party lenders or funding partners</li>
              <li>Credit outcomes or funding decisions</li>
            </ul>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">8. Disclaimers</h2>
            <p>Our Services are provided "as is" and "as available" without warranties of any kind, either express or implied. We do not guarantee funding approval, specific credit score improvements, or partner earnings. For detailed disclaimers, please visit our <Link to="/disclaimers" className="text-blue-600 hover:text-blue-500 underline">Disclaimers page</Link>.</p>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">9. Dispute Resolution</h2>
            <p>Any dispute arising from or relating to these Terms or our Services shall first be attempted to be resolved through good-faith negotiation. If the dispute cannot be resolved informally, it shall be submitted to binding arbitration in accordance with the rules of the American Arbitration Association. The arbitration shall take place in the state where Ryland Partners maintains its principal place of business.</p>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">10. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict of law principles.</p>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">11. Modifications</h2>
            <p>We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to this page. Your continued use of the Services after any modifications constitutes acceptance of the revised Terms. We encourage you to review these Terms periodically.</p>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">12. Termination</h2>
            <p>We may terminate or suspend your access to our Services at any time, with or without cause, and with or without notice. Upon termination, your right to use the Services will immediately cease.</p>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">13. Contact Us</h2>
            <p>If you have questions about these Terms, please contact us at:</p>
            <div className="mt-3 p-4 rounded-xl border border-slate-200 bg-slate-50">
              <p className="text-slate-900 font-medium">Ryland Partners</p>
              <p>Email: legal@rylandpartners.com</p>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-slate-200 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} Ryland Partners. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Privacy Policy</Link>
            <Link to="/ccpa" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">CCPA</Link>
            <Link to="/disclaimers" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Disclaimers</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TermsOfService;
