import React from 'react';
import DebtPayoffCalculator from '@/components/calculators/DebtPayoffCalculator';
import { Metadata } from 'next';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Target, Zap, TrendingDown } from 'lucide-react';
import JSONLD from '@/components/JSONLD';

export const metadata: Metadata = {
  title: 'Debt Payoff Calculator | Free Debt Freedom Tool',
  description: 'Find out exactly how long it will take to pay off your credit cards or loans. Compare monthly payments and see how much interest you can save with our free debt payoff tool.',
  keywords: 'debt payoff calculator, credit card payoff, debt reduction tool, debt avalanche, debt snowball, financial freedom',
  openGraph: {
    title: 'Debt Payoff Calculator | Finance Calculator Hub',
    description: 'Visualize your path to financial freedom. Calculate how long it takes to pay off your debt.',
    type: 'website',
    url: 'https://financecalcuhub.com/calculators/debt-payoff',
    siteName: 'Finance Calculator Hub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Debt Payoff Calculator | Finance Calculator Hub',
    description: 'Plan your debt payoff with our free professional tool.',
  },
  alternates: {
    canonical: 'https://financecalcuhub.com/calculators/debt-payoff',
  },
};

const DebtPayoffPage = () => {
  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "Debt Payoff Calculator",
    "description": "Calculate months to payoff for credit cards and loans based on monthly payments and interest rates.",
    "url": "https://financecalcuhub.com/calculators/debt-payoff",
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
        "name": "Debt Payoff Calculator",
        "item": "https://financecalcuhub.com/calculators/debt-payoff"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the difference between Debt Snowball and Debt Avalanche?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Debt Snowball focuses on paying off the smallest balances first for momentum. Debt Avalanche focuses on the highest interest rates first to save the most money."
        }
      },
      {
        "@type": "Question",
        "name": "Should I consolidate my debt?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Debt consolidation can be useful if you can secure a lower interest rate, but it only works if you avoid adding new debt."
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
            Debt Payoff Calculator
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Taking control of your debt starts with a clear plan. Use our calculator to visualize your path to financial freedom and see how increasing your monthly payment can save you thousands in interest.
          </p>
        </div>

        <div className="mb-20">
          <DebtPayoffCalculator />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section id="explanation">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Info className="text-primary h-8 w-8" />
                How the Calculator Works
              </h2>
              <div className="prose prose-slate max-w-none text-muted-foreground space-y-4">
                <p>
                  Our debt payoff tool uses a standard declining balance formula. Each month, your payment is split between the interest charged (based on your current balance and rate) and the principal balance itself.
                </p>
                <p>
                  By adjusting your monthly payment, you can immediately see the "payoff acceleration" effect. Even an extra $50 or $100 a month can significantly reduce the number of months you'll be in debt.
                </p>
              </div>
            </section>

            <section id="strategies">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Target className="text-primary h-8 w-8" />
                Proven Debt Payoff Strategies
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
                  <Card>
                      <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-lg">
                              <Zap className="h-5 w-5 text-amber-500" />
                              Debt Snowball
                          </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                          Pay off your smallest debts first to gain psychological momentum. Once the smallest is gone, roll that payment into the next smallest.
                      </CardContent>
                  </Card>
                  <Card>
                      <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-lg">
                              <TrendingDown className="h-5 w-5 text-emerald-500" />
                              Debt Avalanche
                          </CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                          Focus all extra payments on the debt with the highest interest rate. This is mathematically the fastest and cheapest way to pay off debt.
                      </CardContent>
                  </Card>
              </div>
            </section>

            <section id="faq">
              <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
              <Accordion className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is a "debt-to-income" ratio?</AccordionTrigger>
                  <AccordionContent>
                    Your DTI is the percentage of your gross monthly income that goes toward paying debts. Lenders use this to measure your ability to manage monthly payments and repay loans.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Should I consolidate my debt?</AccordionTrigger>
                  <AccordionContent>
                    Debt consolidation can be useful if you can get a lower interest rate than your current average. However, it only works if you stop adding new debt to the cards you just cleared.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is it better to save or pay off debt?</AccordionTrigger>
                  <AccordionContent>
                    Generally, if your debt's interest rate is higher than what you can earn on your savings (which is usually true for credit cards), paying off the debt is the better financial move. However, you should always keep a small emergency fund.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>How does debt affect my credit score?</AccordionTrigger>
                  <AccordionContent>
                    The amount of debt you owe (credit utilization) makes up about 30% of your FICO score. Paying down balances is one of the fastest ways to improve your credit score.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
          </div>

          <div className="space-y-8">
            <Card className="bg-red-50 border-red-100">
              <CardHeader>
                <CardTitle className="text-lg text-red-900">Interest Warning</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-red-800 leading-relaxed">
                If your interest rate is 20% or higher, a huge portion of your "minimum payment" is going straight to the bank as interest. Try to pay even a small amount above the minimum to see your progress accelerate.
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Related Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-2">
                  <a href="/calculators/budget" className="text-sm font-medium hover:text-primary transition-colors">Budget Calculator</a>
                  <a href="/calculators/net-worth" className="text-sm font-medium hover:text-primary transition-colors">Net Worth Calculator</a>
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

export default DebtPayoffPage;
