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
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area,
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
import { Download, Share2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

interface YearlyData {
  year: number;
  balance: number;
  contributions: number;
  interest: number;
}

interface CalculationResults {
  finalBalance: number;
  totalContributions: number;
  totalInterest: number;
  yearlyData: YearlyData[];
}

const CompoundInterestCalculator = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Inputs - initialized from URL params if available
  const [initialInvestment, setInitialInvestment] = useState<number>(() => {
    const val = searchParams.get('p');
    return val ? Number(val) : 10000;
  });
  const [monthlyContribution, setMonthlyContribution] = useState<number>(() => {
    const val = searchParams.get('pmt');
    return val ? Number(val) : 500;
  });
  const [interestRate, setInterestRate] = useState<number>(() => {
    const val = searchParams.get('r');
    return val ? Number(val) : 7;
  });
  const [years, setYears] = useState<number>(() => {
    const val = searchParams.get('t');
    return val ? Number(val) : 20;
  });
  const [compoundingFrequency, setCompoundingFrequency] = useState<string>(() => {
    const val = searchParams.get('n');
    return val || "12";
  });

  // Update URL params when inputs change
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('p', initialInvestment.toString());
    params.set('pmt', monthlyContribution.toString());
    params.set('r', interestRate.toString());
    params.set('t', years.toString());
    params.set('n', compoundingFrequency);
    
    const timeoutId = setTimeout(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [initialInvestment, monthlyContribution, interestRate, years, compoundingFrequency, pathname, router, searchParams]);

  const calculateCompoundInterest = (): CalculationResults => {
    const P = initialInvestment;
    const PMT = monthlyContribution;
    const r = interestRate / 100;
    const n = parseInt(compoundingFrequency);
    const t = years;

    const data: YearlyData[] = [];
    let currentBalance = P;
    let totalContributions = P;
    let totalInterest = 0;

    const totalMonths = t * 12;
    
    data.push({
      year: 0,
      balance: Math.round(currentBalance),
      contributions: Math.round(totalContributions),
      interest: Math.round(totalInterest),
    });

    for (let month = 1; month <= totalMonths; month++) {
      currentBalance += PMT;
      totalContributions += PMT;

      if (month % (12 / n) === 0) {
        const periodRate = r / n;
        const interestThisPeriod = currentBalance * periodRate;
        currentBalance += interestThisPeriod;
        totalInterest += interestThisPeriod;
      }

      if (month % 12 === 0) {
        data.push({
          year: month / 12,
          balance: Math.round(currentBalance),
          contributions: Math.round(totalContributions),
          interest: Math.round(totalInterest),
        });
      }
    }

    return {
      finalBalance: currentBalance,
      totalContributions,
      totalInterest,
      yearlyData: data,
    };
  };

  const results = calculateCompoundInterest();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleCopy = () => {
    const text = `Compound Interest Calculation Results:
Final Balance: ${formatCurrency(results.finalBalance)}
Total Contributions: ${formatCurrency(results.totalContributions)}
Total Interest: ${formatCurrency(results.totalInterest)}
Calculate your own at: ${window.location.href}`;
    
    navigator.clipboard.writeText(text);
    alert('Results copied to clipboard!');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
        navigator.share({
            title: 'My Compound Interest Calculation',
            text: `Check out my investment projection: ${formatCurrency(results.finalBalance)} in ${years} years!`,
            url: window.location.href,
        }).catch(console.error);
    } else {
        handleCopy();
    }
  };

  const pieData = [
    { name: 'Initial Investment', value: initialInvestment },
    { name: 'Total Contributions', value: results.totalContributions - initialInvestment },
    { name: 'Total Interest', value: results.totalInterest },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* Inputs Section */}
      <div className="lg:col-span-4 space-y-6 no-print">
        <Card>
          <CardHeader>
            <CardTitle>Investment Details</CardTitle>
            <CardDescription>Adjust the values to see how your wealth grows.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="initialInvestment">Initial Investment ($)</Label>
              <Input 
                id="initialInvestment" 
                type="number" 
                value={initialInvestment} 
                onChange={(e) => setInitialInvestment(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monthlyContribution">Monthly Contribution ($)</Label>
              <Input 
                id="monthlyContribution" 
                type="number" 
                value={monthlyContribution} 
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interestRate">Estimated Interest Rate (%)</Label>
              <Input 
                id="interestRate" 
                type="number" 
                step="0.1"
                value={interestRate} 
                onChange={(e) => setInterestRate(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="years">Investment Length (Years)</Label>
              <Input 
                id="years" 
                type="number" 
                value={years} 
                onChange={(e) => setYears(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="compounding">Compounding Frequency</Label>
              <Select value={compoundingFrequency} onValueChange={(val) => setCompoundingFrequency(val || "monthly")}>
                <SelectTrigger id="compounding">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Annually</SelectItem>
                  <SelectItem value="2">Semi-Annually</SelectItem>
                  <SelectItem value="4">Quarterly</SelectItem>
                  <SelectItem value="12">Monthly</SelectItem>
                  <SelectItem value="365">Daily</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
            <Button variant="outline" size="sm" className="flex-1" onClick={handlePrint}>
                <Download className="mr-2 h-4 w-4" /> PDF
            </Button>
            <Button variant="outline" size="sm" className="flex-1" onClick={handleCopy}>
                <Copy className="mr-2 h-4 w-4" /> Copy
            </Button>
        </div>
      </div>

      {/* Results Section */}
      <div className="lg:col-span-8 space-y-6 print:lg:col-span-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-primary font-medium">Final Balance</CardDescription>
              <CardTitle className="text-3xl">{formatCurrency(results.finalBalance)}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Contributions</CardDescription>
              <CardTitle className="text-2xl">{formatCurrency(results.totalContributions)}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Interest</CardDescription>
              <CardTitle className="text-2xl text-green-600">{formatCurrency(results.totalInterest)}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card className="print:border-none">
          <CardHeader>
            <Tabs defaultValue="growth">
              <div className="flex items-center justify-between no-print">
                <TabsList>
                  <TabsTrigger value="growth">Growth Chart</TabsTrigger>
                  <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
                  <TabsTrigger value="table">Annual Schedule</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="growth" className="pt-6">
                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={results.yearlyData}>
                      <defs>
                        <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis 
                        dataKey="year" 
                        label={{ value: 'Years', position: 'insideBottom', offset: -5 }} 
                      />
                      <YAxis 
                        tickFormatter={(value) => `$${value >= 1000 ? (value/1000).toFixed(0) + 'k' : value}`}
                      />
                      <Tooltip 
                        formatter={(val: unknown) => formatCurrency(Number(val))}
                        labelFormatter={(label) => `Year ${label}`}
                      />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="balance" 
                        name="Total Balance" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorBalance)" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="contributions" 
                        name="Contributions" 
                        stroke="#94a3b8" 
                        fill="#94a3b8" 
                        fillOpacity={0.1}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="breakdown" className="pt-6 print:block">
                 <div className="flex flex-col md:flex-row items-center justify-center gap-8 h-[400px]">
                    <div className="w-full md:w-1/2 h-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={120}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(val: unknown) => formatCurrency(Number(val))} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="w-full md:w-1/2 space-y-4">
                        <div className="flex justify-between items-center p-3 border-b">
                            <span className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-blue-500" />
                                Initial Investment
                            </span>
                            <span className="font-bold">{formatCurrency(initialInvestment)}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 border-b">
                            <span className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                                Total Contributions
                            </span>
                            <span className="font-bold">{formatCurrency(results.totalContributions - initialInvestment)}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 border-b">
                            <span className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-amber-500" />
                                Total Interest
                            </span>
                            <span className="font-bold text-green-600">{formatCurrency(results.totalInterest)}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
                            <span className="font-bold">Total Savings</span>
                            <span className="font-bold text-primary">{formatCurrency(results.finalBalance)}</span>
                        </div>
                    </div>
                 </div>
              </TabsContent>

              <TabsContent value="table" className="pt-6 print:block">
                <div className="max-h-[400px] overflow-y-auto border rounded-md print:max-h-none print:overflow-visible">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Year</TableHead>
                                <TableHead>Contributions</TableHead>
                                <TableHead>Interest</TableHead>
                                <TableHead className="text-right">Balance</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {results.yearlyData.map((row) => (
                                <TableRow key={row.year}>
                                    <TableCell>Year {row.year}</TableCell>
                                    <TableCell>{formatCurrency(row.contributions)}</TableCell>
                                    <TableCell>{formatCurrency(row.interest)}</TableCell>
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

export default CompoundInterestCalculator;
