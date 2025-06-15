
import { BrainCircuit, Hospital, Gavel, BarChart2, Bot, Vote, Sparkles, ArrowRight, CheckCircle, Clock } from 'lucide-react';
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
      description: 'Join the SoraChain network as a healthcare institution and start contributing to collaborative AI development',
      route: '/onboarding',
      step: '01',
      duration: '5 mins',
      status: 'Easy Setup'
    },
    {
      icon: <Gavel className="h-8 w-8" />,
      title: 'Subnet Dutch Auction',
      description: 'Secure your place in the AI training subnet through our transparent bidding system',
      route: '/auction',
      step: '02',
      duration: 'Live Bidding',
      status: 'Transparent'
    },
    {
      icon: <BarChart2 className="h-8 w-8" />,
      title: 'Federated Training Dashboard',
      description: 'Track model training progress across institutions with real-time analytics and insights',
      route: '/training',
      step: '03',
      duration: 'Real-time',
      status: 'Privacy-First'
    },
    {
      icon: <Bot className="h-8 w-8" />,
      title: 'Knee Specialist AI',
      description: 'Access the deployed AI for diagnosis with state-of-the-art accuracy and reliability',
      route: '/inference',
      step: '04',
      duration: 'Instant',
      status: 'Ready to Use'
    },
    {
      icon: <Vote className="h-8 w-8" />,
      title: 'Feedback & Governance',
      description: 'Vote on future model improvements and shape the direction of healthcare AI',
      route: '/governance',
      step: '05',
      duration: 'Ongoing',
      status: 'Community Driven'
    }
  ];

  return (
    <Layout>
      <div className="space-y-20">
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
                    <Button className="glass-button bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-0 text-lg px-8 py-4 glow-effect hover:from-emerald-600 hover:to-cyan-600">
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
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full opacity-20 animate-pulse-slow"></div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compute Providers Section */}
        <section className="glass-card p-8">
          <ComputeProviders />
        </section>

        {/* Enhanced How It Works Section */}
        <section className="space-y-16">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 dark:from-slate-100 dark:via-slate-300 dark:to-slate-100 bg-clip-text text-transparent">
                Simple 5-Step Process
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
                From institution onboarding to AI deployment - everything is designed for seamless collaboration and instant results.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Privacy-preserving federated learning</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-emerald-500" />
                <span>Real-time collaboration</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-500" />
                <span>Enterprise-grade security</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link to={feature.route} key={index} className="floating-element">
                <Card className={`glass-card h-full border-0 backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-500 hover:scale-105 hover:shadow-2xl relative overflow-hidden group`}>
                  <div className="absolute top-6 right-6 z-10">
                    <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5">
                      <span className="text-xs font-medium text-slate-600 dark:text-slate-300">{feature.step}</span>
                    </div>
                  </div>
                  
                  <CardHeader className="space-y-6 p-8">
                    <div className="flex justify-between items-start">
                      <div className="p-4 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 backdrop-blur-sm rounded-xl border border-white/20 w-fit">
                        <div className="text-slate-700 dark:text-slate-200">
                          {feature.icon}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-3 mt-2">
                        <span className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-white/20 text-slate-600 dark:text-slate-300 text-xs font-medium px-3 py-2 rounded-full">
                          {feature.status}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                          <Clock className="h-3 w-3" />
                          <span>{feature.duration}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100 group-hover:bg-gradient-to-r group-hover:from-emerald-600 group-hover:to-cyan-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                        {feature.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-8 pt-0">
                    <Button className="w-full glass-button bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 backdrop-blur-xl border border-white/20 text-slate-700 dark:text-slate-200 hover:from-emerald-500/30 hover:to-cyan-500/30 shadow-lg hover:shadow-xl transition-all duration-300 group">
                      <span>Get Started</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <div className="glass-card p-10 bg-gradient-to-r from-emerald-500/5 to-cyan-500/5 backdrop-blur-sm border border-white/20">
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                  Ready to Transform Healthcare AI?
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                  Join leading healthcare institutions in building the future of collaborative AI. 
                  Our platform ensures data privacy while enabling groundbreaking medical discoveries.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/onboarding">
                    <Button className="glass-button bg-gradient-to-r from-emerald-500 to-cyan-500 text-white border-0 px-6 py-3 glow-effect hover:from-emerald-600 hover:to-cyan-600">
                      Start Your Journey
                    </Button>
                  </Link>
                  <Button variant="outline" className="glass-button border-white/20 text-slate-700 dark:text-slate-200">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
