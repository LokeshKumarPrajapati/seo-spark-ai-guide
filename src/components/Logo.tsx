
import React from 'react';
import { Search } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center gap-2 text-seo-blue font-bold text-xl">
      <Search size={24} className="text-seo-blue" />
      <span>SEO<span className="text-seo-blue-dark">Spark</span></span>
    </div>
  );
};

export default Logo;
