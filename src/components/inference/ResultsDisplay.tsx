import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertTriangle, FileText, Download } from 'lucide-react';
import { Badge } from '@/components/common/Badge';

interface ResultsDisplayProps {
  onStartNew: () => void;
}

export function ResultsDisplay({ onStartNew }: ResultsDisplayProps) {
  const findings = [
    {
      severity: 'moderate',
      title: 'Joint Space Narrowing',
      description: 'Mild to moderate narrowing detected in the medial compartment, suggesting early degenerative changes.',
    },
    {
      severity: 'low',
      title: 'Osteophyte Formation',
      description: 'Small osteophytes present at the tibial plateau margins, consistent with osteoarthritis.',
    },
    {
      severity: 'normal',
      title: 'Alignment',
      description: 'Normal femorotibial alignment with no evidence of significant malalignment.',
    },
  ];

  const recommendations = [
    'Consider weight-bearing exercises and physical therapy',
    'NSAIDs may help manage symptoms',
    'Follow-up imaging in 12 months recommended',
    'Consult with orthopedic specialist if symptoms worsen',
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-3 rounded-full">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gradient">AI Consultation Results</h3>
        <p className="text-muted-foreground">Generated in 2.3 seconds</p>
        <div className="flex gap-2 justify-center">
          <Badge label="AI Analysis Complete" variant="success" />
          <Badge label="Confidence: 94%" variant="privacy" />
        </div>
      </div>

      <Card className="glass-card border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <FileText className="h-5 w-5" />
            Clinical Findings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {findings.map((finding, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-background/50 border border-border/50 space-y-2"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-foreground">{finding.title}</h4>
                {finding.severity === 'moderate' && (
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                )}
                {finding.severity === 'normal' && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">{finding.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="glass-card border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="text-foreground">Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
        <p className="text-sm text-foreground">
          <strong>Important:</strong> This AI analysis is for informational purposes only and should not replace professional medical advice. Please consult with a qualified healthcare provider for diagnosis and treatment.
        </p>
      </div>

      <div className="flex gap-3">
        <Button onClick={onStartNew} className="flex-1">
          New Consultation
        </Button>
        <Button variant="outline" className="flex gap-2">
          <Download className="h-4 w-4" />
          Download Report
        </Button>
      </div>
    </div>
  );
}
