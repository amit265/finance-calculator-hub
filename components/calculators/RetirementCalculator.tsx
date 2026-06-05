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
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
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
import { Download, Share2, Copy, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RetirementCalculator = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Inputs
  const [currentAge, setCurrentAge] = useState<number>(() => Number(searchParams.get('age')) || 30);
  const [retirementAge, setRetirementAge] = useState<number>(() => Number(searchParams.get('retire')) || 65);
  const [currentSavings, setCurrentSavings] = useState<number>(() => Number(searchParams.get('save')) || 50000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(() => Number(searchParams.get('pmt')) || 1000);
  const [expectedReturn, setExpectedReturn] = useState<number>(() => Number(searchParams.get('r')) || 7);
  const [withdrawalRate, setWithdrawalRate] = useState<number>(() => Number(searchParams.get('wr')) || 4);

  // Results state
  const [results, setResults] = useState<any>(null);

  // Update URL params
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('age', currentAge.toString());
    params.set('retire', retirementAge.toString());
    params.set('save', currentSavings.toString());
    params.set('pmt', monthlyContribution.toString());
    params.set('r', expectedReturn.toString());
    params.set('wr', withdrawalRate.toString());
    
    const timeoutId = setTimeout(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, expectedReturn, withdrawalRate, pathname, router, searchParams]);

  const calculateRetirement = () => {
    const yearsToInvest = retirementAge - currentAge;
    if (yearsToInvest <= 0) return null;

    const r = expectedReturn / 100 / 12;
    const n = yearsToInvest * 12;
    const PMT = monthlyContribution;
    const P = currentSavings;

    let data = [];
    let currentBalance = P;
    let totalContributions = P;

    data.push({
      age: currentAge,
      balance: Math.round(currentBalance),
      contributions: Math.round(totalContributions),
    });

    for (let month = 1; month <= n; month++) {
      currentBalance = currentBalance * (1 + r) + PMT;
      totalContributions += PMT;

      if (month % 12 === 0) {
        data.push({
          age: currentAge + (month / 12),
          balance: Math.round(currentBalance),
          contributions: Math.round(totalContributions),
        });
      }
    }

    const annualWithdrawal = currentBalance * (withdrawalRate / 100);
    const monthlyWithdrawal = annualWithdrawal / 12;

    return {
      finalBalance: currentBalance,
      totalContributions,
      totalInterest: currentBalance - totalContributions,
      monthlyIncome: monthlyWithdrawal,
      yearlyData: data,
    };
  };

  useEffect(() => {
    setResults(calculateRetirement());
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, expectedReturn]);

  if (!results) {
      return (
          <Card className="p-8 text-center">
              <p className="text-muted-foreground">Please ensure retirement age is greater than current age.</p>
          </Card>
      );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleCopy = () => {
    const text = `Retirement Planning Results:
Projected Balance at ${retirementAge}: ${formatCurrency(results.finalBalance)}
Estimated Monthly Income: ${formatCurrency(results.monthlyIncome)}
Total Contributions: ${formatCurrency(results.totalContributions)}
Plan yours at: ${window.location.href}`;
    navigator.clipboard.writeText(text);
    alert('Results copied!');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-4 space-y-6 no-print">
        <Card>
          <CardHeader>
            <CardTitle>Retirement Inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="currentAge">Current Age</Label>
                    <Input id="currentAge" type="number" value={currentAge} onChange={(e) => setCurrentAge(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="retirementAge">Retirement Age</Label>
                    <Input id="retirementAge" type="number" value={retirementAge} onChange={(e) => setRetirementAge(Number(e.target.value))} />
                </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentSavings">Current Savings ($)</Label>
              <Input id="currentSavings" type="number" value={currentSavings} onChange={(e) => setCurrentSavings(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthlyContribution">Monthly Contribution ($)</Label>
              <Input id="monthlyContribution" type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expectedReturn">Expected Return (%)</Label>
              <Input id="expectedReturn" type="number" step="0.1" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="withdrawalRate">Safe Withdrawal Rate (%)</Label>
              <Input id="withdrawalRate" type="number" step="0.1" value={withdrawalRate} onChange={(e) => setWithdrawalRate(Number(e.target.value))} />
            </div>
          </CardContent>
        </Card>
        
        <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={handleCopy}><Copy className="mr-2 h-4 w-4" /> Copy</Button>
            <Button variant="outline" size="sm" className="flex-1" onClick={handlePrint}><Download className="mr-2 h-4 w-4" /> PDF</Button>
        </div>
      </div>

      <div className="lg:col-span-8 space-y-6 print:lg:col-span-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-primary font-medium">Balance at Retirement</CardDescription>
              <CardTitle className="text-3xl">{formatCurrency(results.finalBalance)}</CardTitle>
            </CardHeader>
          </Card>
          <Card className="bg-green-50 border-green-100">
            <CardHeader className="pb-2">
              <CardDescription className="text-green-700 font-medium">Estimated Monthly Income</CardDescription>
              <CardTitle className="text-3xl text-green-700">{formatCurrency(results.monthlyIncome)}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card className="print:border-none">
          <CardHeader>
            <Tabs defaultValue="growth">
              <TabsList className="no-print">
                <TabsTrigger value="growth">Growth Projection</TabsTrigger>
                <TabsTrigger value="table">Annual Breakdown</TabsTrigger>
              </TabsList>
              
              <TabsContent value="growth" className="pt-6">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={results.yearlyData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="age" label={{ value: 'Age', position: 'insideBottom', offset: -5 }} />
                      <YAxis tickFormatter={(val) => `$${(val/1000000).toFixed(1)}M`} />
                      <Tooltip formatter={(val: number) => formatCurrency(val)} />
                      <Area type="monotone" dataKey="balance" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={3} />
                      <Area type="monotone" dataKey="contributions" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.1} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="table" className="pt-6 print:block">
                <div className="max-h-[400px] overflow-auto border rounded-md print:max-h-none print:overflow-visible">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Age</TableHead>
                                <TableHead>Contributions</TableHead>
                                <TableHead className="text-right">Balance</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {results.yearlyData.map((row: any) => (
                                <TableRow key={row.age}>
                                    <TableCell>{row.age}</TableCell>
                                    <TableCell>{formatCurrency(row.contributions)}</TableCell>
                                    <TableCell className="text-right font-medium">{formatCurrency(row.balance)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default RetirementCalculator;
