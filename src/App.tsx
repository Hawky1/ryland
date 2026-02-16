import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCartSync } from "@/hooks/useCartSync";
import Index from "./pages/Index";
import Partners from "./pages/Partners";
import Store from "./pages/Store";
import ProductDetail from "./pages/ProductDetail";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CCPA from "./pages/CCPA";
import TSRCompliance from "./pages/TSRCompliance";
import Disclaimers from "./pages/Disclaimers";
import CookiePolicy from "./pages/CookiePolicy";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import FunnelLeadMagnet from "./pages/funnel/FunnelLeadMagnet";
import FunnelCoreOffer from "./pages/funnel/FunnelCoreOffer";
import FunnelDownsell from "./pages/funnel/FunnelDownsell";
import FunnelConsultation from "./pages/funnel/FunnelConsultation";
import Assessment from "./pages/Assessment";
import Funding from "./pages/Funding";
import CreditRepair from "./pages/CreditRepair";
import Community from "./pages/Community";

const queryClient = new QueryClient();

const AppContent = () => {
  useCartSync();
  return (
    <>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/store" element={<Store />} />
          <Route path="/product/:handle" element={<ProductDetail />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/ccpa" element={<CCPA />} />
          <Route path="/tsr-compliance" element={<TSRCompliance />} />
          <Route path="/disclaimers" element={<Disclaimers />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/funnel" element={<FunnelLeadMagnet />} />
          <Route path="/funnel/offer" element={<FunnelCoreOffer />} />
          <Route path="/funnel/founders" element={<FunnelDownsell />} />
          <Route path="/funnel/consultation" element={<FunnelConsultation />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/funding" element={<Funding />} />
          <Route path="/credit-repair" element={<CreditRepair />} />
          <Route path="/community" element={<Community />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppContent />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
