import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const userRegister = async (req: any, res: any) => {
    try {
        const { username, email, password } = req.body;
        const checkEmail = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if(!checkEmail) {
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