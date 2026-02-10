import { useEffect } from "react";
import { Link } from "react-router-dom";
import logoWhite from "@/assets/logo-white.png";
import InfiniteGrid from "@/components/ui/infinite-grid";

const CookiePolicy = () => {
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
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-10 font-['Manrope']">Cookie Policy</h1>

        <div className="space-y-10 text-slate-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-white mb-4">What Are Cookies?</h2>
            <p>Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and give website owners useful analytics information.</p>
          </section>

          <div className="border-t border-white/10" />

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Types of Cookies We Use</h2>

            <h3 className="text-lg font-medium text-white mt-6 mb-3">Essential Cookies</h3>
            <p>These cookies are necessary for the website to function properly. They enable core features such as page navigation and access to secure areas. The website cannot function properly without these cookies.</p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm border border-white/10 rounded-xl overflow-hidden">
                <thead><tr className="bg-white/5"><th className="text-left p-3 text-white font-medium border-b border-white/10">Cookie</th><th className="text-left p-3 text-white font-medium border-b border-white/10">Purpose</th><th className="text-left p-3 text-white font-medium border-b border-white/10">Retention</th></tr></thead>
                <tbody className="divide-y divide-white/10">
                  <tr><td className="p-3">Session ID</td><td className="p-3">Maintains user session</td><td className="p-3">Session</td></tr>
                  <tr><td className="p-3">Cookie Consent</td><td className="p-3">Stores cookie preferences</td><td className="p-3">1 year</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-medium text-white mt-8 mb-3">Analytics Cookies</h3>
            <p>These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm border border-white/10 rounded-xl overflow-hidden">
                <thead><tr className="bg-white/5"><th className="text-left p-3 text-white font-medium border-b border-white/10">Cookie</th><th className="text-left p-3 text-white font-medium border-b border-white/10">Purpose</th><th className="text-left p-3 text-white font-medium border-b border-white/10">Retention</th></tr></thead>
                <tbody className="divide-y divide-white/10">
                  <tr><td className="p-3">_ga</td><td className="p-3">Google Analytics — distinguishes unique users</td><td className="p-3">2 years</td></tr>
                  <tr><td className="p-3">_ga_*</td><td className="p-3">Google Analytics 4 — maintains session state</td><td className="p-3">2 years</td></tr>
                  <tr><td className="p-3">_gid</td><td className="p-3">Google Analytics — distinguishes users</td><td className="p-3">24 hours</td></tr>
                  <tr><td className="p-3">_gat</td><td className="p-3">Google Analytics — throttles request rate</td><td className="p-3">1 minute</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-medium text-white mt-8 mb-3">Marketing Cookies</h3>
            <p>These cookies are used to track visitors across websites to display ads that are relevant and engaging for the individual user.</p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm border border-white/10 rounded-xl overflow-hidden">
                <thead><tr className="bg-white/5"><th className="text-left p-3 text-white font-medium border-b border-white/10">Cookie</th><th className="text-left p-3 text-white font-medium border-b border-white/10">Purpose</th><th className="text-left p-3 text-white font-medium border-b border-white/10">Retention</th></tr></thead>
                <tbody className="divide-y divide-white/10">
                  <tr><td className="p-3">_gcl_*</td><td className="p-3">Google Ads conversion tracking</td><td className="p-3">90 days</td></tr>
                  <tr><td className="p-3">_fbp</td><td className="p-3">Facebook pixel tracking</td><td className="p-3">90 days</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          <div className="border-t border-white/10" />

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Google Tag Manager</h2>
            <p>We use Google Tag Manager (GTM-PP86LZ6V) to manage and deploy marketing and analytics tags on our website. Google Tag Manager itself does not collect personal data, but it facilitates the deployment of tags from services like Google Analytics that do collect data.</p>
          </section>

          <div className="border-t border-white/10" />

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Third-Party Cookies</h2>
            <p>Some cookies on our site are set by third-party services. We do not control how these third parties use their cookies. The third-party services we use include:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong className="text-white">Google Analytics (GA4):</strong> Website analytics and usage tracking</li>
              <li><strong className="text-white">Google Ads:</strong> Advertising conversion tracking</li>
              <li><strong className="text-white">Facebook/Meta Pixel:</strong> Advertising attribution and remarketing</li>
            </ul>
          </section>

          <div className="border-t border-white/10" />

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">How to Manage Cookies</h2>
            <p>You can control and manage cookies in several ways:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong className="text-white">Browser Settings:</strong> Most browsers allow you to refuse or delete cookies through their settings. Consult your browser's help documentation for instructions.</li>
              <li><strong className="text-white">Google Analytics Opt-Out:</strong> Install the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">Google Analytics Opt-Out Browser Add-on</a></li>
              <li><strong className="text-white">Industry Opt-Out Tools:</strong> Visit <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">aboutads.info</a> or <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline">networkadvertising.org</a></li>
            </ul>
            <p className="mt-3">Please note that disabling cookies may affect the functionality of our website.</p>
          </section>

          <div className="border-t border-white/10" />

          <section>
            <h2 className="text-xl font-semibold text-white mb-4">Contact Us</h2>
            <p>If you have questions about our use of cookies, please contact us at:</p>
            <div className="mt-3 p-4 rounded-xl border border-white/10 bg-white/[0.03]">
              <p className="text-white font-medium">Ryland Partners</p>
              <p>Email: privacy@rylandpartners.com</p>
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

export default CookiePolicy;
