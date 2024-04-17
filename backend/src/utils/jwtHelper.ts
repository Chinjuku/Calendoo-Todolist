const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;  // Store this securely!
const SECRET_REFRESH_KEY = process.env.JWT_REFRESH_SECRET

export const jwtGenerate = (user: any) => {
    const accessToken = jwt.sign(
        { username: user.username, id: user.id, email: user.email, profile: user.profile},
        SECRET_KEY,
        { expiresIn: "10m", algorithm: "HS256" }
    )

    return accessToken
}

export const jwtRefreshTokenGenerate = (user: any) => {
    const refreshToken = jwt.sign(
        { username: user.username, id: user.id, email: user.email, profile: user.profile},
        SECRET_REFRESH_KEY,
        { expiresIn: "1d", algorithm: "HS256" }
    )

    return refreshToken
}

export const loginVerify = (token: any) => {
    return jwt.verify(token, SECRET_KEY, (err: any, decoded: any) => {
        if (err) throw new Error(err)
    })
}

export const refreshTokenVerify = (token: any, req: any) => {
    return jwt.verify(token, SECRET_REFRESH_KEY, (err: any, decoded: any) => {
        if (err) throw new Error()

        req.user = decoded
        req.user.token = token
    })
}