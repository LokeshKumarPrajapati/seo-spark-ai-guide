
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Link, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { crawlWebsite } from '../services/WebsiteCrawlerService';
import WebsitePreview from './WebsitePreview';

interface UrlAnalyzerProps {
  onAnalysisStart?: (url: string) => void;
  onAnalysisComplete?: (data: any) => void;
}

const UrlAnalyzer: React.FC<UrlAnalyzerProps> = ({ 
  onAnalysisStart, 
  onAnalysisComplete 
}) => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  const validateUrl = (input: string) => {
    try {
      const urlObj = new URL(input);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch (e) {
      return false;
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      setError('Please enter a URL to analyze');
      return;
    }
    
    if (!validateUrl(url)) {
      setError('Please enter a valid URL (e.g., https://example.com)');
      return;
    }
    
    setError('');
    setIsAnalyzing(true);
    setPreviewUrl(url);
    
    // Notify parent component that analysis has started
    if (onAnalysisStart) {
      onAnalysisStart(url);
    }
    
    try {
      // Call our crawler service
      const analysisData = await crawlWebsite(url);
      
      // Store analysis results in sessionStorage to share between pages
      sessionStorage.setItem('seoAnalysisData', JSON.stringify({
        url,
        data: analysisData,
        timestamp: new Date().toISOString()
      }));
      
      // Notify parent component that analysis is complete
      if (onAnalysisComplete) {
        onAnalysisComplete(analysisData);
      }
      
      // Show success notification
      toast.success("Website analysis complete!");
      
      // Navigate to results page
      navigate('/results');
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error("Failed to analyze website. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleAnalyze} className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Link className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="url"
              placeholder="Enter your website URL (e.g., https://example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="pl-10 pr-4 py-6 text-lg"
              disabled={isAnalyzing}
              required
            />
            {error && (
              <div className="text-red-500 text-sm mt-1 flex items-center">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {error}
              </div>
            )}
          </div>
          <Button 
            type="submit" 
            className="bg-seo-blue hover:bg-seo-blue-dark py-6 px-8"
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Analyze Site
              </>
            )}
          </Button>
        </div>
        <div className="mt-3 text-center text-xs text-gray-500">
          FREE analysis includes 50+ key SEO metrics and basic recommendations
        </div>
      </form>
      
      <WebsitePreview url={previewUrl} isAnalyzing={isAnalyzing} />
    </div>
  );
};

export default UrlAnalyzer;
