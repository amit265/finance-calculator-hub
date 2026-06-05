import { Suspense } from "react";
import React from 'react';
import CompoundInterestCalculator from '@/components/calculators/CompoundInterestCalculator';
import { Metadata } from 'next';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, TrendingUp, Lightbulb, BookOpen } from 'lucide-react';
import JSONLD from '@/components/JSONLD';

export const metadata: Metadata = {
  title: 'Compound Interest Calculator | Free Investment Growth Tool',
  description: 'Calculate how your money grows over time with our free compound interest calculator. See the impact of monthly contributions, interest rates, and compounding frequency with interactive charts and annual schedules.',
  keywords: 'compound interest calculator, investment calculator, wealth growth tool, finance calculator, savings calculator',
  openGraph: {
    title: 'Compound Interest Calculator | Finance Calculator Hub',
    description: 'Project your wealth with our professional compound interest calculator. Interactive charts and detailed breakdowns.',
    type: 'website',
    url: 'https://financecalcuhub.com/calculators/compound-interest',
    siteName: 'Finance Calculator Hub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compound Interest Calculator | Finance Calculator Hub',
    description: 'Calculate your investment growth with our free tool.',
  },
  alternates: {
    canonical: 'https://financecalcuhub.com/calculators/compound-interest',
  },
};

const CompoundInterestPage = () => {
  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "Compound Interest Calculator",
    "description": "Calculate the future value of an investment using compound interest with monthly contributions.",
    "url": "https://financecalcuhub.com/calculators/compound-interest",
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
        "name": "Compound Interest Calculator",
        "item": "https://financecalcuhub.com/calculators/compound-interest"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the difference between simple and compound interest?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simple interest is calculated only on the principal amount. Compound interest is calculated on the principal plus any interest already earned. Over time, compound interest grows much faster than simple interest."
        }
      },
      {
        "@type": "Question",
        "name": "How often should I compound my interest?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The more frequently interest is compounded, the faster your money grows. For example, daily compounding will result in slightly more interest than monthly compounding, which in turn is better than annual compounding."
        }
      },
      {
        "@type": "Question",
        "name": "What is the Rule of 72?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Rule of 72 is a quick way to estimate how long it will take for your money to double at a fixed annual interest rate. Simply divide 72 by your interest rate."
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
        {/* Header */}
        <div className="max-w-4xl mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">
            Compound Interest Calculator
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Compound interest is often called the "eighth wonder of the world." Use our professional calculator to see how small, consistent investments can grow into a significant nest egg over time.
          </p>
        </div>

        {/* Calculator */}
        <div className="mb-20">
          <Suspense fallback={<div className="h-[600px] w-full flex items-center justify-center border rounded-2xl bg-slate-50 text-muted-foreground animate-pulse">Loading calculator...</div>}><CompoundInterestCalculator /></Suspense>
        </div>

        {/* Educational Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {/* What is Compound Interest? */}
            <section id="what-is-it">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Info className="text-primary h-8 w-8" />
                What Is Compound Interest?
              </h2>
              <div className="prose prose-slate max-w-none text-muted-foreground space-y-4">
                <p>
                  Compound interest is the interest calculated on the initial principal, which also includes all of the accumulated interest from previous periods. Unlike simple interest, which is only calculated on the principal amount, compound interest allows your wealth to grow exponentially.
                </p>
                <p>
                  In simpler terms, it's "interest on interest." Over long periods, this compounding effect can lead to dramatic growth in your savings, even if you only start with a small amount.
                </p>
                <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 text-slate-900 not-prose">
                  <h4 className="font-bold mb-2 flex items-center gap-2">
                      <Lightbulb className="text-amber-500 h-5 w-5" />
                      Key Takeaway
                  </h4>
                  <p className="text-sm">The two most important factors in compound interest are <strong>time</strong> and <strong>consistency</strong>. Starting early gives your money more time to compound, which is often more valuable than the total amount you contribute.</p>
                </div>
              </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="text-primary h-8 w-8" />
                How Does Compound Interest Work?
              </h2>
              <div className="prose prose-slate max-w-none text-muted-foreground space-y-4">
                <p>
                  The power of compound interest depends on three primary variables:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Principal:</strong> The initial amount of money you invest.</li>
                  <li><strong>Interest Rate:</strong> The annual percentage rate at which your money grows.</li>
                  <li><strong>Compounding Frequency:</strong> How often interest is added back to your balance (daily, monthly, annually).</li>
                </ul>
                <p>
                  As interest is added to your account, your balance increases. In the next period, interest is calculated based on this new, higher balance. This cycle repeats, causing your wealth to grow faster and faster over time.
                </p>
              </div>
            </section>

            {/* The Formula */}
            <section id="formula">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <BookOpen className="text-primary h-8 w-8" />
                The Compound Interest Formula
              </h2>
              <div className="prose prose-slate max-w-none text-muted-foreground">
                <p>The standard formula for compound interest is:</p>
                <div className="bg-slate-100 p-8 rounded-xl text-center my-6 overflow-x-auto">
                  <code className="text-2xl font-bold text-slate-800">A = P(1 + r/n)^(nt)</code>
                </div>
                <p>Where:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>A</strong> = the future value of the investment/loan, including interest</li>
                  <li><strong>P</strong> = the principal investment amount</li>
                  <li><strong>r</strong> = the annual interest rate (decimal)</li>
                  <li><strong>n</strong> = the number of times that interest is compounded per unit t</li>
                  <li><strong>t</strong> = the time the money is invested or borrowed for</li>
                </ul>
              </div>
            </section>

            {/* FAQ Section */}
            <section id="faq">
              <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
              <Accordion className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is the difference between simple and compound interest?</AccordionTrigger>
                  <AccordionContent>
                    Simple interest is calculated only on the principal amount. Compound interest is calculated on the principal plus any interest already earned. Over time, compound interest grows much faster than simple interest.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How often should I compound my interest?</AccordionTrigger>
                  <AccordionContent>
                    The more frequently interest is compounded, the faster your money grows. For example, daily compounding will result in slightly more interest than monthly compounding, which in turn is better than annual compounding.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>What is the Rule of 72?</AccordionTrigger>
                  <AccordionContent>
                    The Rule of 72 is a quick way to estimate how long it will take for your money to double at a fixed annual interest rate. Simply divide 72 by your interest rate. For example, at a 6% return, your money will double in approximately 12 years (72 / 6 = 12).
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Try Other Calculators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-2">
                  <a href="/calculators/retirement" className="text-sm font-medium hover:text-primary transition-colors">Retirement Planner</a>
                  <a href="/calculators/mortgage" className="text-sm font-medium hover:text-primary transition-colors">Mortgage Calculator</a>
                  <a href="/calculators/savings-goal" className="text-sm font-medium hover:text-primary transition-colors">Savings Goal Calculator</a>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="text-lg text-white">Expert Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm opacity-90 leading-relaxed">
                  {"\"Don't wait to start investing. Because of compounding, a 25-year-old who invests $5,000 a year for 10 years and then stops will often have more at retirement than someone who starts at 35 and invests $5,000 every year for 30 years.\""}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompoundInterestPage;
