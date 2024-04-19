import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const createTaskList = async (req:any, res:any) => {
    try {
        const { title, description, piority, taskId } = req.body
        const createtasklist = await prisma.taskList.create({
            data: {
                title: title,
                description: description,
                piority: piority,
                taskId: taskId,
                createdAt: new Date()
            }
        })
        res.status(200).send(createtasklist)
        console.log("Create task!")
    } catch (err) {
        return res.status(400).json(err)
    }
}