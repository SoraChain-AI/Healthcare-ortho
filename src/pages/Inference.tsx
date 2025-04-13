
import { useState } from 'react';
import { 
  Bot, 
  Shield, 
  ChevronDown, 
  ChevronUp,
  BookOpen, 
  AlertCircle, 
  ThumbsUp, 
  ThumbsDown, 
  FileText, 
  Loader2, 
  BrainCircuit, 
  BarChart2, 
  CheckCircle2, 
  X 
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Radio, RadioGroup } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from '@/components/ui/collapsible';
import { Badge } from '@/components/common/Badge';
import { SectionHeader } from '@/components/common/SectionHeader';
import Layout from '@/components/layout/Layout';
import { Progress } from '@/components/ui/progress';

const symptomQuestions = [
  {
    id: 'pain',
    question: 'Are you experiencing knee pain?',
    options: [
      { value: 'none', label: 'No pain' },
      { value: 'mild', label: 'Mild pain' },
      { value: 'moderate', label: 'Moderate pain' },
      { value: 'severe', label: 'Severe pain' }
    ]
  },
  {
    id: 'swelling',
    question: 'Is there any swelling around your knee?',
    options: [
      { value: 'none', label: 'No swelling' },
      { value: 'mild', label: 'Mild swelling' },
      { value: 'moderate', label: 'Moderate swelling' },
      { value: 'severe', label: 'Severe swelling' }
    ]
  },
  {
    id: 'mobility',
    question: 'How is your knee mobility affected?',
    options: [
      { value: 'normal', label: 'Normal mobility' },
      { value: 'slightly', label: 'Slightly limited' },
      { value: 'moderately', label: 'Moderately limited' },
      { value: 'severely', label: 'Severely limited' }
    ]
  },
  {
    id: 'duration',
    question: 'How long have you had these symptoms?',
    options: [
      { value: 'recent', label: 'Recent (days)' },
      { value: 'weeks', label: 'Weeks' },
      { value: 'months', label: 'Months' },
      { value: 'chronic', label: 'Chronic (years)' }
    ]
  },
  {
    id: 'activity',
    question: 'When do symptoms occur?',
    options: [
      { value: 'rest', label: 'At rest' },
      { value: 'activity', label: 'During activity' },
      { value: 'both', label: 'Both at rest and during activity' },
      { value: 'night', label: 'Primarily at night' }
    ]
  }
];

