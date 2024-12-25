const Product = require("../../models/product.model")
const filterStatusHelpers = require("../../helpers/filterStatus")
const searchHelpers = require("../../helpers/search")
const paginationHelpers = require("../../helpers/pagination")


// [GET] /admin/products

module.exports.product = async (req, res) => {

    // doan bo loc filterStatus
    const filterStatus = filterStatusHelpers(req.query);
    // loc du lieu theo dieu kien 
    let find = {
        deleted: true
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
    const products = await Product.find(find).limit(objectPanigation.limitItem).skip
    (objectPanigation.skip);

    res.render("admin/pages/recently-delete/index", {
        titlePage: "Recently Delete",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPanigation
    });
}




// change multi
module.exports.changeMulti = async (req, res) => {
    // console.log(req.body)
    
    const type = req.body.type;
    const ids = req.body.ids.split(", "); // convert thanh array
    console.log(ids);
    switch (type) {
        case "active": 
            await Product.updateMany({_id: {$in: ids }}, {status: "active"});
            req.flash("success", "Update Successfully!");
            break;
        case "inactive":
            await Product.updateMany({_id: {$in: ids }}, {status: "inactive"});
            req.flash("success", "Update Successfully!");
            break;
        case "restore":
            await Product.updateMany({_id: {$in: ids }},
                { 
                deleted: false,
                restoreAt: new Date()
            });
            req.flash("success", "Restore Successfully!");
            break;
        case "delete-per":
            await Product.deleteMany({_id: {$in: ids }});
            req.flash("success", "Delete Successfully!");
            break;
        default: 
            break;
    }
    // hàm không bị chuyển trang khi kích change status
    res.redirect("back");
}

// [Restore] /admin/products/delete/:id
module.exports.restoreItem = async (req, res) => {
    const id = req.params.id;
    await Product.updateOne({_id: id }, {deleted: false});
    // hàm không bị chuyển trang
    req.flash("success", "Restore Successfully!");
    res.redirect("back");
}

//[Delete many]
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    
    // Cập nhập xoa vinh vien
    await Product.deleteOne({_id: id })
    req.flash("success", "Delete Successfully!");
    // hàm không bị chuyển trang
    res.redirect("back");
}