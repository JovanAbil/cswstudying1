import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertTriangle, XCircle } from 'lucide-react';
import { TargetPresetValidation } from '@/hooks/useWrongAnswers';

interface TargetPresetImportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  validation: TargetPresetValidation | null;
}

const TargetPresetImportDialog = ({
  isOpen,
  onClose,
  validation,
}: TargetPresetImportDialogProps) => {
  if (!validation) return null;

  const hasMissing = validation.missingQuestionIds.length > 0;
  const allMissing = validation.foundQuestionIds.length === 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <XCircle className="h-5 w-5" />
            Import Failed
          </DialogTitle>
          <DialogDescription className="text-left">
            {allMissing
              ? "None of the questions in this target preset exist in the current dataset."
              : "Some questions in this target preset don't exist in the current dataset."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/30">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="text-sm font-medium">
                  Missing Questions: {validation.missingQuestionIds.length} of {validation.totalImported}
                </p>
                <p className="text-sm text-muted-foreground">
                  The following question IDs were not found:
                </p>
                <div className="max-h-32 overflow-y-auto bg-background rounded p-2 border">
                  {validation.missingQuestionIds.slice(0, 10).map((id) => (
                    <code key={id} className="text-xs block py-0.5 text-destructive">
                      {id}
                    </code>
                  ))}
                  {validation.missingQuestionIds.length > 10 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      ...and {validation.missingQuestionIds.length - 10} more
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            This can happen if the target preset was created on a different version of the dataset or from a different course. 
            Please ensure you're importing a target preset that matches this course's questions.
          </p>
        </div>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TargetPresetImportDialog;
