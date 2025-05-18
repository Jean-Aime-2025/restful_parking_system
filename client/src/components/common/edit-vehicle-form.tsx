import { useState } from 'react';
import { useUpdateVehicle } from '@/hooks/useVehicle';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface Props {
  setOpen: (open: boolean) => void;
  vehicle: Vehicle;
}

const EditVehicleForm = ({ setOpen, vehicle }: Props) => {
  const [form, setForm] = useState({
    platenumber: vehicle.platenumber,
    model: vehicle.model,
    color: vehicle.color || '',
  });

  const updateVehicle = useUpdateVehicle();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateVehicle.mutate(
      {
        id: vehicle.id,
        data: form,
      },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        value={form.platenumber}
        onChange={(e) => setForm({ ...form, platenumber: e.target.value })}
        placeholder="Plate Number"
        required
      />
      <Input
        value={form.model}
        onChange={(e) => setForm({ ...form, model: e.target.value })}
        placeholder="Model"
        required
      />
      <Input
        value={form.color}
        onChange={(e) => setForm({ ...form, color: e.target.value })}
        placeholder="Color"
      />
      <Button type="submit" disabled={updateVehicle.isPending}>
        {updateVehicle.isPending ? 'Updating...' : 'Update'}
      </Button>
    </form>
  );
};

export default EditVehicleForm;
