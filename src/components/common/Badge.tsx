
import { cn } from '@/lib/utils';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'privacy' | 'success' | 'warning';
  className?: string;
}

export function Badge({ label, variant = 'default', className }: BadgeProps) {
  const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  
  const variantClasses = {
    default: "bg-sorachain-light text-white", // Changed to white text for better visibility
    privacy: "bg-sorachain-pale text-black", // Changed to black text for contrast
    success: "bg-green-500 text-white", // Enhanced color for better visibility
    warning: "bg-yellow-500 text-black", // Enhanced color with black text
  };
  
  return (
    <span className={cn(baseClasses, variantClasses[variant], className)}>
      {label}
    </span>
  );
}
