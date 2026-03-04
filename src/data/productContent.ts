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

  "unlock-credit-potential": {
    headline: "Ready to take charge of your financial future?",
    description:
      "The Unlock Your Credit Potential – Credit Repair Guide 2025 is designed to help you build stronger credit, fix mistakes, and open the door to better financial opportunities.",
    benefits: [
      "Build a stronger credit profile – Proven strategies to elevate your credit standing.",
      "Learn how to correct errors on your credit report – Step-by-step dispute guidance.",
      "Unlock access to better financial opportunities – Open doors to loans, cards, and more.",
    ],
    details: { format: "PDF eBook", length: "24 pages", category: "Credit Business Accelerator Pack" },
  },

  "diy-credit-repair-workbook": {
    headline: "Stay organized and take charge of your financial future.",
    description:
      "Stay organized and take charge of your financial future with the DIY Credit Repair Workbook. This workbook includes practical exercises, step-by-step guidance, and easy-to-use tools to help you repair your credit smarter.",
    benefits: [
      "Worksheets to track your credit repair progress – Monitor every step of your journey.",
      "Goal-setting pages for your credit journey – Define and hit your credit milestones.",
      "Action steps for disputing credit report errors – Clear guidance on what to do next.",
      "Systems to build positive credit habits – Create lasting financial discipline.",
      "Structured guidance to stay consistent – Stay on track with a proven framework.",
    ],
    details: { format: "Workbook PDF", length: "17 pages", category: "Credit Business Accelerator Pack" },
  },

  "money-management-worksheet": {
    headline: "Take control of your money with ease.",
    description:
      "Take control of your money with the Money Management Worksheet. This simple tool makes budgeting easier by helping you track income, expenses, and savings goals.",
    benefits: [
      "Simple budgeting system – A clear framework to manage your money.",
      "Income and expense tracking pages – Know exactly where your money goes.",
      "Savings goal worksheets – Set targets and watch your savings grow.",
      "Financial organization tools – Keep your finances neat and structured.",
    ],
    details: { format: "Worksheet PDF", length: "9 pages", category: "Credit Business Accelerator Pack" },
  },

  "stop-living-paycheck-to-paycheck": {
    headline: "Break free from the paycheck-to-paycheck cycle.",
    description:
      "Break free from the paycheck-to-paycheck cycle with this practical ebook that provides proven strategies to manage money smarter and create financial stability.",
    benefits: [
      "12 actionable money management strategies – Practical steps you can use today.",
      "How to build a savings cushion – Create a financial safety net.",
      "Practical budgeting systems – Simple frameworks that actually work.",
      "A roadmap for financial stability – Your step-by-step path to freedom.",
    ],
    details: { format: "PDF eBook", length: "17 pages", category: "Credit Business Accelerator Pack" },
  },

  "crush-100k-debt-worksheet": {
    headline: "Tackle large amounts of debt with a structured payoff system.",
    description:
      "The Crush $100K Debt Worksheet is designed to help you tackle large amounts of debt with a structured payoff system.",
    benefits: [
      "Debt payoff planning framework – A clear system to attack your debt.",
      "Progress tracking sheets – See your balances shrink over time.",
      "Milestone markers for motivation – Celebrate wins along the way.",
      "A simple repeatable system for eliminating debt – Use it again and again.",
    ],
    details: { format: "Worksheet PDF", length: "7 pages", category: "Credit Business Accelerator Pack" },
  },

  "frugal-living-success-workbook": {
    headline: "Master the art of saving and build smarter financial habits.",
    description:
      "Master the art of saving with this workbook designed to help you reduce expenses, track spending, and build smarter financial habits.",
    benefits: [
      "Expense-cutting strategies – Identify and eliminate unnecessary spending.",
      "Spending habit exercises – Build awareness around where your money goes.",
      "Grocery and bill saving strategies – Save on everyday essentials.",
      "Financial goal worksheets – Set and achieve your savings targets.",
    ],
    details: { format: "Workbook PDF", length: "8 pages", category: "Credit Business Accelerator Pack" },
  },

  "13-ways-to-pay-off-debt": {
    headline: "Proven strategies to eliminate debt faster and build financial freedom.",
    description:
      "A practical guide that teaches proven strategies to eliminate debt faster and build financial freedom.",
    benefits: [
      "13 powerful debt payoff strategies – Multiple approaches to fit your situation.",
      "Debt Snowball method – Build momentum by paying off small debts first.",
      "Debt Avalanche method – Save the most money by tackling high-interest debt.",
      "Personalized debt payoff planning – Create a plan that works for you.",
    ],
    details: { format: "PDF Guide", length: "14 pages", category: "Credit Business Accelerator Pack" },
  },

  "23-money-wasting-habits-to-break": {
    headline: "Stop overspending and improve your financial discipline.",
    description:
      "This guide reveals the most common money-wasting habits and provides practical solutions to stop overspending and improve financial discipline.",
    benefits: [
      "23 financial habits that waste money – Identify the leaks in your budget.",
      "Simple fixes to stop overspending – Practical solutions you can apply today.",
      "Practical saving strategies – Keep more of what you earn.",
      "Systems to build better money habits – Create lasting financial discipline.",
    ],
    details: { format: "PDF Guide", length: "15 pages", category: "Credit Business Accelerator Pack" },
  },

  "diy-credit-master-guide": {
    headline: "Dispute credit report errors and build better financial habits.",
    description:
      "A step-by-step credit repair action guide designed to help individuals dispute credit report errors, improve their credit profile, and build better financial habits. This guide also includes resell rights, allowing credit repair businesses to rebrand and sell the guide as their own product.",
    benefits: [
      "Step-by-step credit repair system – Clear guidance for disputing errors.",
      "Improve your credit profile – Actionable steps to raise your score.",
      "Build better financial habits – Create a foundation for long-term success.",
      "Resell Rights Included – Rebrand and sell as your own product.",
    ],
    details: { format: "PDF eBook", length: "10 pages", category: "Credit Business Accelerator Pack" },
  },
};
