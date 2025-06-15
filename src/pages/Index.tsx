
import { BrainCircuit, Hospital, Gavel, BarChart2, Bot, Vote, Sparkles } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/common/SectionHeader';
import Layout from '@/components/layout/Layout';
import { ComputeProviders } from '@/components/compute/ComputeProviders';
import { Link } from 'react-router-dom';

const Index = () => {
  const features = [
    {
      icon: <Hospital className="h-8 w-8" />,
      title: 'Institution Onboarding',
      description: 'Join the SoraChain network as a healthcare institution',
      route: '/onboarding'
    },
    {
      icon: <Gavel className="h-8 w-8" />,
      title: 'Subnet Dutch Auction',
      description: 'Secure your place in the AI training subnet',
      route: '/auction'
    },
    {
      icon: <BarChart2 className="h-8 w-8" />,
      title: 'Federated Training Dashboard',
      description: 'Track model training progress across institutions',
      route: '/training'
    },
    {
      icon: <Bot className="h-8 w-8" />,
      title: 'Knee Specialist AI',
      description: 'Access the deployed AI for diagnosis',
      route: '/inference'
    },
    {
      icon: <Vote className="h-8 w-8" />,
      title: 'Feedback & Governance',
      description: 'Vote on future model improvements',
      route: '/governance'
    }
  ];

  return (
    <Layout>
      <div className="space-y-16">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="glass-card p-8 md:p-12 lg:p-16">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="flex-1 space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <Sparkles className="h-4 w-4" />
                    Next Generation Healthcare AI
                  </div>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                    SoraChain AI
                  </h1>
                  <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground">
                    Predictive modeling for knee joints
                  </h2>
                </div>
                
                <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                  Collaborate securely with healthcare institutions to develop AI models that enhance the diagnosis, treatment, and management of knee-related conditions.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/onboarding">
                    <Button className="glass-button liquid-gradient text-white border-0 text-lg px-8 py-4 glow-effect">
                      Join as Institution
                    </Button>
                  </Link>
                  <Link to="/inference">
                    <Button className="glass-button text-lg px-8 py-4">
                      Try Knee AI Specialist
                    </Button>
                  </Link>
                </div>
              </div>
              
              <div className="flex-1 relative">
                <div className="relative w-full max-w-lg mx-auto">
                  <div className="glass-card p-8 animate-float">
                    <img 
                      src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80" 
                      alt="Medical AI visualization" 
                      className="w-full object-cover rounded-xl"
                    />
                  </div>
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 animate-pulse-slow"></div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compute Providers Section */}
        <section className="glass-card p-8">
          <ComputeProviders />
        </section>

        {/* Features Section */}
        <section className="space-y-8">
          <SectionHeader 
            title="How It Works" 
            description="SoraChain AI enables privacy-preserving collaborative AI model development across healthcare institutions." 
            icon={
              <div className="glass-card p-2">
                <img src="/lovable-uploads/ece62b12-57de-4357-9b19-8078adff3c8a.png" alt="SoraChain AI Logo" className="h-8 w-8" />
              </div>
            } 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Link to={feature.route} key={index} className="floating-element">
                <Card className="glass-card h-full border-0 hover:glow-effect transition-all duration-300">
                  <CardHeader className="space-y-4">
                    <div className="glass-card p-3 w-fit text-gradient">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="text-primary hover:text-primary/80 p-0">
                      Learn more →
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
