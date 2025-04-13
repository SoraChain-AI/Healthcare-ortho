import { BrainCircuit, Hospital, Gavel, BarChart2, Bot, Vote } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SectionHeader } from '@/components/common/SectionHeader';
import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
const Index = () => {
  const features = [{
    icon: <Hospital className="h-8 w-8" />,
    title: 'Institution Onboarding',
    description: 'Join the SoraChain network as a healthcare institution',
    route: '/onboarding'
  }, {
    icon: <Gavel className="h-8 w-8" />,
    title: 'Subnet Dutch Auction',
    description: 'Secure your place in the AI training subnet',
    route: '/auction'
  }, {
    icon: <BarChart2 className="h-8 w-8" />,
    title: 'Federated Training Dashboard',
    description: 'Track model training progress across institutions',
    route: '/training'
  }, {
    icon: <Bot className="h-8 w-8" />,
    title: 'Knee Specialist AI',
    description: 'Access the deployed AI for diagnosis',
    route: '/inference'
  }, {
    icon: <Vote className="h-8 w-8" />,
    title: 'Feedback & Governance',
    description: 'Vote on future model improvements',
    route: '/governance'
  }];
  return <Layout>
      <div className="space-y-12">
        <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-sorachain-light via-white to-sorachain-pale opacity-50 dark:opacity-20" />
          <div className="relative px-6 py-12 sm:px-12 sm:py-16 lg:py-20 lg:px-16 flex flex-col lg:flex-row items-center">
            <div className="max-w-2xl lg:max-w-lg lg:mr-8">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
                SoraChain AI
                <span className="block text-sorachain-primary mt-1">Predictive modeling for knee joints</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">Collaborate securely with healthcare institutions to develop AI models that enhance the diagnosis, treatment, and management of knee-related conditions—while ensuring data privacy and maintaining patient data sovereignty.</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/onboarding">
                  <Button className="sorachain-button text-lg py-3 px-6">Join as Institution</Button>
                </Link>
                <Link to="/inference">
                  <Button variant="outline" className="text-lg py-3 px-6 border-sorachain-primary text-sorachain-primary">Try Knee AI Specialist</Button>
                </Link>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:flex-1">
              <div className="relative mx-auto w-full max-w-lg lg:max-w-md">
                <div className="absolute top-0 left-0 w-72 h-72 bg-sorachain-primary/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-soft" />
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-sorachain-secondary/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-soft" style={{
                animationDelay: '1s'
              }} />
                <div className="relative flex flex-col items-center">
                  
                  <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300&q=80" alt="Medical AI visualization" className="relative z-10 w-full object-cover rounded-2xl shadow-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <section>
          <SectionHeader title="How It Works" description="SoraChain AI enables privacy-preserving collaborative AI model development across healthcare institutions." icon={<img src="/lovable-uploads/ece62b12-57de-4357-9b19-8078adff3c8a.png" alt="SoraChain AI Logo" className="h-8 w-8" />} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => <Link to={feature.route} key={index}>
                <Card className="h-full highlight-card hover:translate-y-[-4px] transition-all">
                  <CardHeader>
                    <div className="text-sorachain-primary mb-3">{feature.icon}</div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="text-sorachain-primary">
                      Learn more →
                    </Button>
                  </CardContent>
                </Card>
              </Link>)}
          </div>
        </section>
      </div>
    </Layout>;
};
export default Index;