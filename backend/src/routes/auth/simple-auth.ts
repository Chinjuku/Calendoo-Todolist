import Router from "express"
import { userRegister } from "../../controllers/authController/registerController";
import { getAll } from "../../controllers/authController/userController";
import { PrismaClient } from "@prisma/client";
import { loginUserOld, userLogin } from "../../controllers/authController/loginController";

const router = Router();
const prisma = new PrismaClient()

router.post("/create", userRegister)

router.post("/login", userLogin)

router.get("/getall", getAll)

router.get("/loginold", loginUserOld)

export default router;