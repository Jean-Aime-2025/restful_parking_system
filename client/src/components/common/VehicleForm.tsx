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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const createVehicle = useCreateVehicle();

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const plateRegex = /^R[A-Z]{2}\d{3}[A-Z]$/;

    if (!plateRegex.test(form.platenumber)) {
      newErrors.platenumber = 'Plate number must be in Rwandan format (e.g., RAA123B)';
    }

    if (!form.model.trim()) {
      newErrors.model = 'Model is required';
    }

    if (form.color && !/^[a-zA-Z\s]+$/.test(form.color)) {
      newErrors.color = 'Color must contain only letters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    createVehicle.mutate(form, {
      onSuccess: () => setOpen(false),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-2">
        <Label htmlFor="platenumber">Plate number (Rwandan)</Label>
        <Input
          placeholder="RAA123B"
          value={form.platenumber}
          onChange={(e) => setForm({ ...form, platenumber: e.target.value })}
        />
        {errors.platenumber && <p className="text-red-500 text-sm">{errors.platenumber}</p>}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="model">Model</Label>
        <Input
          placeholder="BMW"
          value={form.model}
          onChange={(e) => setForm({ ...form, model: e.target.value })}
        />
        {errors.model && <p className="text-red-500 text-sm">{errors.model}</p>}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="color">Color</Label>
        <Input
          placeholder="Red"
          value={form.color}
          onChange={(e) => setForm({ ...form, color: e.target.value })}
        />
        {errors.color && <p className="text-red-500 text-sm">{errors.color}</p>}
      </div>

      <Button type="submit" disabled={createVehicle.isPending}>
        {createVehicle.isPending ? 'Creating...' : 'Create vehicle'}
      </Button>
    </form>
  );
};

export default VehicleForm;
