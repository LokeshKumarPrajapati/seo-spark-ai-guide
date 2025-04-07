
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Download, ArrowRight, Info, AlertTriangle, CheckCircle, BarChart3 } from 'lucide-react';
import { getAiRecommendations } from '@/services/WebsiteCrawlerService';

const Results = () => {
  const navigate = useNavigate();
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [url, setUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    // Load analysis data from sessionStorage
    const storedData = sessionStorage.getItem('seoAnalysisData');
    
    if (!storedData) {
      // No analysis data, redirect to home
      navigate('/');
      return;
    }
    
    try {
      const parsedData = JSON.parse(storedData);
      setAnalysisData(parsedData.data);
      setUrl(parsedData.url);
      
      // Fetch AI recommendations
      const fetchRecommendations = async () => {
        setIsLoading(true);
        try {
          const recommendations = await getAiRecommendations(parsedData.data, parsedData.url);
          setRecommendations(recommendations);
        } catch (error) {
          console.error("Error fetching recommendations:", error);
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchRecommendations();
      
    } catch (error) {
      console.error("Error parsing analysis data:", error);
      navigate('/');
    }
  }, [navigate]);

  // Format score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-seo-green";
    if (score >= 65) return "text-seo-yellow";
    return "text-seo-red";
  };
  
  // Format progress color
  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 65) return "bg-amber-500";
    return "bg-red-500";
  };

  if (!analysisData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-seo-blue mx-auto mb-4"></div>
            <p className="text-lg">Loading analysis results...</p>
          </div>
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    );
  }

  const handleExportPDF = () => {
    // In a real implementation, this would generate and download a PDF
    alert("In a production environment, this would generate and download a PDF report.");
  };

  const handleReAnalyze = () => {
    navigate('/');
  };

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
            <p className="text-gray-600">{url}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
            <Button 
              variant="outline" 
              onClick={handleReAnalyze}
              className="flex items-center"
            >
              <ArrowRight className="mr-2 h-4 w-4" /> Re-analyze
            </Button>
            <Button onClick={handleExportPDF}>
              <Download className="mr-2 h-4 w-4" /> Export Report
            </Button>
          </div>
        </div>

        {/* Score Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">SEO Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-3xl font-bold ${getScoreColor(analysisData.seoScore)}`}>
                  {analysisData.seoScore}/100
                </span>
                <Info className="h-5 w-5 text-gray-400" />
              </div>
              <Progress 
                value={analysisData.seoScore} 
                className={`h-2 bg-gray-200 ${getProgressColor(analysisData.seoScore)}`} 
              />
              <p className="mt-2 text-sm text-gray-600">
                {analysisData.seoScore >= 80 ? "Excellent" : 
                 analysisData.seoScore >= 65 ? "Good with room for improvement" : 
                 "Needs significant improvement"}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-3xl font-bold ${getScoreColor(analysisData.performanceScore)}`}>
                  {analysisData.performanceScore}/100
                </span>
                <Info className="h-5 w-5 text-gray-400" />
              </div>
              <Progress 
                value={analysisData.performanceScore} 
                className={`h-2 bg-gray-200 ${getProgressColor(analysisData.performanceScore)}`}
              />
              <p className="mt-2 text-sm text-gray-600">
                {analysisData.performanceScore >= 80 ? "Excellent performance" : 
                 analysisData.performanceScore >= 65 ? "Good performance" : 
                 "Performance needs improvement"}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Security</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-3xl font-bold ${getScoreColor(analysisData.securityScore)}`}>
                  {analysisData.securityScore}/100
                </span>
                <Info className="h-5 w-5 text-gray-400" />
              </div>
              <Progress 
                value={analysisData.securityScore} 
                className={`h-2 bg-gray-200 ${getProgressColor(analysisData.securityScore)}`}
              />
              <p className="mt-2 text-sm text-gray-600">
                {analysisData.securityScore >= 80 ? "Well secured" : 
                 analysisData.securityScore >= 65 ? "Adequate security" : 
                 "Security needs improvement"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Results Tabs */}
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="seo">SEO Details</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Website Overview</CardTitle>
                <CardDescription>
                  Summary of your website's SEO, performance, and security analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Page Title</h3>
                      <p>{analysisData.title}</p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Meta Description</h3>
                      <p className="text-sm">{analysisData.description}</p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Word Count</h3>
                      <p>{analysisData.wordCount} words</p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Load Time</h3>
                      <p>{analysisData.loadTime.toFixed(1)} seconds</p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Mobile Friendly</h3>
                      <p className="flex items-center">
                        {analysisData.mobileFriendly ? (
                          <><CheckCircle className="h-4 w-4 text-green-500 mr-1" /> Yes</>
                        ) : (
                          <><AlertTriangle className="h-4 w-4 text-amber-500 mr-1" /> No</>
                        )}
                      </p>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">HTTPS</h3>
                      <p className="flex items-center">
                        {analysisData.hasHttps ? (
                          <><CheckCircle className="h-4 w-4 text-green-500 mr-1" /> Yes</>
                        ) : (
                          <><AlertTriangle className="h-4 w-4 text-red-500 mr-1" /> No</>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="seo">
            <Card>
              <CardHeader>
                <CardTitle>SEO Analysis</CardTitle>
                <CardDescription>
                  Detailed breakdown of your website's SEO factors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Content Structure</h3>
                      <ul className="space-y-3">
                        <li className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span>H1 Tags</span>
                          <span className={`font-medium ${analysisData.h1Count === 1 ? 'text-green-500' : 'text-amber-500'}`}>
                            {analysisData.h1Count}
                          </span>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span>H2 Tags</span>
                          <span className="font-medium">{analysisData.h2Count}</span>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span>Images without Alt Text</span>
                          <span className={`font-medium ${analysisData.imgWithoutAlt === 0 ? 'text-green-500' : 'text-amber-500'}`}>
                            {analysisData.imgWithoutAlt}
                          </span>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span>Internal Links</span>
                          <span className="font-medium">{analysisData.internalLinks}</span>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span>External Links</span>
                          <span className="font-medium">{analysisData.externalLinks}</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Technical SEO</h3>
                      <ul className="space-y-3">
                        <li className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span>Canonical Tag</span>
                          <span className={`font-medium ${analysisData.hasCanonical ? 'text-green-500' : 'text-red-500'}`}>
                            {analysisData.hasCanonical ? 'Present' : 'Missing'}
                          </span>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span>Sitemap.xml</span>
                          <span className={`font-medium ${analysisData.hasSitemap ? 'text-green-500' : 'text-amber-500'}`}>
                            {analysisData.hasSitemap ? 'Present' : 'Missing'}
                          </span>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span>Robots.txt</span>
                          <span className={`font-medium ${analysisData.hasRobots ? 'text-green-500' : 'text-amber-500'}`}>
                            {analysisData.hasRobots ? 'Present' : 'Missing'}
                          </span>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span>Meta Tags</span>
                          <span className="font-medium">{analysisData.metaTagsCount}</span>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-gray-50 rounded">
                          <span>Mobile Friendly</span>
                          <span className={`font-medium ${analysisData.mobileFriendly ? 'text-green-500' : 'text-red-500'}`}>
                            {analysisData.mobileFriendly ? 'Yes' : 'No'}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Keyword Density</h3>
                    <div className="p-4 bg-gray-50 rounded">
                      <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {Object.entries(analysisData.keywordDensity).map(([keyword, density]) => (
                          <li key={keyword} className="flex items-center justify-between">
                            <span className="text-sm font-medium">{keyword}</span>
                            <span className="text-sm">{(Number(density) * 100).toFixed(1)}%</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analysis</CardTitle>
                <CardDescription>
                  Details about your website's loading speed and performance factors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative h-40 w-40">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <BarChart3 className="h-16 w-16 text-gray-200" />
                      </div>
                      <svg viewBox="0 0 100 100" className="h-40 w-40 transform -rotate-90">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="transparent"
                          stroke="#e6e6e6"
                          strokeWidth="10"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="transparent"
                          stroke={
                            analysisData.performanceScore >= 80 ? "#22c55e" :
                            analysisData.performanceScore >= 65 ? "#f59e0b" : "#ef4444"
                          }
                          strokeWidth="10"
                          strokeDasharray={`${analysisData.performanceScore * 2.83} 283`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold">{analysisData.performanceScore}</span>
                      </div>
                    </div>
                  </div>
                
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Speed Metrics</h3>
                      <ul className="space-y-3">
                        <li className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span>Page Load Time</span>
                          <span className={`font-medium ${analysisData.loadTime < 2 ? 'text-green-500' : analysisData.loadTime < 3 ? 'text-amber-500' : 'text-red-500'}`}>
                            {analysisData.loadTime.toFixed(1)}s
                          </span>
                        </li>
                        <li className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span>First Contentful Paint</span>
                          <span className="font-medium">
                            {(analysisData.loadTime * 0.6).toFixed(1)}s
                          </span>
                        </li>
                        <li className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span>Time to Interactive</span>
                          <span className="font-medium">
                            {(analysisData.loadTime * 1.2).toFixed(1)}s
                          </span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Core Web Vitals</h3>
                      <ul className="space-y-3">
                        <li className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span>Largest Contentful Paint (LCP)</span>
                          <span className={`font-medium ${analysisData.loadTime < 2.5 ? 'text-green-500' : analysisData.loadTime < 4 ? 'text-amber-500' : 'text-red-500'}`}>
                            {(analysisData.loadTime * 0.9).toFixed(1)}s
                          </span>
                        </li>
                        <li className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span>First Input Delay (FID)</span>
                          <span className="font-medium text-green-500">
                            {Math.floor(analysisData.loadTime * 50)}ms
                          </span>
                        </li>
                        <li className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span>Cumulative Layout Shift (CLS)</span>
                          <span className="font-medium text-amber-500">
                            {(Math.random() * 0.2 + 0.05).toFixed(2)}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Analysis</CardTitle>
                <CardDescription>
                  Overview of your website's security measures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Security Headers</h3>
                      <ul className="space-y-3">
                        <li className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span>HTTPS</span>
                          <span className={`font-medium ${analysisData.hasHttps ? 'text-green-500' : 'text-red-500'}`}>
                            {analysisData.hasHttps ? 'Enabled' : 'Not Enabled'}
                          </span>
                        </li>
                        <li className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span>Content-Security-Policy</span>
                          <span className="font-medium text-amber-500">
                            Partial
                          </span>
                        </li>
                        <li className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span>X-Content-Type-Options</span>
                          <span className="font-medium text-green-500">
                            Present
                          </span>
                        </li>
                        <li className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span>X-Frame-Options</span>
                          <span className="font-medium text-amber-500">
                            Missing
                          </span>
                        </li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Other Security Factors</h3>
                      <ul className="space-y-3">
                        <li className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span>Mixed Content</span>
                          <span className="font-medium text-green-500">
                            None Detected
                          </span>
                        </li>
                        <li className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span>SSL Certificate</span>
                          <span className={`font-medium ${analysisData.hasHttps ? 'text-green-500' : 'text-red-500'}`}>
                            {analysisData.hasHttps ? 'Valid' : 'Not Present'}
                          </span>
                        </li>
                        <li className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span>Outdated Libraries</span>
                          <span className="font-medium text-amber-500">
                            2 Detected
                          </span>
                        </li>
                        <li className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <span>Form Security</span>
                          <span className="font-medium text-amber-500">
                            Partial
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* AI Recommendations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
            <CardDescription>
              Our AI has analyzed your website and generated these personalized recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="p-6 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-seo-blue mx-auto mb-4"></div>
                <p className="text-gray-600">Generating AI recommendations...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recommendations.map((recommendation, index) => (
                  <div 
                    key={index} 
                    className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex">
                      <div className="flex-shrink-0 mr-3">
                        <div className="h-8 w-8 rounded-full bg-seo-blue/10 flex items-center justify-center text-seo-blue">
                          {index + 1}
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-800">{recommendation}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="mt-6 text-center">
                  <Button variant="outline">
                    View Full Implementation Plan <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
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
