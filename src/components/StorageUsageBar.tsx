import { Progress } from '@/components/ui/progress';
import { HardDrive } from 'lucide-react';

const STORAGE_KEY = 'custom-units-data';
const MAX_STORAGE_BYTES = 5 * 1024 * 1024; // 5MB typical localStorage limit

const getStorageUsage = (): { usedBytes: number; percentage: number } => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    const usedBytes = data ? new Blob([data]).size : 0;
    const percentage = Math.min((usedBytes / MAX_STORAGE_BYTES) * 100, 100);
    return { usedBytes, percentage };
  } catch {
    return { usedBytes: 0, percentage: 0 };
  }
};

const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

export const StorageUsageBar = () => {
  const { usedBytes, percentage } = getStorageUsage();
  
  const getColorClass = () => {
    if (percentage >= 90) return 'bg-destructive';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-other';
  };

  return (
    <div className="flex items-center gap-3 min-w-[200px]">
      <HardDrive className="h-4 w-4 text-muted-foreground shrink-0" />
      <div className="flex-1 space-y-1">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Storage</span>
          <span>{formatBytes(usedBytes)} / 5 MB ({percentage.toFixed(1)}%)</span>
        </div>
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div 
            className={`h-full transition-all ${getColorClass()}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};
