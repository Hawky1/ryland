import { useEffect } from "react";
import { Link } from "react-router-dom";
import logoWhite from "@/assets/logo-white.png";
import InfiniteGrid from "@/components/ui/infinite-grid";
import Footer from "@/components/Footer";

const CCPA = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen selection:bg-blue-500/30 selection:text-white antialiased text-slate-900 relative z-10 bg-transparent">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap" />

      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-white">
        <InfiniteGrid baseGridColor="rgba(148, 163, 184, 0.5)" activeGridColor="rgba(59, 130, 246, 0.8)" />
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
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10 font-['Manrope']">California Consumer Privacy Act (CCPA) Notice</h1>

        <div className="space-y-10 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Your Rights Under the CCPA</h2>
            <p>If you are a California resident, the California Consumer Privacy Act (CCPA) grants you specific rights regarding your personal information. This page explains those rights and how to exercise them.</p>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Categories of Personal Information Collected</h2>
            <p>In the preceding 12 months, we have collected the following categories of personal information:</p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="text-left p-4 text-slate-900 font-medium border-b border-slate-200">Category</th>
                    <th className="text-left p-4 text-slate-900 font-medium border-b border-slate-200">Examples</th>
                    <th className="text-left p-4 text-slate-900 font-medium border-b border-slate-200">Collected</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr><td className="p-4">Identifiers</td><td className="p-4">Name, email, phone, address</td><td className="p-4 text-green-600">Yes</td></tr>
                  <tr><td className="p-4">Financial Information</td><td className="p-4">Business revenue, credit data</td><td className="p-4 text-green-600">Yes</td></tr>
                  <tr><td className="p-4">Commercial Information</td><td className="p-4">Services requested, transaction history</td><td className="p-4 text-green-600">Yes</td></tr>
                  <tr><td className="p-4">Internet Activity</td><td className="p-4">Browsing history, search history, interactions with our website</td><td className="p-4 text-green-600">Yes</td></tr>
                  <tr><td className="p-4">Professional Information</td><td className="p-4">Business name, industry, role</td><td className="p-4 text-green-600">Yes</td></tr>
                  <tr><td className="p-4">Geolocation Data</td><td className="p-4">Approximate location from IP address</td><td className="p-4 text-green-600">Yes</td></tr>
                  <tr><td className="p-4">Biometric Information</td><td className="p-4">Fingerprints, face recognition</td><td className="p-4 text-red-500">No</td></tr>
                  <tr><td className="p-4">Sensory Data</td><td className="p-4">Audio, visual, or similar information</td><td className="p-4 text-red-500">No</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Business Purpose for Collection</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Processing and fulfilling funding referrals</li>
              <li>Providing credit restoration services</li>
              <li>Managing our partner/affiliate program and commissions</li>
              <li>Marketing and communicating about our services</li>
              <li>Website analytics and performance optimization</li>
              <li>Fraud prevention and security</li>
              <li>Complying with legal obligations</li>
            </ul>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Third Parties With Whom Data Is Shared</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong className="text-slate-900">Lending & Funding Partners:</strong> To process funding applications</li>
              <li><strong className="text-slate-900">Credit Service Providers:</strong> To deliver credit restoration services</li>
              <li><strong className="text-slate-900">Analytics Providers:</strong> Google Analytics, Google Tag Manager</li>
              <li><strong className="text-slate-900">CRM & Marketing Platforms:</strong> For communication and customer management</li>
              <li><strong className="text-slate-900">Payment Processors:</strong> To process partner commissions and service fees</li>
            </ul>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Do Not Sell My Personal Information</h2>
            <p>Ryland Partners does not sell your personal information for monetary consideration. However, under the broad CCPA definition of "sale," certain sharing of data with third parties (such as analytics or advertising partners) may qualify.</p>
            <p className="mt-3">To opt out of any such sharing, please contact us:</p>
            <div className="mt-3 p-4 rounded-xl border border-slate-200 bg-slate-50">
              <p><strong className="text-slate-900">Email:</strong> privacy@rylandpartners.com</p>
              <p className="mt-1"><strong className="text-slate-900">Subject Line:</strong> "Do Not Sell My Personal Information"</p>
            </div>
            <p className="mt-3">We will process your request within 15 business days and confirm via email.</p>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">How to Submit a Verifiable Consumer Request</h2>
            <p>You may submit requests to know, delete, or opt out by:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Emailing us at <strong className="text-slate-900">privacy@rylandpartners.com</strong></li>
            </ul>
            <p className="mt-4">To verify your identity, we may ask you to provide:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Your full name and email address associated with your account</li>
              <li>Details about your recent interactions with Ryland Partners</li>
            </ul>
            <p className="mt-4"><strong className="text-slate-900">Response Timeframe:</strong> We will acknowledge your request within 10 business days and respond substantively within 45 calendar days. If we require more time (up to an additional 45 days), we will notify you of the reason and extension period.</p>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Authorized Agents</h2>
            <p>You may designate an authorized agent to submit requests on your behalf. The authorized agent must provide:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Written permission signed by you</li>
              <li>Proof of the agent's identity</li>
            </ul>
            <p className="mt-3">We may still require you to directly verify your identity and confirm you authorized the agent.</p>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Contact Us</h2>
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <p className="text-slate-900 font-medium">Ryland Partners — Privacy Team</p>
              <p>Email: privacy@rylandpartners.com</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CCPA;
