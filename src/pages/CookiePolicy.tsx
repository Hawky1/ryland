import { useEffect } from "react";
import { Link } from "react-router-dom";
import logoWhite from "@/assets/logo-white.png";
import InfiniteGrid from "@/components/ui/infinite-grid";
import Footer from "@/components/Footer";

const CookiePolicy = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen selection:bg-blue-500/30 selection:text-white antialiased text-slate-900">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap" />

      <div className="fixed inset-0 -z-10 overflow-hidden bg-white pointer-events-none">
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
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10 font-['Manrope']">Cookie Policy</h1>

        <div className="space-y-10 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">What Are Cookies?</h2>
            <p>Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and give website owners useful analytics information.</p>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Types of Cookies We Use</h2>

            <h3 className="text-lg font-medium text-slate-900 mt-6 mb-3">Essential Cookies</h3>
            <p>These cookies are necessary for the website to function properly. They enable core features such as page navigation and access to secure areas. The website cannot function properly without these cookies.</p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
                <thead><tr className="bg-slate-50"><th className="text-left p-3 text-slate-900 font-medium border-b border-slate-200">Cookie</th><th className="text-left p-3 text-slate-900 font-medium border-b border-slate-200">Purpose</th><th className="text-left p-3 text-slate-900 font-medium border-b border-slate-200">Retention</th></tr></thead>
                <tbody className="divide-y divide-slate-200">
                  <tr><td className="p-3">Session ID</td><td className="p-3">Maintains user session</td><td className="p-3">Session</td></tr>
                  <tr><td className="p-3">Cookie Consent</td><td className="p-3">Stores cookie preferences</td><td className="p-3">1 year</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-medium text-slate-900 mt-8 mb-3">Analytics Cookies</h3>
            <p>These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
                <thead><tr className="bg-slate-50"><th className="text-left p-3 text-slate-900 font-medium border-b border-slate-200">Cookie</th><th className="text-left p-3 text-slate-900 font-medium border-b border-slate-200">Purpose</th><th className="text-left p-3 text-slate-900 font-medium border-b border-slate-200">Retention</th></tr></thead>
                <tbody className="divide-y divide-slate-200">
                  <tr><td className="p-3">_ga</td><td className="p-3">Google Analytics — distinguishes unique users</td><td className="p-3">2 years</td></tr>
                  <tr><td className="p-3">_ga_*</td><td className="p-3">Google Analytics 4 — maintains session state</td><td className="p-3">2 years</td></tr>
                  <tr><td className="p-3">_gid</td><td className="p-3">Google Analytics — distinguishes users</td><td className="p-3">24 hours</td></tr>
                  <tr><td className="p-3">_gat</td><td className="p-3">Google Analytics — throttles request rate</td><td className="p-3">1 minute</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-medium text-slate-900 mt-8 mb-3">Marketing Cookies</h3>
            <p>These cookies are used to track visitors across websites to display ads that are relevant and engaging for the individual user.</p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden">
                <thead><tr className="bg-slate-50"><th className="text-left p-3 text-slate-900 font-medium border-b border-slate-200">Cookie</th><th className="text-left p-3 text-slate-900 font-medium border-b border-slate-200">Purpose</th><th className="text-left p-3 text-slate-900 font-medium border-b border-slate-200">Retention</th></tr></thead>
                <tbody className="divide-y divide-slate-200">
                  <tr><td className="p-3">_gcl_*</td><td className="p-3">Google Ads conversion tracking</td><td className="p-3">90 days</td></tr>
                  <tr><td className="p-3">_fbp</td><td className="p-3">Facebook pixel tracking</td><td className="p-3">90 days</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Google Tag Manager</h2>
            <p>We use Google Tag Manager (GTM-PP86LZ6V) to manage and deploy marketing and analytics tags on our website. Google Tag Manager itself does not collect personal data, but it facilitates the deployment of tags from services like Google Analytics that do collect data.</p>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Third-Party Cookies</h2>
            <p>Some cookies on our site are set by third-party services. We do not control how these third parties use their cookies. The third-party services we use include:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong className="text-slate-900">Google Analytics (GA4):</strong> Website analytics and usage tracking</li>
              <li><strong className="text-slate-900">Google Ads:</strong> Advertising conversion tracking</li>
              <li><strong className="text-slate-900">Facebook/Meta Pixel:</strong> Advertising attribution and remarketing</li>
            </ul>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">How to Manage Cookies</h2>
            <p>You can control and manage cookies in several ways:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong className="text-slate-900">Browser Settings:</strong> Most browsers allow you to refuse or delete cookies through their settings. Consult your browser's help documentation for instructions.</li>
              <li><strong className="text-slate-900">Google Analytics Opt-Out:</strong> Install the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500 underline">Google Analytics Opt-Out Browser Add-on</a></li>
              <li><strong className="text-slate-900">Industry Opt-Out Tools:</strong> Visit <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500 underline">aboutads.info</a> or <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-500 underline">networkadvertising.org</a></li>
            </ul>
            <p className="mt-3">Please note that disabling cookies may affect the functionality of our website.</p>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Contact Us</h2>
            <p>If you have questions about our use of cookies, please contact us at:</p>
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

export default CookiePolicy;
