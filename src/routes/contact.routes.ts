import express from "express";
import checkAuthMiddleware from "../middlewares/checkAuth.middleware";
import { createContactController, deleteContactController, getAllContactsContoller, getContactController, updateContactController } from "../controllers/contact.controllers";
import uploadImageMiddleware from "../middlewares/uploadImage.middleware";

const contactRouter = express.Router();


contactRouter.use(checkAuthMiddleware); 
contactRouter.route("/create").post( uploadImageMiddleware("image"), createContactController);
contactRouter.route("/update/:id").put( uploadImageMiddleware("image"), updateContactController);
contactRouter.route("/delete/:id").delete(deleteContactController);
contactRouter.route("/get/:id").get(getContactController);
contactRouter.route("/get-all").get(getAllContactsContoller);

export default contactRouter