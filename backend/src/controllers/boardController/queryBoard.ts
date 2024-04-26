import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const showBoard = async (req:any, res:any) => {
    try {
        const projectId = req.params.projectId
        const board = await prisma.board.findMany({
                where: { projectId: projectId }
        }).then((board) => res.status(200).send(board))
        // console.log("Create board!")
    } catch (err) {
        return res.status(400).json(err)
    }
}

export const showFirstBoard = async (req:any, res:any) => {
    try {
        const projectId = req.params.projectId
        const firstBoard = await prisma.board.findFirst({
            where: { projectId: projectId }
        })
        res.status(200).send(firstBoard)
    } catch (err) {
        return res.status(400).json(err)
    }
}

export const updateStar = async (req:any, res:any) => {
    try {
        const { projectId, boardId, isStarred } = req.body
        const star = await prisma.board.update({
            where: { 
                id: boardId,
                projectId: projectId,
            }, 
            data: {
                isStarred: isStarred
            }
        })
        res.status(200).send(star)
    } catch (err) {
        return res.status(400).json(err)
    }
}