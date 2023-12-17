import crypto from "crypto";
import multer from "multer";

export const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "src/uploads/");
  },
  filename: (request, file, callback) => {
    const fileHash = crypto.randomBytes(16).toString("hex");
    const fileName = `${fileHash}-${file.originalname}`;

    return callback(null, fileName);
  },
});
