import { OAuth2Client } from "google-auth-library";
import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { authorization, jwtRefreshToken } from "./authenticate";
import { generateRefreshToken, generateToken, refreshToken } from "../../utils/jwtHelper"

const router = Router();
const prisma = new PrismaClient()
const client = new OAuth2Client();

const jwt = require("jsonwebtoken");

router.post("/google-login", async (req: any, res: any) => {
    const { credential, client_id } = req.body;
    try {
    const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: client_id,
    });
    const payload: any | undefined = ticket.getPayload()
    console.log(payload)
    const profile = payload['picture'];
    const username = payload['name'];
    const email = payload['email'];
    const user = await prisma.user.findFirst({
            where : {
                email : email
            }
    });
    if (!user) {
        const createUser = await prisma.user.create({
            data: {
                username: username,
                email: email,
                profile: profile
            }
        }).then((createUser) => res.status(200).json(createUser))
        const token = generateToken(user)
        res.send({ token })
    }
    const token = generateToken(user)
    res.send({ token })
    // .cookie("access_token", token, {
    //         httpOnly: true,
    //     }).status(200)
    //    .json({ payload: payload });
        } catch (err) {
            res.status(400).json({ err });
        }
});

router.get("/getuser", authorization , (req:any, res:any) => {
    // console.log(req.user.username)
    const user = req.user;
    res.json({ user: { id: user.id, username: user.username, email: user.email, profile: user.profile } });
})

router.post("/refresh", jwtRefreshToken, (req:any, res:any) => {
    const user = prisma.user.findMany({
        where: {
            id: req.user.id,
            email: req.user.email,
            username: req.user.username
        }
    })
    const access_token = generateToken(user)
    const refresh_token = generateRefreshToken(user)
  
    return res.json({
      access_token,
      refresh_token,
    })
  })
// export const logoutUser = (req:any, res:any) => {
//     return res
//     .clearCookie("access_token")
//     .status(200)
//     .json({ message: "Successfully logged out 😏 🍀" });
// }


export default router;