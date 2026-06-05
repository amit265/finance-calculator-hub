import React from 'react';

export default function DisclaimerPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto prose prose-slate">
        <h1 className="text-4xl font-bold mb-8">Disclaimer</h1>
        <p className="text-muted-foreground">Last updated: June 5, 2026</p>
        
        <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8">
            <p className="text-red-900 font-bold mb-2 uppercase">Financial Disclaimer</p>
            <p className="text-red-800 m-0">The information provided by Finance Calculator Hub is for general informational purposes only. All information on the site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.</p>
        </div>

        <h2>Not Financial Advice</h2>
        <p>The calculators and content on this website do not constitute financial, investment, legal, or tax advice. You should consult with a qualified professional before making any financial decisions based on the results provided by our tools.</p>
        
        <h2>&quot;As Is&quot; Basis</h2>
        <p>Our calculators are provided on an &quot;as is&quot; and &quot;as available&quot; basis. We do not warrant that the calculators will be error-free or uninterrupted.</p>
        
        <h2>Third-Party Links</h2>
        <p>Our website may contain links to third-party websites or services that are not owned or controlled by Finance Calculator Hub. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites.</p>
      </div>
    </div>
  );
}
