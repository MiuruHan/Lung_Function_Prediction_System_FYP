const router = require('express').Router()
const multer = require("multer");
const {predict}  = require('../controllers/prediction_controller')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './flaskAPI/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    cb(null, true);
}
const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 1500},
    fileFilter:fileFilter
});


router.post('/predict',upload.array('image',10),predict)

module.exports =  router