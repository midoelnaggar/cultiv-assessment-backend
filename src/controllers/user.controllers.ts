import { Request, Response } from "express"
import db from "../config/db";
import { comparePassword, hashPassword } from "../helpers/password.helpers";
import { generateToken } from "../helpers/token.helpers";
import { users } from "@prisma/client";


export const registerUserController = async (req: Request, res: Response) => {
    const userData: users = req.body;
    try {
        const password = await hashPassword(userData?.password);
        const created_at = new Date();
        const newUser = await db.users.create({ data: { ...userData, created_at, password } });
        if (newUser?.id) {
            const { id, name, email, number, created_at } = newUser;
            res.status(201).json({ data: { id, name, email, number, created_at } });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
}

export const loginUserController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await db.users.findUnique({ where: { email }, select: { password: true, id: true, name: true, number: true, created_at: true } });
    if (user?.id) {
        if (await (comparePassword(password, user.password))) {
            const { id, name, number, created_at } = user;
            const data = { id, name, number, created_at };
            const token = generateToken(data);
            res.status(200).json({ token, data });
        } else {
            res.status(401).json({ message: 'Invalid Credentials' })
        }
    } else {
        res.status(404).json({ message: 'User not found' });
    }

}

export const getMeUserController = async (req: Request, res: Response) => {
    const decodedUser = res.locals.user;
    if (decodedUser) {
        const user = await db.users.findUnique({ where: { id: decodedUser.id, }, select: { id: true, name: true, email: true, created_at: true, last_login: true, number: true, contacts: true } });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User Not Found" })
        };


    }
}