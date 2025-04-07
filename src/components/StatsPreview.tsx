
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUp, TrendingUp, Search, CheckCircle2, AlertTriangle } from 'lucide-react';
import { 
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
} from 'recharts';

// Sample data for the graph
const data = [
  { name: 'Jan', traffic: 400, ranking: 240 },
  { name: 'Feb', traffic: 300, ranking: 230 },
  { name: 'Mar', traffic: 500, ranking: 350 },
  { name: 'Apr', traffic: 780, ranking: 410 },
  { name: 'May', traffic: 890, ranking: 600 },
  { name: 'Jun', traffic: 1100, ranking: 780 },
  { name: 'Jul', traffic: 1400, ranking: 900 },
];

// Chart config for the tooltips
const config = {
  traffic: {
    label: 'Organic Traffic',
    color: '#4338ca',
  },
  ranking: {
    label: 'Keyword Rankings',
    color: '#38bdf8',
  },
};

const StatsPreview: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 mb-6">
      {/* SEO Performance Analytics */}
      <Card className="md:col-span-2 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Performance Metrics</h3>
            <span className="text-green-600 flex items-center text-sm font-medium">
              <ArrowUp className="h-4 w-4 mr-1" />
              28% growth
            </span>
          </div>
          
          <div className="h-64 w-full">
            <ChartContainer config={config}>
              <AreaChart
                data={data}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4338ca" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#4338ca" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorRanking" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-xs text-muted-foreground" />
                <YAxis className="text-xs text-muted-foreground" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area 
                  type="monotone" 
                  dataKey="traffic" 
                  stroke="#4338ca" 
                  fillOpacity={1} 
                  fill="url(#colorTraffic)" 
                  name="traffic"
                />
                <Area 
                  type="monotone" 
                  dataKey="ranking" 
                  stroke="#38bdf8" 
                  fillOpacity={1} 
                  fill="url(#colorRanking)" 
                  name="ranking"
                />
              </AreaChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* SEO Health Indicators */}
      <Card className="bg-gradient-to-br from-slate-50 to-white">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">SEO Health</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-sm">Meta Tags</span>
              </div>
              <span className="text-sm font-medium text-green-600">Excellent</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-sm">Mobile Friendly</span>
              </div>
              <span className="text-sm font-medium text-green-600">Excellent</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-amber-500 mr-2" />
                <span className="text-sm">Loading Speed</span>
              </div>
              <span className="text-sm font-medium text-amber-600">Good</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                <span className="text-sm">Backlinks</span>
              </div>
              <span className="text-sm font-medium text-amber-600">Needs Work</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Search className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-sm">Keyword Density</span>
              </div>
              <span className="text-sm font-medium text-red-600">Poor</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsPreview;
