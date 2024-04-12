import { PrismaClient } from "@prisma/client"
import Router from "express"

const prisma = new PrismaClient()
const router = Router();

router.post("/create", async (req:any, res:any) => {
    try {
        const { username, email, location, message } = req.body
        const contact = await prisma.contact.create({
            data: {
                username: username,
                email: email,
                location: location,
                message: message,
            }
        }).then((contact) => res.status(200).send(contact))
        console.log(contact)
    }
    catch (error) {
        res.status(500).send(error)
    }
    
})

export default router;