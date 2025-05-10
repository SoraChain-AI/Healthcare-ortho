
import { useState } from 'react';
import { Server, Database, Cloud } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
      icon: <Server className="h-8 w-8" />,
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
      // Here you would implement the actual connection logic
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold">Connect Compute Resources</h3>
          <p className="text-gray-600 dark:text-gray-300">Select a compute provider to power your SoraChain AI models</p>
        </div>
        {selectedProvider && (
          <Button 
            onClick={handleConnectProvider}
            className="sorachain-button"
          >
            Connect Provider
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {providers.map((provider) => (
          <Card 
            key={provider.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedProvider === provider.id 
                ? 'ring-2 ring-sorachain-primary bg-sorachain-pale/10' 
                : 'hover:translate-y-[-4px]'
            }`}
            onClick={() => handleProviderSelect(provider.id)}
          >
            <CardHeader>
              <div className="text-sorachain-primary mb-2">{provider.icon}</div>
              <CardTitle className="flex justify-between items-center">
                {provider.name}
                <span className="text-xs px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                  {provider.category === 'cloud' ? 'Cloud' : 'Decentralized'}
                </span>
              </CardTitle>
              <CardDescription>{provider.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant={selectedProvider === provider.id ? "default" : "ghost"}
                className={selectedProvider === provider.id ? "sorachain-button" : "text-sorachain-primary"}
              >
                {selectedProvider === provider.id ? "Selected" : "Select"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
