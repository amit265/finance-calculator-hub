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
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Share2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

interface AmortizationRow {
  year: number;
  balance: number;
  interest: number;
  principal: number;
}

interface MortgageResults {
  monthlyPayment: number;
  monthlyPI: number;
  totalInterest: number;
  totalCost: number;
  amortizationSchedule: AmortizationRow[];
  principal: number;
}

const MortgageCalculator = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Inputs
  const [homePrice, setHomePrice] = useState<number>(() => Number(searchParams.get('price')) || 400000);
  const [downPayment, setDownPayment] = useState<number>(() => Number(searchParams.get('down')) || 80000);
  const [interestRate, setInterestRate] = useState<number>(() => Number(searchParams.get('r')) || 6.5);
  const [loanTerm, setLoanTerm] = useState<number>(() => Number(searchParams.get('t')) || 30);
  const [propertyTax, setPropertyTax] = useState<number>(() => Number(searchParams.get('tax')) || 3000);
  const [insurance, setInsurance] = useState<number>(() => Number(searchParams.get('ins')) || 1200);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('price', homePrice.toString());
    params.set('down', downPayment.toString());
    params.set('r', interestRate.toString());
    params.set('t', loanTerm.toString());
    
    const timeoutId = setTimeout(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [homePrice, downPayment, interestRate, loanTerm, pathname, router, searchParams]);

  const calculateMortgage = (): MortgageResults => {
    const principal = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    let monthlyPrincipalAndInterest = 0;
    if (monthlyRate === 0) {
      monthlyPrincipalAndInterest = numberOfPayments > 0 ? principal / numberOfPayments : 0;
    } else {
      monthlyPrincipalAndInterest = 
        (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    const monthlyTax = propertyTax / 12;
    const monthlyInsurance = insurance / 12;
    const totalMonthlyPayment = (isFinite(monthlyPrincipalAndInterest) ? monthlyPrincipalAndInterest : 0) + monthlyTax + monthlyInsurance;

    const amortizationSchedule: AmortizationRow[] = [];
    let remainingBalance = principal;
    let totalInterest = 0;

    for (let i = 1; i <= numberOfPayments; i++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = (monthlyPrincipalAndInterest || 0) - interestPayment;
      remainingBalance -= principalPayment;
      totalInterest += interestPayment;

      if (i % 12 === 0) {
        amortizationSchedule.push({
          year: i / 12,
          balance: Math.max(0, Math.round(remainingBalance)),
          interest: Math.round(totalInterest),
          principal: Math.round(principal - remainingBalance),
        });
      }
    }

    return {
      monthlyPayment: totalMonthlyPayment,
      monthlyPI: isFinite(monthlyPrincipalAndInterest) ? monthlyPrincipalAndInterest : 0,
      totalInterest,
      totalCost: principal + totalInterest,
      amortizationSchedule,
      principal,
    };
  };

  const results = calculateMortgage();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const pieData = [
    { name: 'Principal & Interest', value: results.monthlyPI },
    { name: 'Property Tax', value: propertyTax / 12 },
    { name: 'Insurance', value: insurance / 12 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Mortgage Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="homePrice">Home Price ($)</Label>
              <Input id="homePrice" type="number" value={homePrice} onChange={(e) => setHomePrice(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="downPayment">Down Payment ($)</Label>
              <Input id="downPayment" type="number" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interestRate">Interest Rate (%)</Label>
              <Input id="interestRate" type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loanTerm">Loan Term (Years)</Label>
              <Input id="loanTerm" type="number" value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="tax">Property Tax (Annual)</Label>
                    <Input id="tax" type="number" value={propertyTax} onChange={(e) => setPropertyTax(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="ins">Insurance (Annual)</Label>
                    <Input id="ins" type="number" value={insurance} onChange={(e) => setInsurance(Number(e.target.value))} />
                </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1"><Copy className="mr-2 h-4 w-4" /> Copy Results</Button>
            <Button variant="outline" size="sm" className="flex-1"><Share2 className="mr-2 h-4 w-4" /> Share</Button>
        </div>
      </div>

      <div className="lg:col-span-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-primary/5 border-primary/20 md:col-span-1">
            <CardHeader className="pb-2">
              <CardDescription className="text-primary font-medium">Monthly Payment</CardDescription>
              <CardTitle className="text-3xl">{formatCurrency(results.monthlyPayment)}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Interest</CardDescription>
              <CardTitle className="text-2xl">{formatCurrency(results.totalInterest)}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Loan Amount</CardDescription>
              <CardTitle className="text-2xl">{formatCurrency(results.principal)}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <Tabs defaultValue="breakdown">
              <TabsList>
                <TabsTrigger value="breakdown">Payment Breakdown</TabsTrigger>
                <TabsTrigger value="schedule">Amortization</TabsTrigger>
              </TabsList>
              
              <TabsContent value="breakdown" className="pt-6">
                <div className="flex flex-col md:flex-row items-center gap-8 h-[350px]">
                    <div className="w-full md:w-1/2 h-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((_entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(val: any) => formatCurrency(Number(val))} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="w-full md:w-1/2 space-y-4">
                        <div className="flex justify-between border-b pb-2">
                            <span>Principal & Interest</span>
                            <span className="font-bold">{formatCurrency(results.monthlyPI)}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span>Property Tax</span>
                            <span className="font-bold">{formatCurrency(propertyTax / 12)}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span>Insurance</span>
                            <span className="font-bold">{formatCurrency(insurance / 12)}</span>
                        </div>
                    </div>
                </div>
              </TabsContent>

              <TabsContent value="schedule" className="pt-6">
                 <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={results.amortizationSchedule}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -5 }} />
                            <YAxis tickFormatter={(val) => `$${(val/1000).toFixed(0)}k`} />
                            <Tooltip formatter={(val: any) => formatCurrency(Number(val))} />
                            <Legend />
                            <Bar dataKey="balance" name="Remaining Balance" fill="#3b82f6" />
                            <Bar dataKey="interest" name="Cumulative Interest" fill="#ef4444" />
                        </BarChart>
                    </ResponsiveContainer>
                 </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default MortgageCalculator;
