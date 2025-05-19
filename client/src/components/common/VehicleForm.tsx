import { useState } from 'react';
import { useCreateVehicle } from '@/hooks/useVehicle';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface Props {
  setOpen: (open: boolean) => void;
}

const VehicleForm = ({ setOpen }: Props) => {
  const [form, setForm] = useState({ platenumber: '', model: '', color: '' });
  const createVehicle = useCreateVehicle();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createVehicle.mutate(form, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-2">
        <Label htmlFor="platenumber">Plate number</Label>
        <Input
          placeholder="RAA554E"
          value={form.platenumber}
          onChange={(e) => setForm({ ...form, platenumber: e.target.value })}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="platenumber">Model</Label>
        <Input
          placeholder="BMW"
          value={form.model}
          onChange={(e) => setForm({ ...form, model: e.target.value })}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="platenumber">Color</Label>
        <Input
          placeholder="Red"
          value={form.color}
          onChange={(e) => setForm({ ...form, color: e.target.value })}
        />
      </div>

      <Button type="submit" disabled={createVehicle.isPending}>
        {createVehicle.isPending ? 'Creating...' : 'Create vehicle'}
      </Button>
    </form>
  );
};

export default VehicleForm;
