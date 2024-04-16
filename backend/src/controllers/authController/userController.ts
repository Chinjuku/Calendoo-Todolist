import { PrismaClient } from "@prisma/client"
import { generateRefreshToken, generateToken } from "../../utils/jwtHelper"

const prisma = new PrismaClient()

export const getrefreshToken = (req:any, res:any) => {
    const user = prisma.user.findMany({
        where: {
            id: req.user.id,
            email: req.user.email,
            username: req.user.username
        }
    })
    const access_token = generateToken(user)
    const refresh_token = generateRefreshToken(user)
  
    return res.json({
      access_token,
      refresh_token,
    })
  }

export const getAllUser = (req:any, res:any) => {
    // console.log(req.user.username)
    const user = req.user;
    res.json({ user: { id: user.id, username: user.username, email: user.email, profile: user.profile } });
}

export const getAll = async (req: any, res: any) => {
    try {
        const user = await prisma.user.findMany().then((user) => res.status(200).send(user))
    } catch (error) {
        return res.status(401).send(error)
    }
}

// export const logoutUser = (req:any, res:any) => {
//     return res
//     .clearCookie("access_token")
//     .status(200)
//     .json({ message: "Successfully logged out 😏 🍀" });
// }