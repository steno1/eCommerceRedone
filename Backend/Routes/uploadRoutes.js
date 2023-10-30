import express from 'express'; // Import the Express framework
import multer from 'multer'; // Import the Multer middleware for handling file uploads
import path from 'path'; // Import the path module

const router = express.Router(); // Create an Express router for this route

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory to save uploaded files
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for the uploaded file using the current timestamp
    cb(null, `${file.filename}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Check file type
function checkFileType(file, cb) {
  // Define the allowed file types (e.g., jpg, jpeg, png)
  const fileTypes = /jpg|jpeg|png/;
  // Check if the file's extension matches the allowed types
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // Check if the file's MIME type matches the allowed types
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true); // The file is of an allowed type
  } else {
    cb("Images Only!"); // The file is not an allowed type
  }
}

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb); // Apply the file type check function to filter uploads
  },
});

// Handle POST requests to this route
router.post("/", upload.single("image"), (req, res) => {
  res.send({
    message: "Image uploaded",
    image: `/${req.file.path}`, // Respond with the path to the uploaded image
  });
});

export default router; // Export the Express router
