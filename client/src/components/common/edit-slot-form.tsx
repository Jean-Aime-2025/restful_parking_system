
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ClipLoader } from 'react-spinners';
import { Textarea } from '../ui/textarea';
import { useUpdateSlot } from '@/hooks/useSlot';  
import type { SlotDto } from '../columns/admin-slots-columns';


type SlotFormProps = {
  setOpen: (open: boolean) => void;
  slot?: SlotDto;
};

const EditSlotForm = ({ setOpen, slot }: SlotFormProps) => {
  const [formData, setFormData] = useState({
    status: '',
    note: '',
    slotCode: '',
  });
  const [errors, setErrors] = useState({
    slotCode: '',
  });

  useEffect(() => {
    if (slot) {
      setFormData({
        status: slot.status,
        note: slot.description || '',
        slotCode: slot.slotCode,
      });
      setErrors({ slotCode: '' });
    }
  }, [slot]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'slotCode') {
      const processedValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '');

      if (processedValue.length > 0) {
        const charPart = processedValue.charAt(0);
        const numPart = processedValue.slice(1);

        if (!/^[A-Z]$/.test(charPart)) {
          setErrors({ ...errors, slotCode: 'First character must be a letter (A-Z)' });
        } else if (numPart.length > 0 && (isNaN(Number(numPart)) || numPart.length !== 3)) {
          setErrors({ ...errors, slotCode: 'Must have exactly 3 digits (000-999)' });
        } else {
          setErrors({ ...errors, slotCode: '' });
        }
      }

      if (processedValue.length <= 4) {
        setFormData({ ...formData, [name]: processedValue });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const { mutate: updateSlotMutation, isPending } = useUpdateSlot();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!/^[A-Z][0-9]{3}$/.test(formData.slotCode)) {
      setErrors({ ...errors, slotCode: 'Invalid slot code format (e.g., A999)' });
      return;
    }

    if (!slot?.id) {
      return;
    }

    const updatedSlot = {
      id: slot.id,
      code: formData.slotCode,
      occupied: formData.status === 'occupied',
      description: formData.note,
    };

    updateSlotMutation(updatedSlot, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 p-4 px-0 pb-0 w-full"
    >
      <div className="grid gap-2">
        <Label htmlFor="slotCode">Slot Code (A999 format)</Label>
        <Input
          id="slotCode"
          name="slotCode"
          type="text"
          placeholder="A999"
          value={formData.slotCode}
          onChange={handleChange}
          required
          maxLength={4}
        />
        {errors.slotCode && (
          <p className="text-sm text-red-500">{errors.slotCode}</p>
        )}
        <p className="text-sm text-gray-500">
          Format: 1 letter (A-Z) followed by exactly 3 digits (000-999)
        </p>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="status">Status (Occupation)</Label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
          className="rounded-md border px-3 py-2 text-sm"
        >
          <option value="">Select status</option>
          <option value="available">Available</option>
          <option value="occupied">Occupied</option>
        </select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="note">Note (Optional)</Label>
        <Textarea
          id="note"
          name="note"
          placeholder="Blocked to repair..."
          value={formData.note}
          onChange={handleChange}
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
            <span>Saving changes...</span>
          </div>
        ) : (
          'Save Changes'
        )}
      </Button>
    </form>
  );
};

export default EditSlotForm;
