
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const UrlAnalyzer: React.FC = () => {
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setIsAnalyzing(true);
    
    // In a real implementation, we would call an API here
    setTimeout(() => {
      setIsAnalyzing(false);
      // For now, we'll just redirect to a dummy results page
      alert("In a complete implementation, this would analyze: " + url);
    }, 2000);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <form onSubmit={handleAnalyze}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow">
            <Input
              type="url"
              placeholder="Enter your website URL (e.g., https://example.com)"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="px-4 py-6 text-lg"
              disabled={isAnalyzing}
              required
            />
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
      </form>
    </div>
  );
};

export default UrlAnalyzer;
