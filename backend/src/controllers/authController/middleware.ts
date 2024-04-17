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