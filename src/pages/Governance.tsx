import { useState } from 'react';
import { 
  Vote, 
  ThumbsUp, 
  ThumbsDown, 
  CheckCircle2, 
  FilePlus, 
  Megaphone, 
  Lock, 
  BarChart3, 
  Clock, 
  ChevronRight 
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/common/Badge';
import { SectionHeader } from '@/components/common/SectionHeader';
import Layout from '@/components/layout/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Governance = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('feedback');
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [dataConsent, setDataConsent] = useState(false);
  const [feedbackType, setFeedbackType] = useState<string | null>(null);
  
  // Active proposals data
  const activeProposals = [
    {
      id: 'PROP-32',
      title: 'Add Support for Spanish Language Interface',
      description: 'Add Spanish language support to the Knee AI model to better serve Spanish-speaking regions',
      votes: { for: 73, against: 12, abstain: 15 },
      deadline: '2d 7h remaining',
      author: 'Mayo Clinic',
      status: 'active'
    },
    {
      id: 'PROP-31',
      title: 'Expand Training Dataset with Senior Demographics',
      description: 'Include more senior patient cases to improve model accuracy for elder populations',
      votes: { for: 62, against: 19, abstain: 19 },
      deadline: '3d 12h remaining',
      author: 'NHS University Hospital',
      status: 'active'
    },
    {
      id: 'PROP-30',
      title: 'Implement Physician Review Flow',
      description: 'Add optional flow for physician review of AI diagnoses for training improvement',
      votes: { for: 51, against: 28, abstain: 21 },
      deadline: '5d 3h remaining',
      author: 'Berlin Medical Center',
      status: 'active'
    }
  ];
  
  // Past proposals data
  const pastProposals = [
    {
      id: 'PROP-29',
      title: 'Improve Model Sensitivity for Meniscus Tears',
      description: 'Adjust training parameters to increase sensitivity for detecting meniscus tears',
      votes: { for: 85, against: 8, abstain: 7 },
      author: 'Singapore General',
      status: 'passed'
    },
    {
      id: 'PROP-28',
      title: 'Enhance Pediatric Knee Diagnosis Capabilities',
      description: 'Include more pediatric cases in the training dataset',
      votes: { for: 42, against: 49, abstain: 9 },
      author: 'Toronto Health Network',
      status: 'rejected'
    },
    {
      id: 'PROP-27',
      title: 'Add Explainability Feature for Diagnoses',
      description: 'Implement explainable AI features to provide rationale for diagnoses',
      votes: { for: 91, against: 5, abstain: 4 },
      author: 'Mayo Clinic',
      status: 'passed'
    }
  ];
  
  const handleFeedbackSubmit = () => {
    if (!feedbackType) {
      toast({
        title: "Please Select Feedback Type",
        description: "Please indicate whether your feedback was positive or negative.",
        variant: "destructive",
      });
      return;
    }
    
    if (feedbackText.trim().length < 10) {
      toast({
        title: "More Details Needed",
        description: "Please provide more details in your feedback.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Feedback Submitted",
      description: "Thank you for helping improve the Knee AI model!",
    });
    
    setFeedbackSubmitted(true);
  };
  
  const handleVote = (proposalId: string, vote: 'for' | 'against' | 'abstain') => {
    toast({
      title: "Vote Recorded",
      description: `Your vote on proposal ${proposalId} has been recorded.`,
    });
  };
  
  const resetFeedback = () => {
    setFeedbackText('');
    setDataConsent(false);
    setFeedbackType(null);
    setFeedbackSubmitted(false);
  };

  return (
    <Layout>
      <SectionHeader 
        title="Feedback & Governance" 
        description="Help improve the Knee AI model and participate in governance decisions"
        icon={<Vote className="h-8 w-8" />}
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="feedback">Provide Feedback</TabsTrigger>
          <TabsTrigger value="governance">Governance Voting</TabsTrigger>
        </TabsList>
        
        <TabsContent value="feedback" className="space-y-6">
          {!feedbackSubmitted ? (
            <Card>
              <CardHeader>
                <CardTitle>Share Your Experience</CardTitle>
                <CardDescription>
                  Your feedback helps improve the Knee AI Specialist for everyone
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Was your experience positive or negative?</h3>
                    <div className="flex space-x-2">
                      <Button 
                        variant={feedbackType === 'positive' ? 'default' : 'outline'} 
                        className={feedbackType === 'positive' ? 'bg-green-600 hover:bg-green-700' : ''}
                        onClick={() => setFeedbackType('positive')}
                      >
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Positive
                      </Button>
                      <Button 
                        variant={feedbackType === 'negative' ? 'default' : 'outline'}
                        className={feedbackType === 'negative' ? 'bg-red-600 hover:bg-red-700' : ''} 
                        onClick={() => setFeedbackType('negative')}
                      >
                        <ThumbsDown className="h-4 w-4 mr-2" />
                        Negative
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="feedback" className="font-medium">Detailed Feedback</label>
                    <Textarea 
                      id="feedback" 
                      placeholder="Please share your thoughts on the Knee AI Specialist... What went well? What could be improved?"
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      className="min-h-32"
                    />
                  </div>
                  
                  <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h3 className="font-medium">Optional: Contribute to Model Improvement</h3>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-start space-x-3">
                        <Checkbox 
                          id="consent" 
                          checked={dataConsent}
                          onCheckedChange={(checked) => setDataConsent(checked as boolean)}
                        />
                        <div>
                          <label htmlFor="consent" className="text-base font-medium">
                            I consent to anonymously share my case data
                          </label>
                          <p className="text-sm text-gray-500">
                            Sharing your case data helps improve the model for future patients.
                            All data is anonymized and protected through SoraChain's privacy protocols.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Lock className="h-5 w-5 text-sorachain-primary" />
                        <h3 className="font-medium">Privacy Protection</h3>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Any data you share is fully anonymized using differential privacy techniques.
                        Your personal information is never stored or shared with third parties.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge label="Anonymized" variant="privacy" />
                        <Badge label="Encrypted" variant="privacy" />
                        <Badge label="Federated Learning" variant="privacy" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  className="sorachain-button"
                  onClick={handleFeedbackSubmit}
                >
                  Submit Feedback
                </Button>
              </CardFooter>
            </Card>
          ) : (
            <Card className="border-green-100 dark:border-green-900 bg-green-50 dark:bg-green-900/20">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-500" />
                  <CardTitle className="text-green-800 dark:text-green-500">Feedback Submitted Successfully!</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center mb-4">
                    <ThumbsUp className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <h2 className="text-xl font-bold text-center mb-2">Thank You for Your Feedback</h2>
                  <p className="text-gray-600 dark:text-gray-300 text-center max-w-md mb-6">
                    Your input helps improve the Knee AI model for patients worldwide. The federated learning system will incorporate your feedback during the next training round.
                  </p>
                  
                  {dataConsent && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 w-full max-w-md shadow-sm mb-6">
                      <h3 className="font-medium mb-2 flex items-center">
                        <FilePlus className="h-4 w-4 mr-2 text-sorachain-primary" />
                        Data Contribution Status
                      </h3>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Anonymization:</span>
                          <span className="font-medium text-green-600 flex items-center">
                            <CheckCircle2 className="h-3 w-3 mr-1" /> Complete
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Privacy Protection:</span>
                          <span className="font-medium text-green-600 flex items-center">
                            <CheckCircle2 className="h-3 w-3 mr-1" /> Active
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">Next Training Round:</span>
                          <span className="font-medium">April 20, 2023</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <Button variant="outline" onClick={resetFeedback}>
                    Provide Additional Feedback
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
          <Card>
            <CardHeader>
              <CardTitle>How Your Feedback Makes a Difference</CardTitle>
              <CardDescription>The journey from feedback to model improvement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="h-10 w-10 rounded-full bg-sorachain-light flex items-center justify-center text-sorachain-primary mb-2">
                      <Megaphone className="h-5 w-5" />
                    </div>
                    <h3 className="font-medium">1. Feedback Collection</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Users provide feedback on AI diagnoses, indicating accuracy and areas for improvement
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="h-10 w-10 rounded-full bg-sorachain-light flex items-center justify-center text-sorachain-primary mb-2">
                      <BarChart3 className="h-5 w-5" />
                    </div>
                    <h3 className="font-medium">2. Pattern Analysis</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Feedback is analyzed to identify common patterns and areas needing improvement
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="h-10 w-10 rounded-full bg-sorachain-light flex items-center justify-center text-sorachain-primary mb-2">
                      <Vote className="h-5 w-5" />
                    </div>
                    <h3 className="font-medium">3. Governance Voting</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Institutions vote on proposed changes to the model based on feedback
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h3 className="font-medium mb-3">Recent Improvements from Feedback</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Improved explanation clarity</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Made AI explanations more understandable for non-medical users
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Added severity indicators</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Included severity assessments for different conditions
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                      <div>
                        <p className="font-medium">Enhanced recommendation specificity</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Made treatment recommendations more specific to individual cases
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="governance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Governance Proposals</CardTitle>
              <CardDescription>
                Vote on proposals to improve the Knee AI model and platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {activeProposals.map((proposal, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 dark:bg-gray-800 p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div className="flex items-center">
                          <Badge className="mr-2" label={proposal.id} />
                          <h3 className="font-medium">{proposal.title}</h3>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Badge label={proposal.status} variant="success" />
                          <div className="flex items-center text-gray-500">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            {proposal.deadline}
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                        {proposal.description}
                      </p>
                      <div className="text-xs text-gray-500 mt-1">
                        Proposed by: {proposal.author}
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">Current Votes</span>
                          <span>
                            {proposal.votes.for + proposal.votes.against + proposal.votes.abstain} total
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2">
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>For</span>
                              <span className="text-green-600">{proposal.votes.for}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-green-600 rounded-full" 
                                style={{ width: `${proposal.votes.for}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Against</span>
                              <span className="text-red-600">{proposal.votes.against}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-red-600 rounded-full" 
                                style={{ width: `${proposal.votes.against}%` }}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span>Abstain</span>
                              <span className="text-gray-500">{proposal.votes.abstain}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gray-500 rounded-full" 
                                style={{ width: `${proposal.votes.abstain}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-2 pt-2">
                          <Button 
                            variant="outline"
                            className="flex-1 border-green-600 bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => handleVote(proposal.id, 'for')}
                          >
                            <ThumbsUp className="h-4 w-4 mr-2" />
                            Vote For
                          </Button>
                          <Button 
                            variant="outline"
                            className="flex-1 border-red-600 bg-red-600 hover:bg-red-700 text-white"
                            onClick={() => handleVote(proposal.id, 'against')}
                          >
                            <ThumbsDown className="h-4 w-4 mr-2" />
                            Vote Against
                          </Button>
                          <Button 
                            variant="outline"
                            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white"
                            onClick={() => handleVote(proposal.id, 'abstain')}
                          >
                            Abstain
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Past Proposal Results</CardTitle>
              <CardDescription>
                Previous governance decisions that shaped the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pastProposals.map((proposal, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-4 p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge className="mr-1" label={proposal.id} />
                        <h3 className="font-medium">{proposal.title}</h3>
                        {proposal.status === 'passed' ? (
                          <Badge label="Passed" variant="success" />
                        ) : (
                          <Badge label="Rejected" variant="warning" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {proposal.description}
                      </p>
                      <div className="text-xs text-gray-500 mt-1">
                        Proposed by: {proposal.author}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:w-48 justify-center space-y-2">
                      <div className="flex items-center text-sm">
                        <span className="text-green-600 font-medium mr-2">{proposal.votes.for}%</span>
                        <Progress value={proposal.votes.for} className="h-1.5 flex-1" />
                        <span className="ml-2">For</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="text-red-600 font-medium mr-2">{proposal.votes.against}%</span>
                        <Progress value={proposal.votes.against} className="h-1.5 flex-1 bg-gray-200 dark:bg-gray-700">
                          <div className="h-full bg-red-600 rounded-full" style={{ width: `${proposal.votes.against}%` }}></div>
                        </Progress>
                        <span className="ml-2">Against</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="text-gray-500 font-medium mr-2">{proposal.votes.abstain}%</span>
                        <Progress value={proposal.votes.abstain} className="h-1.5 flex-1 bg-gray-200 dark:bg-gray-700">
                          <div className="h-full bg-gray-500 rounded-full" style={{ width: `${proposal.votes.abstain}%` }}></div>
                        </Progress>
                        <span className="ml-2">Abstain</span>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-center">
                  <Button variant="outline" className="mt-2">
                    View All Past Proposals
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Create a New Proposal</CardTitle>
              <CardDescription>
                Submit your ideas for improving the Knee AI model
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="font-medium">Proposal Title</label>
                  <Input id="title" placeholder="Enter a concise title for your proposal" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="description" className="font-medium">Detailed Description</label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe your proposal in detail, including the problem it solves and implementation details..."
                    className="min-h-32"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="category" className="font-medium">Category</label>
                  <select 
                    id="category" 
                    className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-2 text-sm"
                  >
                    <option value="">Select a category</option>
                    <option value="model-improvement">Model Improvement</option>
                    <option value="ui-enhancement">User Interface Enhancement</option>
                    <option value="data-collection">Data Collection</option>
                    <option value="privacy">Privacy Enhancement</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="flex justify-end">
                  <Button className="sorachain-button">
                    Submit Proposal for Review
                  </Button>
                </div>
                
                <div className="text-xs text-gray-500 border-t border-gray-200 dark:border-gray-700 pt-3 mt-4">
                  Note: New proposals require review by at least three participating institutions before being published for voting.
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Governance;
