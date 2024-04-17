import Router from "express"
import { userRegister } from "../../controllers/authController/registerController";
import { getAll } from "../../controllers/authController/userController";
import { PrismaClient } from "@prisma/client";
import { userLogin } from "../../controllers/authController/loginController";

const router = Router();
const prisma = new PrismaClient()

router.post("/create", userRegister)

router.post("/login", userLogin)

router.get("/getall", getAll)

export default router;