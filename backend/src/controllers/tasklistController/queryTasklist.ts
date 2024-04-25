import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const showTaskLists = async (req:any, res:any) => {
    try {
        const boardId = req.params.boardId
        const showtasklist = await prisma.taskList.findMany({
            where: { 
                task: {
                    boardId: boardId
                }
            },
            include : {
                task: true
            },
        }).then((showtasklist) => res.status(200).send(showtasklist))
        console.log(showtasklist)
    } catch (err) {
        return res.status(400).json(err)
    }
}

export const showAllTaskLists = async (req:any, res:any) => {
    try {
        const projectId = req.params.projectId
        const showtasklist = await prisma.taskList.findMany({
            where: { 
                task: {
                    board : {
                        projectId : projectId
                    }
                }
            },
            include : {
                task: {
                    include : {
                        board : true
                    }
                }
            },
        }).then((showtasklist) => res.status(200).send(showtasklist))
        console.log(showtasklist)
    } catch (err) {
        return res.status(400).json(err)
    }
}