import { Request, Response } from 'express';
import { AuthRequest } from '../types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// === Request a parking slot ===
const requestSlotHandler:any = async (req: AuthRequest, res: Response) => {
  try {
    const { slotId } = req.params;
    const userId = req.user.id;

    const slot = await prisma.slot.findUnique({ where: { id: slotId } });
    if (!slot) return res.status(404).json({ message: 'Slot not found' });
    if (slot.occupied) return res.status(400).json({ message: 'Slot already occupied' });

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.assignedSlotId)
      return res.status(400).json({ message: 'You already have a slot assigned' });

    const existingRequest = await prisma.parkingRequest.findFirst({
      where: { userId, status: 'PENDING' },
    });

    if (existingRequest)
      return res.status(400).json({ message: 'You already have a pending request' });

    // Create a new request and assign slot to user (not occupied yet)
    const request = await prisma.parkingRequest.create({
      data: {
        userId,
        status: 'PENDING',
      },
    });

    await prisma.user.update({
      where: { id: userId },
      data: { assignedSlotId: slotId },
    });

    return res.status(201).json({ message: 'Request submitted', request });
  } catch (error: any) {
    return res.status(500).json({ message: 'Error submitting request', error: error.message });
  }
};

// === Admin: View all requests ===
const getAllRequestsHandler:any = async (req: AuthRequest, res: Response) => {
  try {
    const requests = await prisma.parkingRequest.findMany({
      include: {
        user: {
          select: {
            id: true,
            names: true,
            email: true,
            assignedSlot: {
              select: {
                code: true,
                description: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.json({ requests });
  } catch (error: any) {
    return res.status(500).json({ message: 'Error fetching requests', error: error.message });
  }
};

// === Admin: Accept a request and finalize slot ===
const acceptRequestHandler: any = async (req: Request, res: Response) => {
  try {
    const requestId = req.params.requestId;
    const { slotId } = req.body;

    if (!requestId || !slotId) {
      return res.status(400).json({ message: 'Missing requestId or slotId in request body' });
    }

    console.log('Incoming requestId:', requestId);
    console.log('Incoming slotId:', slotId);

    const request = await prisma.parkingRequest.findUnique({ where: { id: requestId } });
    if (!request) return res.status(404).json({ message: 'Request not found' });

    if (request.status !== 'PENDING') {
      return res.status(400).json({ message: 'Request already handled' });
    }

    const slot = await prisma.slot.findUnique({ where: { id: slotId } });
    if (!slot || slot.occupied) {
      return res.status(400).json({ message: 'Invalid or occupied slot' });
    }

    const user = await prisma.user.findUnique({ where: { id: request.userId } });
    if (!user || user.assignedSlotId !== slotId) {
      return res.status(400).json({ message: 'User not assigned to this slot or mismatch' });
    }

    await prisma.parkingRequest.update({
      where: { id: requestId },
      data: { status: 'APPROVED' },
    });

    await prisma.slot.update({
      where: { id: slotId },
      data: { occupied: true },
    });

    return res.status(200).json({ message: 'Request approved and slot finalized' });
  } catch (error: any) {
    console.error('Error in acceptRequestHandler:', error);
    return res.status(500).json({ message: 'Error approving request', error: error.message });
  }
};

// === Admin: Reject a request ===
const rejectRequestHandler:any = async (req: AuthRequest, res: Response) => {
  try {
    const { requestId } = req.params;

    const request = await prisma.parkingRequest.findUnique({ where: { id: requestId } });
    if (!request) return res.status(404).json({ message: 'Request not found' });
    if (request.status !== 'PENDING')
      return res.status(400).json({ message: 'Request already handled' });

    // Step 1: Reject the request
    await prisma.parkingRequest.update({
      where: { id: requestId },
      data: { status: 'DENIED' },
    });

    // Step 2: Remove assignedSlotId from user
    await prisma.user.update({
      where: { id: request.userId },
      data: { assignedSlotId: null },
    });

    return res.json({ message: 'Request rejected and slot unassigned' });
  } catch (error: any) {
    return res.status(500).json({ message: 'Error rejecting request', error: error.message });
  }
};

// === User: Get own request (hide assignedSlotId if still PENDING) ===
const getUserRequestHandler:any = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;

    const request = await prisma.parkingRequest.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    let assignedSlotId = req.user.assignedSlotId;

    // Hide assigned slotId if request is still pending
    if (request?.status === 'PENDING') {
      assignedSlotId = null;
    }

    return res.json({
      request,
      assignedSlotId,
    });
  } catch (error: any) {
    return res.status(500).json({ message: 'Error fetching user request', error: error.message });
  }
};

// === Admin: Get all PENDING requests with assignedSlotId !== null ===
const getPendingRequestsWithSlotHandler:any = async (req: AuthRequest, res: Response) => {
  try {
    const requests = await prisma.parkingRequest.findMany({
      where: {
        status: 'PENDING',
        user: {
          NOT: {
            assignedSlotId: null,
          },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            names: true,
            email: true,
            assignedSlot: {
              select: {
                id:true,
                code: true,
                description: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return res.json({ requests });
  } catch (error: any) {
    return res
      .status(500)
      .json({ message: 'Error fetching pending requests with assigned slots', error: error.message });
  }
};


const slotRequestsController = {
  requestSlotHandler,
  getAllRequestsHandler,
  acceptRequestHandler,
  rejectRequestHandler,
  getUserRequestHandler,
  getPendingRequestsWithSlotHandler
};

export default slotRequestsController;
