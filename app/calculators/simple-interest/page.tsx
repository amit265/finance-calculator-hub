import { Suspense } from "react";
import React from 'react';
import SimpleInterestCalculator from '@/components/calculators/SimpleInterestCalculator';
import { Metadata } from 'next';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Calculator, Lightbulb, BookOpen } from 'lucide-react';
import JSONLD from '@/components/JSONLD';

export const metadata: Metadata = {
  title: 'Simple Interest Calculator | Free Financial Tool',
  description: 'Calculate simple interest on loans or investments with our free tool. See the total interest earned or paid over any time period with interactive charts and breakdowns.',
  keywords: 'simple interest calculator, interest calculator, loan interest, investment interest, simple interest formula',
  openGraph: {
    title: 'Simple Interest Calculator | Finance Calculator Hub',
    description: 'Calculate interest quickly and easily with our professional simple interest calculator.',
    type: 'website',
    url: 'https://financecalcuhub.com/calculators/simple-interest',
    siteName: 'Finance Calculator Hub',
  },
};

const SimpleInterestPage = () => {
  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "Simple Interest Calculator",
    "description": "Calculate simple interest based on principal, rate, and time.",
    "url": "https://financecalcuhub.com/calculators/simple-interest",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All"
  };

  return (
    <>
      <JSONLD data={calculatorSchema} />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">
            Simple Interest Calculator
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Need to calculate interest on a short-term loan or a basic investment? Our simple interest calculator provides instant results with detailed breakdowns and growth charts.
          </p>
        </div>

        <div className="mb-20">
          <Suspense fallback={<div className="h-[600px] w-full flex items-center justify-center border rounded-2xl bg-slate-50 text-muted-foreground animate-pulse">Loading calculator...</div>}><SimpleInterestCalculator /></Suspense>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section id="what-is-simple-interest">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Info className="text-primary h-8 w-8" />
                What is Simple Interest?
              </h2>
              <div className="prose prose-slate max-w-none text-muted-foreground space-y-4">
                <p>
                  Simple interest is a quick and easy method of calculating the interest charge on a loan. It is determined by multiplying the daily interest rate by the principal by the number of days that elapse between payments.
                </p>
                <p>
                  Unlike compound interest, which calculates interest on both the principal and the interest accumulated from previous periods, simple interest is only calculated on the original principal amount.
                </p>
              </div>
            </section>

            <section id="formula">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <BookOpen className="text-primary h-8 w-8" />
                The Simple Interest Formula
              </h2>
              <div className="prose prose-slate max-w-none text-muted-foreground space-y-4">
                <p>The standard formula for calculating simple interest is:</p>
                <div className="bg-slate-100 p-8 rounded-xl text-center my-6">
                  <code className="text-2xl font-bold text-slate-800">I = P × r × t</code>
                </div>
                <p>Where:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>I</strong> = The total amount of interest.</li>
                  <li><strong>P</strong> = The principal amount (the initial amount of money).</li>
                  <li><strong>r</strong> = The annual interest rate (decimal).</li>
                  <li><strong>t</strong> = The time the money is invested or borrowed for (in years).</li>
                </ul>
              </div>
            </section>

            <section id="faq">
              <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
              <Accordion className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>When is simple interest used?</AccordionTrigger>
                  <AccordionContent>
                    Simple interest is commonly used for short-term loans, automobile loans, and certain types of consumer credit. Many basic savings accounts also use simple interest logic if they don&apos;t offer compounding.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How is it different from compound interest?</AccordionTrigger>
                  <AccordionContent>
                    The main difference is that simple interest only applies to the principal, while compound interest applies to the principal plus any previously earned interest. Over time, compound interest will always result in a higher balance than simple interest.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Related Calculators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-2">
                  <a href="/calculators/compound-interest" className="text-sm font-medium hover:text-primary transition-colors">Compound Interest Calculator</a>
                  <a href="/calculators/savings-goal" className="text-sm font-medium hover:text-primary transition-colors">Savings Goal Calculator</a>
                  <a href="/calculators/mortgage" className="text-sm font-medium hover:text-primary transition-colors">Mortgage Calculator</a>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle className="text-lg text-white">Pro Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm opacity-90 leading-relaxed">
                  Always check if your loan uses &apos;simple&apos; or &apos;compound&apos; interest. Simple interest loans are generally cheaper for the borrower because you don&apos;t pay interest on the interest!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default SimpleInterestPage;
