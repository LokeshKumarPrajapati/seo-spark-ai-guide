
import React, { useState } from 'react';
import UrlAnalyzer from './UrlAnalyzer';
import StatsPreview from './StatsPreview';
import WebsitePreview from './WebsitePreview';
import { ArrowRight, Zap, LineChart, Search, BarChart } from 'lucide-react';

const Hero: React.FC = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalysisStart = (url: string) => {
    setPreviewUrl(url);
    setIsAnalyzing(true);
  };

  const handleAnalysisComplete = () => {
    setIsAnalyzing(false);
  };

  return (
    <div className="bg-hero-pattern py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-1 shadow-sm border border-indigo-100">
              <Zap className="h-4 w-4 text-seo-blue mr-2" />
              <span className="text-sm font-medium text-gray-800">AI-powered SEO analysis platform</span>
            </div>
          </div>
          <h1 className="mb-6 bg-clip-text text-transparent bg-blue-gradient animate-gradient-x">
            AI-Powered SEO Analysis & Optimization
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            Get instant insights and AI recommendations to improve your website's search engine ranking and performance.
          </p>
          <UrlAnalyzer 
            onAnalysisStart={handleAnalysisStart}
            onAnalysisComplete={handleAnalysisComplete}
          />
        </div>
        
        {/* Website Preview Section */}
        <div className="mt-12 mb-12">
          <WebsitePreview url={previewUrl} isAnalyzing={isAnalyzing} />
        </div>
        
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center justify-center mb-6 mt-12">
          <div className="flex items-center">
            <LineChart className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-sm font-medium">90% Average ranking improvement</span>
          </div>
          <div className="flex items-center">
            <Search className="h-5 w-5 text-seo-blue mr-2" />
            <span className="text-sm font-medium">500+ SEO factors analyzed</span>
          </div>
          <div className="flex items-center">
            <BarChart className="h-5 w-5 text-amber-500 mr-2" />
            <span className="text-sm font-medium">Advanced AI recommendations</span>
          </div>
        </div>
        
        <StatsPreview />
        
        <div className="mt-12 text-center">
          <a href="#features" className="inline-flex items-center text-seo-blue font-medium">
            Explore features
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
