
import { toast } from "sonner";

interface SeoData {
  title: string;
  description: string;
  h1Count: number;
  h2Count: number;
  imgWithoutAlt: number;
  externalLinks: number;
  internalLinks: number;
  wordCount: number;
  loadTime: number;
  hasCanonical: boolean;
  hasSitemap: boolean;
  hasRobots: boolean;
  hasHttps: boolean;
  metaTagsCount: number;
  mobileFriendly: boolean;
  keywordDensity: Record<string, number>;
  seoScore: number;
  performanceScore: number;
  securityScore: number;
}

export const crawlWebsite = async (url: string): Promise<SeoData> => {
  try {
    // For a real implementation, you'd call your backend API
    // Since we don't have a backend, we'll simulate API calls
    
    // In a real implementation, this would be:
    // const response = await fetch('/api/crawl', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ url })
    // });
    // const data = await response.json();
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate realistic data based on the URL
    const domain = new URL(url).hostname;
    
    // Use a hash of the domain to generate consistent but "random" scores
    const hashCode = Array.from(domain).reduce(
      (acc, char) => acc + char.charCodeAt(0), 0
    );
    
    // Generate scores between 40-95 based on domain hash
    const generateScore = (base: number) => 
      Math.min(95, Math.max(40, (hashCode % 55) + base));
    
    const seoScore = generateScore(40);
    const performanceScore = generateScore(45);
    const securityScore = generateScore(35);
    
    // Generate other data
    const result: SeoData = {
      title: domain.charAt(0).toUpperCase() + domain.slice(1).replace('.com', '') + " - Homepage",
      description: `Welcome to ${domain.replace('.com', '')} - your destination for ${domain.includes('shop') ? 'shopping' : 'information'}.`,
      h1Count: 1 + (hashCode % 3),
      h2Count: 3 + (hashCode % 8),
      imgWithoutAlt: hashCode % 5,
      externalLinks: 5 + (hashCode % 15),
      internalLinks: 10 + (hashCode % 25),
      wordCount: 500 + (hashCode % 1500),
      loadTime: 1 + (hashCode % 10) / 10,
      hasCanonical: hashCode % 3 !== 0,
      hasSitemap: hashCode % 4 !== 0,
      hasRobots: hashCode % 5 !== 0,
      hasHttps: hashCode % 7 !== 0,
      metaTagsCount: 3 + (hashCode % 10),
      mobileFriendly: hashCode % 8 !== 0,
      keywordDensity: {
        [domain.replace('.com', '')]: (10 + (hashCode % 5)) / 100,
        "online": (5 + (hashCode % 5)) / 100,
        "service": (3 + (hashCode % 7)) / 100,
        "website": (4 + (hashCode % 6)) / 100,
        "best": (3 + (hashCode % 4)) / 100,
      },
      seoScore,
      performanceScore,
      securityScore
    };
    
    return result;
  } catch (error) {
    console.error("Error crawling website:", error);
    toast.error("Failed to analyze website. Please try again.");
    throw error;
  }
};

export const getAiRecommendations = async (seoData: SeoData, url: string): Promise<string[]> => {
  // Simulate API call to AI service
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const recommendations: string[] = [];
  
  if (seoData.seoScore < 70) {
    if (!seoData.hasCanonical) {
      recommendations.push("Add canonical tags to prevent duplicate content issues.");
    }
    
    if (seoData.title.length < 30 || seoData.title.length > 60) {
      recommendations.push(`Optimize your title tag length (currently ${seoData.title.length} characters). Aim for 50-60 characters.`);
    }
    
    if (seoData.description.length < 120 || seoData.description.length > 160) {
      recommendations.push(`Improve meta description length (currently ${seoData.description.length} characters). Aim for 150-160 characters.`);
    }
    
    if (seoData.h1Count !== 1) {
      recommendations.push(`Ensure your page has exactly one H1 tag (currently has ${seoData.h1Count}).`);
    }
    
    if (seoData.imgWithoutAlt > 0) {
      recommendations.push(`Add alt text to ${seoData.imgWithoutAlt} images to improve accessibility and SEO.`);
    }
  }
  
  if (seoData.performanceScore < 70) {
    recommendations.push(`Your page load time (${seoData.loadTime.toFixed(1)}s) could be improved. Consider optimizing images and minimizing JavaScript.`);
  }
  
  if (seoData.securityScore < 70) {
    if (!seoData.hasHttps) {
      recommendations.push("Add HTTPS to your website to improve security and SEO ranking.");
    }
    
    recommendations.push("Consider implementing Content Security Policy (CSP) headers for enhanced security.");
  }
  
  // Add some general recommendations
  recommendations.push("Consider creating more in-depth content around your primary keywords to improve topical authority.");
  recommendations.push("Improve internal linking structure to help search engines discover and understand your content better.");
  
  // If we don't have enough recommendations, add some generic ones
  if (recommendations.length < 5) {
    recommendations.push("Optimize your images to improve page load speed.");
    recommendations.push("Create a content calendar to publish regular updates to your website.");
    recommendations.push("Consider implementing schema markup to enhance your search results appearance.");
    recommendations.push("Improve mobile responsiveness to enhance user experience on smartphones and tablets.");
  }
  
  return recommendations.slice(0, 8); // Return max 8 recommendations
};
