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
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Car, Share2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

const AutoLoanCalculator = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Inputs
  const [vehiclePrice, setVehiclePrice] = useState<number>(() => Number(searchParams.get('price')) || 35000);
  const [downPayment, setDownPayment] = useState<number>(() => Number(searchParams.get('down')) || 5000);
  const [interestRate, setInterestRate] = useState<number>(() => Number(searchParams.get('r')) || 5.9);
  const [loanTerm, setLoanTerm] = useState<number>(() => Number(searchParams.get('t')) || 60); // Months
  const [salesTax, setSalesTax] = useState<number>(() => Number(searchParams.get('tax')) || 7);

  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('price', vehiclePrice.toString());
    params.set('down', downPayment.toString());
    params.set('r', interestRate.toString());
    params.set('t', loanTerm.toString());
    params.set('tax', salesTax.toString());
    
    const timeoutId = setTimeout(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [vehiclePrice, downPayment, interestRate, loanTerm, salesTax, pathname, router, searchParams]);

  const calculateAutoLoan = () => {
    const taxAmount = vehiclePrice * (salesTax / 100);
    const totalPurchasePrice = vehiclePrice + taxAmount;
    const loanAmount = totalPurchasePrice - downPayment;
    
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm;

    const monthlyPayment = 
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalInterest = (monthlyPayment * numberOfPayments) - loanAmount;

    return {
      monthlyPayment,
      totalInterest,
      totalCost: totalPurchasePrice + totalInterest,
      loanAmount,
      taxAmount,
    };
  };

  useEffect(() => {
    setResults(calculateAutoLoan());
  }, [vehiclePrice, downPayment, interestRate, loanTerm, salesTax]);

  if (!results) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const pieData = [
    { name: 'Vehicle Price', value: vehiclePrice },
    { name: 'Sales Tax', value: results.taxAmount },
    { name: 'Total Interest', value: results.totalInterest },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Auto Loan Inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="vehiclePrice">Vehicle Price ($)</Label>
              <Input id="vehiclePrice" type="number" value={vehiclePrice} onChange={(e) => setVehiclePrice(Number(e.target.value))} />
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
              <Label htmlFor="loanTerm">Loan Term (Months)</Label>
              <Input id="loanTerm" type="number" value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="salesTax">Sales Tax (%)</Label>
              <Input id="salesTax" type="number" step="0.1" value={salesTax} onChange={(e) => setSalesTax(Number(e.target.value))} />
            </div>
          </CardContent>
        </Card>
        
        <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1"><Copy className="mr-2 h-4 w-4" /> Copy</Button>
            <Button variant="outline" size="sm" className="flex-1"><Share2 className="mr-2 h-4 w-4" /> Share</Button>
        </div>
      </div>

      <div className="lg:col-span-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-primary font-medium">Monthly Payment</CardDescription>
              <CardTitle className="text-4xl">{formatCurrency(results.monthlyPayment)}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Loan Cost</CardDescription>
              <CardTitle className="text-3xl">{formatCurrency(results.totalCost)}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Cost Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-8 h-[300px]">
                <div className="w-full md:w-1/2 h-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={90}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
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
                        <span>Loan Amount</span>
                        <span className="font-bold">{formatCurrency(results.loanAmount)}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span>Total Interest</span>
                        <span className="font-bold text-red-500">{formatCurrency(results.totalInterest)}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span>Sales Tax</span>
                        <span className="font-bold">{formatCurrency(results.taxAmount)}</span>
                    </div>
                </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AutoLoanCalculator;
