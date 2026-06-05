import Link from 'next/link';
import { Calculator, ChevronDown, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="bg-primary p-2 rounded-xl transition-transform group-hover:rotate-12">
              <Calculator className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-2xl tracking-tight">
              Finance<span className="text-primary">Calc</span>Hub
            </span>
          </Link>
        </div>
        
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-muted-foreground">
          <Link href="/calculators" className="hover:text-primary transition-colors flex items-center gap-1">
            Calculators <ChevronDown className="h-4 w-4 opacity-50" />
          </Link>
          <Link href="/blog" className="hover:text-primary transition-colors">
            Insights
          </Link>
          <Link href="/about" className="hover:text-primary transition-colors">
            About
          </Link>
        </nav>

        <div className="flex items-center gap-4">
           <Link href="/calculators">
            <Button size="lg" className="rounded-xl font-bold shadow-lg shadow-primary/20">
              Get Started
            </Button>
           </Link>
           <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
           </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
