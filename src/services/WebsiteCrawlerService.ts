
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
  timestamp?: string;
}

// Store analysis data in memory for the admin panel
const analysisHistory: {url: string, data: SeoData, userId?: string}[] = [];

export const crawlWebsite = async (url: string): Promise<SeoData> => {
  try {
    // In a real implementation, you'd call your backend API
    // For now, we'll use a more advanced simulation
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Parse the URL
    const urlObj = new URL(url);
    const domain = urlObj.hostname;
    
    // For demo, generate a hash based on the URL for consistent but "random" scores
    const hashCode = Array.from(domain).reduce(
      (acc, char) => acc + char.charCodeAt(0), 0
    );
    
    // Generate more realistic scores
    const generateScore = (base: number, variance: number) => 
      Math.min(98, Math.max(35, base + (hashCode % variance)));
    
    // Create scores that seem more realistic based on domain characteristics
    let seoBase = 65;
    let performanceBase = 70;
    let securityBase = 68;
    
    // Adjust scores based on domain name patterns
    if (domain.includes('blog') || domain.includes('news')) {
      seoBase += 8; // Content sites tend to have better SEO
      performanceBase -= 5; // But might have more media affecting performance
    }
    
    if (domain.includes('shop') || domain.includes('store')) {
      performanceBase -= 8; // E-commerce sites often have performance issues
      securityBase += 10; // But better security
    }
    
    if (domain.includes('gov') || domain.includes('edu')) {
      seoBase += 5; // Authoritative domains
      securityBase += 12; // Better security
    }
    
    const seoScore = generateScore(seoBase, 20);
    const performanceScore = generateScore(performanceBase, 25);
    const securityScore = generateScore(securityBase, 18);
    
    // Adjust metadata based on scores
    const hasCanonical = hashCode % 5 !== 0 || seoScore > 75;
    const hasSitemap = hashCode % 6 !== 0 || seoScore > 70;
    const hasRobots = hashCode % 7 !== 0 || seoScore > 65;
    const hasHttps = hashCode % 9 !== 0 || securityScore > 60;
    const mobileFriendly = hashCode % 11 !== 0 || performanceScore > 65;
    
    // Estimate load time based on performance score
    const loadTime = (100 - performanceScore) / 20 + (hashCode % 10) / 10;
    
    // Generate keyword density with more realistic values
    const keywordDensity: Record<string, number> = {};
    const words = domain.replace(/\.(com|org|net|io|co|gov|edu)$/, '').split(/[.-]/);
    
    words.forEach(word => {
      if (word.length > 2) {
        keywordDensity[word] = (5 + (hashCode % 7)) / 100;
      }
    });
    
    // Add some generic keywords with lower density
    keywordDensity["online"] = (3 + (hashCode % 4)) / 100;
    keywordDensity["best"] = (2 + (hashCode % 3)) / 100;
    keywordDensity["service"] = (2 + (hashCode % 4)) / 100;
    
    // More realistic h1/h2 counts
    const h1Count = seoScore > 80 ? 1 : 1 + (hashCode % 2);
    const h2Count = 2 + (hashCode % 6) + Math.floor((100 - seoScore) / 20);
    
    // Generate more realistic data
    const result: SeoData = {
      title: domain.charAt(0).toUpperCase() + domain.slice(1).replace(/\.(com|org|net|io|co|gov|edu)$/, '') + " - " + ["Homepage", "Home", "Welcome", "Official Site"][hashCode % 4],
      description: `Welcome to ${domain.replace(/\.(com|org|net|io|co|gov|edu)$/, '')} - ${["your destination for quality content", "the leading provider of innovative solutions", "trusted by thousands of customers", "professional services and products"][hashCode % 4]}.`,
      h1Count,
      h2Count,
      imgWithoutAlt: Math.floor((100 - seoScore) / 15),
      externalLinks: 3 + (hashCode % 12),
      internalLinks: 8 + (hashCode % 20),
      wordCount: 300 + (hashCode % 1200) + (seoScore > 70 ? 500 : 0),
      loadTime,
      hasCanonical,
      hasSitemap,
      hasRobots,
      hasHttps,
      metaTagsCount: 2 + (hashCode % 8) + (seoScore > 75 ? 3 : 0),
      mobileFriendly,
      keywordDensity,
      seoScore,
      performanceScore,
      securityScore,
      timestamp: new Date().toISOString()
    };
    
    // Save this analysis to our history for the admin panel
    analysisHistory.push({
      url,
      data: result,
      userId: `user_${Math.floor(Math.random() * 5) + 1}` // Simulate different users
    });
    
    if (analysisHistory.length > 50) {
      analysisHistory.shift(); // Keep only the most recent 50 analyses
    }
    
    return result;
  } catch (error) {
    console.error("Error crawling website:", error);
    toast.error("Failed to analyze website. Please try again.");
    throw error;
  }
};

