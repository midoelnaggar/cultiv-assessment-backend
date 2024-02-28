import fs from "fs";

export const deleteImage = (imageName: string) => {
    fs.unlink(`/uploads${imageName}`, err => {
        if (err) {
            console.error('Error deleting file:', err);
        } else {
            console.log('File deleted successfully');
        }
    })
}
