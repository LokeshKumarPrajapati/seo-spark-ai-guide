
import React from 'react';
import { Button } from '@/components/ui/button';
import Logo from './Logo';

const Navbar: React.FC = () => {
  return (
    <nav className="border-b border-gray-200 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Logo />
        <div className="flex items-center gap-4">
          <a href="#features" className="text-gray-700 hover:text-seo-blue">Features</a>
          <a href="#pricing" className="text-gray-700 hover:text-seo-blue">Pricing</a>
          <Button variant="outline" className="border-seo-blue text-seo-blue hover:bg-seo-blue hover:text-white">
            Login
          </Button>
          <Button className="bg-seo-blue hover:bg-seo-blue-dark">Get Started</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
