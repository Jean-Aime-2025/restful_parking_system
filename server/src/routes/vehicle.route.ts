import express from 'express';
import vehicleController from '../controllers/vehicle.controller';
import { checkLoggedIn } from '../middlewares/auth.middleware';
import { validationMiddleware } from '../middlewares/validator.middleware';
import { CreateVehicleDto, UpdateVehicleDto } from '../dtos/vehicle.dto';

const vehicleRouter = express.Router();

vehicleRouter.use(checkLoggedIn); 
vehicleRouter.post('/', validationMiddleware(CreateVehicleDto),vehicleController.createVehicle);
vehicleRouter.get('/', vehicleController.getMyVehicles);
vehicleRouter.get('/:id', vehicleController.getVehicleById);
vehicleRouter.put('/:id', validationMiddleware(UpdateVehicleDto),vehicleController.updateVehicle);
vehicleRouter.delete('/:id', vehicleController.deleteVehicle);

export default vehicleRouter;
