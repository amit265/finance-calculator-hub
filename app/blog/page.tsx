import React from 'react';
import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Blog | Finance Calculator Hub',
  description: 'Expert financial advice, budgeting tips, and investment guides to help you make better money decisions.',
};

export default function BlogPage() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">
          Financial Insights & Guides
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Explore our collection of articles on investing, retirement planning, debt management, and personal finance strategies.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {allPostsData.map(({ slug, date, title, category, excerpt }) => (
          <Link key={slug} href={`/blog/${slug}`} className="group cursor-pointer">
            <Card className="h-full transition-all hover:shadow-md hover:border-primary/20">
              <CardHeader>
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                    {category}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    {new Date(date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </div>
                <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                  {title}
                </CardTitle>
                <CardDescription className="text-base line-clamp-3 mt-4">
                  {excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-primary font-medium group-hover:translate-x-1 transition-transform">
                  Read article <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      {allPostsData.length === 0 && (
        <div className="text-center py-20 border rounded-2xl bg-slate-50">
          <p className="text-muted-foreground">No blog posts found. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
