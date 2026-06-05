"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Share2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TimelineData {
  month: number;
  balance: number;
  interest: number;
}

interface DebtResults {
  months: number;
  totalInterest: number;
  totalCost: number;
  timeline: TimelineData[];
  error?: string;
}

const DebtPayoffCalculator = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Inputs
  const [debtAmount, setDebtAmount] = useState<number>(() => Number(searchParams.get('amt')) || 10000);
  const [interestRate, setInterestRate] = useState<number>(() => Number(searchParams.get('r')) || 18.9);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(() => Number(searchParams.get('pmt')) || 500);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('amt', debtAmount.toString());
    params.set('r', interestRate.toString());
    params.set('pmt', monthlyPayment.toString());
    
    const timeoutId = setTimeout(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [debtAmount, interestRate, monthlyPayment, pathname, router, searchParams]);

  const calculateDebtPayoff = (): DebtResults => {
    let remainingBalance = debtAmount;
    const monthlyRate = interestRate / 100 / 12;
    let months = 0;
    let totalInterest = 0;
    const data: TimelineData[] = [];

    data.push({
      month: 0,
      balance: Math.round(remainingBalance),
      interest: 0,
    });

    // Check if payment is enough to cover interest
    if (monthlyPayment <= remainingBalance * monthlyRate) {
        return { 
          months: 0, 
          totalInterest: 0, 
          totalCost: 0, 
          timeline: [], 
          error: "Monthly payment must be higher than the interest charged." 
        };
    }

    while (remainingBalance > 0 && months < 360) { // Max 30 years
      const interestCharge = remainingBalance * monthlyRate;
      totalInterest += interestCharge;
      
      const principalPayment = Math.min(remainingBalance, monthlyPayment - interestCharge);
      remainingBalance -= principalPayment;
      months++;

      if (months % 6 === 0 || remainingBalance <= 0) {
        data.push({
          month: months,
          balance: Math.round(remainingBalance),
          interest: Math.round(totalInterest),
        });
      }
    }

    return {
      months,
      totalInterest,
      totalCost: debtAmount + totalInterest,
      timeline: data,
    };
  };

  const results = calculateDebtPayoff();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Debt Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="debtAmount">Total Debt Amount ($)</Label>
              <Input id="debtAmount" type="number" value={debtAmount} onChange={(e) => setDebtAmount(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interestRate">Interest Rate (%)</Label>
              <Input id="interestRate" type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthlyPayment">Monthly Payment ($)</Label>
              <Input id="monthlyPayment" type="number" value={monthlyPayment} onChange={(e) => setMonthlyPayment(Number(e.target.value))} />
            </div>
            
            {results.error && (
                <p className="text-sm text-red-500 font-medium">{results.error}</p>
            )}
          </CardContent>
        </Card>
        
        <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1"><Copy className="mr-2 h-4 w-4" /> Copy</Button>
            <Button variant="outline" size="sm" className="flex-1"><Share2 className="mr-2 h-4 w-4" /> Share</Button>
        </div>
      </div>

      <div className="lg:col-span-8 space-y-6">
        {!results.error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-2">
                  <CardDescription className="text-primary font-medium">Months to Payoff</CardDescription>
                  <CardTitle className="text-3xl">{results.months}</CardTitle>
                  <CardDescription>~{(results.months / 12).toFixed(1)} Years</CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Interest</CardDescription>
                  <CardTitle className="text-2xl text-red-500">{formatCurrency(results.totalInterest)}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Total Cost</CardDescription>
                  <CardTitle className="text-2xl">{formatCurrency(results.totalCost)}</CardTitle>
                </CardHeader>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Debt Reduction Timeline</CardTitle>
                <CardDescription>See how your balance decreases over time.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={results.timeline}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" label={{ value: 'Months', position: 'insideBottom', offset: -5 }} />
                      <YAxis tickFormatter={(val) => `$${val}`} />
                      <Tooltip formatter={(val: any) => formatCurrency(Number(val))} />
                      <Area type="monotone" dataKey="balance" name="Remaining Balance" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default DebtPayoffCalculator;
