
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Link, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const UrlAnalyzer: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateUrl = (input: string) => {
    try {
      const urlObj = new URL(input);
      return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
    } catch (e) {
      return false;
    }
  };

  const handleAnalyze = (e: React.FormEvent) => {
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
    
    // In a real implementation, we would call an API here
    setTimeout(() => {
      setIsAnalyzing(false);
      // Navigate to results page
      toast.success("Website analysis complete!");
      navigate('/results');
    }, 2000);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <form onSubmit={handleAnalyze}>
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
    </div>
  );
};

export default UrlAnalyzer;
