
import { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
}

export function SectionHeader({ title, description, icon }: SectionHeaderProps) {
  return (
    <div className="space-y-4 text-center">
      <div className="flex items-center justify-center gap-3">
        {icon && <div className="text-gradient">{icon}</div>}
        <h2 className="text-3xl md:text-4xl font-bold text-gradient">{title}</h2>
      </div>
      {description && (
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
