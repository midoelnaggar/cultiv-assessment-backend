import multer from "multer";
import path from "path";

const uploadImageMiddleware = (fieldName: string) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/');
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const fileExt = path.extname(file.originalname);
            cb(null, file.fieldname + '-' + uniqueSuffix + fileExt);
        }
    });
    const upload = multer({ storage: storage });

    return upload.single(fieldName)
}


export default uploadImageMiddleware