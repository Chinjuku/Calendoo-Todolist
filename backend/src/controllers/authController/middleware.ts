import { loginVerify, refreshTokenVerify } from "../../utils/jwtHelper";

export const jwtValidate = (req: any, res: any, next: any) => {
    try {
      if (!req.headers["authorization"]) return res.sendStatus(401)
        
      const token = req.headers["authorization"].replace("Bearer ", "")
      // can create validate check!!
      loginVerify(token)
      next()
    } catch (error) {
      return res.sendStatus(403)
    }
  }

export const jwtRefreshTokenValidate = (req: any, res: any, next: any) => {
    try {
      if (!req.headers["authorization"]) return res.sendStatus(401)
      const token = req.headers["authorization"].replace("Bearer ", "")
      refreshTokenVerify(token, req)
      next()
    } catch (error) {
      return res.sendStatus(403)
    }
  }

import { refreshToken, verifyToken } from "../../utils/jwtHelper";

export const authorization = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
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