import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, DollarSign, Globe, Shield } from 'lucide-react';
import { Badge } from '@/components/common/Badge';

interface PaymentStepProps {
  onProceed: () => void;
  onBack: () => void;
}

export function PaymentStep({ onProceed, onBack }: PaymentStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-gradient">Complete Your Consultation</h3>
        <p className="text-muted-foreground">Affordable AI-powered medical consultation</p>
      </div>

      <Card className="glass-card border-2 border-primary/20">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-4 rounded-full">
              <DollarSign className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold text-gradient">$1</CardTitle>
          <p className="text-sm text-muted-foreground">per consultation</p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
              <Globe className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Global Access</p>
                <p className="text-xs text-muted-foreground">Available to anyone, anywhere in the world</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
              <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Secure & Private</p>
                <p className="text-xs text-muted-foreground">HIPAA compliant with end-to-end encryption</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
              <CreditCard className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Instant Results</p>
                <p className="text-xs text-muted-foreground">AI-powered analysis in seconds</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between text-sm mb-4">
              <span className="text-muted-foreground">Consultation Fee</span>
              <span className="font-semibold text-foreground">$1.00</span>
            </div>
            
            <div className="space-y-3">
              <Button 
                onClick={onProceed} 
                className="w-full h-12 text-base"
                size="lg"
              >
                Proceed to Payment (Demo)
              </Button>
              
              <Button 
                onClick={onBack} 
                variant="outline"
                className="w-full"
              >
                Go Back
              </Button>
            </div>
            
            <div className="flex gap-2 justify-center mt-4">
              <Badge label="No Hidden Fees" variant="privacy" />
              <Badge label="Pay As You Go" variant="privacy" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
