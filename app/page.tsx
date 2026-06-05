import Link from "next/link";
import { ArrowRight, BarChart3, Calculator, PiggyBank, Home, CreditCard, Wallet, TrendingUp } from "lucide-react";

export default function Homes() {
  const popularCalculators = [
    {
      title: "Compound Interest",
      description: "Calculate how your money grows over time with compounding interest.",
      href: "/calculators/compound-interest",
      icon: TrendingUp,
      color: "bg-blue-500",
    },
    {
      title: "Mortgage Calculator",
      description: "Estimate your monthly mortgage payments and total interest paid.",
      href: "/calculators/mortgage",
      icon: Home,
      color: "bg-green-500",
    },
    {
      title: "Retirement Planner",
      description: "Plan your future and see if you're on track for a comfortable retirement.",
      href: "/calculators/retirement",
      icon: PiggyBank,
      color: "bg-purple-500",
    },
    {
      title: "Debt Payoff",
      description: "Find the fastest way to pay off your debts and save on interest.",
      href: "/calculators/debt-payoff",
      icon: CreditCard,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 py-24 sm:py-32">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-slate-900 mb-6">
              Financial Calculators That Help You Make <span className="text-primary">Better Money Decisions</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              Free calculators for retirement planning, compound interest, mortgages, debt payoff, budgeting, and more. Simple, professional, and reliable.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/calculators"
                className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-4 text-lg font-medium text-primary-foreground shadow-lg transition-transform hover:scale-105 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Explore All Calculators
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 -z-10 h-full w-1/3 bg-gradient-to-l from-primary/5 to-transparent hidden lg:block" />
      </section>

      {/* Popular Calculators */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Popular Calculators</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Our most frequently used tools designed to help you plan your financial future with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularCalculators.map((calc) => (
            <Link
              key={calc.title}
              href={calc.href}
              className="group relative flex flex-col p-8 bg-white border rounded-2xl shadow-sm transition-all hover:shadow-md hover:border-primary/20"
            >
              <div className={`w-12 h-12 rounded-xl ${calc.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                <calc.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">{calc.title}</h3>
              <p className="text-muted-foreground mb-6 flex-1">{calc.description}</p>
              <div className="flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform">
                Try it now <ArrowRight className="ml-1 h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Use Our Tools */}
      <section className="bg-slate-900 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-8">Why Use Finance Calculator Hub?</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="mt-1 bg-primary/20 p-2 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Detailed Reports & Charts</h4>
                    <p className="text-slate-400">Get more than just a number. See the full breakdown with interactive charts and amortization schedules.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 bg-primary/20 p-2 rounded-lg">
                    <Calculator className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Accurate & Professional</h4>
                    <p className="text-slate-400">Our formulas are verified for accuracy, ensuring you get the most reliable financial projections.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 bg-primary/20 p-2 rounded-lg">
                    <Wallet className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">100% Free to Use</h4>
                    <p className="text-slate-400">No hidden fees or subscriptions. Access all our professional-grade financial tools for free.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl relative">
               {/* Simplified Preview Graphic */}
               <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center">
                  <BarChart3 className="h-24 w-24 text-primary opacity-20" />
               </div>
               <div className="absolute -bottom-6 -left-6 bg-primary p-6 rounded-2xl shadow-xl hidden md:block">
                  <p className="font-bold text-2xl">99.9%</p>
                  <p className="text-xs uppercase tracking-wider opacity-80">Accuracy Guaranteed</p>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
