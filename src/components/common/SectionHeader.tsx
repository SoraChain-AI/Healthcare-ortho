
import { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
}

export function SectionHeader({ title, description, icon }: SectionHeaderProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        {icon && <div className="text-sorachain-primary">{icon}</div>}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
      </div>
      {description && (
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">{description}</p>
      )}
    </div>
  );
}
