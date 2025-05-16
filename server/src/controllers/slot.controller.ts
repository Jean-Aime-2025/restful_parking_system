import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

// Create Slot
const createSlot = async (req: Request, res: Response) => {
  const { code, occupied = false, description } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Slot code is required' });
  }

  try {
    const slot = await prisma.slot.create({
      data: {
        code,
        occupied,
        description,
      },
    });
    return res.status(201).json(slot);
  } catch (error: any) {
    // Check if it's a Prisma known request error
    if (error instanceof PrismaClientKnownRequestError) {
      // Handle unique constraint error
      if (error.code === 'P2002') {
        return res.status(409).json({
          error: 'Conflict',
          message: `A slot with code '${code}' already exists.`,
        });
      }
    }

    // Generic error fallback
    return res.status(500).json({
      error: 'Internal Server Error',
      message: 'Failed to create slot due to an unexpected error.',
      details: error.message,
    });
  }
};

// Update Slot
const updateSlot = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { code, occupied, description } = req.body;

  try {
    const slot = await prisma.slot.update({
      where: { id }, // 🔄 No parseInt
      data: {
        code,
        occupied,
        description,
      },
    });
    return res.json(slot);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: 'Failed to update slot', details: error.message });
  }
};

// Delete Slot
const deleteSlot = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.slot.delete({
      where: { id }, // 🔄 No parseInt
    });
    return res.json({ message: 'Slot deleted successfully' });
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: 'Failed to delete slot', details: error.message });
  }
};

// Get All Slots
const getAllSlots = async (_req: Request, res: Response) => {
  try {
    const slots = await prisma.slot.findMany({ include: { user: true } });
    return res.json(slots);
  } catch (error: any) {
    return res
      .status(500)
      .json({ error: 'Failed to fetch slots', details: error.message });
  }
};

// Deassign Slot from User
const deassignSlot = async (req: Request, res: Response) => {
  const { slotId } = req.body;

  if (!slotId) {
    return res.status(400).json({ error: 'slotId is required' });
  }

  try {
    // Find the slot to get associated userId
    const slot = await prisma.slot.findUnique({
      where: { id: slotId },
      include: { user: true },
    });

    if (!slot) {
      return res.status(404).json({ error: 'Slot not found' });
    }

    // Update the slot: disconnect user, mark as unoccupied
    const updatedSlot = await prisma.slot.update({
      where: { id: slotId },
      data: {
        user: { disconnect: true },
        occupied: false,
      },
    });

    // Optional: clear assignedSlotId on the user side
    if (slot.user) {
      await prisma.user.update({
        where: { id: slot.user.id },
        data: {
          assignedSlotId: null,
        },
      });
    }

    return res.json({
      message: 'Slot deassigned from user successfully',
      slot: updatedSlot,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: 'Failed to deassign slot',
      details: error.message,
    });
  }
};

const slotController = {
  createSlot,
  updateSlot,
  deleteSlot,
  getAllSlots,
  deassignSlot
};

export default slotController;
