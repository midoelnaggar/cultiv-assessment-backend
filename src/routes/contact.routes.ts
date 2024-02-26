import express from "express";
import checkAuthMiddleware from "../middlewares/checkAuth.middleware";
import { createContactController, updateContactController } from "../controllers/contact.controllers";
import multer from "multer";
import uploadImageMiddleware from "../middlewares/uploadImage.middleware";

const contactRouter = express.Router();

const upload = multer({ dest: 'uploads/' })

contactRouter.route("/create").post(checkAuthMiddleware, uploadImageMiddleware("image"), createContactController);
contactRouter.route("/update/:id").put(checkAuthMiddleware, uploadImageMiddleware("image"), updateContactController);
contactRouter.route("/delete/:id").delete();
contactRouter.route("/get/:id").get();
contactRouter.route("/get-all").get();

export default contactRouter