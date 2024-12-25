module.exports = (objectPanigation, query, countProducts) => {
    // Cong thuc : vi tri bat dau lay = (trang hien tai - 1)* so luong phan tu moi trang
    if(query.page) {
        objectPanigation.currentPage = parseInt(query.page);
    }
    objectPanigation.skip = (objectPanigation.currentPage - 1) * objectPanigation.limitItem;
    const totalPage = Math.ceil(countProducts/objectPanigation.limitItem);
    // console.log(totalPage);
    objectPanigation.totalPage = totalPage;

    return objectPanigation;
}