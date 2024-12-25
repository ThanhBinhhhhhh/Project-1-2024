const express = require('express');
const route = express.Router();

const controller = require("../../controllers/admin/recently-delete");


route.get('/', controller.product)

// Cấp phát động cho id
route.patch('/change-multi', controller.changeMulti)
route.delete('/delete/:id', controller.deleteItem)
route.patch('/restore/:id', controller.restoreItem)

module.exports = route;