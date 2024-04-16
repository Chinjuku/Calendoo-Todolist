import { refreshToken, verifyToken } from "../../utils/jwtHelper";

export const authorization = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    // console.log(token)
    if (!token) return res.sendStatus(401);
    try {
        const result = verifyToken(token)
        if (!result) {
            return res.status(403).json({ error: result.error });
        }
        req.user = result.user;
        next();
    } catch (err) {
        return res.sendStatus(403);
    }
};

export const jwtRefreshToken = (req: any, res: any, next: any) => {
    try {
        if (!req.headers["authorization"]) return res.sendStatus(401)
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const result = refreshToken(token)
        if (!result) {
            return res.status(403).json({ error: result.error });
        }
        req.user = result.user;
        req.user.token = token;
        next()
      } catch (error) {
        return res.sendStatus(403)
      }
}