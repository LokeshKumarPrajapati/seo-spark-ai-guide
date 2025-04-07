
import React from 'react';
import { Button } from '@/components/ui/button';

const CtaSection: React.FC = () => {
  return (
    <section className="py-20 bg-seo-blue text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to boost your SEO performance?</h2>
        <p className="text-xl max-w-2xl mx-auto mb-8">
          Start analyzing your website today and get actionable insights powered by AI.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white text-seo-blue hover:bg-gray-100">
            Start Free Analysis
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-seo-blue-dark">
            View Demo Report
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
