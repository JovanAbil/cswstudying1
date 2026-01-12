import { useDebugMode } from '@/hooks/useDebugMode';

interface AdPlaceholderProps {
  position: 'sidebar-left' | 'sidebar-right' | 'bottom' | 'inline';
  className?: string;
}

export const AdPlaceholder = ({ position, className = '' }: AdPlaceholderProps) => {
  const { isDebugMode } = useDebugMode();

  if (!isDebugMode) return null;

  const positionStyles = {
    'sidebar-left': 'fixed left-2 top-1/2 -translate-y-1/2 w-[160px] h-[600px]',
    'sidebar-right': 'fixed right-2 top-1/2 -translate-y-1/2 w-[160px] h-[600px]',
    'bottom': 'w-full h-[90px]',
    'inline': 'w-full h-[250px]',
  };

  return (
    <div
      className={`bg-muted/50 border-2 border-dashed border-primary/50 rounded-lg flex items-center justify-center ${positionStyles[position]} ${className}`}
    >
      <div className="text-center p-4">
        <p className="text-sm font-medium text-primary">Ad Placeholder</p>
        <p className="text-xs text-muted-foreground">{position}</p>
      </div>
    </div>
  );
};
