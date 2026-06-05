import { Suspense } from "react";
import React from 'react';
import NetWorthCalculator from '@/components/calculators/NetWorthCalculator';
import { Metadata } from 'next';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, TrendingUp, ShieldCheck, Landmark } from 'lucide-react';
import JSONLD from '@/components/JSONLD';

export const metadata: Metadata = {
  title: 'Net Worth Calculator | Free Wealth Tracking Tool',
  description: 'Track your financial progress by calculating your net worth. See a detailed breakdown of your assets and liabilities and learn how to grow your wealth over time with our free tool.',
  keywords: 'net worth calculator, wealth tracker, financial health tool, asset liability breakdown, personal balance sheet',
  openGraph: {
    title: 'Net Worth Calculator | Finance Calculator Hub',
    description: 'Measure your financial health and track your progress toward financial independence.',
    type: 'website',
    url: 'https://financecalcuhub.com/calculators/net-worth',
    siteName: 'Finance Calculator Hub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Net Worth Calculator | Finance Calculator Hub',
    description: 'Calculate your net worth with our free professional tool.',
  },
  alternates: {
    canonical: 'https://financecalcuhub.com/calculators/net-worth',
  },
};

const NetWorthPage = () => {
  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "Net Worth Calculator",
    "description": "Calculate total net worth by subtracting liabilities from assets including cash, investments, and property.",
    "url": "https://financecalcuhub.com/calculators/net-worth",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://financecalcuhub.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Calculators",
        "item": "https://financecalcuhub.com/calculators"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Net Worth Calculator",
        "item": "https://financecalcuhub.com/calculators/net-worth"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Should I include my primary residence in my net worth?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Your home is an asset. The equity in your home (market value minus mortgage balance) is a significant part of your overall wealth."
        }
      },
      {
        "@type": "Question",
        "name": "How often should I update my net worth?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most people find that updating their net worth once a month or once a quarter is sufficient."
        }
      }
    ]
  };

  return (
    <>
      <JSONLD data={calculatorSchema} />
      <JSONLD data={breadcrumbSchema} />
      <JSONLD data={faqSchema} />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">
            Net Worth Calculator
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Your net worth is the ultimate measure of your financial health. It's the "big picture" number that tells you exactly where you stand on your journey to financial independence.
          </p>
        </div>

        <div className="mb-20">
          <Suspense fallback={<div className="h-[600px] w-full flex items-center justify-center border rounded-2xl bg-slate-50 text-muted-foreground animate-pulse">Loading calculator...</div>}><NetWorthCalculator /></Suspense>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section id="explanation">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Info className="text-primary h-8 w-8" />
                What is Net Worth?
              </h2>
              <div className="prose prose-slate max-w-none text-muted-foreground space-y-4">
                <p>
                  Net worth is simply everything you **own** (assets) minus everything you **owe** (liabilities). It provides a snapshot of your financial position at a single point in time.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Assets:</strong> Cash, savings, retirement accounts, brokerage accounts, real estate value, and vehicles.</li>
                  <li><strong>Liabilities:</strong> Mortgages, student loans, auto loans, credit card balances, and any other personal debts.</li>
                </ul>
                <p>
                  Tracking your net worth monthly or quarterly is more important than tracking your daily bank balance, as it shows your true progress toward long-term wealth.
                </p>
              </div>
            </section>

            <section id="how-to-grow">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="text-primary h-8 w-8" />
                How to Grow Your Net Worth
              </h2>
              <div className="prose prose-slate max-w-none text-muted-foreground space-y-4">
                <p>
                  There are only two ways to increase your net worth:
                </p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li><strong>Increase Your Assets:</strong> Save more money, invest in the stock market, or see your property value appreciate.</li>
                  <li><strong>Decrease Your Liabilities:</strong> Pay down your mortgage, clear your credit card debt, or eliminate your student loans.</li>
                </ol>
                <p>
                  The most successful wealth builders do both simultaneously—consistently investing while aggressively paying down high-interest debt.
                </p>
              </div>
            </section>

            <section id="faq">
              <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
              <Accordion className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Should I include my primary residence in my net worth?</AccordionTrigger>
                  <AccordionContent>
                    Yes. Your home is an asset. While you still need a place to live, the equity in your home (market value minus mortgage balance) is a significant part of your overall wealth.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>What is a "good" net worth for my age?</AccordionTrigger>
                  <AccordionContent>
                    Net worth varies wildly based on location and career. A popular formula from "The Millionaire Next Door" is: (Age × Pre-tax Annual Income) / 10. This gives you a target for what an "average" accumulator of wealth might have.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Can I have a negative net worth?</AccordionTrigger>
                  <AccordionContent>
                    Yes, especially early in your career if you have significant student loans or other debt. This is common and is the reason why tracking your progress is so important—watching that negative number become positive is a major milestone.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>How often should I update my net worth?</AccordionTrigger>
                  <AccordionContent>
                    Most people find that updating their net worth once a month or once a quarter is sufficient. Daily updates are usually unnecessary as market fluctuations can cause distracting "noise."
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
          </div>

          <div className="space-y-8">
            <Card className="bg-emerald-50 border-emerald-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-900">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  Wealth Tip
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-emerald-800 leading-relaxed">
                Focus on **investable net worth** (cash + investments). While your home and cars add to your total net worth, your investable assets are what will eventually provide the income you need for retirement.
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Related Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-2">
                  <a href="/calculators/budget" className="text-sm font-medium hover:text-primary transition-colors">Budget Calculator</a>
                  <a href="/calculators/retirement" className="text-sm font-medium hover:text-primary transition-colors">Retirement Planner</a>
                  <a href="/calculators/compound-interest" className="text-sm font-medium hover:text-primary transition-colors">Compound Interest Calculator</a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default NetWorthPage;
