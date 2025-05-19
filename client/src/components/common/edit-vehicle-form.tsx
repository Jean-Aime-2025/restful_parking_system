import { useState } from 'react';
import { useUpdateVehicle } from '@/hooks/useVehicle';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-2">
        <Label htmlFor="platenumber">Plate number</Label>
        <Input
          value={form.platenumber}
          onChange={(e) => setForm({ ...form, platenumber: e.target.value })}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="platenumber">Model</Label>
        <Input
          value={form.model}
          onChange={(e) => setForm({ ...form, model: e.target.value })}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="platenumber">Color</Label>
        <Input
          value={form.color}
          onChange={(e) => setForm({ ...form, color: e.target.value })}
        />
      </div>
      <Button type="submit" disabled={updateVehicle.isPending}>
        {updateVehicle.isPending ? 'Updating...' : 'Update'}
      </Button>
    </form>
  );
};

export default EditVehicleForm;
