import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import VehicleForm from './VehicleForm';

type SlotFormDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const VehicleFormDialog = ({ open, setOpen }: SlotFormDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[700px] px-[3%] py-10 rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-semibold">
            Create New Vehicle
          </DialogTitle>
        </DialogHeader>
        <VehicleForm setOpen={setOpen} />
        <DialogClose asChild>
          <Button variant="outline" className="w-full">
            Cancel
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleFormDialog;
