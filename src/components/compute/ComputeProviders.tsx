
import { useState } from 'react';
import { Server, Database, Cloud, Zap, CheckCircle, ArrowRight, Clock } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type ComputeProvider = {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  category: 'cloud' | 'decentralized';
  connectionTime: string;
  features: string[];
};

export const ComputeProviders = () => {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [connectedProviders, setConnectedProviders] = useState<string[]>([]);

  const providers: ComputeProvider[] = [
    {
      id: 'azure',
      name: 'Microsoft Azure',
      icon: <Cloud className="h-8 w-8" />,
      description: 'Enterprise-grade cloud computing services',
      category: 'cloud',
      connectionTime: '2 mins',
      features: ['Auto-scaling', 'Global CDN', 'Enterprise Security']
    },
    {
      id: 'aws',
      name: 'Amazon Web Services',
      icon: <Server className="h-8 w-8" />,
      description: 'Comprehensive cloud computing platform',
      category: 'cloud',
      connectionTime: '3 mins',
      features: ['EC2 Instances', 'S3 Storage', 'Lambda Functions']
    },
    {
      id: 'gcp',
      name: 'Google Cloud Platform',
      icon: <Cloud className="h-8 w-8" />,
      description: 'Suite of cloud computing services by Google',
      category: 'cloud',
      connectionTime: '2 mins',
      features: ['AI/ML Tools', 'BigQuery', 'Kubernetes Engine']
    },
    {
      id: 'render',
      name: 'Render',
      icon: <Zap className="h-8 w-8" />,
      description: 'Cloud application hosting platform',
      category: 'decentralized',
      connectionTime: '1 min',
      features: ['Zero-config', 'Auto-deploy', 'Free SSL']
    },
    {
      id: 'aethir',
      name: 'Aethir',
      icon: <Database className="h-8 w-8" />,
      description: 'Decentralized compute network',
      category: 'decentralized',
      connectionTime: '5 mins',
      features: ['Decentralized', 'Cost-effective', 'Global Network']
    }
  ];

  const handleProviderSelect = (providerId: string) => {
    setSelectedProvider(providerId);
  };

  const handleQuickConnect = (providerId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    const provider = providers.find(p => p.id === providerId);
    setConnectedProviders(prev => [...prev, providerId]);
    toast.success(`Connected to ${provider?.name}!`, {
      description: `Setup completed in ${provider?.connectionTime}. Ready to deploy models.`
    });
  };

  const isConnected = (providerId: string) => connectedProviders.includes(providerId);

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 dark:from-slate-100 dark:via-slate-300 dark:to-slate-100 bg-clip-text text-transparent">
            Connect in Minutes, Not Hours
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
            Choose your preferred compute provider and get your AI models running instantly. 
            No complex setup, no lengthy configurations—just one-click connections.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>Zero configuration required</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-500" />
            <span>Setup in under 5 minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-purple-500" />
            <span>Instant deployment</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {providers.map((provider) => (
          <Card 
            key={provider.id}
            className={`glass-card cursor-pointer floating-element border-0 backdrop-blur-xl bg-white/10 dark:bg-black/20 border border-white/20 dark:border-white/10 ${
              selectedProvider === provider.id 
                ? 'ring-2 ring-blue-400/50 shadow-xl shadow-blue-500/20' 
                : 'hover:bg-white/20 dark:hover:bg-black/30'
            } ${
              isConnected(provider.id) 
                ? 'ring-2 ring-green-400/50 shadow-xl shadow-green-500/20' 
                : ''
            } transition-all duration-500 hover:scale-105 hover:shadow-2xl relative overflow-hidden`}
            onClick={() => handleProviderSelect(provider.id)}
          >
            {isConnected(provider.id) && (
              <div className="absolute top-4 right-4 z-10">
                <div className="bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-full p-1">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                </div>
              </div>
            )}
            
            <CardHeader className="space-y-4 p-6">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl border border-white/20 w-fit">
                  <div className="text-slate-700 dark:text-slate-200">
                    {provider.icon}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/20 text-slate-600 dark:text-slate-300 text-xs font-medium px-3 py-1.5 rounded-full">
                    {provider.category === 'cloud' ? 'Cloud' : 'Decentralized'}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                    <Clock className="h-3 w-3" />
                    <span>{provider.connectionTime} setup</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                  {provider.name}
                </CardTitle>
                <CardDescription className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                  {provider.description}
                </CardDescription>
                
                <div className="flex flex-wrap gap-1">
                  {provider.features.map((feature, index) => (
                    <span 
                      key={index}
                      className="text-xs bg-slate-100/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 px-2 py-1 rounded-md border border-white/20"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="pt-2">
                {isConnected(provider.id) ? (
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-medium">
                    <CheckCircle className="h-4 w-4" />
                    <span>Connected & Ready</span>
                  </div>
                ) : (
                  <Button
                    onClick={(e) => handleQuickConnect(provider.id, e)}
                    className="w-full glass-button bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl border border-white/20 text-slate-700 dark:text-slate-200 hover:from-blue-500/30 hover:to-purple-500/30 shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <span>Quick Connect</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Button>
                )}
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
      
      <div className="text-center">
        <div className="glass-card p-6 bg-gradient-to-r from-blue-500/5 to-purple-500/5 backdrop-blur-sm border border-white/20">
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">
            Need help choosing? Our smart recommendations will suggest the best provider for your specific use case.
          </p>
          <Button variant="outline" className="glass-button border-white/20 text-slate-700 dark:text-slate-200">
            Get Recommendations
          </Button>
        </div>
      </div>
    </div>
  );
};
