import { Suspense } from "react";
import React from 'react';
import MortgageCalculator from '@/components/calculators/MortgageCalculator';
import { Metadata } from 'next';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Home, CreditCard, Landmark } from 'lucide-react';
import JSONLD from '@/components/JSONLD';

export const metadata: Metadata = {
  title: 'Mortgage Calculator | Free Home Loan Payment Tool',
  description: 'Calculate your monthly mortgage payments, including property tax and insurance. See your amortization schedule and total interest paid over the life of the loan with our professional mortgage tool.',
  keywords: 'mortgage calculator, home loan calculator, monthly mortgage payment, amortization schedule, house affordability',
  openGraph: {
    title: 'Mortgage Calculator | Finance Calculator Hub',
    description: 'Estimate your monthly mortgage payments and plan your home purchase with confidence.',
    type: 'website',
    url: 'https://financecalcuhub.com/calculators/mortgage',
    siteName: 'Finance Calculator Hub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mortgage Calculator | Finance Calculator Hub',
    description: 'Calculate your home loan payments with our free professional tool.',
  },
  alternates: {
    canonical: 'https://financecalcuhub.com/calculators/mortgage',
  },
};

const MortgagePage = () => {
  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "Mortgage Calculator",
    "description": "Calculate monthly mortgage payments including PITI (Principal, Interest, Taxes, and Insurance).",
    "url": "https://financecalcuhub.com/calculators/mortgage",
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
        "name": "Mortgage Calculator",
        "item": "https://financecalcuhub.com/calculators/mortgage"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is PITI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "PITI stands for Principal, Interest, Taxes, and Insurance. These are the four main components of a monthly mortgage payment."
        }
      },
      {
        "@type": "Question",
        "name": "Should I choose a 15-year or 30-year mortgage?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A 30-year mortgage offers lower monthly payments but costs more in total interest. A 15-year mortgage has higher monthly payments but saves significantly on interest over time."
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
            Mortgage Calculator
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Estimate your monthly mortgage payments and see the full breakdown of your loan over time. Plan your home purchase with confidence using our professional mortgage tool.
          </p>
        </div>

        <div className="mb-20">
          <Suspense fallback={<div className="h-[600px] w-full flex items-center justify-center border rounded-2xl bg-slate-50 text-muted-foreground animate-pulse">Loading calculator...</div>}><MortgageCalculator /></Suspense>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section id="how-to-use">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Info className="text-primary h-8 w-8" />
                How to Use the Mortgage Calculator
              </h2>
              <div className="prose prose-slate max-w-none text-muted-foreground space-y-4">
                <p>
                  Our mortgage calculator provides a comprehensive look at your potential monthly costs. To get an accurate estimate, you'll need a few key pieces of information:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Home Price:</strong> The total purchase price of the home.</li>
                  <li><strong>Down Payment:</strong> The amount of cash you'll pay upfront. A 20% down payment is standard to avoid PMI (Private Mortgage Insurance).</li>
                  <li><strong>Interest Rate:</strong> The annual interest rate for your loan.</li>
                  <li><strong>Loan Term:</strong> The length of the loan, typically 15 or 30 years.</li>
                  <li><strong>Property Tax & Insurance:</strong> Annual estimates for these recurring costs, which are often bundled into your monthly payment via an escrow account.</li>
                </ul>
              </div>
            </section>

            <section id="amortization">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Landmark className="text-primary h-8 w-8" />
                Understanding Amortization
              </h2>
              <div className="prose prose-slate max-w-none text-muted-foreground space-y-4">
                <p>
                  Amortization is the process of paying off a debt over time through regular payments. In the early years of a mortgage, a large portion of your monthly payment goes toward interest. As the balance decreases, more of your payment goes toward the principal.
                </p>
                <p>
                  Use the "Amortization" tab in the calculator to see exactly how your balance decreases and how much interest you pay each year.
                </p>
              </div>
            </section>

            <section id="faq">
              <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
              <Accordion className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is PITI?</AccordionTrigger>
                  <AccordionContent>
                    PITI stands for Principal, Interest, Taxes, and Insurance. These are the four main components of a monthly mortgage payment. Principal and Interest go to the lender, while Taxes and Insurance are typically held in an escrow account.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Should I choose a 15-year or 30-year mortgage?</AccordionTrigger>
                  <AccordionContent>
                    A 30-year mortgage offers lower monthly payments but costs much more in total interest over time. A 15-year mortgage has higher monthly payments but allows you to pay off the home faster and save significantly on interest.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How much house can I afford?</AccordionTrigger>
                  <AccordionContent>
                    Most financial experts recommend that your total housing costs (PITI) should not exceed 28% of your gross monthly income. This is known as the "front-end ratio."
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>What is PMI?</AccordionTrigger>
                  <AccordionContent>
                    Private Mortgage Insurance (PMI) is usually required if your down payment is less than 20% of the home's purchase price. It protects the lender if you default on the loan.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
          </div>

          <div className="space-y-8">
            <Card className="bg-slate-50 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-primary" />
                  Home Buying Tip
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm opacity-90 leading-relaxed">
                Don't forget to budget for closing costs! These typically range from 2% to 5% of the purchase price and are paid at the time of purchase.
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Related Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-2">
                  <a href="/calculators/budget" className="text-sm font-medium hover:text-primary transition-colors">Budget Calculator</a>
                  <a href="/calculators/debt-payoff" className="text-sm font-medium hover:text-primary transition-colors">Debt Payoff Calculator</a>
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

export default MortgagePage;
