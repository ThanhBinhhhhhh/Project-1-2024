const express = require('express');
const multer  = require('multer');
const route = express.Router();

const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

const storageMulter = require("../../helpers/storageMulter");
const upload = multer();

cloudinary.config({ 
    cloud_name: 'ddfehhrwa', 
    api_key: '749996523153343', 
    api_secret: '6YjK64TfRCbZcK16nr_e0pZB-QY' // Click 'View API Keys' above to copy your API secret
});

const controller = require("../../controllers/admin/product.controller");
const validates = require("../../validates/admin/product.create.validate");


route.get('/', controller.product)

// Cấp phát động cho status, id
route.patch('/change-status/:status/:id', controller.changeStatus)
route.patch('/change-multi', controller.changeMulti)
route.delete('/delete/:id', controller.deleteItem)
route.get('/create', controller.create)
route.post(
    '/create',
    upload.single('thumbnail'),
    function (req, res, next) {
        let streamUpload = (req) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                  (error, result) => {
                    if (result) {
                      resolve(result);
                    } else {
                      reject(error);
                    }
                  }
                );
    
              streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        };
    
        async function upload(req) {
            let result = await streamUpload(req);
            console.log(result);
            req.body[req.file.fieldname] = result.url;
            next();
        }
    
        upload(req);
    },
    validates.createPost,
    controller.createPost
)
route.get('/edit/:id', controller.edit)

route.patch(
    "/edit/:id",
    upload.single('thumbnail'), 
    validates.createPost,
    controller.editPatch
)

route.get('/detail/:id', controller.detail)

module.exports = route;


