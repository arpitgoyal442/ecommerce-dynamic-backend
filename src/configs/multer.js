const multer=require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Specify the destination folder for uploaded files based on the field name
        
        const destinationFolder = `uploads/`;
        cb(null, destinationFolder);
    },

    filename: function (req, file, cb) {
        // Specify the filename for uploaded files based on the original filename
        cb(null,file.originalname+".jpeg");
    }


});
const upload = multer({ storage: storage });
module.exports = { upload}


