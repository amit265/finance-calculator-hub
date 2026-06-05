import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-bold mb-4">FinanceCalcHub</h3>
            <p className="text-sm text-muted-foreground">
              Plan Better. Save Smarter. Grow Wealth.
              Providing free, professional financial calculators to help you make better money decisions.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Calculators</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/calculators/compound-interest" className="hover:text-primary transition-colors">Compound Interest</Link></li>
              <li><Link href="/calculators/retirement" className="hover:text-primary transition-colors">Retirement</Link></li>
              <li><Link href="/calculators/mortgage" className="hover:text-primary transition-colors">Mortgage</Link></li>
              <li><Link href="/calculators/debt-payoff" className="hover:text-primary transition-colors">Debt Payoff</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-primary transition-colors">Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {currentYear} Finance Calculator Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
