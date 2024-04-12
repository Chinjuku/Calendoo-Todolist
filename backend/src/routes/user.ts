import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const createUser = async (req: any, res: any) => {
    try {
        const { username, email, password } = req.body;
        const checkEmail = await prisma.user.findMany({
            where: {
                email: email
            }
        })
        if(checkEmail.length === 0) {
            const crateUser = await prisma.user.create({
                data: {
                    username: username,
                    email: email,
                    password: password,
                }
            }).then((crateUser) => { res.status(200).send(crateUser), console.log(crateUser)});
        }
        else {
            res.status(400).send({
                message: `${email} already exists`
            })
        }
    } catch (error) {
        return res.status(401).send(error)
    }
}

export const loginUser = async (req: any, res: any) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findMany({
            where: {
                email: email,
                password: password,
            }
        })
        user.length === 0 ? res.status(200).send(user, console.log("User not found")) : res.status(200).send(user)
    } catch (error) {
        return res.status(401).send(error)
    }
}
export const allUsers = async (req: any, res: any) => {
    try {
        const user = await prisma.user.findMany().then((user) => res.status(200).send(user))
    } catch (error) {
        return res.status(401).send(error)
    }
}

