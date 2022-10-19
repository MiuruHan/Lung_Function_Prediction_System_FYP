const router = require('express').Router()
const multer = require("multer");
const {predict}  = require('../controllers/prediction_controller')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, "1.dcm");
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/dcm') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 1500},
    fileFilter: fileFilter

});


router.post('/predict',predict)

module.exports =  router