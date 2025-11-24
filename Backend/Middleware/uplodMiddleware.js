// config/multer.js
import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure upload directories exist
const blogDir = "uploads/blogs";
const avatarDir = "uploads/avatars";
const productDir = "uploads/products";

[blogDir, avatarDir, productDir].forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// File filter: only allow images
const imageFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Storage config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     switch (file.fieldname) {
//       case "imageUrl":
//         cb(null, blogDir);
//         break;
//       case "senderPhoto":
//         cb(null, avatarDir);
//         break; // === CHANGE STARTS HERE ===
//       case "productImage": // Keep for potential single-image routes or legacy code
//       case "productImages": // <-- NEW: Handles the multiple files field name
//         cb(null, productDir);
//         break; // === CHANGE ENDS HERE ===
//       default:
//         cb(new Error("Invalid field name"));
//     }
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(
//       null,
//       `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
//     );
//   },
// });

// config/multer.js (updated destination)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    switch (file.fieldname) {
      case "imageUrl":
        cb(null, blogDir);
        break;
      case "senderPhoto":
        cb(null, avatarDir);
        break;
      case "productImage":       // single-file legacy
      case "productImages":      // multi-file
      case "images":             // accept a common alternative name
      case "files":              // optional fallback name
        cb(null, productDir);
        break;
      default:
        // FALLBACK: don't abort — save to productDir but log it for visibility
        console.warn("Multer: unexpected fieldname:", file.fieldname);
        cb(null, productDir);
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: imageFilter,
});

export default upload;
