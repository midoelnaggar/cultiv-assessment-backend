import { contacts } from "@prisma/client"
import { Request, Response } from "express"
import db from "../config/db";
import { deleteImage } from "../helpers/image.helpers";



export const createContactController = async (req: Request, res: Response) => {
    const contactData: contacts = req.body;
    const user_id = res.locals.user.id;
    const created_at = new Date().toISOString();
    const updated_at = new Date().toISOString();
    const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/${req.file?.destination}${req.file?.filename}` : null;
    try {
        const contactCreated = await db.contacts.create({ data: { ...contactData, user_id, created_at, updated_at, imageUrl } });
        return res.status(201).json({ data: contactCreated });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
}

export const updateContactController = async (req: Request, res: Response) => {
    const id = req.params.id;
    const contactData: contacts = req.body;
    const user_id = res.locals.user.id;
    const updated_at = new Date().toISOString();
    const imageUrl = req.file ? `${req.protocol}://${req.get('host')}/${req.file?.destination}${req.file?.filename}` : null;

    try {
        if (req.file) {
            const data = await db.contacts.findUnique({ where: { id, user_id } })
            if (data?.imageUrl) {
                deleteImage(data?.imageUrl.split("/")[data?.imageUrl.split("/").length - 1])
            }
        }
        const contactUpdated = await db.contacts.update({ where: { id, user_id }, data: { ...contactData, user_id, updated_at, imageUrl } });
        return res.status(200).json({ data: contactUpdated });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });

    }
}

export const deleteContactController = async (req: Request, res: Response) => {
    const id = req.params.id;
    const user_id = res.locals.user.id;

    try {
        const data = await db.contacts.findUnique({ where: { id, user_id } })
        if (data?.imageUrl) {
            deleteImage(data?.imageUrl.split("/")[data?.imageUrl.split("/").length - 1])
        }
        await db.contacts.delete({ where: { id, user_id }, });
        return res.status(204).json({ id, message: "Contact deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });

    }
}


export const getContactController = async (req: Request, res: Response) => {
    const id = req.params.id;
    const user_id = res.locals.user.id;
    try {
        const contact = await db.contacts.findUnique({ where: { id, user_id } });
        return res.status(200).json({ data: contact });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });

    }
}

export const getAllContactsContoller = async (req: Request, res: Response) => {
    const user_id = res.locals.user.id;
    try {
        const contacts = await db.contacts.findMany({ where: { user_id }, orderBy: { updated_at: "desc" } });
        return res.status(200).json({ data: contacts });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });

    }
}