import Link from 'next/link';
import { Calculator, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-50 border-t pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary p-1.5 rounded-lg">
                <Calculator className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl tracking-tight">
                Finance<span className="text-primary">Calc</span>Hub
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Empowering users with professional financial tools and insights to build lasting wealth and make smarter money decisions.
            </p>
            <div className="flex gap-4">

             

            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-foreground uppercase tracking-widest text-xs">Calculators</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/calculators/compound-interest" className="text-muted-foreground hover:text-primary transition-colors">Compound Interest</Link></li>
              <li><Link href="/calculators/retirement" className="text-muted-foreground hover:text-primary transition-colors">Retirement Planner</Link></li>
              <li><Link href="/calculators/mortgage" className="text-muted-foreground hover:text-primary transition-colors">Mortgage Calculator</Link></li>
              <li><Link href="/calculators/debt-payoff" className="text-muted-foreground hover:text-primary transition-colors">Debt Payoff</Link></li>
              <li><Link href="/calculators/simple-interest" className="text-muted-foreground hover:text-primary transition-colors">Simple Interest</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-foreground uppercase tracking-widest text-xs">Resources</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Financial Insights</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Our Mission</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-foreground uppercase tracking-widest text-xs">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              Get the latest financial tips and calculator updates delivered to your inbox.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email"
                className="flex-1 min-w-0 px-3 py-2 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <button className="p-2 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all">
                <Mail className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-muted-foreground">
          <p>© {currentYear} Finance Calculator Hub. Built for accuracy.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
