import { Suspense } from "react";
import React from 'react';
import AutoLoanCalculator from '@/components/calculators/AutoLoanCalculator';
import { Metadata } from 'next';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Car, Wallet, AlertCircle } from 'lucide-react';
import JSONLD from '@/components/JSONLD';

export const metadata: Metadata = {
  title: 'Auto Loan Calculator | Free Car Payment Tool',
  description: 'Calculate your monthly car loan payments. Account for vehicle price, down payment, interest rates, and sales tax to find your total cost of ownership with our free auto loan tool.',
  keywords: 'auto loan calculator, car payment calculator, vehicle finance tool, car loan interest, monthly car payment',
  openGraph: {
    title: 'Auto Loan Calculator | Finance Calculator Hub',
    description: 'Estimate your monthly car payments and understand the total cost of financing your next vehicle.',
    type: 'website',
    url: 'https://financecalcuhub.com/calculators/auto-loan',
    siteName: 'Finance Calculator Hub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auto Loan Calculator | Finance Calculator Hub',
    description: 'Calculate your car loan payments with our free professional tool.',
  },
  alternates: {
    canonical: 'https://financecalcuhub.com/calculators/auto-loan',
  },
};

const AutoLoanPage = () => {
  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "Auto Loan Calculator",
    "description": "Calculate monthly car loan payments including sales tax and total interest.",
    "url": "https://financecalcuhub.com/calculators/auto-loan",
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
        "name": "Auto Loan Calculator",
        "item": "https://financecalcuhub.com/calculators/auto-loan"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a good interest rate for a car loan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Good rates vary based on the economy and your credit score. Generally, anything below the national average for your credit tier is considered good."
        }
      },
      {
        "@type": "Question",
        "name": "Can I pay off my auto loan early?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most modern auto loans do not have prepayment penalties. Paying early saves you money on interest."
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
            Auto Loan Calculator
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Estimate your monthly car payments and understand the total cost of financing your next vehicle. Our tool helps you compare different loan terms and interest rates easily.
          </p>
        </div>

        <div className="mb-20">
          <Suspense fallback={<div>Loading calculator...</div>}><Suspense fallback={<div className="h-[600px] w-full flex items-center justify-center border rounded-2xl bg-slate-50 text-muted-foreground animate-pulse">Loading calculator...</div>}><AutoLoanCalculator /></Suspense></Suspense>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section id="explanation">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Info className="text-primary h-8 w-8" />
                How to Use the Auto Loan Calculator
              </h2>
              <div className="prose prose-slate max-w-none text-muted-foreground space-y-4">
                <p>
                  To get the most accurate payment estimate, you'll need a few key numbers. Here's what they mean:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Vehicle Price:</strong> The negotiated price of the car before taxes and fees.</li>
                  <li><strong>Down Payment:</strong> The cash amount you pay upfront. Trade-in equity can also be included here.</li>
                  <li><strong>Interest Rate:</strong> The annual percentage rate (APR) charged by the lender.</li>
                  <li><strong>Loan Term:</strong> The length of the loan in months (e.g., 60 months is 5 years).</li>
                  <li><strong>Sales Tax:</strong> The tax rate in your state or locality. This is often added to the loan amount.</li>
                </ul>
              </div>
            </section>

            <section id="tips">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <AlertCircle className="text-primary h-8 w-8" />
                Financing Tips
              </h2>
              <div className="prose prose-slate max-w-none text-muted-foreground space-y-4">
                <p>
                  When financing a car, small decisions can save you thousands of dollars. Consider these strategies:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Aim for 20% down:</strong> This helps prevent you from becoming "upside down" (owing more than the car is worth).</li>
                  <li><strong>Check your credit:</strong> A higher credit score typically qualifies you for lower interest rates.</li>
                  <li><strong>Shop around:</strong> Get quotes from banks and credit unions before going to the dealership.</li>
                  <li><strong>Shorten the term:</strong> While longer terms (72-84 months) have lower monthly payments, they cost much more in total interest.</li>
                </ul>
              </div>
            </section>

            <section id="faq">
              <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
              <Accordion className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is a good interest rate for a car loan?</AccordionTrigger>
                  <AccordionContent>
                    "Good" rates vary based on the economy and your credit score. Generally, anything below the national average (which fluctuates) is considered good. Rates for new cars are typically lower than for used cars.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Can I pay off my auto loan early?</AccordionTrigger>
                  <AccordionContent>
                    Most modern auto loans do not have prepayment penalties, but you should always check your contract. Paying early saves you money on interest.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Should I lease or buy?</AccordionTrigger>
                  <AccordionContent>
                    Buying is generally better for long-term wealth because you eventually own the asset. Leasing has lower monthly payments but you never build equity and often have mileage limits.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>What is "Gap Insurance"?</AccordionTrigger>
                  <AccordionContent>
                    Gap insurance covers the "gap" between what you owe on your loan and the actual cash value of your car if it's totaled or stolen. It's most useful if you have a low down payment.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
          </div>

          <div className="space-y-8">
            <Card className="bg-slate-900 text-white border-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-primary" />
                  Budgeting Rule
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm opacity-90 leading-relaxed">
                Consider the **20/4/10 rule**: Put **20%** down, finance for no more than **4** years, and keep total transportation costs (payment + insurance + gas) under **10%** of your monthly income.
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Other Calculators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-2">
                  <a href="/calculators/debt-payoff" className="text-sm font-medium hover:text-primary transition-colors">Debt Payoff Calculator</a>
                  <a href="/calculators/budget" className="text-sm font-medium hover:text-primary transition-colors">Budget Calculator</a>
                  <a href="/calculators/net-worth" className="text-sm font-medium hover:text-primary transition-colors">Net Worth Calculator</a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AutoLoanPage;
