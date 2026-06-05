"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Calculator, ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Calculators', href: '/calculators' },
    { name: 'Insights', href: '/blog' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2.5 group cursor-pointer">
            <div className="bg-primary p-2 rounded-xl transition-transform group-hover:rotate-12">
              <Calculator className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-2xl tracking-tight">
              Finance<span className="text-primary">Calc</span>Hub
            </span>
          </Link>
        </div>
        
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-muted-foreground">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
            >
              {link.name} {link.name === 'Calculators' && <ChevronDown className="h-4 w-4 opacity-50" />}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
           <Link href="/calculators" className="hidden sm:block">
            <Button size="lg" className="rounded-xl font-bold shadow-lg shadow-primary/20 cursor-pointer">
              Get Started
            </Button>
           </Link>
           <Button 
             variant="ghost" 
             size="icon" 
             className="lg:hidden cursor-pointer"
             onClick={() => setIsMenuOpen(!isMenuOpen)}
           >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
           </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background border-b animate-in slide-in-from-top duration-300">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-lg font-semibold text-muted-foreground hover:text-primary transition-colors cursor-pointer py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/calculators" className="w-full mt-2" onClick={() => setIsMenuOpen(false)}>
              <Button className="w-full rounded-xl font-bold py-6 cursor-pointer">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
