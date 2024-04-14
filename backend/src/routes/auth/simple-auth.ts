import { PrismaClient } from "@prisma/client"
import Router from "express"
import { generateToken } from "../../utils/jwtHelper";

const prisma = new PrismaClient()
const router = Router();

router.post("/create", async (req: any, res: any) => {
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
})

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
router.get("/getall", async (req: any, res: any) => {
    try {
        const user = await prisma.user.findMany().then((user) => res.status(200).send(user))
    } catch (error) {
        return res.status(401).send(error)
    }
})

export default router;