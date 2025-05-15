import { Router } from "express";
import authRouter from "./auth.route";
import userRouter from "./user.route";
import slotRouter from "./slot.route";

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
        #swagger.tags = ['Users']
        #swagger.security = [{
                "bearerAuth": []
        }] 
    */
)
export default router