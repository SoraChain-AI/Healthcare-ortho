import { useState } from 'react';
import { Brain, Globe, DollarSign } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import { Badge } from '@/components/common/Badge';
import { SectionHeader } from '@/components/common/SectionHeader';
import { XraySelector } from '@/components/inference/XraySelector';
import { PaymentStep } from '@/components/inference/PaymentStep';
import { ResultsDisplay } from '@/components/inference/ResultsDisplay';

type FlowStep = 'selection' | 'payment' | 'results';

const Inference = () => {
  const [currentStep, setCurrentStep] = useState<FlowStep>('selection');
  const [selectedXray, setSelectedXray] = useState<number | null>(null);

  const handleXraySelect = (index: number) => {
    setSelectedXray(index);
  };

  const handleProceedToPayment = () => {
    if (selectedXray !== null) {
      setCurrentStep('payment');
    }
  };

  const handlePaymentComplete = () => {
    // Simulate payment processing
    setTimeout(() => {
      setCurrentStep('results');
    }, 1500);
  };

  const handleBackToSelection = () => {
    setCurrentStep('selection');
  };

  const handleStartNew = () => {
    setSelectedXray(null);
    setCurrentStep('selection');
  };

  return (
    <Layout>
      <div className="space-y-8">
        <SectionHeader
          title="Global Knee AI Consultation"
          description="Affordable, accessible orthopedic AI analysis for anyone, anywhere"
          icon={<Brain className="h-8 w-8" />}
        />

        {/* Global Access Banner */}
        <Card className="glass-card border-2 border-primary/30 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4 flex-1">
                <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-3 rounded-full flex-shrink-0">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gradient">
                    Worldwide Access to Expert AI Analysis
                  </h3>
                  <p className="text-muted-foreground">
                    Upload your knee X-ray from anywhere in the world and receive instant AI-powered consultation.
                    Breaking down barriers to quality orthopedic care.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Badge label="24/7 Available" variant="success" />
                    <Badge label="HIPAA Compliant" variant="privacy" />
                    <Badge label="Instant Results" variant="privacy" />
                  </div>
                </div>
              </div>
              
              <div className="flex-shrink-0 text-center p-4 rounded-lg bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-primary/20">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <DollarSign className="h-8 w-8 text-primary" />
                  <span className="text-4xl font-bold text-gradient">1</span>
                </div>
                <p className="text-sm font-medium text-muted-foreground">per consultation</p>
                <p className="text-xs text-muted-foreground mt-1">No subscription needed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Flow Card */}
        <Card className="glass-card border-2 border-primary/20 backdrop-blur-lg shadow-xl">
          <CardContent className="p-8">
            {currentStep === 'selection' && (
              <div className="space-y-6">
                <XraySelector
                  selectedXray={selectedXray}
                  onSelect={handleXraySelect}
                />
                
                <div className="flex justify-center pt-4">
                  <Button
                    onClick={handleProceedToPayment}
                    disabled={selectedXray === null}
                    size="lg"
                    className="px-8"
                  >
                    Continue to Consultation
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 'payment' && (
              <PaymentStep
                onProceed={handlePaymentComplete}
                onBack={handleBackToSelection}
              />
            )}

            {currentStep === 'results' && (
              <ResultsDisplay onStartNew={handleStartNew} />
            )}
          </CardContent>
        </Card>

        {/* Info Section */}
        {currentStep === 'selection' && (
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="glass-card">
              <CardContent className="p-6 text-center space-y-3">
                <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-3 rounded-full w-fit mx-auto">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-foreground">AI-Powered Analysis</h4>
                <p className="text-sm text-muted-foreground">
                  Advanced machine learning trained on thousands of orthopedic cases
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-6 text-center space-y-3">
                <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-3 rounded-full w-fit mx-auto">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-foreground">Global Accessibility</h4>
                <p className="text-sm text-muted-foreground">
                  No geographical limitations - quality care for everyone
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-6 text-center space-y-3">
                <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-3 rounded-full w-fit mx-auto">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <h4 className="font-semibold text-foreground">Affordable Pricing</h4>
                <p className="text-sm text-muted-foreground">
                  Just $1 per consultation - making healthcare accessible to all
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Inference;
