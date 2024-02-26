import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../helpers/token.helpers";
import { users } from "@prisma/client";


const checkAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) return res.status(403).send({ error: 'No token provided' });

    try {
        const decodedUser: any = verifyToken(token);
        res.locals.user = decodedUser as users
        next();
    } catch (err: any) {
        console.log(err);
        res.status(403).json({ error: err.message || "Invalid  Token" })
    }
}

export default checkAuthMiddleware;