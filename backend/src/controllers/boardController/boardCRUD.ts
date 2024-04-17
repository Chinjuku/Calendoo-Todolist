import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const createBoard = async (req:any, res:any) => {
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
        res.status(200).send(board)
        console.log("Create board!")
    } catch (err) {
        return res.status(400).json(err)
    }
}