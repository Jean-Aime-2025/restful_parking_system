import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import RequestParkingForm from './RequestParkingForm';

type RequestFormDialogProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const RequestDialog = ({ open, setOpen }: RequestFormDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[700px] px-[3%] py-10 rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-semibold">
            Create New Request
          </DialogTitle>
        </DialogHeader>
        <RequestParkingForm setOpen={setOpen} />
        <DialogClose asChild>
          <Button variant="outline" className="w-full">
            Cancel
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default RequestDialog;
