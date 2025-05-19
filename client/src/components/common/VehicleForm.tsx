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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-2">
        <Label htmlFor="platenumber">Plate number</Label>
        <Input
          placeholder="Plate Number"
          value={form.platenumber}
          onChange={(e) => setForm({ ...form, platenumber: e.target.value })}
          required
        />
      </div>
      <Input
        placeholder="Model"
        value={form.model}
        onChange={(e) => setForm({ ...form, model: e.target.value })}
        required
      />
      <Input
        placeholder="Color"
        value={form.color}
        onChange={(e) => setForm({ ...form, color: e.target.value })}
      />
      <Button type="submit" disabled={createVehicle.isPending}>
        {createVehicle.isPending ? 'Saving...' : 'Save'}
      </Button>
    </form>
  );
};

export default VehicleForm;
