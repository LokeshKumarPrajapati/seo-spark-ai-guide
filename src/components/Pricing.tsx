
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const PricingTier: React.FC<{
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  highlighted?: boolean;
}> = ({ title, price, description, features, buttonText, highlighted = false }) => {
  return (
    <Card className={`${highlighted ? 'border-seo-blue shadow-lg relative' : ''} card-hover`}>
      {highlighted && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-seo-blue text-white px-4 py-1 rounded-full text-sm font-medium">
          Most Popular
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <div className="mt-4">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-gray-500 ml-2">/month</span>
        </div>
        <p className="text-gray-600 mt-4">{description}</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-seo-green mr-2 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className={`w-full ${highlighted ? 'bg-seo-blue hover:bg-seo-blue-dark' : 'bg-gray-800 hover:bg-gray-900'}`}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your needs. All plans include core features and seamless updates.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <PricingTier
            title="Basic"
            price="$0"
            description="Perfect for trying out the platform"
            features={[
              "3 Website Analyses",
              "Basic SEO Report",
              "Performance Metrics",
              "Security Check",
              "Export to PDF"
            ]}
            buttonText="Start Free"
          />
          
          <PricingTier
            title="Pro"
            price="$39"
            description="Ideal for small businesses and startups"
            features={[
              "Unlimited Analyses",
              "Advanced SEO Reports",
              "AI Content Suggestions",
              "Keyword Optimization",
              "Competitor Analysis",
              "Weekly Monitoring",
              "Email Reports"
            ]}
            buttonText="Upgrade to Pro"
            highlighted={true}
          />
          
          <PricingTier
            title="Enterprise"
            price="$99"
            description="For agencies and large businesses"
            features={[
              "Everything in Pro",
              "Multiple User Accounts",
              "API Access",
              "White Label Reports",
              "Custom Integrations",
              "Priority Support",
              "Dedicated Account Manager"
            ]}
            buttonText="Contact Sales"
          />
        </div>
      </div>
    </section>
  );
};

export default Pricing;
