import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import SlotForm from './RequestParkingForm';
import { Button } from '../ui/button';

type SlotFormDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const VehicleFormDialog = ({ open, setOpen }: SlotFormDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[700px] px-[5%] py-10">
        <DialogHeader>
          <DialogTitle className="text-3xl font-semibold">
            Create New Vehicle
          </DialogTitle>
        </DialogHeader>
        <SlotForm setOpen={setOpen} />
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
