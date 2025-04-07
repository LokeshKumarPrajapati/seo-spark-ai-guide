
import React from 'react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo />
            <p className="mt-4 text-gray-600">
              AI-powered website analysis and SEO optimization to help your site rank higher.
            </p>
          </div>
          
          <div>
            <h5 className="font-bold mb-4">Product</h5>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-seo-blue">Features</a></li>
              <li><a href="#" className="text-gray-600 hover:text-seo-blue">Pricing</a></li>
              <li><a href="#" className="text-gray-600 hover:text-seo-blue">API</a></li>
              <li><a href="#" className="text-gray-600 hover:text-seo-blue">Integrations</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-bold mb-4">Resources</h5>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-seo-blue">Blog</a></li>
              <li><a href="#" className="text-gray-600 hover:text-seo-blue">Documentation</a></li>
              <li><a href="#" className="text-gray-600 hover:text-seo-blue">Guides</a></li>
              <li><a href="#" className="text-gray-600 hover:text-seo-blue">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="font-bold mb-4">Company</h5>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-seo-blue">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-seo-blue">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-seo-blue">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-seo-blue">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500">© 2025 SEOSpark. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-seo-blue">
              Twitter
            </a>
            <a href="#" className="text-gray-500 hover:text-seo-blue">
              LinkedIn
            </a>
            <a href="#" className="text-gray-500 hover:text-seo-blue">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
