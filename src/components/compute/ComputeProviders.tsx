
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
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 dark:from-slate-100 dark:via-slate-300 dark:to-slate-100 bg-clip-text text-transparent">
            Connect Compute Resources
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl font-light">
            Select a compute provider to power your SoraChain AI models. Your choice will determine the underlying infrastructure for training and inference.
          </p>
        </div>
        {selectedProvider && (
          <Button 
            onClick={handleConnectProvider}
            className="glass-button bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/20 text-slate-700 dark:text-slate-200 hover:from-blue-500/30 hover:to-purple-500/30 shadow-xl hover:shadow-2xl transition-all duration-500 flex-shrink-0"
          >
            Connect Provider
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map((provider) => (
          <Card 
            key={provider.id}
            className={`glass-card cursor-pointer floating-element border-0 backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 ${
              selectedProvider === provider.id 
                ? 'ring-2 ring-blue-400/50 shadow-xl shadow-blue-500/20' 
                : 'hover:bg-white/20 dark:hover:bg-black/30'
            } transition-all duration-500 hover:scale-105 hover:shadow-2xl`}
            onClick={() => handleProviderSelect(provider.id)}
          >
            <CardHeader className="space-y-4 p-6">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl border border-white/20 w-fit">
                  <div className="text-slate-700 dark:text-slate-200">
                    {provider.icon}
                  </div>
                </div>
                <span className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 text-slate-600 dark:text-slate-300 text-xs font-medium px-3 py-1.5 rounded-full">
                  {provider.category === 'cloud' ? 'Cloud' : 'Decentralized'}
                </span>
              </div>
              <div className="space-y-2">
                <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                  {provider.name}
                </CardTitle>
                <CardDescription className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light">
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
