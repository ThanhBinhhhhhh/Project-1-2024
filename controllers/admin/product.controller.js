const Product = require("../../models/product.model")
const systemConfig = require("../../config/system");
const filterStatusHelpers = require("../../helpers/filterStatus")
const searchHelpers = require("../../helpers/search")
const paginationHelpers = require("../../helpers/pagination")


// [GET] /admin/products

module.exports.product = async (req, res) => {

    // doan bo loc filterStatus
    const filterStatus = filterStatusHelpers(req.query);
    // loc du lieu theo dieu kien 
    let find = {
        deleted: false
    };
    // Noi key
    if(req.query.status){
        find.status = req.query.status;
    }
    // tim kiem 
    const objectSearch = searchHelpers(req.query);
    if(objectSearch.regex){
        find.title = objectSearch.regex;
    }
    // console.log(req.query.keyword)


    // Pagination 
    // Cong thuc : vi tri bat dau lay = (trang hien tai - 1)* so luong phan tu moi trang
    const countProducts = await Product.countDocuments(find)
    let objectPanigation = paginationHelpers(
        {
            currentPage: 1,
            limitItem: 10
        },
        req.query,
        countProducts
    )
    // End Pagination

    // loc du lieu
    const products = await Product.find(find)
    // sap xep
    .sort({position: "desc"})
    // loc
    .limit(objectPanigation.limitItem)
    .skip(objectPanigation.skip);

    res.render("admin/pages/products/index", {
        titlePage: "Trang San Pham",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPanigation
    });
}


// [PATCH] /admin/products//change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    console.log(req.params);
    const status = req.params.status;
    const id = req.params.id;
    
    // Cập nhập Status
    await Product.updateOne({_id: id }, {status: status})

    // express flash 
    req.flash("success", "Updated Status Successfully!");
    // hàm không bị chuyển trang khi kích change status
    res.redirect("back");
}

// [PATCH] /admin/products//change-multi
module.exports.changeMulti = async (req, res) => {
    // console.log(req.body)
    
    const type = req.body.type;
    // console.log(req.body);
    const ids = req.body.ids.split(", "); // convert thanh array
    // console.log(ids);
    switch (type) {
        case "active": 
            await Product.updateMany({_id: {$in: ids }}, {status: "active"});
            break;
        case "inactive":
            await Product.updateMany({_id: {$in: ids }}, {status: "inactive"});
            break;
        case "delete":
            await Product.updateMany({_id: {$in: ids }}, { status: 'inactive', 
                deleted: true,
                deletedAt: new Date()
            })
            break;
        case "change-position":
            // console.log(ids);
            for (const item of ids) {
                let [id, position] = item.split("-"); // cat chuoi ngan nhau bang dau -
                // ep kieu position
                position = parseInt(position);
                await Product.updateOne({_id: id}, {position: position});
            }
        default: 
            break;
    }
    req.flash("success", "Updated Successfully!");
    // hàm không bị chuyển trang khi kích change status
    res.redirect("back");
}

// [DELETE VINH VIEN] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    
    // Cập nhập xoa vinh vien
    // await Product.deleteOne({_id: id })

    // xoa mem 
    await Product.updateOne({_id: id }, { status: 'inactive', 
        deleted: true,
        deletedAt: new Date()
    });

    req.flash("success", "Delete Successfully!");
    // hàm không bị chuyển trang
    res.redirect("back");
}


// [GET] /admin/products/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/products/create", {
        titlePage: "Trang San Pham",
    });
}

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
    // console.log(req.file)
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)

    if(req.body.position == "") {
        const countProducts = await Product.countDocuments();
        console.log(countProducts);
        req.body.position = countProducts + 1;
    }
    else {
        req.body.position = parseInt(req.body.position);
    }

    const product = new Product(req.body);
    await product.save();

    res.redirect(`${systemConfig.prefixAdmin}/products`);

    // console.log(req.body)
}

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
    // console.log(req.params.id);

    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }
    
        const product = await Product.findOne(find); // tra ve object
        // console.log(product);
    
        res.render("admin/pages/products/edit", {
            titlePage: "Trang Chinh Sua",
            product: product
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
}


// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
    // console.log(req.body.id);
    const id = req.params.id;
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    req.body.position = parseInt(req.body.position);

    if(req.file){
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    try {
        await Product.updateOne(
            {
                _id: id
            }, 
            req.body
        )
        req.flash("success", "Update Successfully!")
    } catch (error) {
        req.flash("error","Update Fail!")
        
    }
    res.redirect(`${systemConfig.prefixAdmin}/products`);

}

// [GET] /deteil/:id 
module.exports.detail = async (req, res) => {
    // console.log(req.params.id);

    try {
        const find = {
            deleted: false,
            _id: req.params.id
        }
    
        const product = await Product.findOne(find); 
    
        res.render("admin/pages/products/detail", {
            titlePage: product.title,
            product: product
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
}

