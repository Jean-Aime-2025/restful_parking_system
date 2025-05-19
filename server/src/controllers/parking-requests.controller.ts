import { Request, Response } from 'express';
import { RequestStatus } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../types';
import {
  sendParkingRequestApprovedEmail,
  sendParkingRequestRejectedEmail,
} from '../utils/mail';

const prisma = new PrismaClient();

// 1. Create Parking Request (User)
const requestParkingHandler: any = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const { vehicleId, startTime, endTime, notes } = req.body;

    // Check if the vehicle has a request already that is not DENIED or DEASSIGNED
    const existingRequest = await prisma.parkingRequest.findFirst({
      where: {
        vehicleId,
        status: {
          in: [RequestStatus.PENDING, RequestStatus.APPROVED],
        },
      },
    });

    if (existingRequest) {
      return res.status(400).json({
        error: 'This vehicle already has an active or pending parking request.',
      });
    }

    // Create a new parking request
    const request = await prisma.parkingRequest.create({
      data: {
        userId,
        vehicleId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        notes,
      },
    });

    res.status(201).json(request);
  } catch (error) {
    console.error('Error creating request:', error);
    res.status(500).json({ error: 'Failed to create request' });
  }
};

// 2. Get All Requests (Admin)
const getAllRequestsHandler = async (_req: Request, res: Response) => {
  try {
    const requests = await prisma.parkingRequest.findMany({
      include: {
        user: true,
        vehicle: true,
      },
    });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving requests' });
  }
};

// 3. Accept Request (Admin)
const acceptRequestHandler = async (req: Request, res: Response) => {
  try {
    const { requestId } = req.params;

    const request = await prisma.parkingRequest.findUnique({
      where: { id: requestId },
    });

    if (!request) return res.status(404).json({ error: 'Request not found' });
    if (request.status !== RequestStatus.PENDING)
      return res
        .status(400)
        .json({ error: 'Only pending requests can be accepted' });

    const availableSlots = await prisma.slot.findMany({
      where: { occupied: false },
    });

    if (!availableSlots.length)
      return res.status(400).json({ error: 'No available slots' });

    const randomSlot =
      availableSlots[Math.floor(Math.random() * availableSlots.length)];

    await prisma.$transaction([
      prisma.slot.update({
        where: { id: randomSlot.id },
        data: { occupied: true },
      }),
      prisma.user.update({
        where: { id: request.userId },
        data: { assignedSlotId: randomSlot.id },
      }),
      prisma.parkingRequest.update({
        where: { id: requestId },
        data: { status: RequestStatus.APPROVED },
      }),
    ]);

    const user = await prisma.user.findUnique({
      where: { id: request.userId },
    });

    if (user) {
      await sendParkingRequestApprovedEmail(
        user.email,
        user.names,
        randomSlot.code || randomSlot.id,
        request.startTime,
        request.endTime
      );
    }
    else {
      console.warn(
        `User with ID ${request.userId} not found when sending approval email.`
      );
    }

    res
      .status(200)
      .json({
        message: 'Request accepted and slot assigned',
        slot: randomSlot,
      });
  } catch (error) {
    console.error('Error accepting request:', error);
    res.status(500).json({ error: 'Failed to accept request' });
  }
};

// 4. Reject Request (Admin)
const rejectRequestHandler = async (req: Request, res: Response) => {
  try {
    const { requestId } = req.params;

    const request = await prisma.parkingRequest.findUnique({
      where: { id: requestId },
    });

    if (!request) return res.status(404).json({ error: 'Request not found' });

    const updated = await prisma.parkingRequest.update({
      where: { id: requestId },
      data: { status: RequestStatus.DENIED },
    });

    const user = await prisma.user.findUnique({
      where: { id: request.userId },
    });

    if (user) {
      await sendParkingRequestRejectedEmail(user.email, user.names);
    } else {
      console.warn(
        `User with ID ${request.userId} not found when sending rejection email.`
      );
    }

    res.status(200).json({ message: 'Request denied', request: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reject request' });
  }
};

// 5. Get User’s Requests (User)
const getUserRequestHandler: any = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user.id;

    const requests = await prisma.parkingRequest.findMany({
      where: { userId },
      include: {
        vehicle: true,
        user: true,
      },
    });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Error getting user requests' });
  }
};

// 6. Get Pending Requests with Assigned Slot
const getPendingRequestsHandler = async (_req: Request, res: Response) => {
  try {
    const requests = await prisma.parkingRequest.findMany({
      where: { status: RequestStatus.PENDING },
      include: {
        user: {
          include: {
            assignedSlot: true,
          },
        },
        vehicle: true,
      },
    });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching pending requests' });
  }
};

const parkingRequestsController = {
  requestParkingHandler,
  getAllRequestsHandler,
  acceptRequestHandler,
  rejectRequestHandler,
  getUserRequestHandler,
  getPendingRequestsHandler,
};

export default parkingRequestsController;
