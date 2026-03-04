export interface ProductContent {
  headline: string;
  description: string;
  benefits: string[];
  details: {
    format: string;
    length: string;
    category: string;
  };
}

export const productContentMap: Record<string, ProductContent> = {
  "smart-credit-hacks": {
    headline: "Boost Your Credit Score. Qualify for Better Cards. Take Control of Your Finances.",
    description:
      "Discover insider strategies to improve your credit fast! Smart Credit Hacks provides practical tips, checklists, and actionable guidance to help you optimize your credit profile, qualify for top credit cards, and unlock better financial opportunities.",
    benefits: [
      "44 Pages of Expert Strategies – Step-by-step tactics to boost your credit score.",
      "Actionable Checklists – Easily track progress and implement credit-improving actions.",
      "Insider Tips – Learn secrets to qualify for the best credit cards and loans.",
      "Simple & Practical – Designed for anyone looking to take control of their credit.",
      "Financial Confidence – Make smarter credit decisions with proven guidance.",
    ],
    details: { format: "PDF eBook", length: "44 pages", category: "Credit Authority Bundle" },
  },

  "the-financial-playbook-your-ultimate-money-resource-guide": {
    headline: "Grow Your Money. Build Your Credit. Secure Your Future.",
    description:
      "If you've ever wished there was a one-stop guide to money, credit, and funding resources, this is it. The Financial Playbook gives you 33 pages of trusted websites, tools, and strategies to help you build credit, find funding, increase your income, and take control of your financial future.",
    benefits: [
      "Top Money & Credit Resources – Handpicked websites and tools for funding, building credit, and growing income.",
      "Actionable Strategies – Step-by-step tips you can use immediately.",
      "Insider Shortcuts – Save time by skipping trial-and-error and using proven resources.",
      "All-in-One Guide – No need to search endlessly—the best is already here.",
      "Easy to Use – Clear, straightforward, and practical information.",
    ],
    details: { format: "PDF eBook", length: "33 pages", category: "Credit Authority Bundle" },
  },

  "ai-powered-credit-dispute-letter-prompts": {
    headline: "Easily Challenge Credit Errors. Save Time. Boost Your Credit Score.",
    description:
      "Stop stressing over credit dispute letters! With the AI-Powered Credit Dispute Letter Prompts, you can quickly generate professional, personalized dispute letters using AI tools like ChatGPT or Gemini.",
    benefits: [
      "46 Pages of AI-Powered Prompts – Expertly designed to create accurate, professional dispute letters.",
      "Step-by-Step Guidance – Learn how to use AI to handle your credit disputes effectively.",
      "Save Time & Effort – Generate letters in minutes instead of hours.",
      "Boost Your Credit Confidence – Take control of your credit and correct errors quickly.",
      "Easy to Use – No experience with AI required.",
    ],
    details: { format: "PDF eBook", length: "46 pages", category: "Credit Authority Bundle" },
  },

  "ultimate-business-credit-blueprint": {
    headline: "Build Strong Business Credit. Unlock Funding. Grow Your Company.",
    description:
      "Want to separate your personal credit from your business? Need funding without relying on personal guarantees? The Ultimate Business Credit Blueprint is your step-by-step system for building business credit the right way.",
    benefits: [
      "Step-by-Step Business Credit System – Build credit fast with proven methods.",
      "121 Pages of Expert Guidance – Everything from setup to advanced funding strategies.",
      "Checklists & Action Plans – Stay organized and track your progress.",
      "Funding Unlocks – Learn how to access credit cards, loans, and vendor accounts for your business.",
      "Confidence & Freedom – Stop using personal credit and build real business credibility.",
    ],
    details: { format: "PDF eBook", length: "121 pages", category: "Credit Authority Bundle" },
  },

  "credit-inquiry-phone-script-remove-inquiries-fast": {
    headline: "Speak with Confidence. Remove Credit Inquiries Quickly. Protect Your Credit Score.",
    description:
      "Take control of your credit report with a proven, step-by-step phone script designed to help you remove unauthorized or outdated inquiries.",
    benefits: [
      "49 Pages of Phone Scripts – Step-by-step dialogue for disputing hard inquiries effectively.",
      "Expert Guidance – Learn exactly what to say to creditors and bureaus for faster results.",
      "Protect Your Credit Score – Remove unauthorized or outdated inquiries before they impact your score.",
      "Avoid Common Mistakes – Scripts are designed to prevent errors that could delay results.",
      "Easy to Follow – Perfect for anyone looking to take control of their credit disputes.",
    ],
    details: { format: "PDF eBook", length: "49 pages", category: "Credit Authority Bundle" },
  },

  "ultimate-credit-card-lender-list": {
    headline: "Find the Right Credit Card. Get Approved Faster. Build Your Credit with Confidence.",
    description:
      "The Ultimate Credit Card Lender List gives you a curated 60-page guide to reputable credit card lenders along with approval requirements and insider tips to boost your approval chances.",
    benefits: [
      "60 Pages of Trusted Lenders – A complete list of credit card companies.",
      "Clear Approval Requirements – Know exactly what lenders look for before applying.",
      "Contact Details Included – Reach lenders directly and apply with confidence.",
      "Insider Approval Tips – Strategies to maximize approval odds.",
      "Smart Financial Choices – Save time and avoid unnecessary rejections.",
    ],
    details: { format: "PDF eBook", length: "60 pages", category: "Credit Authority Bundle" },
  },
};
