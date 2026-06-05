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
import { Wallet, Share2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

const COLORS = ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899', '#64748b'];

const BudgetCalculator = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Inputs
  const [monthlyIncome, setMonthlyIncome] = useState<number>(() => Number(searchParams.get('inc')) || 5000);
  const [housing, setHousing] = useState<number>(() => Number(searchParams.get('house')) || 1500);
  const [food, setFood] = useState<number>(() => Number(searchParams.get('food')) || 600);
  const [transportation, setTransportation] = useState<number>(() => Number(searchParams.get('trans')) || 400);
  const [utilities, setUtilities] = useState<number>(() => Number(searchParams.get('util')) || 300);
  const [entertainment, setEntertainment] = useState<number>(() => Number(searchParams.get('ent')) || 200);
  const [other, setOther] = useState<number>(() => Number(searchParams.get('oth')) || 500);

  const [results, setResults] = useState<any>(null);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('inc', monthlyIncome.toString());
    params.set('house', housing.toString());
    params.set('food', food.toString());
    
    const timeoutId = setTimeout(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [monthlyIncome, housing, food, transportation, utilities, entertainment, other, pathname, router, searchParams]);

  const calculateBudget = () => {
    const totalExpenses = housing + food + transportation + utilities + entertainment + other;
    const netSavings = monthlyIncome - totalExpenses;
    const savingsRate = (netSavings / monthlyIncome) * 100;

    const data = [
      { name: 'Housing', value: housing },
      { name: 'Food', value: food },
      { name: 'Transportation', value: transportation },
      { name: 'Utilities', value: utilities },
      { name: 'Entertainment', value: entertainment },
      { name: 'Other', value: other },
      { name: 'Savings', value: Math.max(0, netSavings) },
    ];

    return {
      totalExpenses,
      netSavings,
      savingsRate,
      chartData: data.filter(item => item.value > 0),
    };
  };

  useEffect(() => {
    setResults(calculateBudget());
  }, [monthlyIncome, housing, food, transportation, utilities, entertainment, other]);

  if (!results) return null;

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
            <CardTitle>Income & Expenses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="monthlyIncome">Monthly Net Income ($)</Label>
              <Input id="monthlyIncome" type="number" value={monthlyIncome} onChange={(e) => setMonthlyIncome(Number(e.target.value))} />
            </div>
            <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="housing">Housing (Rent/Mortgage)</Label>
                    <Input id="housing" type="number" value={housing} onChange={(e) => setHousing(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="food">Food & Groceries</Label>
                    <Input id="food" type="number" value={food} onChange={(e) => setFood(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="trans">Transportation</Label>
                    <Input id="trans" type="number" value={transportation} onChange={(e) => setTransportation(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="util">Utilities</Label>
                    <Input id="util" type="number" value={utilities} onChange={(e) => setUtilities(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="ent">Entertainment</Label>
                    <Input id="ent" type="number" value={entertainment} onChange={(e) => setEntertainment(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="oth">Other Expenses</Label>
                    <Input id="oth" type="number" value={other} onChange={(e) => setOther(Number(e.target.value))} />
                </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className={results.netSavings >= 0 ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"}>
            <CardHeader className="pb-2">
              <CardDescription className={results.netSavings >= 0 ? "text-green-700" : "text-red-700"}>Remaining / Savings</CardDescription>
              <CardTitle className={`text-3xl ${results.netSavings >= 0 ? "text-green-700" : "text-red-700"}`}>{formatCurrency(results.netSavings)}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Expenses</CardDescription>
              <CardTitle className="text-2xl">{formatCurrency(results.totalExpenses)}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Savings Rate</CardDescription>
              <CardTitle className="text-2xl">{results.savingsRate.toFixed(1)}%</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Spending Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={results.chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={130}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {results.chartData.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val: any) => formatCurrency(Number(val))} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BudgetCalculator;
