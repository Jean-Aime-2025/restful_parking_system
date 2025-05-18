import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../types';
import { CreateVehicleDto, UpdateVehicleDto } from '../dtos/vehicle.dto';

const prisma = new PrismaClient();

const createVehicle:any = async (req: AuthRequest, res: Response) => {
  const { platenumber, model, color }: CreateVehicleDto = req.body;

  try {
    const existing = await prisma.vehicle.findUnique({ where: { platenumber } });
    if (existing) return res.status(400).json({ message: 'Vehicle already exists.' });

    const vehicle = await prisma.vehicle.create({
      data: {
        platenumber,
        model,
        color,
        userId: req.user.id,
      },
    });

    return res.status(201).json(vehicle);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to create vehicle', error });
  }
};

const getMyVehicles:any = async (req: AuthRequest, res: Response) => {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: { userId: req.user.id },
    });

    return res.json(vehicles);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch vehicles', error });
  }
};

const getVehicleById:any = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  try {
    const vehicle = await prisma.vehicle.findUnique({ where: { id } });

    if (!vehicle || vehicle.userId !== req.user.id)
      return res.status(404).json({ message: 'Vehicle not found' });

    return res.json(vehicle);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch vehicle', error });
  }
};

const updateVehicle:any = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { platenumber, model, color }: UpdateVehicleDto = req.body;

  try {
    const vehicle = await prisma.vehicle.findUnique({ where: { id } });

    if (!vehicle || vehicle.userId !== req.user.id)
      return res.status(404).json({ message: 'Vehicle not found' });

    const updated = await prisma.vehicle.update({
      where: { id },
      data: { platenumber, model, color },
    });

    return res.json(updated);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to update vehicle', error });
  }
};

const deleteVehicle:any = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  try {
    const vehicle = await prisma.vehicle.findUnique({ where: { id } });

    if (!vehicle || vehicle.userId !== req.user.id)
      return res.status(404).json({ message: 'Vehicle not found' });

    await prisma.vehicle.delete({ where: { id } });

    return res.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to delete vehicle', error });
  }
};

const vehicleController = {
  createVehicle,
  getMyVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};

export default vehicleController;
