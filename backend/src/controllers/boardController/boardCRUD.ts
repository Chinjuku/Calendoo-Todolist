import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const createBoard = async (req:any, res:any) => {
    try {
        const { boardname, color, isStarred, projectId } = req.body
        console.log(req.body)
        const existed = await prisma.board.findUnique({
            where : {
                boardname : boardname
            }
        });
        if (existed) {
            return res.status(401).json({
                message : "Board already existed!"
            })
        }
        const board = await prisma.board.create({
            data: {
                boardname : boardname,
                color : color,
                isStarred : isStarred,
                projectId : projectId
            }
        })
        res.status(200).send(board)
    } catch (err) {
        return res.status(400).json(err)
    }
}

export const deleteBoard = async (req: any, res: any) => {
    try {
        const boardId = req.params.boardId
        const deleteboard = await prisma.board.delete({
            where: {
                id: boardId,
            }
        })
        res.status(200).send(deleteboard)
    } catch (err) {
        res.status(400).json(err)
    }
}