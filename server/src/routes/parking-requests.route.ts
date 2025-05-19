import express from 'express';
import { validationMiddleware } from '../middlewares/validator.middleware';
import { checkAdmin, checkLoggedIn } from '../middlewares/auth.middleware';
import parkingRequestsController from '../controllers/parking-requests.controller';
import { CreateParkingRequestDto } from '../dtos/parkingRequest.dto';

const parkingRequestsRouter = express.Router();

parkingRequestsRouter.use(checkLoggedIn)
parkingRequestsRouter.post(
  '/',
  validationMiddleware(CreateParkingRequestDto),
  parkingRequestsController.requestParkingHandler
);
parkingRequestsRouter.get('/my', parkingRequestsController.getUserRequestHandler);
parkingRequestsRouter.patch('/edit/:requestId', parkingRequestsController.editRequestHandler);
parkingRequestsRouter.delete('/cancel/:requestId', parkingRequestsController.cancelRequestHandler);

parkingRequestsRouter.use(checkAdmin)
parkingRequestsRouter.get('/all', parkingRequestsController.getAllRequestsHandler);
parkingRequestsRouter.patch('/accept/:requestId', parkingRequestsController.acceptRequestHandler);
parkingRequestsRouter.patch('/reject/:requestId', parkingRequestsController.rejectRequestHandler);
parkingRequestsRouter.get(
  '/pending-requests',
  parkingRequestsController.getPendingRequestsHandler
);

export default parkingRequestsRouter;
