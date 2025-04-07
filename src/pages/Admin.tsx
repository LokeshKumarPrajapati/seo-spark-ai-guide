
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Users, Search, BarChart, FileText, Settings, 
  CreditCard, Bell, Zap, CheckCircle, AlertTriangle, 
  XCircle, ArrowUpRight, Filter, RefreshCcw 
} from 'lucide-react';

// Mock data for the admin panel
const mockUsers = [
  { id: 1, name: 'John Smith', email: 'john@example.com', plan: 'Premium', scans: 24, joined: '2023-04-12', status: 'active' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', plan: 'Free', scans: 3, joined: '2023-05-18', status: 'active' },
  { id: 3, name: 'Mike Williams', email: 'mike@example.com', plan: 'Premium', scans: 15, joined: '2023-03-05', status: 'inactive' },
  { id: 4, name: 'Emily Davis', email: 'emily@example.com', plan: 'Free', scans: 2, joined: '2023-06-22', status: 'active' },
  { id: 5, name: 'Robert Brown', email: 'robert@example.com', plan: 'Enterprise', scans: 56, joined: '2023-02-15', status: 'active' },
];

const mockScans = [
  { id: 1, url: 'https://example.com', user: 'John Smith', date: '2023-06-28', seoScore: 78, status: 'completed' },
  { id: 2, url: 'https://acmecorp.com', user: 'Sarah Johnson', date: '2023-06-27', seoScore: 65, status: 'completed' },
  { id: 3, url: 'https://techblog.net', user: 'Mike Williams', date: '2023-06-26', seoScore: 82, status: 'completed' },
  { id: 4, url: 'https://fashionstore.com', user: 'Emily Davis', date: '2023-06-25', seoScore: 45, status: 'failed' },
  { id: 5, url: 'https://globalinc.org', user: 'Robert Brown', date: '2023-06-24', seoScore: 91, status: 'completed' },
];

const mockReports = [
  { id: 1, title: 'Monthly User Growth', date: '2023-06-30' },
  { id: 2, title: 'Popular Website Categories', date: '2023-06-29' },
  { id: 3, title: 'Average SEO Scores by Industry', date: '2023-06-28' },
  { id: 4, title: 'Conversion Rate Analysis', date: '2023-06-27' },
  { id: 5, title: 'Premium Plan Adoption', date: '2023-06-26' },
];

const mockFeatures = [
  { id: 1, name: 'SEO Analysis', status: true, premium: false },
  { id: 2, name: 'Performance Testing', status: true, premium: false },
  { id: 3, name: 'Security Scanning', status: true, premium: false },
  { id: 4, name: 'AI Recommendations', status: true, premium: false },
  { id: 5, name: 'Competitive Analysis', status: true, premium: true },
  { id: 6, name: 'PDF Reports', status: true, premium: true },
  { id: 7, name: 'Keyword Strategy', status: true, premium: true },
  { id: 8, name: 'Content Optimization', status: true, premium: true },
  { id: 9, name: 'API Access', status: false, premium: true },
];

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [filteredScans, setFilteredScans] = useState(mockScans);

  useEffect(() => {
    // Filter users based on search term
    setFilteredUsers(
      mockUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.plan.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    
    // Filter scans based on search term
    setFilteredScans(
      mockScans.filter(scan => 
        scan.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scan.user.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Manage users, scans, and platform settings</p>
          </div>
        </div>
        
        {/* Admin Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Users</p>
                  <h3 className="text-3xl font-bold mt-1">1,248</h3>
                </div>
                <div className="h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-seo-blue" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <span className="text-green-500 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" /> 12.5%
                </span>
                <span className="text-gray-500 ml-2">from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Scans</p>
                  <h3 className="text-3xl font-bold mt-1">5,392</h3>
                </div>
                <div className="h-10 w-10 bg-purple-50 rounded-full flex items-center justify-center">
                  <Search className="h-5 w-5 text-purple-500" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <span className="text-green-500 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" /> 25.8%
                </span>
                <span className="text-gray-500 ml-2">from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Premium Users</p>
                  <h3 className="text-3xl font-bold mt-1">312</h3>
                </div>
                <div className="h-10 w-10 bg-amber-50 rounded-full flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-amber-500" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <span className="text-green-500 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" /> 8.3%
                </span>
                <span className="text-gray-500 ml-2">from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Avg SEO Score</p>
                  <h3 className="text-3xl font-bold mt-1">72.4</h3>
                </div>
                <div className="h-10 w-10 bg-green-50 rounded-full flex items-center justify-center">
                  <BarChart className="h-5 w-5 text-green-500" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <span className="text-green-500 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" /> 3.2%
                </span>
                <span className="text-gray-500 ml-2">improvement</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Admin Tabs */}
        <Tabs defaultValue="users" className="w-full mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="users" className="flex items-center">
              <Users className="h-4 w-4 mr-2" /> Users
            </TabsTrigger>
            <TabsTrigger value="scans" className="flex items-center">
              <Search className="h-4 w-4 mr-2" /> Scans
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" /> Reports
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center">
              <Settings className="h-4 w-4 mr-2" /> Settings
            </TabsTrigger>
          </TabsList>
          
          {/* Search Input */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search users, scans, or reports..."
                className="pl-10 pr-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>View and manage platform users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Filter className="h-4 w-4 mr-2" /> Filter
                    </Button>
                  </div>
                  <Button size="sm">Add User</Button>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Scans</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Badge variant={user.plan === 'Premium' ? 'default' : user.plan === 'Enterprise' ? 'secondary' : 'outline'}>
                              {user.plan}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.scans}</TableCell>
                          <TableCell>{user.joined}</TableCell>
                          <TableCell>
                            <Badge variant={user.status === 'active' ? 'success' : 'destructive'}>
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm" className="text-red-500">Delete</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="scans">
            <Card>
              <CardHeader>
                <CardTitle>Scan Management</CardTitle>
                <CardDescription>View and manage website scans</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Filter className="h-4 w-4 mr-2" /> Filter
                    </Button>
                  </div>
                  <Button size="sm" className="flex items-center">
                    <RefreshCcw className="h-4 w-4 mr-2" /> Refresh
                  </Button>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>URL</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>SEO Score</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredScans.map((scan) => (
                        <TableRow key={scan.id}>
                          <TableCell className="font-medium">{scan.url}</TableCell>
                          <TableCell>{scan.user}</TableCell>
                          <TableCell>{scan.date}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <span className={
                                scan.seoScore >= 80 ? "text-green-500" :
                                scan.seoScore >= 60 ? "text-amber-500" : "text-red-500"
                              }>
                                {scan.seoScore}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={scan.status === 'completed' ? 'success' : 'destructive'}>
                              {scan.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">View</Button>
                              <Button variant="outline" size="sm">Re-scan</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Reports</CardTitle>
                <CardDescription>View platform analytics and reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">User Growth</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
                        <p className="text-gray-500">User growth chart would appear here</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">SEO Score Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center bg-gray-50 rounded-md">
                        <p className="text-gray-500">SEO score distribution chart would appear here</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <h3 className="text-lg font-medium mb-4">Recent Reports</h3>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Report Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium">{report.title}</TableCell>
                          <TableCell>{report.date}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">View</Button>
                              <Button variant="outline" size="sm">Download</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Platform Settings</CardTitle>
                <CardDescription>Configure platform features and settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Feature Management</h3>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Feature</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Premium Only</TableHead>
                            <TableHead>Toggle</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {mockFeatures.map((feature) => (
                            <TableRow key={feature.id}>
                              <TableCell className="font-medium">{feature.name}</TableCell>
                              <TableCell>
                                <Badge variant={feature.status ? 'success' : 'outline'}>
                                  {feature.status ? 'Enabled' : 'Disabled'}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {feature.premium ? (
                                  <Badge variant="default">Premium</Badge>
                                ) : (
                                  <Badge variant="outline">All Users</Badge>
                                )}
                              </TableCell>
                              <TableCell>
                                <Switch checked={feature.status} />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">API Settings</h3>
                      <Card>
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="api-key">API Key</Label>
                              <div className="flex mt-1">
                                <Input id="api-key" value="●●●●●●●●●●●●●●●●●●●●" readOnly className="flex-1" />
                                <Button variant="outline" className="ml-2">Regenerate</Button>
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="rate-limit">Rate Limit (requests/min)</Label>
                              <Input id="rate-limit" type="number" defaultValue="60" className="mt-1" />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label htmlFor="api-status">API Status</Label>
                              <Switch id="api-status" checked />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
                      <Card>
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="email-notifications">Email Notifications</Label>
                              <Switch id="email-notifications" checked />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label htmlFor="slack-integration">Slack Integration</Label>
                              <Switch id="slack-integration" />
                            </div>
                            <div className="flex items-center justify-between">
                              <Label htmlFor="scan-alerts">Scan Completion Alerts</Label>
                              <Switch id="scan-alerts" checked />
                            </div>
                            <Button variant="outline" className="w-full mt-2">
                              <Bell className="h-4 w-4 mr-2" /> 
                              Test Notifications
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">AI Model Settings</h3>
                    <Card>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="model-selection">AI Model</Label>
                            <select id="model-selection" className="w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 p-2">
                              <option>Advanced SEO Assistant GPT-4</option>
                              <option>Standard SEO Helper GPT-3.5</option>
                              <option>Basic SEO Analyzer</option>
                            </select>
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="ai-cache">Enable AI Cache</Label>
                            <Switch id="ai-cache" checked />
                          </div>
                          <div>
                            <Label htmlFor="recommendation-count">Recommendations Count</Label>
                            <Input id="recommendation-count" type="number" defaultValue="8" className="mt-1" />
                          </div>
                          <div className="flex justify-end">
                            <Button>
                              <Zap className="h-4 w-4 mr-2" /> 
                              Apply Settings
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Admin;
