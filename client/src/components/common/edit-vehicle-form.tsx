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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const updateVehicle = useUpdateVehicle();

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

    updateVehicle.mutate(
      { id: vehicle.id, data: form },
      {
        onSuccess: () => setOpen(false),
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
        />
        {errors.platenumber && <p className="text-red-500 text-sm">{errors.platenumber}</p>}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="model">Model</Label>
        <Input
          value={form.model}
          onChange={(e) => setForm({ ...form, model: e.target.value })}
        />
        {errors.model && <p className="text-red-500 text-sm">{errors.model}</p>}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="color">Color</Label>
        <Input
          value={form.color}
          onChange={(e) => setForm({ ...form, color: e.target.value })}
        />
        {errors.color && <p className="text-red-500 text-sm">{errors.color}</p>}
      </div>

      <Button type="submit" disabled={updateVehicle.isPending}>
        {updateVehicle.isPending ? 'Updating...' : 'Update'}
      </Button>
    </form>
  );
};

export default EditVehicleForm;
