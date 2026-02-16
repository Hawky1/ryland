import { useEffect } from "react";
import { Link } from "react-router-dom";
import logoWhite from "@/assets/logo-white.png";
import InfiniteGrid from "@/components/ui/infinite-grid";
import Footer from "@/components/Footer";

const Disclaimers = () => {
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
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-10 font-['Manrope']">Disclaimers</h1>

        <div className="space-y-10 text-slate-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Earnings Disclaimer</h2>
            <p>The Ryland Partners affiliate/partner program provides an opportunity to earn commissions by referring qualified business owners to our funding services. However:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>There is <strong className="text-slate-900">no guarantee of income</strong> or earnings of any kind</li>
              <li>Individual results vary based on effort, experience, network, and market conditions</li>
              <li>Any income examples, testimonials, or case studies shared are not to be interpreted as a promise or guarantee of earnings</li>
              <li>Past performance is not indicative of future results</li>
              <li>Success in the partner program requires time, effort, and skill</li>
            </ul>
            <div className="mt-4 p-4 rounded-xl border border-amber-300/50 bg-amber-50">
              <p className="text-amber-800 text-sm">The FTC requires that we identify what a "typical" participant in our program can expect. Most affiliate partners who do not actively market and refer will earn $0. Results depend entirely on your individual effort and market conditions.</p>
            </div>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Funding Disclaimer</h2>
            <p>Ryland Partners is a referral service that connects business owners with third-party funding partners and lenders.</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Ryland Partners is <strong className="text-slate-900">not a lender</strong> and does not make funding or credit decisions</li>
              <li>Funding approval is <strong className="text-slate-900">not guaranteed</strong> and is subject to the lender's terms, conditions, and underwriting criteria</li>
              <li>Funding amounts, terms, interest rates, and repayment schedules vary by lender and applicant qualifications</li>
              <li>Submitting an application does not guarantee approval or a specific funding amount</li>
              <li>We encourage all applicants to carefully review the terms and conditions of any funding offer before accepting</li>
            </ul>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Credit Restoration Disclaimer</h2>
            <p>Ryland Partners offers credit restoration and education services to help individuals improve their credit profiles. Please note:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li><strong className="text-slate-900">Results vary</strong> — there is no guarantee of specific credit score improvements or outcomes</li>
              <li>Credit restoration depends on individual circumstances, including the nature and accuracy of items on your credit report</li>
              <li>We cannot guarantee that any specific item will be removed from your credit report</li>
              <li>Improvement timelines vary and depend on credit bureau processing and individual circumstances</li>
              <li>You have the right to dispute inaccurate information on your credit report directly with credit bureaus at no cost</li>
            </ul>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Not Legal or Financial Advice</h2>
            <p>The information provided on this website and through our services is for <strong className="text-slate-900">general informational purposes only</strong> and does not constitute:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Legal advice</li>
              <li>Financial advice</li>
              <li>Tax advice</li>
              <li>Investment advice</li>
            </ul>
            <p className="mt-3">You should consult with qualified professionals (attorneys, financial advisors, CPAs) before making any legal, financial, or business decisions. Ryland Partners is not responsible for any actions you take based on information provided on our website.</p>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Third-Party Links Disclaimer</h2>
            <p>Our website may contain links to third-party websites, services, or resources that are not owned or controlled by Ryland Partners. We do not endorse, guarantee, or assume responsibility for the accuracy, relevance, or completeness of any content on linked third-party sites. Visiting third-party sites is at your own risk.</p>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Testimonials Disclaimer</h2>
            <p>Testimonials, reviews, and success stories displayed on our website represent individual experiences and opinions. They are not to be construed as:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>A guarantee or promise of similar results</li>
              <li>Typical or expected outcomes</li>
              <li>Professional endorsements of our services</li>
            </ul>
            <p className="mt-3">Individual results will vary. The experiences shared are not necessarily representative of all users of our services. Some testimonials may have been compensated or incentivized.</p>
          </section>

          <div className="border-t border-slate-200" />

          <section>
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Contact Us</h2>
            <p>If you have questions about these disclaimers, please contact us at:</p>
            <div className="mt-3 p-4 rounded-xl border border-slate-200 bg-slate-50">
              <p className="text-slate-900 font-medium">Ryland Partners</p>
              <p>Email: legal@rylandpartners.com</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Disclaimers;
