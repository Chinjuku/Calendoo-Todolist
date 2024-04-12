import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const createTask = async (req:any, res:any) => {
    try {
        const { boardname, color, isStarred } = req.body
        const projectId = req.params.projectId
        const board = await prisma.board.create({
            data: {
                boardname : boardname,
                color : color,
                isStarred : isStarred,
                projectId : projectId
            }
        })
        res.status(201).send(board)
        console.log("Create board!")
    } catch (err) {
        return res.status(401).json(err)
    }
}

export const showBoard = async (req:any, res:any) => {
    try {
        const projectId = req.params.projectId
        const board = await prisma.board.findMany({
                where: { projectId: projectId }
        }).then((board) => res.status(201).send(board))
        console.log("Create board!")
    } catch (err) {
        return res.status(401).json(err)
    }
}