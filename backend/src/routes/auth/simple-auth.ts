import Router from "express"
import { userRegister } from "../../controllers/authController/registerController";
import { userLogin } from "../../controllers/authController/loginController";
import { getAll } from "../../controllers/authController/userController";
import { PrismaClient } from "@prisma/client";
import { generateToken } from "../../utils/jwtHelper";

const router = Router();
const prisma = new PrismaClient()

router.post("/create", userRegister)

router.post("/login", async (req: any, res: any) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findFirst({
            where: {
                email: email,
                password: password,
            }
        })
        const token = generateToken(user)
        !user ? res.status(400).send(user, console.log("User not found")) : res.status(200).send({ token })
    } catch (error) {
        return res.status(401).send(error)
    }
})

router.get("/getall", getAll)

export default router;