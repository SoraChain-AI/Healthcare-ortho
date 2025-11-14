
import { useState } from 'react';
import { 
  BarChart2, 
  Shield, 
  Database, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Hospital, 
  ArrowUpRight, 
  Lock 
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/common/Badge';
import { SectionHeader } from '@/components/common/SectionHeader';
import Layout from '@/components/layout/Layout';
import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Cell, 
  Legend, 
  Line, 
  LineChart,
  Pie, 
  PieChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';

const Training = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Training progress data
  const trainingData = [
    { round: 1, accuracy: 68, loss: 0.42, participants: 18 },
    { round: 2, accuracy: 73, loss: 0.38, participants: 20 },
    { round: 3, accuracy: 79, loss: 0.31, participants: 20 },
    { round: 4, accuracy: 82, loss: 0.25, participants: 20 },
    { round: 5, accuracy: 85, loss: 0.21, participants: 20 },
    { round: 6, accuracy: 87, loss: 0.18, participants: 20 },
    { round: 7, accuracy: 88, loss: 0.17, participants: 19 },
    { round: 8, accuracy: 90, loss: 0.15, participants: 20 },
  ];
  
  // Contribution data for donut chart
  const contributionData = [
    { name: 'Mayo Clinic', value: 22, color: '#9b87f5' },
    { name: 'NHS University', value: 18, color: '#7E69AB' },
    { name: 'Singapore General', value: 15, color: '#6E59A5' },
    { name: 'Berlin Medical', value: 12, color: '#937DC2' },
    { name: 'Mohammed Bin Rashid Uni', value: 11, color: '#A78BFA' },
    { name: 'Toronto Health', value: 10, color: '#C689C6' },
    { name: 'Your Institution', value: 8, color: '#E8A0BF' },
    { name: 'Others', value: 4, color: '#D8C4F5' },
  ];
  
  // Audit trail data
  const auditData = [
    {
      id: 'v1.8.2',
      timestamp: '2023-04-12 14:32',
      description: 'Model update after round 8 - Accuracy 90%',
      hash: '0x8f72b...e29a',
      change: '+2% accuracy',
      status: 'Verified'
    },
    {
      id: 'v1.7.0',
      timestamp: '2023-04-10 09:15',
      description: 'Model update after round 7 - Accuracy 88%',
      hash: '0x3a91c...b43d',
      change: '+1% accuracy',
      status: 'Verified'
    },
    {
      id: 'v1.6.5',
      timestamp: '2023-04-08 16:47',
      description: 'Model update after round 6 - Accuracy 87%',
      hash: '0xd721a...f190',
      change: '+2% accuracy',
      status: 'Verified'
    },
    {
      id: 'v1.5.0',
      timestamp: '2023-04-06 11:23',
      description: 'Model update after round 5 - Accuracy 85%',
      hash: '0x7b34e...a872',
      change: '+3% accuracy',
      status: 'Verified'
    },
  ];

  return (
    <Layout>
      <SectionHeader 
        title="Federated Training Dashboard" 
        description="Monitor the collaborative training progress of the Knee Diagnosis AI model"
        icon={<BarChart2 className="h-8 w-8" />}
      />
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Current Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end">
                <div className="text-3xl font-bold">90%</div>
                <div className="ml-2 text-sm text-green-600 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +2% from last round
                </div>
              </div>
              <Progress value={90} className="h-2 mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Training Round</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end">
                <div className="text-3xl font-bold">8</div>
                <div className="ml-2 text-sm text-gray-500">of 12 planned</div>
              </div>
              <Progress value={66} className="h-2 mt-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Participating Institutions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end">
                <div className="text-3xl font-bold">20</div>
                <div className="ml-2 text-sm text-gray-500">across 4 continents</div>
              </div>
              <div className="flex items-center justify-center mt-2">
                <Hospital className="h-4 w-4 text-sorachain-primary" />
                <Hospital className="h-4 w-4 text-sorachain-primary -ml-1" />
                <Hospital className="h-4 w-4 text-sorachain-primary -ml-1" />
                <span className="ml-1 text-xs text-gray-500">+17 more</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="contributions">Contributions</TabsTrigger>
            <TabsTrigger value="audit">Audit Trail</TabsTrigger>
            <TabsTrigger value="privacy">Privacy Protocols</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Training Progress</CardTitle>
                <CardDescription>Model accuracy and loss over training rounds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={trainingData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="round"
                        label={{ value: 'Training Round', position: 'insideBottom', offset: -5 }}
                      />
                      <YAxis 
                        yAxisId="left" 
                        domain={[50, 100]} 
                        label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft' }}
                      />
                      <YAxis 
                        yAxisId="right" 
                        orientation="right" 
                        domain={[0, 0.5]} 
                        label={{ value: 'Loss', angle: -90, position: 'insideRight' }}
                      />
                      <Tooltip />
                      <Legend />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="accuracy" 
                        stroke="#9b87f5" 
                        strokeWidth={2} 
                        name="Accuracy (%)" 
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="loss" 
                        stroke="#7E69AB" 
                        strokeWidth={2} 
                        name="Loss" 
                        dot={{ r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Next Training Round</CardTitle>
                  <CardDescription>Scheduled in 8 hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Clock className="h-5 w-5 text-sorachain-primary mr-2" />
                        <span className="text-sm font-medium">Preparation Required</span>
                      </div>
                      <ul className="ml-7 list-disc text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>Ensure local training environment is ready</li>
                        <li>Verify dataset preprocessing completion</li>
                        <li>Check secure connection to SoraChain network</li>
                      </ul>
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button className="sorachain-button flex-1">
                        Prepare for Round 9
                      </Button>
                      <Button variant="outline">
                        Set Reminder
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Target Metrics</CardTitle>
                  <CardDescription>Project completion goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Final Accuracy</span>
                        <span className="text-sm">Target: 95%</span>
                      </div>
                      <Progress value={90 / 95 * 100} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Current: 90%</span>
                        <span>5% to go</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Final Loss</span>
                        <span className="text-sm">Target: &lt;0.1</span>
                      </div>
                      <Progress value={(0.5 - 0.15) / (0.5 - 0.1) * 100} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Current: 0.15</span>
                        <span>0.05 to go</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Estimated Completion</span>
                      <span>4 more rounds (8 days)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="contributions" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Institution Contributions</CardTitle>
                  <CardDescription>Distribution of training contributions by institution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={contributionData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          fill="#8884d8"
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        >
                          {contributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Participant Activity</CardTitle>
                  <CardDescription>Number of active participants per training round</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={trainingData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="round"
                          label={{ value: 'Training Round', position: 'insideBottom', offset: -5 }}
                        />
                        <YAxis 
                          domain={[0, 20]}
                          label={{ value: 'Participants', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip />
                        <Bar 
                          dataKey="participants" 
                          fill="#9b87f5" 
                          radius={[4, 4, 0, 0]} 
                          name="Active Participants" 
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Your Institution's Impact</CardTitle>
                <CardDescription>Tracking your contribution to the Knee AI model</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <p className="text-sm font-medium mb-1">Overall Contribution</p>
                      <p className="text-2xl font-bold">8%</p>
                      <p className="text-xs text-gray-500 mt-1">Of total model improvement</p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <p className="text-sm font-medium mb-1">Training Rounds</p>
                      <p className="text-2xl font-bold">8/8</p>
                      <p className="text-xs text-gray-500 mt-1">100% participation rate</p>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <p className="text-sm font-medium mb-1">Estimated Rewards</p>
                      <p className="text-2xl font-bold">650</p>
                      <p className="text-xs text-gray-500 mt-1">SORA tokens (to date)</p>
                    </div>
                  </div>
                  
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={trainingData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorContribution" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#9b87f5" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="round" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="accuracy" 
                          stroke="#9b87f5" 
                          fillOpacity={1} 
                          fill="url(#colorContribution)" 
                          name="Your Contribution Impact"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="audit" className="space-y-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Model Version History</CardTitle>
                <CardDescription>Blockchain-verified audit trail of model updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {auditData.map((item, index) => (
                    <div key={index} className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className="h-10 w-10 rounded-full bg-sorachain-light flex items-center justify-center text-sorachain-primary">
                          <Database className="h-5 w-5" />
                        </div>
                        {index < auditData.length - 1 && (
                          <div className="h-full w-0.5 bg-gray-200 dark:bg-gray-700 my-1"></div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-1">
                          <div className="font-medium">{item.id}: {item.description}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {item.timestamp}
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-2 md:gap-4 text-sm">
                          <div className="flex items-center">
                            <span className="text-gray-500 mr-1">Hash:</span>
                            <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded text-xs">{item.hash}</code>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-500 mr-1">Change:</span>
                            <span className="text-green-600">{item.change}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-gray-500 mr-1">Status:</span>
                            {item.status === 'Verified' ? (
                              <span className="flex items-center text-green-600">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                {item.status}
                              </span>
                            ) : (
                              <span>{item.status}</span>
                            )}
                          </div>
                        </div>
                        <div className="mt-2">
                          <Button variant="outline" size="sm" className="h-7 text-xs">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex justify-center">
                    <Button variant="outline" className="mx-auto">
                      Load More History
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="privacy" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-sorachain-primary" />
                    <CardTitle>Active Privacy Protocols</CardTitle>
                  </div>
                  <CardDescription>How your patient data stays protected</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Badge label="FL" variant="privacy" className="mr-2" />
                          <span className="font-medium">Federated Learning</span>
                        </div>
                        <Badge label="Active" variant="success" />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Model trains locally on your infrastructure. Only model updates are shared, never raw patient data.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Badge label="DP" variant="privacy" className="mr-2" />
                          <span className="font-medium">Differential Privacy</span>
                        </div>
                        <Badge label="Active" variant="success" />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Statistical noise is added to protect individual patient records while preserving overall patterns.
                      </p>
                      <div className="flex items-center justify-between text-xs">
                        <span>Privacy Budget: ε = 3.5</span>
                        <span className="text-green-600">Strong Protection</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Badge label="SMPC" variant="privacy" className="mr-2" />
                          <span className="font-medium">Secure Multi-Party Computation</span>
                        </div>
                        <Badge label="Optional" />
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Cryptographic technique that allows multiple parties to jointly compute on encrypted data.
                      </p>
                      <Button variant="outline" size="sm" className="w-full">Enable SMPC</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Data Protection Summary</CardTitle>
                  <CardDescription>How SoraChain ensures privacy and compliance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Lock className="h-5 w-5 text-sorachain-secondary flex-shrink-0" />
                      <div>
                        <p className="font-medium">Your data never leaves your servers</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          All computations happen locally within your secure environment
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Shield className="h-5 w-5 text-sorachain-secondary flex-shrink-0" />
                      <div>
                        <p className="font-medium">Cryptographic guarantees</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Mathematical assurances that patient privacy is maintained
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <CheckCircle2 className="h-5 w-5 text-sorachain-secondary flex-shrink-0" />
                      <div>
                        <p className="font-medium">Compliance verified</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          HIPAA, GDPR, and other regulatory standards are maintained
                        </p>
                      </div>
                    </div>
                    
                    <Button className="sorachain-button w-full">
                      Download Privacy Technical Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Training;
