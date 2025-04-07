
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

interface WebsitePreviewProps {
  url: string | null;
  isAnalyzing: boolean;
}

const WebsitePreview: React.FC<WebsitePreviewProps> = ({ url, isAnalyzing }) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Reset states when URL changes
  useEffect(() => {
    setIframeLoaded(false);
    setError(null);
  }, [url]);

  const handleIframeLoad = () => {
    setIframeLoaded(true);
  };

  const handleError = () => {
    setError("Unable to load website preview. This may be due to website security settings.");
  };

  if (!url) {
    return (
      <Card className="w-full h-[300px] flex items-center justify-center bg-gray-50">
        <p className="text-gray-400">Enter a URL above to preview the website</p>
      </Card>
    );
  }

  return (
    <Card className="w-full relative overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="w-full h-[300px] overflow-hidden">
        {!iframeLoaded && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50">
            <Loader2 className="h-8 w-8 text-seo-blue animate-spin mb-2" />
            <p className="text-gray-600">Loading website preview...</p>
          </div>
        )}
        
        {error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50">
            <p className="text-amber-600 mb-2">⚠️ {error}</p>
            <p className="text-gray-600 text-sm">Analysis will still continue in the background.</p>
          </div>
        )}
        
        {url && (
          <iframe 
            src={url}
            className={`w-full h-full ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={handleIframeLoad}
            onError={handleError}
            title="Website Preview"
            sandbox="allow-same-origin allow-scripts"
          />
        )}
      </div>
      
      {isAnalyzing && (
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
          <Loader2 className="h-10 w-10 animate-spin mb-4" />
          <h3 className="text-xl font-semibold mb-2">Analyzing Website</h3>
          <p className="text-sm max-w-xs text-center">Our AI is crawling your website to analyze SEO, performance, and security factors</p>
        </div>
      )}
    </Card>
  );
};

export default WebsitePreview;