export const getAiRecommendations = async (seoData: SeoData, url: string): Promise<string[]> => {
  // Simulate API call to AI service
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const recommendations: string[] = [];
  
  // Generate more context-aware recommendations
  if (seoData.seoScore < 70) {
    if (!seoData.hasCanonical) {
      recommendations.push("Add canonical tags to prevent duplicate content issues and improve search engine ranking.");
    }
    
    if (seoData.title.length < 30 || seoData.title.length > 65) {
      recommendations.push(`Optimize your title tag length (currently ${seoData.title.length} characters). Keep it between 50-60 characters for optimal visibility in search results.`);
    }
    
    if (seoData.description.length < 120 || seoData.description.length > 160) {
      recommendations.push(`Improve meta description length (currently ${seoData.description.length} characters). Aim for 150-160 characters to increase click-through rates.`);
    }
    
    if (seoData.h1Count !== 1) {
      recommendations.push(`Ensure your page has exactly one H1 tag (currently has ${seoData.h1Count}). Multiple H1 tags can confuse search engines about your page's main topic.`);
    }
    
    if (seoData.imgWithoutAlt > 0) {
      recommendations.push(`Add alt text to ${seoData.imgWithoutAlt} images to improve accessibility and SEO. This also helps search engines understand image content.`);
    }
    
    if (seoData.internalLinks < 10) {
      recommendations.push(`Increase internal linking (currently ${seoData.internalLinks} links). A good internal linking structure helps search engines discover and understand the hierarchy of your content.`);
    }
  }
  
  if (seoData.performanceScore < 70) {
    recommendations.push(`Your page load time (${seoData.loadTime.toFixed(1)}s) needs improvement. Consider optimizing images, minifying CSS/JS, and leveraging browser caching to enhance user experience.`);
    
    if (!seoData.mobileFriendly) {
      recommendations.push("Your site isn't fully mobile-friendly. With Google's mobile-first indexing, this could significantly impact your rankings.");
    }
  }
  
  if (seoData.securityScore < 70) {
    if (!seoData.hasHttps) {
      recommendations.push("Implement HTTPS encryption immediately. Not only is this critical for security, but Google also prioritizes secure websites in search results.");
    }
    
    recommendations.push("Consider implementing Content Security Policy (CSP) headers to prevent XSS attacks and enhance your website's security posture.");
    
    recommendations.push("Set up proper CORS policies to protect your users' data and prevent unauthorized access to your website resources.");
  }
  
  // Add domain-specific recommendations based on URL patterns
  const domain = new URL(url).hostname;
  
  if (domain.includes('shop') || domain.includes('store')) {
    recommendations.push("Implement structured data markup for your products to enhance visibility in search results with rich snippets.");
    recommendations.push("Consider adding customer reviews with schema markup to improve click-through rates and build trust.");
  }
  
  if (domain.includes('blog') || domain.includes('news')) {
    recommendations.push("Use proper schema markup for articles to appear in Google News and other news aggregators.");
    recommendations.push("Implement a consistent content publishing schedule to improve search engine crawling frequency.");
  }
  
  // Add general recommendations if we don't have enough
  if (recommendations.length < 5) {
    recommendations.push("Create a comprehensive content strategy focusing on long-tail keywords to attract more targeted traffic.");
    recommendations.push("Implement a responsive design to ensure your website displays correctly on all devices.");
    recommendations.push("Consider implementing schema markup to enhance your search results appearance with rich snippets.");
    recommendations.push("Improve page loading speed by optimizing images and implementing lazy loading.");
    recommendations.push("Set up Google Search Console and Bing Webmaster Tools to monitor your site's performance in search results.");
  }
  
  return recommendations.slice(0, 8); // Return max 8 recommendations
};

// Function to get analysis history for admin panel
export const getAnalysisHistory = () => {
  return analysisHistory;
};

// Authentication for admin panel
const ADMIN_CREDENTIALS = {
  email: "lokesh@gmail.com",
  password: "12345678"
};

export const authenticateAdmin = (email: string, password: string): boolean => {
  return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password;
};
