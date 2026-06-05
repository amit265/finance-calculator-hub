import { Suspense } from "react";
import React from 'react';
import RetirementCalculator from '@/components/calculators/RetirementCalculator';
import { Metadata } from 'next';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, TrendingUp, Wallet, ShieldCheck } from 'lucide-react';
import JSONLD from '@/components/JSONLD';

export const metadata: Metadata = {
  title: 'Retirement Calculator | Free Retirement Planner Tool',
  description: 'Plan your retirement with our free calculator. Estimate your future balance, monthly income, and see if you are on track for your golden years with interactive growth projections.',
  keywords: 'retirement calculator, retirement planner, 401k calculator, pension planner, financial planning for retirement',
  openGraph: {
    title: 'Retirement Calculator | Finance Calculator Hub',
    description: 'Calculate your retirement nest egg and estimated monthly income. Plan your future today.',
    type: 'website',
    url: 'https://financecalcuhub.com/calculators/retirement',
    siteName: 'Finance Calculator Hub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Retirement Calculator | Finance Calculator Hub',
    description: 'Plan your retirement with our free professional tool.',
  },
  alternates: {
    canonical: 'https://financecalcuhub.com/calculators/retirement',
  },
};

const RetirementPage = () => {
  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "Retirement Calculator",
    "description": "Project your retirement savings and estimated monthly income based on current savings and contributions.",
    "url": "https://financecalcuhub.com/calculators/retirement",
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
        "name": "Retirement Calculator",
        "item": "https://financecalcuhub.com/calculators/retirement"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much should I save for retirement?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A common rule of thumb is to aim for 15% of your gross income. However, this depends on your age, current savings, and desired lifestyle."
        }
      },
      {
        "@type": "Question",
        "name": "What is the 4% Rule?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The 4% rule suggests that you can safely withdraw 4% of your retirement nest egg in the first year of retirement, adjusted for inflation annually thereafter."
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
            Retirement Calculator
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Planning for retirement is one of the most important financial goals you&apos;ll ever have. Use our calculator to project your savings and estimate your future monthly income.
          </p>
        </div>

        <div className="mb-20">
          <Suspense fallback={<div className="h-[600px] w-full flex items-center justify-center border rounded-2xl bg-slate-50 text-muted-foreground animate-pulse">Loading calculator...</div>}><RetirementCalculator /></Suspense>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section id="explanation">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Info className="text-primary h-8 w-8" />
                How to Use the Retirement Calculator
              </h2>
              <div className="prose prose-slate max-w-none text-muted-foreground space-y-4">
                <p>
                  Our retirement calculator helps you visualize your financial future. By inputting your current age, planned retirement age, and current savings, you can see how consistent contributions and market returns work together to build your nest egg.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Current Age:</strong> Your starting point. The earlier you start, the better.</li>
                  <li><strong>Retirement Age:</strong> The age you plan to stop working.</li>
                  <li><strong>Current Savings:</strong> Any money you&apos;ve already set aside for retirement.</li>
                  <li><strong>Monthly Contribution:</strong> How much you plan to save each month going forward.</li>
                  <li><strong>Expected Return:</strong> The annual percentage you expect your investments to grow (historically, the stock market averages 7-10% before inflation).</li>
                </ul>
              </div>
            </section>

            <section id="why-it-matters">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="text-primary h-8 w-8" />
                Why Retirement Planning Matters
              </h2>
              <div className="prose prose-slate max-w-none text-muted-foreground space-y-4">
                <p>
                  Inflation reduces the purchasing power of your money over time. To maintain your current lifestyle in 20 or 30 years, you will need a significantly larger sum of money than you might expect. Retirement planning allows you to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Take advantage of compound interest over decades.</li>
                  <li>Prepare for healthcare costs in your later years.</li>
                  <li>Ensure you don&apos;t outlive your money.</li>
                  <li>Gain peace of mind knowing you have a plan in place.</li>
                </ul>
              </div>
            </section>

            <section id="faq">
              <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
              <Accordion className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How much should I save for retirement?</AccordionTrigger>
                  <AccordionContent>
                    A common rule of thumb is to aim for 15% of your gross income. However, this depends on your age, current savings, and desired lifestyle. Use this calculator to see if your current savings rate meets your specific goals.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>What is the &quot;4% Rule&quot;?</AccordionTrigger>
                  <AccordionContent>
                    The 4% rule suggests that you can safely withdraw 4% of your retirement nest egg in the first year of retirement, and adjust that amount for inflation every year thereafter, with a high probability that your money will last for 30 years.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Should I account for Social Security?</AccordionTrigger>
                  <AccordionContent>
                    Yes, Social Security will likely provide a baseline of income, but for most people, it won&apos;t be enough to maintain their pre-retirement lifestyle. It&apos;s often best to plan your private savings first and treat Social Security as a &quot;bonus&quot; or a safety net.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>What happens if I start late?</AccordionTrigger>
                  <AccordionContent>
                    If you start later, you&apos;ll need to save a larger percentage of your income to reach the same goal. However, it&apos;s never too late to start. Even 10 or 15 years of consistent saving can make a massive difference.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
          </div>

          <div className="space-y-8">
            <Card className="bg-slate-900 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                  Planning Tip
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm opacity-90 leading-relaxed">
                &quot;The best time to plant a tree was 20 years ago. The second best time is now.&quot; This applies perfectly to retirement savings. Don&apos;t wait for the &quot;perfect&quot; time to start; start with whatever you can today.
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Related Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-2">
                  <a href="/calculators/compound-interest" className="text-sm font-medium hover:text-primary transition-colors">Compound Interest Calculator</a>
                  <a href="/calculators/net-worth" className="text-sm font-medium hover:text-primary transition-colors">Net Worth Calculator</a>
                  <a href="/calculators/budget" className="text-sm font-medium hover:text-primary transition-colors">Budget Calculator</a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default RetirementPage;
