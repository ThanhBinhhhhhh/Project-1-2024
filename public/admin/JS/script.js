// button status 
const buttonStatus =document.querySelectorAll("[button-status]") /* tu dinh nghia them [] */
if(buttonStatus.length > 0) {
    let url = new URL(window.location.href);
    // URL ham cua JS dung de them xoa Key


    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status")
            if(status){
                url.searchParams.set("status", status)     /* Sua key */
            }
            else {
                url.searchParams.delete("status")
            }

            window.location.href = url.href;
        })
    })
}


// Form Search 
const formSearch = document.querySelector("#form-search")
if(formSearch) {
    let url = new URL(window.location.href);
    // URL ham cua JS dung de them xoa Key
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault(); // ngăn chặn chuyển trang khi submit 
        const keyword = e.target.elements.keyword.value
        console.log(keyword)
        if(keyword){
            url.searchParams.set("keyword", keyword)     /* Sua key */
        }
        else {
            url.searchParams.delete("keyword")
        }
        window.location.href = url.href;
    })
}

// Pagination
const buttonPage =document.querySelectorAll("[button-pagination]")
if(buttonPage.length > 0) {
    let url = new URL(window.location.href);
    // URL ham cua JS dung de them xoa Key


    buttonPage.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination")
            if(page){
                url.searchParams.set("page", page)     /* Sua key */
            }
            else {
                url.searchParams.delete("page")
            }

            window.location.href = url.href;
        })
    })
}


// show alert 
const showAlert = document.querySelector("[show-alert]")
if(showAlert){
    const time = parseInt(showAlert.getAttribute("data-time"));
    // console.log(time);
    const closeAlert = showAlert.querySelector("[close-alert]");

    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, time)

    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");
    })
}
// end show alert 

// upload image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
    const uploadImageInput = document.querySelector("[upload-image-input]")
    const uploadImagePreview = document.querySelector("[upload-image-preview]");
    const buttonHiddenImage = document.querySelector("[button-hidden-image]");

    uploadImageInput.addEventListener("change", (e) => {
        console.log(e.target.files);
        const file = e.target.files[0];
        if(file) {
            uploadImagePreview.src = URL.createObjectURL(file);
            uploadImagePreview.style.display = "block";
            buttonHiddenImage.style.display = "block"; // Hiển thị nút X
        }
    })
    buttonHiddenImage.addEventListener("click", () => {
        uploadImageInput.value = ""; // Xóa giá trị file input
        uploadImagePreview.src = ""; // Xóa nguồn hình ảnh preview
        buttonHiddenImage.style.display = "none"; // Ẩn nút X
        uploadImagePreview.style.display = "none";
    });
}
// end upload image


// button cancel
document.addEventListener("DOMContentLoaded", () => {
    const cancelCreate = document.querySelector("[button-cancel]");
    if (cancelCreate) {
        cancelCreate.addEventListener("click", (event) => {
            event.preventDefault();
            const isConfirm = confirm("Are you sure you want to cancel?");
            if (isConfirm) {
                history.back();
            }
        });
    } else {
        console.error("Create button not found!");
    }
});




