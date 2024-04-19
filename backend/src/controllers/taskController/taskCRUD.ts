import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const createTask = async (req:any, res:any) => {
    try {
        const { boardId, taskname } = req.body
        const createtask = await prisma.task.create({
            data: {
                taskname : taskname,
                boardId : boardId
            }
        })
        res.status(200).send(createtask)
        console.log("Create task!")
    } catch (err) {
        return res.status(400).json(err)
    }
}