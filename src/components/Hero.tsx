
import React from 'react';
import UrlAnalyzer from './UrlAnalyzer';
import StatsPreview from './StatsPreview';

const Hero: React.FC = () => {
  return (
    <div className="bg-hero-pattern py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="mb-6 bg-clip-text text-transparent bg-blue-gradient animate-gradient-x">
            AI-Powered SEO Analysis & Optimization
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            Get instant insights and AI recommendations to improve your website's search engine ranking and performance.
          </p>
          <UrlAnalyzer />
        </div>
        <StatsPreview />
      </div>
    </div>
  );
};

export default Hero;
