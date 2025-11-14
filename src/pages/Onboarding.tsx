
import { Hospital, CheckCircle2, Shield, FileCheck } from 'lucide-react';
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/common/Badge';
import { SectionHeader } from '@/components/common/SectionHeader';
import Layout from '@/components/layout/Layout';

const Onboarding = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formState, setFormState] = useState({
    institutionName: '',
    institutionType: '',
    region: '',
    dataSize: '',
    hasCompliance: false,
    hasEthics: false,
    useCase: 'knee-diagnosis',
    collaborationGoals: {
      increaseDataset: true,
      improveModelFairness: true,
      reduceCosts: false,
      accelerateResearch: false
    }
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormState({ ...formState, [field]: value });
  };

  const handleCollaborationGoalChange = (goal: string, value: boolean) => {
    setFormState({
      ...formState,
      collaborationGoals: {
        ...formState.collaborationGoals,
        [goal]: value
      }
    });
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      toast({
        title: "Registration Complete!",
        description: "Your institution has been registered with SoraChain AI.",
      });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Layout>
      <SectionHeader 
        title="Institution Onboarding" 
        description="Join the SoraChain AI network and collaborate on federated learning for healthcare"
        icon={<Hospital className="h-8 w-8" />}
      />
      
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between sm:space-x-4 space-y-4 sm:space-y-0">
          <div className="w-full sm:w-auto flex items-center space-x-2">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-white font-bold ${currentStep >= 1 ? 'bg-sorachain-primary' : 'bg-gray-300'}`}>
              1
            </div>
            <span className={`font-medium ${currentStep >= 1 ? 'text-sorachain-primary' : 'text-gray-500'}`}>
              Institution Details
            </span>
          </div>
          <div className="hidden sm:block w-full max-w-[100px] h-0.5 bg-gray-200">
            <div className={`h-full ${currentStep >= 2 ? 'bg-sorachain-primary' : 'bg-gray-200'}`} style={{ width: `${currentStep >= 2 ? '100%' : '0%'}` }}></div>
          </div>
          <div className="w-full sm:w-auto flex items-center space-x-2">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-white font-bold ${currentStep >= 2 ? 'bg-sorachain-primary' : 'bg-gray-300'}`}>
              2
            </div>
            <span className={`font-medium ${currentStep >= 2 ? 'text-sorachain-primary' : 'text-gray-500'}`}>
              Use Case Selection
            </span>
          </div>
          <div className="hidden sm:block w-full max-w-[100px] h-0.5 bg-gray-200">
            <div className={`h-full ${currentStep >= 3 ? 'bg-sorachain-primary' : 'bg-gray-200'}`} style={{ width: `${currentStep >= 3 ? '100%' : '0%'}` }}></div>
          </div>
          <div className="w-full sm:w-auto flex items-center space-x-2">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-white font-bold ${currentStep >= 3 ? 'bg-sorachain-primary' : 'bg-gray-300'}`}>
              3
            </div>
            <span className={`font-medium ${currentStep >= 3 ? 'text-sorachain-primary' : 'text-gray-500'}`}>
              Collaboration Goals
            </span>
          </div>
        </div>
      </div>
      
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>
            {currentStep === 1 && 'Institution Details'}
            {currentStep === 2 && 'Use Case Selection'}
            {currentStep === 3 && 'Set Collaboration Goals'}
          </CardTitle>
          <CardDescription>
            {currentStep === 1 && 'Provide information about your healthcare institution'}
            {currentStep === 2 && 'Select the AI use case you want to contribute to'}
            {currentStep === 3 && 'Define how you want to collaborate with other institutions'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="institutionName">Institution Name</Label>
                  <Input 
                    id="institutionName" 
                    placeholder="Enter your institution name" 
                    value={formState.institutionName}
                    onChange={(e) => handleInputChange('institutionName', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="institutionType">Institution Type</Label>
                  <Select 
                    onValueChange={(value) => handleInputChange('institutionType', value)}
                    value={formState.institutionType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select institution type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hospital">Hospital</SelectItem>
                      <SelectItem value="research">Research Center</SelectItem>
                      <SelectItem value="clinic">Specialized Clinic</SelectItem>
                      <SelectItem value="university">University Medical Center</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
                  <Select 
                    onValueChange={(value) => handleInputChange('region', value)}
                    value={formState.region}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="north-america">North America</SelectItem>
                      <SelectItem value="europe">Europe</SelectItem>
                      <SelectItem value="asia">Asia</SelectItem>
                      <SelectItem value="middle-east">Middle East</SelectItem>
                      <SelectItem value="africa">Africa</SelectItem>
                      <SelectItem value="oceania">Oceania</SelectItem>
                      <SelectItem value="south-america">South America</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="dataSize">Approximate Dataset Size</Label>
                  <Select 
                    onValueChange={(value) => handleInputChange('dataSize', value)}
                    value={formState.dataSize}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select dataset size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (Less than 1,000 records)</SelectItem>
                      <SelectItem value="medium">Medium (1,000 - 10,000 records)</SelectItem>
                      <SelectItem value="large">Large (10,000 - 100,000 records)</SelectItem>
                      <SelectItem value="very-large">Very Large (100,000+ records)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3 pt-3">
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="compliance" 
                      checked={formState.hasCompliance}
                      onCheckedChange={(checked) => handleInputChange('hasCompliance', checked as boolean)}
                    />
                    <div>
                      <Label 
                        htmlFor="compliance" 
                        className="text-base font-medium flex items-center"
                      >
                        Compliance Confirmation
                        <Badge className="ml-2" label="Required" variant="warning" />
                      </Label>
                      <p className="text-sm text-gray-500">
                        I confirm that our institution complies with all data protection and privacy regulations (HIPAA, GDPR, etc.)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="ethics" 
                      checked={formState.hasEthics}
                      onCheckedChange={(checked) => handleInputChange('hasEthics', checked as boolean)}
                    />
                    <div>
                      <Label 
                        htmlFor="ethics" 
                        className="text-base font-medium flex items-center"
                      >
                        Ethics Committee Approval
                        <Badge className="ml-2" label="Required" variant="warning" />
                      </Label>
                      <p className="text-sm text-gray-500">
                        Our institution has ethics committee approval for AI research collaboration
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="flex flex-col space-y-4">
                <RadioGroup 
                  defaultValue="knee-diagnosis"
                  value={formState.useCase}
                  onValueChange={(value) => handleInputChange('useCase', value)}
                >
                  <div className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer hover:border-sorachain-primary hover:bg-sorachain-light/10">
                    <RadioGroupItem value="knee-diagnosis" id="knee-diagnosis" className="mt-1" />
                    <div>
                      <Label htmlFor="knee-diagnosis" className="text-base font-medium cursor-pointer flex items-center">
                        Knee Diagnosis Model
                        <Badge className="ml-2" label="Recruiting" variant="success" />
                      </Label>
                      <p className="text-sm text-gray-500 mt-1">
                        Collaborate on training an AI model for diagnosing knee-related ailments, including meniscus tears, ACL injuries, and osteoarthritis.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge label="10 Institutions" />
                        <Badge label="Active" variant="success" />
                        <Badge label="FL + DP" variant="privacy" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer opacity-50">
                    <RadioGroupItem value="cardiac-imaging" id="cardiac-imaging" className="mt-1" disabled />
                    <div>
                      <Label htmlFor="cardiac-imaging" className="text-base font-medium cursor-pointer flex items-center">
                        Cardiac Imaging Analysis
                        <Badge className="ml-2" label="Coming Soon" />
                      </Label>
                      <p className="text-sm text-gray-500 mt-1">
                        Collaborative AI model for cardiac MRI and CT scan analysis to detect abnormalities and assist in diagnosis.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge label="0 Institutions" />
                        <Badge label="Pending" />
                        <Badge label="FL + SMPC" variant="privacy" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-4 border rounded-lg cursor-pointer opacity-50">
                    <RadioGroupItem value="dermatology" id="dermatology" className="mt-1" disabled />
                    <div>
                      <Label htmlFor="dermatology" className="text-base font-medium cursor-pointer flex items-center">
                        Dermatological Condition Detection
                        <Badge className="ml-2" label="Coming Soon" />
                      </Label>
                      <p className="text-sm text-gray-500 mt-1">
                        AI model to identify and classify skin conditions from images while preserving patient privacy.
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge label="0 Institutions" />
                        <Badge label="Pending" />
                        <Badge label="FL + DP" variant="privacy" />
                      </div>
                    </div>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Shield className="h-5 w-5 text-sorachain-primary mr-2" />
                  <h3 className="font-medium">Privacy Protocols Used</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <Badge label="FL" variant="privacy" className="mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Federated Learning</p>
                      <p className="text-xs text-gray-500">Model training happens locally at each institution, only model updates are shared</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Badge label="DP" variant="privacy" className="mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Differential Privacy</p>
                      <p className="text-xs text-gray-500">Adds noise to data to prevent identification of individual patients</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">What are your goals for this collaboration?</h3>
                <p className="text-sm text-gray-500">Select all that apply to your institution</p>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="increaseDataset" 
                      checked={formState.collaborationGoals.increaseDataset}
                      onCheckedChange={(checked) => handleCollaborationGoalChange('increaseDataset', checked as boolean)}
                    />
                    <div>
                      <Label htmlFor="increaseDataset" className="text-base font-medium cursor-pointer">
                        Increase Dataset Size
                      </Label>
                      <p className="text-sm text-gray-500">
                        Combine data power across institutions to build more robust AI models
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="improveModelFairness" 
                      checked={formState.collaborationGoals.improveModelFairness}
                      onCheckedChange={(checked) => handleCollaborationGoalChange('improveModelFairness', checked as boolean)}
                    />
                    <div>
                      <Label htmlFor="improveModelFairness" className="text-base font-medium cursor-pointer">
                        Improve Model Fairness via Ethnic Diversity
                      </Label>
                      <p className="text-sm text-gray-500">
                        Ensure AI works equally well for patients of all backgrounds
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="reduceCosts" 
                      checked={formState.collaborationGoals.reduceCosts}
                      onCheckedChange={(checked) => handleCollaborationGoalChange('reduceCosts', checked as boolean)}
                    />
                    <div>
                      <Label htmlFor="reduceCosts" className="text-base font-medium cursor-pointer">
                        Reduce Development Costs
                      </Label>
                      <p className="text-sm text-gray-500">
                        Share the costs of AI development across multiple institutions
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="accelerateResearch" 
                      checked={formState.collaborationGoals.accelerateResearch}
                      onCheckedChange={(checked) => handleCollaborationGoalChange('accelerateResearch', checked as boolean)}
                    />
                    <div>
                      <Label htmlFor="accelerateResearch" className="text-base font-medium cursor-pointer">
                        Accelerate Research
                      </Label>
                      <p className="text-sm text-gray-500">
                        Speed up AI development through collaborative efforts
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <FileCheck className="h-5 w-5 text-sorachain-primary" />
                  <h3 className="font-medium">Next Steps After Registration</h3>
                </div>
                <ol className="ml-5 space-y-1 list-decimal text-sm text-gray-600 dark:text-gray-300">
                  <li>Secure your position in the Knee AI Subnet through our Dutch Auction</li>
                  <li>Set up your local training environment with our secure software</li>
                  <li>Contribute to model training rounds while keeping your data private</li>
                  <li>Participate in governance decisions about the model's future</li>
                </ol>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevStep}
            disabled={currentStep === 1}
          >
            Back
          </Button>
          
          {currentStep < 3 ? (
            <Button 
              className="sorachain-button"
              onClick={handleNextStep}
            >
              Continue
            </Button>
          ) : (
            <Link to="/auction">
              <Button 
                className="sorachain-button"
                onClick={handleNextStep}
              >
                Complete Registration
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
      
      {currentStep === 3 && (
        <div className="mt-6 flex justify-center items-center space-x-2 text-sm text-gray-500">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span>Your information is secure and will only be shared with the SoraChain network</span>
        </div>
      )}
    </Layout>
  );
};

export default Onboarding;
