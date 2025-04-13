
import { cn } from '@/lib/utils';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'privacy' | 'success' | 'warning';
  className?: string;
}

export function Badge({ label, variant = 'default', className }: BadgeProps) {
  const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  
  const variantClasses = {
    default: "bg-sorachain-light text-sorachain-tertiary",
    privacy: "bg-sorachain-pale text-sorachain-secondary",
    success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  };
  
  return (
    <span className={cn(baseClasses, variantClasses[variant], className)}>
      {label}
    </span>
  );
}
