import { OAuth2Client } from "google-auth-library";
import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { jwtRefreshTokenValidate, jwtValidate } from "../../controllers/authController/middleware";
import { loginGoogle } from "../../controllers/authController/loginController";
import { refreshPage } from "../../controllers/authController/userController";

const router = Router();
const prisma = new PrismaClient()
const client = new OAuth2Client();

// router.post("/google-login", googleLogin);
// router.get("/getuser", authorization , getAllUser)

router.post("/login", loginGoogle)

// เอา Function นี้ไปไว้ในส่วนที่เราต้องการจะป้องกัน
router.get("/user", jwtValidate, (req: any, res: any) => {
    res.json({ token: { access_token : req.access_token, refresh_token : req.refresh_token }});
})

router.get("/refresh", jwtRefreshTokenValidate, refreshPage)

export default router;