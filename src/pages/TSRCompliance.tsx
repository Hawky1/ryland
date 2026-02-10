import { useEffect } from "react";
import { Link } from "react-router-dom";
import logoWhite from "@/assets/logo-white.png";
import InfiniteGrid from "@/components/ui/infinite-grid";

const TSRCompliance = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen selection:bg-blue-500/30 selection:text-white antialiased text-white">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap" />

      <div className="fixed inset-0 -z-10 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b, #0f172a)' }}>
        <InfiniteGrid baseGridColor="rgba(148, 163, 184, 0.08)" activeGridColor="rgba(6, 182, 212, 0.6)" />
      </div>

      <header className="sticky z-20 top-0 backdrop-blur-md bg-slate-950/60 border-b border-white/5">
        <div className="flex max-w-7xl mx-auto py-4 px-6 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoWhite} alt="Ryland Partners" className="h-8 w-auto" />
          </Link>
          <Link to="/" className="text-sm text-slate-300 hover:text-white transition-colors">← Back to Home</Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-sm text-slate-500 mb-2">Last Updated: February 10, 2026</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-10 font-['Manrope']">Telemarketing Sales Rule (TSR) Compliance</h1>

        <div className="space-y-10 text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Overview</h2>
            <p>Ryland Partners is committed to full compliance with the Federal Trade Commission's Telemarketing Sales Rule (TSR), 16 CFR Part 310. This page outlines our telemarketing practices and the disclosures required by the TSR.</p>
          </section>

          <div className="border-t border-white/10" />

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Seller & Telemarketer Identification</h2>
            <div className="p-4 rounded-xl border border-white/10 bg-white/[0.03]">
              <p><strong className="text-white">Seller:</strong> Ryland Partners</p>
              <p className="mt-1"><strong className="text-white">Services Offered:</strong> Business funding referrals, credit restoration services, partner/affiliate program</p>
              <p className="mt-1"><strong className="text-white">Contact:</strong> legal@rylandpartners.com</p>
            </div>
            <p className="mt-3">At the beginning of every outbound telemarketing call, our representatives will promptly disclose their name, the name of our company (Ryland Partners), and the purpose of the call.</p>
          </section>

          <div className="border-t border-white/10" />

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Material Terms Disclosure</h2>
            <p>Before requesting any payment or commitment, we will clearly disclose:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>The total cost of the service being offered</li>
              <li>All material restrictions, limitations, or conditions</li>
              <li>The refund or cancellation policy (if applicable)</li>
              <li>Any material aspects of the product or service that affect its value</li>
            </ul>
          </section>

          <div className="border-t border-white/10" />

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Refund & Cancellation Policy</h2>
            <p>We strive for complete transparency in all transactions:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Refund and cancellation terms are disclosed before any purchase commitment</li>
              <li>If a "no refund" policy applies, this is stated clearly before the transaction</li>
              <li>All refund requests are handled promptly and in accordance with our stated policy</li>
            </ul>
          </section>

          <div className="border-t border-white/10" />

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Calling Time Restrictions</h2>
            <p>In compliance with the TSR, we restrict all telemarketing calls to between <strong className="text-white">8:00 AM and 9:00 PM</strong> in the recipient's local time zone. We do not make calls outside of these hours unless we have prior express consent.</p>
          </section>

          <div className="border-t border-white/10" />

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Do Not Call Compliance</h2>
            <p>Ryland Partners maintains compliance with the National Do Not Call Registry and maintains an internal Do Not Call list:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>We check all outbound call lists against the National Do Not Call Registry</li>
              <li>We maintain and honor our own internal Do Not Call list</li>
              <li>Requests to be placed on our Do Not Call list are processed within 30 days</li>
              <li>To be added to our Do Not Call list, email <strong className="text-white">donotcall@rylandpartners.com</strong> or verbally request during any call</li>
            </ul>
          </section>

          <div className="border-t border-white/10" />

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Prohibited Practices</h2>
            <p>Ryland Partners strictly prohibits the following practices in all telemarketing activities:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Making false or misleading statements about any product, service, or business opportunity</li>
              <li>Misrepresenting the nature, terms, or cost of any service</li>
              <li>Threatening, intimidating, or using abusive language</li>
              <li>Calling consumers who have requested not to be called</li>
              <li>Using deceptive caller ID information</li>
              <li>Abandoning outbound calls (failure to connect to a live representative within 2 seconds)</li>
            </ul>
          </section>

          <div className="border-t border-white/10" />

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Credit Repair: No Advance Fees</h2>
            <p>In strict compliance with the TSR's advance fee prohibition for credit repair services (16 CFR § 310.4(a)(2)):</p>
            <div className="mt-3 p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5">
              <p className="text-yellow-200 font-medium">Ryland Partners does not request or receive payment for credit repair services until the promised services have been fully performed.</p>
            </div>
            <p className="mt-3">This means we do not charge any fees for credit restoration until after the work has been completed and the promised results have been delivered, as required by federal law.</p>
          </section>

          <div className="border-t border-white/10" />

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Recording & Consent Disclosures</h2>
            <p>When applicable, we may record telemarketing calls for quality assurance and compliance purposes. In such cases:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>We will inform the consumer that the call may be recorded</li>
              <li>We obtain consent as required by applicable state and federal laws</li>
              <li>Recordings are stored securely and retained in accordance with our data retention policies</li>
            </ul>
          </section>

          <div className="border-t border-white/10" />

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Contact Us</h2>
            <p>If you have questions about our TSR compliance or wish to report a concern:</p>
            <div className="mt-3 p-4 rounded-xl border border-white/10 bg-white/[0.03]">
              <p className="text-white font-medium">Ryland Partners — Compliance Team</p>
              <p>Email: legal@rylandpartners.com</p>
              <p>Do Not Call Requests: donotcall@rylandpartners.com</p>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-white/10 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-400">© {new Date().getFullYear()} Ryland Partners. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="text-sm text-slate-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-sm text-slate-400 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TSRCompliance;
