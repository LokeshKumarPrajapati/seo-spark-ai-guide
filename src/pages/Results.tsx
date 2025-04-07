
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, Download, ArrowRight, Info } from 'lucide-react';

const Results = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="outline" 
          className="mb-6"
          onClick={() => navigate('/')}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>

        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Analysis Results</h1>
            <p className="text-gray-600">example.com</p>
          </div>
          <Button className="mt-4 md:mt-0">
            <Download className="mr-2 h-4 w-4" /> Export Report
          </Button>
        </div>

        {/* Score Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">SEO Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl font-bold text-seo-yellow">72/100</span>
                <Info className="h-5 w-5 text-gray-400" />
              </div>
              <Progress value={72} className="h-2 bg-gray-200" />
              <p className="mt-2 text-sm text-gray-600">Good with room for improvement</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl font-bold text-seo-green">89/100</span>
                <Info className="h-5 w-5 text-gray-400" />
              </div>
              <Progress value={89} className="h-2 bg-gray-200" />
              <p className="mt-2 text-sm text-gray-600">Excellent performance</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Security</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl font-bold text-seo-red">64/100</span>
                <Info className="h-5 w-5 text-gray-400" />
              </div>
              <Progress value={64} className="h-2 bg-gray-200" />
              <p className="mt-2 text-sm text-gray-600">Needs improvement</p>
            </CardContent>
          </Card>
        </div>

        {/* Placeholder for future detailed results */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-6 text-center">
              <p className="text-gray-600 mb-4">
                This is a placeholder for future AI-generated recommendations. In the complete 
                implementation, this section would include detailed insights and suggestions 
                for improving your website's SEO, performance, and security.
              </p>
              <Button variant="outline">
                View Full Implementation Plan <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Results;
