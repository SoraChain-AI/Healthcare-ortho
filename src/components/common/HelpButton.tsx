
import { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function HelpButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <Card className="absolute bottom-16 right-0 w-80 p-4 shadow-lg animate-fade-in dark:bg-gray-800">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium text-lg">SoraChain Help</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            Welcome to SoraChain AI! This platform helps healthcare institutions collaborate 
            on AI model training while preserving privacy.
          </p>
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Quick Links:</h4>
            <ul className="text-sm space-y-1">
              <li className="hover:text-sorachain-primary cursor-pointer">• Institution Registration</li>
              <li className="hover:text-sorachain-primary cursor-pointer">• How Dutch Auctions Work</li>
              <li className="hover:text-sorachain-primary cursor-pointer">• Federated Learning Guide</li>
              <li className="hover:text-sorachain-primary cursor-pointer">• Privacy Protocols</li>
            </ul>
          </div>
          <Button className="sorachain-button w-full mt-4">Contact Support</Button>
        </Card>
      )}
      
      <Button
        className="rounded-full h-14 w-14 shadow-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        <HelpCircle className="h-6 w-6 text-sorachain-primary" />
      </Button>
    </div>
  );
}
