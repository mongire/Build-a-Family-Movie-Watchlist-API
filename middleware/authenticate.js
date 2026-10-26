
import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            error: "No token provided."
        });
    }

    const token = authHeader.split(/\s+/)[1];
    const secret = process.env.JWT_SECRET;

    let decoded;

    try {
        decoded = jwt.verify(token, secret);
    } catch (err) {
        return res.status(401).json({
            error: "Invalid or expired token."
        });
    }

    req.user = decoded;
    next();
}
