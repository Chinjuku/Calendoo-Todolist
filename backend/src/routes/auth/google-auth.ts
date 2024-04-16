import { OAuth2Client } from "google-auth-library";
import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { authorization, jwtRefreshToken } from "../../controllers/authController/authenticate";
import { googleLogin } from "../../controllers/authController/loginController";
import { getAllUser } from "../../controllers/authController/userController";

const router = Router();
const prisma = new PrismaClient()
const client = new OAuth2Client();

router.post("/google-login", googleLogin);
// export const logoutUser = (req:any, res:any) => {
//     return res
//     .clearCookie("access_token")
//     .status(200)
//     .json({ message: "Successfully logged out 😏 🍀" });
// }
router.get("/getuser", authorization , getAllUser)

export default router;