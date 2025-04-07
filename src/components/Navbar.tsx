
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from './Logo';
import { ShieldAlert } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="border-b border-gray-200 py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/">
          <Logo />
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/#features" className="text-gray-700 hover:text-seo-blue">Features</Link>
          <Link to="/#pricing" className="text-gray-700 hover:text-seo-blue">Pricing</Link>
          <Link to="/admin" className="text-gray-700 hover:text-seo-blue flex items-center">
            <ShieldAlert className="h-4 w-4 mr-1" />
            Admin
          </Link>
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
