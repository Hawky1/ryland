import { Link } from "react-router-dom";
import logoDark from "@/assets/logo-dark.png";

const Footer = () => {
  return (
    <footer className="border-slate-200/40 border-t pt-16 pb-10 bg-white/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={logoDark} alt="Ryland Partners" width={189} height={56} loading="lazy" className="h-8 w-auto" />
            </Link>
            <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
              Credit restoration, business funding, and financial education — empowering entrepreneurs to build and scale with confidence.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/gene.ryland.2025" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a href="https://www.linkedin.com/in/generyland/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
              <a href="https://www.instagram.com/generyland/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex items-center justify-center w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Services</h3>
            <ul className="space-y-3">
              <li><Link to="/funding" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Business Funding</Link></li>
              <li><Link to="/credit-repair" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Credit Restoration</Link></li>
              <li><Link to="/community" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Private Community</Link></li>
              <li><Link to="/store" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Digital Products</Link></li>
              <li><Link to="/consultation" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">1-on-1 Consultation</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">About</Link></li>
              <li><Link to="/partners" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Partner Program</Link></li>
              <li><Link to="/contact" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Contact</Link></li>
              <li><Link to="/store" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Store</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              <li><Link to="/privacy-policy" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Terms of Service</Link></li>
              <li><Link to="/ccpa" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">CCPA Notice</Link></li>
              <li><Link to="/tsr-compliance" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">TSR Compliance</Link></li>
              <li><Link to="/disclaimers" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Disclaimers</Link></li>
              <li><Link to="/cookie-policy" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* General Disclaimer */}
        <div className="border-t border-slate-200 pt-8 pb-6">
          <p className="text-xs text-slate-500 leading-relaxed max-w-4xl mx-auto text-center">
            Ryland Partners provides financial education and consulting services. We are not a lender and do not guarantee funding approval or specific credit amounts. All outcomes depend on individual qualifications, lender decisions, and credit profile. Results vary.
          </p>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Ryland Partners. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">Terms of Service</Link>
          </div>
        </div>

        {/* Consumer Disclosure */}
        <div className="border-t border-slate-200 mt-8 pt-8 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4">
            <h4 className="text-sm font-semibold text-slate-900">Consumer Disclosure</h4>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700 uppercase tracking-wider">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              CROA Compliant
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-[10px] font-semibold text-blue-700 uppercase tracking-wider">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              TSR Compliant
            </span>
          </div>
          <div className="space-y-3 text-xs text-slate-500 leading-relaxed max-w-4xl mx-auto">
            <p><span className="font-semibold text-slate-700">Credit Repair Organizations Act (CROA) Notice:</span> You have a right to dispute inaccurate information in your credit report by contacting the credit bureau directly. However, neither you nor any credit repair company or credit repair organization has the right to have accurate, current, and verifiable information removed from your credit report.</p>
            <p>You have a right to cancel this contract within 3 business days from the date you signed it. If you cancel, we cannot charge you any fees or collect any money for the services that have not yet been performed.</p>
            <p><span className="font-semibold text-slate-700">No Guarantee:</span> We cannot guarantee specific results. Improvement in credit scores depends on the unique circumstances of each individual.</p>
            <p><span className="font-semibold text-slate-700">FTC Telemarketing Sales Rule (TSR) Compliance:</span> In accordance with the TSR, no fees are charged or collected until services are fully performed.</p>
          </div>
          <div className="flex items-center justify-center gap-2 mt-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] text-slate-500">All systems normal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
