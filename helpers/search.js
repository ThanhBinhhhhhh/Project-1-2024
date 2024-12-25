module.exports = (query) => {
    let objectSearch = {
        keyword: "",
    }
    if(query.keyword){
        objectSearch.keyword = query.keyword;
        const regex = new RegExp(objectSearch.keyword, "i");  // regex of javascript (loc dieu kien tim kiem)
        objectSearch.regex = regex;
    }
    return objectSearch;
}