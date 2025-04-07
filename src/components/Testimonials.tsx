
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    quote: "SEOSpark helped us increase our organic traffic by 230% in just three months. The AI recommendations were spot on!",
    author: "Sarah Johnson",
    position: "Marketing Director, TechFlow",
  },
  {
    quote: "As an SEO agency, we now rely on SEOSpark for all our client sites. It's like having an AI expert on the team.",
    author: "Michael Chen",
    position: "Founder, Digital Rankings",
  },
  {
    quote: "The competitive analysis feature helped us identify content gaps we never would have found otherwise.",
    author: "Alex Rodriguez",
    position: "E-commerce Manager, StyleShop",
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-hero-pattern">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied users who have improved their search rankings with SEOSpark.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-hover">
              <CardContent className="pt-6">
                <div className="mb-4 text-seo-blue">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-xl">★</span>
                  ))}
                </div>
                <p className="mb-6 text-gray-700 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-gray-500 text-sm">{testimonial.position}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