const Inference = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('structured');
  const [symptoms, setSymptoms] = useState({
    pain: '',
    swelling: '',
    mobility: '',
    duration: '',
    activity: ''
  });
  const [freeTextSymptoms, setFreeTextSymptoms] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<null | {
    condition: string;
    confidence: number;
    description: string;
    recommendations: string[];
    probabilities: {name: string, probability: number}[];
  }>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [feedbackSent, setFeedbackSent] = useState(false);
  
  const handleSymptomChange = (questionId: string, value: string) => {
    setSymptoms({
      ...symptoms,
      [questionId]: value
    });
  };
  
  const handleAnalyze = () => {
    // Validation for structured form
    if (activeTab === 'structured') {
      const missingFields = Object.values(symptoms).some(val => val === '');
      if (missingFields) {
        toast({
          title: "Missing Information",
          description: "Please answer all questions for accurate diagnosis.",
          variant: "destructive",
        });
        return;
      }
    }
    
    // Validation for free text
    if (activeTab === 'freetext' && freeTextSymptoms.trim().length < 10) {
      toast({
        title: "More Details Needed",
        description: "Please provide more details about your symptoms.",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnalyzing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Mock diagnosis result
      setDiagnosisResult({
        condition: "Meniscus Tear",
        confidence: 87,
        description: "A meniscus tear is damage to the cartilage in your knee joint. The symptoms you've described, particularly the pain pattern, swelling, and limited mobility, are consistent with a meniscal injury.",
        recommendations: [
          "Rest and avoid activities that cause pain",
          "Apply ice to reduce swelling (20 minutes, several times daily)",
          "Consider over-the-counter anti-inflammatory medication",
          "Consult with an orthopedic specialist for proper evaluation",
          "Physical therapy may be recommended to strengthen supporting muscles"
        ],
        probabilities: [
          { name: "Meniscus Tear", probability: 87 },
          { name: "ACL Sprain", probability: 42 },
          { name: "Osteoarthritis", probability: 38 },
          { name: "Patellar Tendinitis", probability: 23 },
          { name: "Baker's Cyst", probability: 12 }
        ]
      });
      setIsAnalyzing(false);
    }, 2000);
  };
  
  const handleReset = () => {
    setSymptoms({
      pain: '',
      swelling: '',
      mobility: '',
      duration: '',
      activity: ''
    });
    setFreeTextSymptoms('');
    setDiagnosisResult(null);
    setFeedbackSent(false);
  };
  
  const handleFeedback = (isPositive: boolean) => {
    toast({
      title: isPositive ? "Thank you for your feedback!" : "We appreciate your feedback",
      description: isPositive ? 
        "Your feedback helps improve the AI model." : 
        "We'll use this to improve future diagnoses.",
    });
    setFeedbackSent(true);
  };

  return (
    <Layout>
      <SectionHeader 
        title="Knee Specialist AI" 
        description="AI-powered diagnosis assistant for knee-related ailments"
        icon={<Bot className="h-8 w-8" />}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {!diagnosisResult && (
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Describe Your Knee Symptoms</CardTitle>
                <CardDescription>
                  Provide details about your knee condition for AI analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="structured">Questionnaire</TabsTrigger>
                    <TabsTrigger value="freetext">Free Text</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="structured">
                    <div className="space-y-6">
                      {symptomQuestions.map((q) => (
                        <div key={q.id} className="space-y-3">
                          <h3 className="font-medium">{q.question}</h3>
                          <RadioGroup 
                            value={symptoms[q.id as keyof typeof symptoms]} 
                            onValueChange={(value) => handleSymptomChange(q.id, value)}
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {q.options.map((option) => (
                                <div key={option.value} className="flex items-center space-x-2">
                                  <Radio id={`${q.id}-${option.value}`} value={option.value} />
                                  <label htmlFor={`${q.id}-${option.value}`} className="text-sm cursor-pointer">
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </RadioGroup>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="freetext">
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Describe your knee symptoms in your own words. Include details about pain, swelling, mobility issues, 
                        duration, and what activities make it better or worse.
                      </p>
                      <Textarea 
                        placeholder="Describe your symptoms here..." 
                        className="min-h-32"
                        value={freeTextSymptoms}
                        onChange={(e) => setFreeTextSymptoms(e.target.value)}
                      />
                      <div className="flex items-center text-xs text-gray-500">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        <span>More detailed descriptions lead to more accurate assessments</span>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleReset}>
                  Reset
                </Button>
                <Button 
                  className="sorachain-button"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : 'Analyze Symptoms'}
                </Button>
              </CardFooter>
            </Card>
          )}
          
          {isAnalyzing && (
            <Card className="mt-6 border-sorachain-light">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center py-8">
                  <Loader2 className="h-12 w-12 text-sorachain-primary animate-spin mb-4" />
                  <h3 className="text-xl font-bold mb-2">Analyzing your symptoms...</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center max-w-md mb-4">
                    Our AI is reviewing your symptoms and comparing them to patterns from our federated healthcare database.
                  </p>
                  <Progress value={65} className="w-full max-w-md h-2" />
                </div>
              </CardContent>
            </Card>
          )}
          
          {diagnosisResult && (
            <Card className="shadow-md border-sorachain-light">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>AI Diagnosis Assessment</CardTitle>
                  <Badge label={`${diagnosisResult.confidence}% Confidence`} variant="success" />
                </div>
                <CardDescription>
                  Based on the symptoms you described
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-xl font-bold text-sorachain-primary mb-2">
                      {diagnosisResult.condition}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {diagnosisResult.description}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Condition Probabilities</h3>
                    <div className="space-y-3">
                      {diagnosisResult.probabilities.map((item, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{item.name}</span>
                            <span>{item.probability}%</span>
                          </div>
                          <Progress value={item.probability} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Recommendations</h3>
                    <ul className="space-y-2 pl-5 list-disc text-gray-600 dark:text-gray-300">
                      {diagnosisResult.recommendations.map((rec, index) => (
                        <li key={index}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-100 dark:border-amber-900/30">
                    <div className="flex items-center space-x-2 text-amber-800 dark:text-amber-300 mb-2">
                      <AlertCircle className="h-5 w-5" />
                      <h3 className="font-medium">Important Disclaimer</h3>
                    </div>
                    <p className="text-sm text-amber-700 dark:text-amber-400">
                      This AI assessment is not a substitute for professional medical advice, diagnosis, or treatment. 
                      Always seek the advice of your physician or other qualified health provider with any questions 
                      regarding a medical condition.
                    </p>
                  </div>
                  
                  <Collapsible open={showExplanation} onOpenChange={setShowExplanation}>
                    <CollapsibleTrigger asChild>
                      <Button variant="outline" className="w-full">
                        {showExplanation ? (
                          <ChevronUp className="h-4 w-4 mr-2" />
                        ) : (
                          <ChevronDown className="h-4 w-4 mr-2" />
                        )}
                        {showExplanation ? 'Hide AI Explanation' : 'Show AI Explanation'}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-4 space-y-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <BrainCircuit className="h-5 w-5 text-sorachain-primary" />
                        <h3 className="font-medium">How This Assessment Was Generated</h3>
                      </div>
                      
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="mt-1 h-5 w-5 rounded-full flex items-center justify-center bg-sorachain-light text-sorachain-primary text-xs font-medium">
                            1
                          </div>
                          <div>
                            <p className="font-medium">Symptom Analysis</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              Your reported symptoms were compared to patterns identified in our medical knowledge base.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="mt-1 h-5 w-5 rounded-full flex items-center justify-center bg-sorachain-light text-sorachain-primary text-xs font-medium">
                            2
                          </div>
                          <div>
                            <p className="font-medium">Pattern Recognition</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              The AI identified key patterns consistent with {diagnosisResult.condition}, particularly the combination of pain characteristics, mobility limitations, and swelling patterns.
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="mt-1 h-5 w-5 rounded-full flex items-center justify-center bg-sorachain-light text-sorachain-primary text-xs font-medium">
                            3
                          </div>
                          <div>
                            <p className="font-medium">Confidence Assessment</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              The {diagnosisResult.confidence}% confidence score reflects the statistical probability based on symptom matching from the federated training data.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                  
                  {!feedbackSent ? (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                      <h3 className="font-medium mb-3">Was this assessment helpful?</h3>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleFeedback(true)}
                        >
                          <ThumbsUp className="h-4 w-4 mr-2" />
                          Yes, it was helpful
                        </Button>
                        <Button 
                          variant="outline" 
                          className="flex-1"
                          onClick={() => handleFeedback(false)}
                        >
                          <ThumbsDown className="h-4 w-4 mr-2" />
                          No, needs improvement
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex items-center justify-center">
                      <div className="flex items-center text-green-600 dark:text-green-500">
                        <CheckCircle2 className="h-5 w-5 mr-2" />
                        <span>Thank you for your feedback!</span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleReset}>
                  <X className="h-4 w-4 mr-2" />
                  New Assessment
                </Button>
                <Button className="sorachain-button">
                  <FileText className="h-4 w-4 mr-2" />
                  Save Report
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>About This AI</CardTitle>
              <CardDescription>Transparency and trust information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center">
                    <BrainCircuit className="h-4 w-4 text-sorachain-primary mr-2" />
                    Model Information
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <div className="flex justify-between text-sm py-1">
                      <span>Model Version:</span>
                      <span className="font-medium">KneeAI v1.8.2</span>
                    </div>
                    <div className="flex justify-between text-sm py-1">
                      <span>Last Updated:</span>
                      <span className="font-medium">April 12, 2023</span>
                    </div>
                    <div className="flex justify-between text-sm py-1">
                      <span>Trained By:</span>
                      <span className="font-medium">20 Institutions</span>
                    </div>
                    <div className="flex justify-between text-sm py-1">
                      <span>Model Type:</span>
                      <span className="font-medium">Federated Deep Learning</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center">
                    <Shield className="h-4 w-4 text-sorachain-primary mr-2" />
                    Privacy Protection
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    All interactions with this AI are:
                  </p>
                  <ul className="ml-5 list-disc text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    <li>Private and not stored without consent</li>
                    <li>Not linked to personal identifiers</li>
                    <li>Protected by state-of-the-art encryption</li>
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <Badge label="Decentralized" variant="privacy" />
                    <Badge label="Privacy-First" variant="privacy" />
                    <Badge label="HIPAA Compliant" variant="privacy" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center">
                    <BarChart2 className="h-4 w-4 text-sorachain-primary mr-2" />
                    Performance Metrics
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 space-y-2">
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Accuracy:</span>
                        <span className="font-medium">90%</span>
                      </div>
                      <Progress value={90} className="h-1.5" />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Precision:</span>
                        <span className="font-medium">87%</span>
                      </div>
                      <Progress value={87} className="h-1.5" />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Recall:</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <Progress value={85} className="h-1.5" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 italic">
                    Performance validated through cross-institutional testing
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium flex items-center">
                    <BookOpen className="h-4 w-4 text-sorachain-primary mr-2" />
                    Learn More
                  </h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start text-left" size="sm">
                      How SoraChain AI Works
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-left" size="sm">
                      Federated Learning Explained
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-left" size="sm">
                      Data Privacy & Security
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Inference;
