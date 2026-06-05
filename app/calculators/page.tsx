import Link from "next/link";
import { TrendingUp, Home, PiggyBank, CreditCard, Wallet, BarChart3, Info, Landmark } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const calculatorCategories = [
  {
    name: "Investing",
    description: "Grow your wealth with smart investment planning.",
    icon: TrendingUp,
    calculators: [
      {
        name: "Compound Interest",
        description: "Calculate how your money grows over time with compounding interest.",
        href: "/calculators/compound-interest",
      },
      {
        name: "Simple Interest",
        description: "Quickly calculate interest on short-term loans or basic investments.",
        href: "/calculators/simple-interest",
      },
      {
        name: "Investment Growth",
        description: "Project the future value of your investment portfolio.",
        href: "/calculators/investment-growth",
      },
      {
        name: "Savings Goal",
        description: "Find out how much you need to save to reach your target.",
        href: "/calculators/savings-goal",
      },
      {
        name: "Inflation Calculator",
        description: "See how inflation affects the purchasing power of your money.",
        href: "/calculators/inflation",
      },
    ],
  },
  {
    name: "Retirement",
    description: "Ensure a comfortable and secure retirement.",
    icon: PiggyBank,
    calculators: [
      {
        name: "Retirement Planner",
        description: "Plan your future and see if you're on track for retirement.",
        href: "/calculators/retirement",
      },
      {
        name: "FIRE Calculator",
        description: "Calculate when you can reach Financial Independence & Retire Early.",
        href: "/calculators/fire",
      },
      {
        name: "401(k) Calculator",
        description: "Maximize your employer-sponsored retirement savings.",
        href: "/calculators/401k",
      },
    ],
  },
  {
    name: "Loans & Mortgages",
    description: "Manage your debt and plan for major purchases.",
    icon: Home,
    calculators: [
      {
        name: "Mortgage Calculator",
        description: "Estimate your monthly mortgage payments and total interest.",
        href: "/calculators/mortgage",
      },
      {
        name: "Auto Loan Calculator",
        description: "Plan your next car purchase with accurate payment estimates.",
        href: "/calculators/auto-loan",
      },
      {
        name: "Debt Payoff",
        description: "Find the fastest way to pay off your debts.",
        href: "/calculators/debt-payoff",
      },
    ],
  },
  {
    name: "Personal Finance",
    description: "Take control of your daily money management.",
    icon: Wallet,
    calculators: [
      {
        name: "Budget Calculator",
        description: "Track your spending and optimize your monthly budget.",
        href: "/calculators/budget",
      },
      {
        name: "Net Worth Calculator",
        description: "Track your assets and liabilities to find your net worth.",
        href: "/calculators/net-worth",
      },
      {
        name: "Emergency Fund",
        description: "Calculate how much you need for a rainy day fund.",
        href: "/calculators/emergency-fund",
      },
    ],
  },
];

export default function CalculatorsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Financial Calculators</h1>
        <p className="text-xl text-muted-foreground">
          Explore our suite of professional-grade financial tools designed to help you plan, save, and invest smarter.
        </p>
      </div>

      <div className="space-y-16">
        {calculatorCategories.map((category) => (
          <section key={category.name}>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-primary/10 rounded-lg">
                <category.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{category.name}</h2>
                <p className="text-muted-foreground">{category.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.calculators.map((calc) => (
                <Card key={calc.name} className="group hover:border-primary/50 transition-colors">
                  <Link href={calc.href}>
                    <CardHeader>
                      <CardTitle className="group-hover:text-primary transition-colors">{calc.name}</CardTitle>
                      <CardDescription>{calc.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm font-medium text-primary flex items-center">
                        Open Calculator
                        <BarChart3 className="ml-2 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
