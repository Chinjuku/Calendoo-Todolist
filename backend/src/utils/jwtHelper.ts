const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;  // Store this securely!
const SECRET_REFRESH_KEY = process.env.JWT_REFRESH_SECRET
export const generateToken = (user: any) => {
    return jwt.sign({ user }, SECRET_KEY, {
        expiresIn: '1h', algorithm: "HS256"
    });
};
export const verifyToken = (token: any) => {
    return jwt.verify(token, SECRET_KEY);
};
export const generateRefreshToken = (user: any) => {
    return jwt.sign({ user }, SECRET_REFRESH_KEY, {
        expiresIn: '1d', algorithm: "HS256"
    });
}
export const refreshToken = (token: any) => {
    return jwt.refresh(token, SECRET_REFRESH_KEY);
}