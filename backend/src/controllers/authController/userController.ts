import { PrismaClient } from "@prisma/client"
import { jwtGenerate, jwtRefreshTokenGenerate } from "../../utils/jwtHelper";

const prisma = new PrismaClient()

export const refreshPage = async (req: any, res: any) => {
    const user = await prisma.user.findFirst({
        where: {
            id: req.user.id,
            email: req.user.email,
        }
    })

    const userIndex = await prisma.user.findFirst({
        where: {
            refresh: req.user.token
        }
    });

    if (!user || !userIndex) return res.sendStatus(401)

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

    return res.json({
        access_token,
        refresh_token,
        user
    })
}

export const getAll = async (req: any, res: any) => {
    try {
        const user = await prisma.user.findMany().then((user) => res.status(200).send(user))
    } catch (error) {
        return res.status(401).send(error)
    }
}
