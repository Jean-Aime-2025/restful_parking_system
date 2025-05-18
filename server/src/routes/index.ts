import { Router } from "express";
import authRouter from "./auth.route";
import userRouter from "./user.route";
import slotRouter from "./slot.route";
import adminDashboardRouter from "./admin-dahboard.route";
import userDashboardRouter from "./user-dahboard.route";
import vehicleRouter from "./vehicle.route";
import parkingRequestsRouter from "./parking-requests";

const router = Router()

router.use("/auth", authRouter
    /*
        #swagger.tags = ['Auth']
        #swagger.security = [{
                "bearerAuth": []
        }] 
    */
)
router.use("/user", userRouter
    /*
        #swagger.tags = ['Users']
        #swagger.security = [{
                "bearerAuth": []
        }] 
    */
)
router.use("/slot", slotRouter
    /*
        #swagger.tags = ['Slots']
        #swagger.security = [{
                "bearerAuth": []
        }] 
    */
)
router.use("/requests", parkingRequestsRouter
    /*
        #swagger.tags = ['Parking-Requests']
        #swagger.security = [{
                "bearerAuth": []
        }] 
    */
)
router.use("/admin", adminDashboardRouter
    /*
        #swagger.tags = ['admin-dashboard']
        #swagger.security = [{
                "bearerAuth": []
        }] 
    */
)
router.use("/dashboard", userDashboardRouter
    /*
        #swagger.tags = ['user-dashboard']
        #swagger.security = [{
                "bearerAuth": []
        }] 
    */
)
router.use("/vehicles", vehicleRouter
    /*
        #swagger.tags = ['user-dashboard']
        #swagger.security = [{
                "bearerAuth": []
        }] 
    */
)


export default router