import { contacts } from "@prisma/client"
import { Request, Response } from "express"
import db from "../config/db";



export const createContactController = async (req: Request, res: Response) => {
    const contactData: contacts = req.body;
    const user_id = res.locals.user.id;
    const created_at = new Date();
    try {
        const contactCreated = await db.contacts.create({ data: { ...contactData, user_id, created_at } });
        return res.status(201).json(contactCreated);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });

    }
}

export const updateContactController = async (req: Request, res: Response) => {
    const id = req.params.id;
    const contactData: contacts = req.body;
    const user_id = res.locals.user.id;
    const updated_at = new Date();
    console.log(req.file)
    const imageUrl = `${req.file?.destination}${req.file?.filename}`

    try {
        const contactCreated = await db.contacts.update({ where: { id, user_id }, data: { ...contactData, user_id, updated_at, imageUrl } });
        return res.status(201).json(contactCreated);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });

    }
}


