import multer from "multer";
import path from "path";

// Define storage location and filename
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/"); // Make sure this folder exists
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Only video files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
