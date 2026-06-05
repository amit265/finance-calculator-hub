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
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
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
import { Share2, Copy, Download, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency, copyToClipboard, shareCalculation } from '@/lib/calculator-utils';

const COLORS = ['#3b82f6', '#10b981'];

const SimpleInterestCalculator = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Inputs
  const [principal, setPrincipal] = useState<number>(() => Number(searchParams.get('p')) || 10000);
  const [interestRate, setInterestRate] = useState<number>(() => Number(searchParams.get('r')) || 5);
  const [time, setTime] = useState<number>(() => Number(searchParams.get('t')) || 5);
  const [timeUnit, setTimeUnit] = useState<string>(() => searchParams.get('u') || 'years');

  const [results, setResults] = useState<any>(null);

  // Sync to URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('p', principal.toString());
    params.set('r', interestRate.toString());
    params.set('t', time.toString());
    params.set('u', timeUnit);
    
    const timeoutId = setTimeout(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [principal, interestRate, time, timeUnit, pathname, router, searchParams]);

  const calculateSimpleInterest = () => {
    const P = principal;
    const r = interestRate / 100;
    const t = timeUnit === 'years' ? time : time / 12;

    const interest = P * r * t;
    const totalValue = P + interest;

    let yearlyData = [];
    const periods = Math.ceil(timeUnit === 'years' ? time : time);
    const periodLabel = timeUnit === 'years' ? 'Year' : 'Month';

    for (let i = 0; i <= periods; i++) {
      const currentT = timeUnit === 'years' ? i : i / 12;
      const currentInterest = P * r * currentT;
      yearlyData.push({
        period: i,
        interest: Math.round(currentInterest),
        principal: P,
        total: Math.round(P + currentInterest),
      });
    }

    return {
      totalInterest: interest,
      finalBalance: totalValue,
      data: yearlyData,
      periodLabel
    };
  };

  useEffect(() => {
    setResults(calculateSimpleInterest());
  }, [principal, interestRate, time, timeUnit]);

  if (!results) return null;

  const handleCopy = async () => {
    const text = `Simple Interest Calculation:
Principal: ${formatCurrency(principal)}
Interest Rate: ${interestRate}%
Time: ${time} ${timeUnit}
Total Interest: ${formatCurrency(results.totalInterest)}
Final Balance: ${formatCurrency(results.finalBalance)}
Calculate yours at: ${window.location.href}`;
    
    if (await copyToClipboard(text)) {
      alert('Results copied!');
    }
  };

  const handleShare = () => {
    shareCalculation(
      'Simple Interest Calculation',
      `Check out this interest projection: ${formatCurrency(results.finalBalance)}!`,
      window.location.href
    );
  };

  const pieData = [
    { name: 'Principal', value: principal },
    { name: 'Total Interest', value: results.totalInterest },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-4 space-y-6 no-print">
        <Card>
          <CardHeader>
            <CardTitle>Calculation Inputs</CardTitle>
            <CardDescription>Enter your details to calculate simple interest.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="principal">Principal Amount ($)</Label>
              <Input 
                id="principal" 
                type="number" 
                value={principal} 
                onChange={(e) => setPrincipal(Number(e.target.value))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
              <Input 
                id="interestRate" 
                type="number" 
                step="0.1"
                value={interestRate} 
                onChange={(e) => setInterestRate(Number(e.target.value))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input 
                  id="time" 
                  type="number" 
                  value={time} 
                  onChange={(e) => setTime(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeUnit">Unit</Label>
                <Select value={timeUnit} onValueChange={(val) => setTimeUnit(val || "years")}>
                  <SelectTrigger id="timeUnit">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="years">Years</SelectItem>
                    <SelectItem value="months">Months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="flex-1" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
            <Button variant="outline" size="sm" className="flex-1" onClick={() => window.print()}>
                <Printer className="mr-2 h-4 w-4" /> Print
            </Button>
            <Button variant="outline" size="sm" className="flex-1" onClick={handleCopy}>
                <Copy className="mr-2 h-4 w-4" /> Copy
            </Button>
        </div>
      </div>

      <div className="lg:col-span-8 space-y-6 print:lg:col-span-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardDescription className="text-primary font-medium">Final Balance</CardDescription>
              <CardTitle className="text-3xl">{formatCurrency(results.finalBalance)}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Interest</CardDescription>
              <CardTitle className="text-3xl text-green-600">{formatCurrency(results.totalInterest)}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card className="print:border-none">
          <CardHeader>
            <Tabs defaultValue="chart">
              <TabsList className="no-print">
                <TabsTrigger value="chart">Growth Chart</TabsTrigger>
                <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
                <TabsTrigger value="table">Schedule</TabsTrigger>
              </TabsList>
              
              <TabsContent value="chart" className="pt-6">
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={results.data}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="period" label={{ value: results.periodLabel, position: 'insideBottom', offset: -5 }} />
                      <YAxis tickFormatter={(val) => `$${(val/1000).toFixed(0)}k`} />
                      <Tooltip formatter={(val: any) => formatCurrency(Number(val))} labelFormatter={(label) => `${results.periodLabel} ${label}`} />
                      <Legend />
                      <Bar dataKey="principal" name="Principal" stackId="a" fill="#3b82f6" />
                      <Bar dataKey="interest" name="Interest" stackId="a" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="breakdown" className="pt-6 print:block">
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
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip formatter={(val: any) => formatCurrency(Number(val))} />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="w-full md:w-1/2 space-y-4 text-sm">
                        <div className="flex justify-between border-b pb-2">
                            <span>Principal</span>
                            <span className="font-bold">{formatCurrency(principal)}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                            <span>Total Interest</span>
                            <span className="font-bold text-green-600">{formatCurrency(results.totalInterest)}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2 text-lg">
                            <span className="font-bold">Total Value</span>
                            <span className="font-bold text-primary">{formatCurrency(results.finalBalance)}</span>
                        </div>
                    </div>
                 </div>
              </TabsContent>

              <TabsContent value="table" className="pt-6 print:block">
                <div className="max-h-[400px] overflow-auto border rounded-md print:max-h-none">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{results.periodLabel}</TableHead>
                                <TableHead>Interest</TableHead>
                                <TableHead className="text-right">Total Value</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {results.data.map((row: any) => (
                                <TableRow key={row.period}>
                                    <TableCell>{results.periodLabel} {row.period}</TableCell>
                                    <TableCell>{formatCurrency(row.interest)}</TableCell>
                                    <TableCell className="text-right font-medium">{formatCurrency(row.total)}</TableCell>
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

export default SimpleInterestCalculator;
