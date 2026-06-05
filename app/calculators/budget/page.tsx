import React from 'react';
import BudgetCalculator from '@/components/calculators/BudgetCalculator';
import { Metadata } from 'next';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, PieChart, Lightbulb, CheckCircle } from 'lucide-react';
import JSONLD from '@/components/JSONLD';

export const metadata: Metadata = {
  title: 'Budget Calculator | Free Monthly Expense Tracker',
  description: 'Take control of your finances with our free budget calculator. Track your income and expenses, find your savings rate, and optimize your monthly spending with our professional tool.',
  keywords: 'budget calculator, expense tracker, monthly budget tool, savings rate calculator, personal finance planner',
  openGraph: {
    title: 'Budget Calculator | Finance Calculator Hub',
    description: 'Visualize your spending and optimize your monthly budget. Take control of your money today.',
    type: 'website',
    url: 'https://financecalcuhub.com/calculators/budget',
    siteName: 'Finance Calculator Hub',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Budget Calculator | Finance Calculator Hub',
    description: 'Track your expenses and plan your budget with our free professional tool.',
  },
  alternates: {
    canonical: 'https://financecalcuhub.com/calculators/budget',
  },
};

const BudgetPage = () => {
  const calculatorSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialCalculator",
    "name": "Budget Calculator",
    "description": "Calculate monthly expenses, net savings, and savings rate based on income and various expense categories.",
    "url": "https://financecalcuhub.com/calculators/budget",
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
        "name": "Budget Calculator",
        "item": "https://financecalcuhub.com/calculators/budget"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is a good savings rate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most experts recommend saving at least 15-20% of your income. However, starting with any amount is better than zero."
        }
      },
      {
        "@type": "Question",
        "name": "What is the 50/30/20 Rule?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The 50/30/20 rule suggests allocating 50% of your income to Needs, 30% to Wants, and 20% to Savings and debt repayment."
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
            Budget Calculator
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A budget is telling your money where to go instead of wondering where it went. Use our tool to visualize your spending and ensure you're prioritizing your financial goals.
          </p>
        </div>

        <div className="mb-20">
          <BudgetCalculator />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section id="how-to-budget">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Info className="text-primary h-8 w-8" />
                How to Create a Budget
              </h2>
              <div className="prose prose-slate max-w-none text-muted-foreground space-y-4">
                <p>
                  Creating a budget is the foundation of personal finance. Follow these steps to get started:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>List Your Income:</strong> Start with your take-home pay (after taxes).</li>
                  <li><strong>Track Fixed Expenses:</strong> These are bills that stay the same every month, like rent or insurance.</li>
                  <li><strong>Track Variable Expenses:</strong> These change, like groceries, gas, and entertainment.</li>
                  <li><strong>Subtract Expenses from Income:</strong> If the result is positive, you're saving money. If it's negative, you're overspending.</li>
                  <li><strong>Adjust and Optimize:</strong> Look for categories where you can cut back to increase your savings.</li>
                </ul>
              </div>
            </section>

            <section id="methods">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <PieChart className="text-primary h-8 w-8" />
                Popular Budgeting Methods
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose">
                  <Card>
                      <CardHeader>
                          <CardTitle className="text-lg">The 50/30/20 Rule</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                          Allocate 50% of your income to **Needs**, 30% to **Wants**, and 20% to **Savings** and debt repayment.
                      </CardContent>
                  </Card>
                  <Card>
                      <CardHeader>
                          <CardTitle className="text-lg">Zero-Based Budgeting</CardTitle>
                      </CardHeader>
                      <CardContent className="text-sm text-muted-foreground">
                          Give every dollar a job. Your income minus expenses (including savings) should equal exactly zero at the end of the month.
                      </CardContent>
                  </Card>
              </div>
            </section>

            <section id="faq">
              <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
              <Accordion className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is a good savings rate?</AccordionTrigger>
                  <AccordionContent>
                    Most experts recommend saving at least 15-20% of your income. However, any amount is better than zero. If you're just starting, aim for 5% and gradually increase it.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>How often should I review my budget?</AccordionTrigger>
                  <AccordionContent>
                    You should check your budget at least once a month. This helps you catch overspending early and adjust your plans for the following month.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>What if I have an irregular income?</AccordionTrigger>
                  <AccordionContent>
                    Budget based on your lowest expected monthly income. Any "extra" money you make can then be put directly toward savings or debt repayment.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Should I include taxes in my budget?</AccordionTrigger>
                  <AccordionContent>
                    It's usually easiest to budget using your "net" (post-tax) income, as that's the money you actually have available to spend and save.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>
          </div>

          <div className="space-y-8">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  Budget Tip
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm opacity-90 leading-relaxed">
                Automate your savings! Set up a recurring transfer from your checking account to your savings account on payday. This ensures you "pay yourself first."
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Related Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-2">
                  <a href="/calculators/net-worth" className="text-sm font-medium hover:text-primary transition-colors">Net Worth Calculator</a>
                  <a href="/calculators/debt-payoff" className="text-sm font-medium hover:text-primary transition-colors">Debt Payoff Calculator</a>
                  <a href="/calculators/savings-goal" className="text-sm font-medium hover:text-primary transition-colors">Savings Goal Calculator</a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default BudgetPage;
