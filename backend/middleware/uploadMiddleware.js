const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(`Uploading file: ${file.originalname}`);  // Log the file name when it's being uploaded
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      console.log(`File is being saved as: ${Date.now()}-${file.originalname}`);  // Log the final file name
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  const fileFilter = (req, file, cb) => {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      console.log(`File MIME type: ${file.mimetype}`);  // Log the MIME type of the file
      if (allowedTypes.includes(file.mimetype)) {
          cb(null, true);
      } else {
          console.log("Invalid file type:", file.mimetype);  // Log invalid file types
          cb(new Error('Only .jpeg, .jpg, .png formats are allowed'), false);
      }
  };
  
  

const upload = multer({ storage, fileFilter });
module.exports = upload;
