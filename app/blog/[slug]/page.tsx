import React from 'react';
import Link from 'next/link';
import { getPostData, getSortedPostsData } from '@/lib/posts';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowLeft, Clock } from 'lucide-react';
import { Metadata } from 'next';

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const postData = await getPostData(slug);
  return {
    title: `${postData.title} | Finance Calculator Hub`,
    description: postData.excerpt,
  };
}

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const postData = await getPostData(slug);

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      <Link 
        href="/blog" 
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Blog
      </Link>

      <div className="space-y-4 mb-12">
        <Badge variant="secondary" className="bg-primary/10 text-primary px-3 py-1">
          {postData.category}
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          {postData.title}
        </h1>
        <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            {new Date(postData.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            5 min read
          </div>
        </div>
      </div>

      <div 
        className="prose prose-slate prose-lg max-w-none prose-headings:text-slate-900 prose-headings:font-bold prose-a:text-primary hover:prose-a:underline prose-img:rounded-2xl prose-pre:bg-slate-900 prose-pre:text-slate-100"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }} 
      />

      <div className="mt-16 pt-8 border-t">
        <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10">
          <h3 className="text-xl font-bold mb-4">Want to see your own numbers?</h3>
          <p className="text-muted-foreground mb-6">
            Use our free professional calculators to project your wealth, plan your retirement, or manage your debt.
          </p>
          <Link 
            href="/calculators" 
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
          >
            Explore All Calculators
          </Link>
        </div>
      </div>
    </article>
  );
}
