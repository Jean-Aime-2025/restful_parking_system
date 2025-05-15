import express from 'express';
import { checkAdmin, checkLoggedIn } from '../middlewares/auth.middleware';
import slotRequestsController from '../controllers/slot-requests.controller';

const slotRequestsRouter = express.Router()

slotRequestsRouter.use(checkLoggedIn)
slotRequestsRouter.post("/request/:slotId", slotRequestsController.requestSlotHandler);

slotRequestsRouter.use(checkAdmin)
slotRequestsRouter.get("/requests", slotRequestsController.getAllRequestsHandler);
slotRequestsRouter.patch("/requests/:requestId/accept", slotRequestsController.acceptRequestHandler);
slotRequestsRouter.patch("/requests/:requestId/reject", slotRequestsController.rejectRequestHandler);

export default slotRequestsRouter;