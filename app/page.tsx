import Link from "next/link";
import { ArrowRight, BarChart3, PiggyBank, Home, CreditCard, Wallet, TrendingUp, ShieldCheck, Zap } from "lucide-react";

export default function Homes() {
  const popularCalculators = [
    {
      title: "Compound Interest",
      description: "Calculate how your money grows over time with compounding interest.",
      href: "/calculators/compound-interest",
      icon: TrendingUp,
      color: "bg-primary",
    },
    {
      title: "Mortgage Calculator",
      description: "Estimate your monthly mortgage payments and total interest paid.",
      href: "/calculators/mortgage",
      icon: Home,
      color: "bg-secondary",
    },
    {
      title: "Retirement Planner",
      description: "Plan your future and see if you're on track for a comfortable retirement.",
      href: "/calculators/retirement",
      icon: PiggyBank,
      color: "bg-indigo-600",
    },
    {
      title: "Debt Payoff",
      description: "Find the fastest way to pay off your debts and save on interest.",
      href: "/calculators/debt-payoff",
      icon: CreditCard,
      color: "bg-rose-500",
    },
  ];

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-24 sm:py-32">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Zap className="h-4 w-4" />
              <span>Smart Financial Planning Tools</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-foreground mb-6 leading-[1.1]">
              Make <span className="text-primary">Better Money Decisions</span> with Confidence
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl">
              Free, professional-grade calculators for retirement, mortgages, investments, and more. Plan your future with accurate data and interactive tools.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/calculators"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-xl shadow-primary/20 transition-all hover:scale-105 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                Explore All Calculators
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-xl bg-secondary/10 px-8 py-4 text-lg font-semibold text-secondary transition-all hover:bg-secondary/20"
              >
                Why Trust Us?
              </Link>
            </div>
          </div>
        </div>
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 -z-10 h-full w-1/2 bg-linear-to-l from-primary/10 to-transparent hidden lg:block" />
        <div className="absolute -top-24 -right-24 -z-10 h-96 w-96 bg-primary/5 rounded-full blur-3xl" />
      </section>

      {/* Popular Calculators */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Most Popular Tools</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Join thousands of users who use our tools daily to plan their financial future.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularCalculators.map((calc) => (
            <Link
              key={calc.title}
              href={calc.href}
              className="group relative flex flex-col p-8 bg-card border rounded-3xl shadow-sm transition-all hover:shadow-xl hover:-translate-y-1 hover:border-primary/20"
            >
              <div className={`w-14 h-14 rounded-2xl ${calc.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-black/5`}>
                <calc.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{calc.title}</h3>
              <p className="text-muted-foreground mb-6 flex-1 leading-relaxed">{calc.description}</p>
              <div className="flex items-center text-primary font-semibold group-hover:translate-x-1 transition-transform">
                Start Calculating <ArrowRight className="ml-2 h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Use Our Tools */}
      <section className="bg-slate-950 text-white py-24 rounded-[3rem] mx-4 overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-8 sm:text-4xl">Why Choose <span className="text-primary">Finance Calculator Hub</span>?</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="mt-1 bg-primary/20 p-3 rounded-xl">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Interactive Visualizations</h4>
                    <p className="text-slate-400 leading-relaxed">Don&apos;t just look at numbers. Visualize your financial growth with dynamic charts and detailed amortization schedules.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 bg-secondary/20 p-3 rounded-xl">
                    <ShieldCheck className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Unbiased & Transparent</h4>
                    <p className="text-slate-400 leading-relaxed">Our calculators are built on industry-standard formulas, ensuring you get accurate and reliable projections every time.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 bg-indigo-500/20 p-3 rounded-xl">
                    <Wallet className="h-6 w-6 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Always Free</h4>
                    <p className="text-slate-400 leading-relaxed">No subscriptions, no hidden fees. Access premium-level financial planning tools at zero cost.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-slate-900 p-8 rounded-[2rem] border border-slate-800 shadow-2xl relative overflow-hidden group">
                 {/* Simplified Preview Graphic */}
                 <div className="aspect-video bg-slate-950 rounded-2xl flex items-center justify-center border border-slate-800">
                    <BarChart3 className="h-24 w-24 text-primary opacity-20 group-hover:scale-110 transition-transform duration-500" />
                 </div>
                 <div className="absolute -bottom-4 -left-4 bg-primary p-6 rounded-2xl shadow-2xl hidden md:block">
                    <p className="font-bold text-3xl">99.9%</p>
                    <p className="text-xs uppercase font-bold tracking-widest opacity-80">Accuracy Rate</p>
                 </div>
              </div>
              <div className="absolute -top-12 -right-12 h-64 w-64 bg-primary/20 rounded-full blur-[80px]" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
