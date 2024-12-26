const express = require('express');
const multer  = require('multer');
const route = express.Router();
const storageMulter = require("../../helpers/storageMulter");
const upload = multer();


const controller = require("../../controllers/admin/product.controller");
const validates = require("../../validates/admin/product.create.validate");
const uploadCloud = require("../../middlewares/admin/UploadCloud.middleware");
const { off } = require('../../models/product.model');


route.get('/', controller.product)

// Cấp phát động cho status, id
route.patch('/change-status/:status/:id', controller.changeStatus)
route.patch('/change-multi', controller.changeMulti)
route.delete('/delete/:id', controller.deleteItem)
route.get('/create', controller.create)

route.post(
    '/create',
    upload.single('thumbnail'),
    uploadCloud.upload,
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


