
import React from 'react';
import FeatureCard from './FeatureCard';
import { Search, Zap, Shield, Eye, BarChart, Globe } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      title: 'SEO Analysis',
      description: 'Get comprehensive SEO metrics including meta tags, headings, keywords, and more.',
      icon: Search
    },
    {
      title: 'Performance Check',
      description: 'Measure site speed, core web vitals, and identify performance bottlenecks.',
      icon: Zap
    },
    {
      title: 'Security Scanner',
      description: 'Verify HTTPS, security headers, and identify potential vulnerabilities.',
      icon: Shield
    },
    {
      title: 'AI Content Analysis',
      description: 'Let AI evaluate your content for readability, grammar, and engagement.',
      icon: Eye
    },
    {
      title: 'Competitor Analysis',
      description: 'Compare your website against competitors and identify keyword gaps.',
      icon: BarChart
    },
    {
      title: 'Mobile Optimization',
      description: 'Check how well your website performs on mobile devices and tablets.',
      icon: Globe
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4">Comprehensive Website Analysis</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered tools provide deep insights into every aspect of your website's SEO and performance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
