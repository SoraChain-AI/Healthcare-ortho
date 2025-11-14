import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';
import kneeXray1 from '@/assets/knee-xray-1.jpg';
import kneeXray2 from '@/assets/knee-xray-2.jpg';
import kneeXray3 from '@/assets/knee-xray-3.jpg';

interface XraySelectorProps {
  selectedXray: number | null;
  onSelect: (index: number) => void;
}

const sampleXrays = [
  { id: 1, image: kneeXray1, label: 'AP View - Sample 1' },
  { id: 2, image: kneeXray2, label: 'Lateral View - Sample 2' },
  { id: 3, image: kneeXray3, label: 'Bilateral View - Sample 3' },
];

export function XraySelector({ selectedXray, onSelect }: XraySelectorProps) {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-foreground">Select a Sample Knee X-Ray</h3>
        <p className="text-sm text-muted-foreground">Choose one of our demo X-rays to see how the AI consultation works</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sampleXrays.map((xray, index) => (
          <Card
            key={xray.id}
            className={`cursor-pointer transition-all duration-300 hover:scale-105 relative ${
              selectedXray === index
                ? 'ring-2 ring-primary shadow-lg'
                : 'hover:ring-1 hover:ring-muted-foreground/30'
            }`}
            onClick={() => onSelect(index)}
          >
            <CardContent className="p-4 space-y-3">
              <div className="relative aspect-[3/4] bg-black rounded-md overflow-hidden">
                <img
                  src={xray.image}
                  alt={xray.label}
                  className="w-full h-full object-cover"
                />
                {selectedXray === index && (
                  <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
              <p className="text-sm font-medium text-center text-foreground">{xray.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
