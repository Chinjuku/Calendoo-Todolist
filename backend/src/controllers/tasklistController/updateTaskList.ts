import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const updateTaskList = async (req:any, res:any) => {
    try {
        const id = req.params.id
        const { title, description, piority, setdate } = req.body
        const updatetasklist = await prisma.taskList.update({
            where: {
                id: id,
            },
            data: {
                title: title,
                description: description,
                piority: piority,
                setdate: setdate,
            }
        })
        res.status(200).send(updatetasklist)
    } catch (err) {
        return res.status(400).json(err)
    }
}