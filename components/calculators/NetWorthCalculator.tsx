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

const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444', '#ec4899'];

interface ChartItem {
  name: string;
  value: number;
}

interface NetWorthResults {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  assetData: ChartItem[];
  liabilityData: ChartItem[];
}

const NetWorthCalculator = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Assets
  const [cash, setCash] = useState<number>(() => Number(searchParams.get('cash')) || 10000);
  const [investments, setInvestments] = useState<number>(() => Number(searchParams.get('inv')) || 50000);
  const [property, setProperty] = useState<number>(() => Number(searchParams.get('prop')) || 300000);
  const [vehicles, setVehicles] = useState<number>(() => Number(searchParams.get('veh')) || 25000);

  // Liabilities
  const [mortgage, setMortgage] = useState<number>(() => Number(searchParams.get('mort')) || 200000);
  const [loans, setLoans] = useState<number>(() => Number(searchParams.get('loan')) || 15000);
  const [creditCards, setCreditCards] = useState<number>(() => Number(searchParams.get('cc')) || 2000);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('cash', cash.toString());
    params.set('inv', investments.toString());
    params.set('prop', property.toString());
    params.set('veh', vehicles.toString());
    params.set('mort', mortgage.toString());
    params.set('loan', loans.toString());
    params.set('cc', creditCards.toString());
    
    const timeoutId = setTimeout(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [cash, investments, property, vehicles, mortgage, loans, creditCards, pathname, router, searchParams]);

  const calculateNetWorth = (): NetWorthResults => {
    const totalAssets = cash + investments + property + vehicles;
    const totalLiabilities = mortgage + loans + creditCards;
    const netWorth = totalAssets - totalLiabilities;

    const assetData = [
      { name: 'Cash', value: cash },
      { name: 'Investments', value: investments },
      { name: 'Property', value: property },
      { name: 'Vehicles', value: vehicles },
    ].filter(item => item.value > 0);

    const liabilityData = [
      { name: 'Mortgage', value: mortgage },
      { name: 'Loans', value: loans },
      { name: 'Credit Cards', value: creditCards },
    ].filter(item => item.value > 0);

    return {
      totalAssets,
      totalLiabilities,
      netWorth,
      assetData,
      liabilityData,
    };
  };

  const results = calculateNetWorth();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-emerald-600">Assets</CardTitle>
            <CardDescription>What you own</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cash">Cash & Savings ($)</Label>
              <Input id="cash" type="number" value={cash} onChange={(e) => setCash(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="inv">Investments ($)</Label>
              <Input id="inv" type="number" value={investments} onChange={(e) => setInvestments(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prop">Real Estate / Property ($)</Label>
              <Input id="prop" type="number" value={property} onChange={(e) => setProperty(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="veh">Vehicles ($)</Label>
              <Input id="veh" type="number" value={vehicles} onChange={(e) => setVehicles(Number(e.target.value))} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-red-600">Liabilities</CardTitle>
            <CardDescription>What you owe</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="mort">Mortgage ($)</Label>
              <Input id="mort" type="number" value={mortgage} onChange={(e) => setMortgage(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="loan">Student/Auto Loans ($)</Label>
              <Input id="loan" type="number" value={loans} onChange={(e) => setLoans(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cc">Credit Card Debt ($)</Label>
              <Input id="cc" type="number" value={creditCards} onChange={(e) => setCreditCards(Number(e.target.value))} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-7 space-y-6">
        <Card className="bg-primary/5 border-primary/20 text-center py-8">
            <CardHeader className="pb-2">
                <CardDescription className="text-primary font-bold text-lg uppercase tracking-wider">Your Net Worth</CardDescription>
                <CardTitle className="text-6xl font-black">{formatCurrency(results.netWorth)}</CardTitle>
            </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
                <CardHeader className="pb-2">
                    <CardDescription>Total Assets</CardDescription>
                    <CardTitle className="text-2xl text-emerald-600">{formatCurrency(results.totalAssets)}</CardTitle>
                </CardHeader>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardDescription>Total Liabilities</CardDescription>
                    <CardTitle className="text-2xl text-red-600">{formatCurrency(results.totalLiabilities)}</CardTitle>
                </CardHeader>
            </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Asset Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={results.assetData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {results.assetData.map((_entry, index: number) => (
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

export default NetWorthCalculator;
