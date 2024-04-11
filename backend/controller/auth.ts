import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
const client = new OAuth2Client();

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateUser = async (req: Request, res: Response) => {
    const { credential, client_id } = req.body;
    try {
    const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: client_id,
    });
    const payload: any | undefined = ticket.getPayload();
    // const userid = payload['sub'];
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
            }
        }).then((createUser) => res.status(200).json(createUser))
        const token = jwt.sign({ createUser }, JWT_SECRET);
    }
    const token = jwt.sign({ user }, JWT_SECRET);
    res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({ message: "Logged in successfully 😊 👌" });
    } catch (err) {
        res.status(400).json({ err });
    }
};

export const authorization = (req: any, res: any, next: any) => {
    const token = req.cookies.access_token;
    if (!token) {
      return res.sendStatus(403);
    }
    try {
      const data = jwt.verify(token, JWT_SECRET);
      req.id = data.id;
      req.username = data.username;
      req.email = data.email;
      return next();
    } catch {
      return res.sendStatus(403);
    }
};


export const protectUser = (req:any, res:any) => {
    return res.json({ user: { id: req.id, role: req.username } });
};