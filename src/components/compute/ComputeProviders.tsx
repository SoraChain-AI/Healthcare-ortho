
import { useState } from 'react';
import { Server, Database, Cloud, Zap } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type ComputeProvider = {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  category: 'cloud' | 'decentralized';
};

export const ComputeProviders = () => {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const providers: ComputeProvider[] = [
    {
      id: 'azure',
      name: 'Microsoft Azure',
      icon: <Cloud className="h-8 w-8" />,
      description: 'Enterprise-grade cloud computing services',
      category: 'cloud',
    },
    {
      id: 'aws',
      name: 'Amazon Web Services',
      icon: <Server className="h-8 w-8" />,
      description: 'Comprehensive cloud computing platform',
      category: 'cloud',
    },
    {
      id: 'gcp',
      name: 'Google Cloud Platform',
      icon: <Cloud className="h-8 w-8" />,
      description: 'Suite of cloud computing services by Google',
      category: 'cloud',
    },
    {
      id: 'render',
      name: 'Render',
      icon: <Zap className="h-8 w-8" />,
      description: 'Cloud application hosting platform',
      category: 'decentralized',
    },
    {
      id: 'aethir',
      name: 'Aethir',
      icon: <Database className="h-8 w-8" />,
      description: 'Decentralized compute network',
      category: 'decentralized',
    }
  ];

  const handleProviderSelect = (providerId: string) => {
    setSelectedProvider(providerId);
  };

  const handleConnectProvider = () => {
    if (selectedProvider) {
      const provider = providers.find(p => p.id === selectedProvider);
      toast.success(`Connecting to ${provider?.name}...`, {
        description: "Integration process started"
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-gradient">Connect Compute Resources</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Select a compute provider to power your SoraChain AI models. Your choice will determine the underlying infrastructure for training and inference.
          </p>
        </div>
        {selectedProvider && (
          <Button 
            onClick={handleConnectProvider}
            className="glass-button liquid-gradient text-white border-0 glow-effect flex-shrink-0"
          >
            Connect Provider
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map((provider) => (
          <Card 
            key={provider.id}
            className={`glass-card cursor-pointer floating-element border-0 ${
              selectedProvider === provider.id 
                ? 'glow-effect ring-2 ring-primary/30' 
                : 'ring-2 ring-transparent'
            } transition-all duration-300`}
            onClick={() => handleProviderSelect(provider.id)}
          >
            <CardHeader className="space-y-4">
              <div className="glass-card p-3 w-fit text-gradient">
                {provider.icon}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <CardTitle className="text-lg">{provider.name}</CardTitle>
                  <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
                    {provider.category === 'cloud' ? 'Cloud' : 'Decentralized'}
                  </span>
                </div>
                <CardDescription className="text-sm text-muted-foreground">
                  {provider.description}
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
