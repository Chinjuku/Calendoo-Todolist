import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createContact = async (req:any, res:any) => {
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
    
}