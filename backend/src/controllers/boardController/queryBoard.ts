import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const showBoard = async (req:any, res:any) => {
    try {
        const projectId = req.params.projectId
        const board = await prisma.board.findMany({
                where: { projectId: projectId }
        }).then((board) => res.status(200).send(board))
        console.log("Create board!")
    } catch (err) {
        return res.status(400).json(err)
    }
}