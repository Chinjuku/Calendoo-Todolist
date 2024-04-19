import { OAuth2Client } from "google-auth-library";
import { PrismaClient } from "@prisma/client";
import { generateToken, jwtGenerate, jwtRefreshTokenGenerate } from "../../utils/jwtHelper"

const prisma = new PrismaClient()
const client = new OAuth2Client();

export const userLogin = async (req: any, res: any) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findFirst({
            where: {
                email: email,
                password: password,
            }
        })
        if (!user) {
            return res.status(401)
        }
        const access_token = jwtGenerate(user)
        const refresh_token = jwtRefreshTokenGenerate(user)
        await prisma.user.update({
            where: {
                id: user.id // Assuming user has an 'id' field
            },
            data: {
                refresh: refresh_token
            }
        });
        res.json({
            access_token,
            refresh_token,
            user
        })

    } catch (error) {
        return res.status(401).send(error)
    }
}

export const loginGoogle = async (req: any, res: any) => {
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
            where: {
                email: email
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
            const access_token = jwtGenerate(createUser)
            const refresh_token = jwtRefreshTokenGenerate(createUser)
            await prisma.user.update({
                where: {
                    id: createUser.id // Assuming user has an 'id' field
                },
                data: {
                    refresh: refresh_token
                }
            });

            res.json({
                access_token,
                refresh_token,
                user
            })
        } else {
            const access_token = jwtGenerate(user)
            const refresh_token = jwtRefreshTokenGenerate(user)

            await prisma.user.update({
                where: {
                    id: user.id // Assuming user has an 'id' field
                },
                data: {
                    refresh: refresh_token
                }
            });

            res.json({
                access_token,
                refresh_token,
                user
            })
        }
    } catch (err) {
        console.error(err);
    }
}

export const loginGoogleOld = async (req: any, res: any) => {
    const { credential, client_id } = req.body;
    try {
    const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: client_id,
    });
    const payload: any | undefined = ticket.getPayload();
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
}

export const loginUserOld = async (req: any, res: any) => {
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
}

