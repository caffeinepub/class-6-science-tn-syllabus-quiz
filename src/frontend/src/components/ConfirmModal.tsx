import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface ConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmModal({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Continue Quiz',
}: ConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="border-2 shadow-2xl rounded-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-base leading-relaxed">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 sm:gap-2">
          <AlertDialogCancel className="font-semibold">
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="font-semibold bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
