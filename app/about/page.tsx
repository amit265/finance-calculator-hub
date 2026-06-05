import React from 'react';
import { ShieldCheck, TrendingUp, Users, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">About Finance Calculator Hub</h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          We believe that financial literacy should be accessible to everyone. Our mission is to provide the most accurate, user-friendly, and comprehensive financial tools to help you plan your future with confidence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <Card className="border-none shadow-none bg-slate-50">
            <CardHeader>
                <div className="p-3 bg-primary/10 w-fit rounded-xl mb-4">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Professional Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    Our calculators are built using industry-standard financial formulas, ensuring that the results you see are reliable and professional-grade.
                </p>
            </CardContent>
        </Card>

        <Card className="border-none shadow-none bg-slate-50">
            <CardHeader>
                <div className="p-3 bg-primary/10 w-fit rounded-xl mb-4">
                    <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Fast & Free</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    No subscriptions, no hidden fees, and no sign-ups required. Access all our tools instantly, for free, forever.
                </p>
            </CardContent>
        </Card>

        <Card className="border-none shadow-none bg-slate-50">
            <CardHeader>
                <div className="p-3 bg-primary/10 w-fit rounded-xl mb-4">
                    <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Data-Driven Decisions</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    We don't just give you a number. Our interactive charts and breakdowns help you visualize your financial journey and make informed choices.
                </p>
            </CardContent>
        </Card>

        <Card className="border-none shadow-none bg-slate-50">
            <CardHeader>
                <div className="p-3 bg-primary/10 w-fit rounded-xl mb-4">
                    <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Built for You</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    Whether you're buying your first home, planning for retirement, or just trying to budget better, our tools are designed with your goals in mind.
                </p>
            </CardContent>
        </Card>
      </div>

      <div className="bg-slate-900 text-white rounded-3xl p-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          "To become the world's most trusted utility platform for personal finance, empowering millions to achieve financial independence through better math."
        </p>
      </div>
    </div>
  );
}
