import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { Calculator } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function Navbar() {
  const location = useLocation();

  const links = [
    { name: 'EMI Calculator', path: '/' },
    { name: 'Home Loan', path: '/home-loan-emi-calculator' },
    { name: 'Personal Loan', path: '/personal-loan-emi-calculator' },
    { name: 'Car Loan', path: '/car-loan-emi-calculator' },
    { name: 'SIP', path: '/sip-calculator' },
    { name: 'Compare Loans', path: '/compare-loans' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4 justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Calculator className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl text-primary tracking-tight">FinCal</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === link.path ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Currency Selector can go here */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
