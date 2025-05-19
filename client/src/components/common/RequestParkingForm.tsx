import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { ClipLoader } from 'react-spinners';
import { Textarea } from '../ui/textarea';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useGetMyVehicles } from '@/hooks/useVehicle';
import { useCreateParkingRequest } from '@/hooks/useParkingRequest';

type RequestParkingFormProps = {
  setOpen: (open: boolean) => void;
};

const RequestParkingForm = ({ setOpen }: RequestParkingFormProps) => {
  const [formData, setFormData] = useState({
    car: '',
    note: '',
  });

  const [entryDate, setEntryDate] = useState<Date | undefined>();
  const [entryTime, setEntryTime] = useState<string>(''); // HH:MM
  const [exitDate, setExitDate] = useState<Date | undefined>();
  const [exitTime, setExitTime] = useState<string>(''); // HH:MM
  const [isPending, setIsPending] = useState(false);

  const { data: vehicles, isLoading } = useGetMyVehicles();
  const { mutate: createRequest } = useCreateParkingRequest(setOpen, setIsPending);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const combineDateAndTime = (date: Date, time: string): Date => {
    const [hours, minutes] = time.split(':').map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    newDate.setSeconds(0);
    newDate.setMilliseconds(0);
    return newDate;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!entryDate || !exitDate || !entryTime || !exitTime) {
      alert('Please select both date and time for entry and exit.');
      return;
    }

    setIsPending(true);

    const startTime = combineDateAndTime(entryDate, entryTime);
    const endTime = combineDateAndTime(exitDate, exitTime);

    const payload = {
      vehicleId: formData.car,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      notes: formData.note || undefined,
    };

    createRequest(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 p-4 px-0 pb-0 w-full"
    >
      <div className="grid gap-2">
        <Label htmlFor="car">Car (plate number)</Label>
        <select
          id="car"
          name="car"
          value={formData.car}
          onChange={handleChange}
          required
          className="rounded-md border px-3 py-2 text-sm"
        >
          <option value="">Select car</option>
          {isLoading ? (
            <option>Loading...</option>
          ) : (
            vehicles?.map(vehicle => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.platenumber} ({vehicle.model})
              </option>
            ))
          )}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
        {/* Entry Date + Time */}
        <div className="grid gap-2">
          <Label htmlFor="entryDate">Entry date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'justify-start text-left font-normal',
                  !entryDate && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {entryDate ? format(entryDate, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={entryDate}
                onSelect={setEntryDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {/* Time input */}
          <input
            type="time"
            value={entryTime}
            onChange={(e) => setEntryTime(e.target.value)}
            required
            className="border rounded px-3 py-2 text-sm"
          />
        </div>

        {/* Exit Date + Time */}
        <div className="grid gap-2">
          <Label htmlFor="exitDate">Exit date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'justify-start text-left font-normal',
                  !exitDate && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {exitDate ? format(exitDate, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={exitDate}
                onSelect={setExitDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {/* Time input */}
          <input
            type="time"
            value={exitTime}
            onChange={(e) => setExitTime(e.target.value)}
            required
            className="border rounded px-3 py-2 text-sm"
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="note">Note</Label>
        <Textarea
          id="note"
          name="note"
          placeholder="Need it urgently..."
          value={formData.note}
          onChange={handleChange}
          required
        />
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className={isPending ? 'opacity-70' : ''}
      >
        {isPending ? (
          <div className="flex items-center justify-center gap-2">
            <ClipLoader size={20} color="#fff" />
            <span>Submitting...</span>
          </div>
        ) : (
          'Create request'
        )}
      </Button>
    </form>
  );
};

export default RequestParkingForm;
