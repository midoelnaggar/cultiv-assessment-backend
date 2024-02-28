import { Request, Response } from "express"
import db from "../config/db";
import { comparePassword, hashPassword } from "../helpers/password.helpers";
import { generateToken } from "../helpers/token.helpers";
import { users } from "@prisma/client";
import { validationResult } from "express-validator";


export const registerUserController = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg });
    }
    try {
        const userData: users = req.body;
        const password = await hashPassword(userData?.password);
        const created_at = new Date().toISOString();
        const newUser = await db.users.create({ data: { ...userData, created_at, password }, select: { id: true, name: true, number: true, email: true, created_at: true, contacts: true } });
        if (newUser?.id) {
            const { id, name, email, number, created_at, contacts } = newUser;
            const data = { id, name, email, number, created_at };
            const token = generateToken(data);
            res.status(201).json({ token, data: { ...data, contacts } });
        }
    } catch (error: any) {
        res.status(500).json({ message: `${error?.meta?.target?.[0]} error` });
    }
}

export const loginUserController = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg });
    }
    try {
        const { email, password } = req.body;
        const user = await db.users.findUnique({ where: { email }, select: { password: true, id: true, name: true, number: true, email: true, created_at: true, contacts: true } });
        if (user?.id) {
            if (await (comparePassword(password, user.password))) {
                const { id, name, email, number, created_at, contacts } = user;
                const data = { id, name, email, number, created_at };
                const token = generateToken(data);
                res.status(200).json({ token, data: { ...data, contacts } });
            } else {
                res.status(401).json({ message: 'Invalid Credentials' })
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }

}

export const getMeUserController = async (req: Request, res: Response) => {
    const decodedUser = res.locals.user;
    if (decodedUser) {
        try {
            const user = await db.users.findUnique({ where: { id: decodedUser.id, }, select: { id: true, name: true, email: true, created_at: true, last_login: true, number: true, contacts: true } });
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "User Not Found" })
            };
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error });

        }
    }
}