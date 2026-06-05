import Link from "next/link";
import { TrendingUp, Home, PiggyBank, Wallet, BarChart3, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const calculatorCategories = [
  {
    name: "Investing",
    description: "Grow your wealth with smart investment planning.",
    icon: TrendingUp,
    color: "text-primary",
    bgColor: "bg-primary/10",
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
    ],
  },
  {
    name: "Retirement",
    description: "Ensure a comfortable and secure retirement.",
    icon: PiggyBank,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    calculators: [
      {
        name: "Retirement Planner",
        description: "Plan your future and see if you're on track for retirement.",
        href: "/calculators/retirement",
      },
    ],
  },
  {
    name: "Loans & Mortgages",
    description: "Manage your debt and plan for major purchases.",
    icon: Home,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
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
    color: "text-orange-600",
    bgColor: "bg-orange-50",
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
    ],
  },
];

export default function CalculatorsPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-3xl mb-20">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">
            Financial <span className="text-primary">Calculators</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Explore our suite of professional-grade financial tools designed to help you plan, save, and invest smarter.
        </p>
      </div>

      <div className="space-y-24">
        {calculatorCategories.map((category) => (
          <section key={category.name}>
            <div className="flex items-center gap-4 mb-10 border-b pb-6">
              <div className={`p-3 ${category.bgColor} rounded-2xl`}>
                <category.icon className={`h-8 w-8 ${category.color}`} />
              </div>
              <div>
                <h2 className="text-3xl font-bold">{category.name}</h2>
                <p className="text-muted-foreground font-medium">{category.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.calculators.map((calc) => (
                <Link key={calc.name} href={calc.href} className="group cursor-pointer">
                    <Card className="h-full border-2 border-transparent transition-all duration-300 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 rounded-[2rem]">
                        <CardHeader>
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-primary/10 transition-colors">
                                <BarChart3 className="h-5 w-5 text-slate-500 group-hover:text-primary transition-colors" />
                            </div>
                            <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                        </div>
                        <CardTitle className="text-xl group-hover:text-primary transition-colors">{calc.name}</CardTitle>
                        <CardDescription className="text-sm leading-relaxed mt-2 line-clamp-2">{calc.description}</CardDescription>
                        </CardHeader>
                    </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
