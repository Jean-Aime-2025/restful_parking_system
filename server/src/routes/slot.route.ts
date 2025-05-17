import express from 'express';
import slotController from '../controllers/slot.controller';
import { checkAdmin, checkLoggedIn } from '../middlewares/auth.middleware';
import { CreateSlotDto, UpdateSlotDto } from '../dtos/slot.dto';
import { validationMiddleware } from '../middlewares/validator.middleware';

const slotRouter = express.Router();

slotRouter.get('/available', slotController.getAvailableSlots);

slotRouter.use(checkLoggedIn)
slotRouter.use(checkAdmin)
slotRouter.post('/', validationMiddleware(CreateSlotDto),slotController.createSlot);
slotRouter.patch('/:id',validationMiddleware(UpdateSlotDto), slotController.updateSlot);
slotRouter.delete('/:id', slotController.deleteSlot);
slotRouter.post('/deassign', slotController.deassignSlot);
slotRouter.get('/', slotController.getAllSlots);

export default slotRouter;