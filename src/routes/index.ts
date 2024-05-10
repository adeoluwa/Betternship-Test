import { Router } from "express";
import UserRouter from "./user.routes";

const router = Router();

router.use("/user", UserRouter.router);

export default router;
