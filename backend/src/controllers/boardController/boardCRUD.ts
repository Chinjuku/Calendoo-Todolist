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
        // console.log("Create board!")
    } catch (err) {
        return res.status(400).json(err)
    }
}