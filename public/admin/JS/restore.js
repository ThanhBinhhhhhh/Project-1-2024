

// CheckBox Multi 
const checkBoxMulti = document.querySelector("[checkbox-multii]")
// console.log(checkBoxMulti);
if(checkBoxMulti){
    const inputCheckAll = checkBoxMulti.querySelector("input[name='checkall']");
    const inputId = checkBoxMulti.querySelectorAll("input[name='id']");
    // console.log(inputCheckAll);
    // console.log(inputId);

    inputCheckAll.addEventListener("click", () => {
        // console.log(inputCheckAll.checked);
        if(inputCheckAll.checked) {
            inputId.forEach(input => {
                input.checked = true;
            })
        } else {
            inputId.forEach(input => {
                input.checked = false;
            })
        }
    })

    inputId.forEach(input => {
        input.addEventListener("click", () => {
            const countChecked = checkBoxMulti.querySelectorAll("input[name='id']:checked").length;
            if(countChecked == inputId.length){
                inputCheckAll.checked = true;
            } else {
                inputCheckAll.checked = false;
            }
        })
    })
}
// End CheckBox Multi 

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


// Form Change Multi 
const formChangeMulti = document.querySelector("[form-restore]");
if(formChangeMulti) {
    // console.log(formChangeMulti);
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault(); // ngan load lai trang
        const checkBoxMulti = document.querySelector("[checkbox-multii]")
        const inputsChecked = checkBoxMulti.querySelectorAll("input[name='id']:checked");

        const typeChange = e.target.elements.type.value;

        if (typeChange == "none") {
            alert("Vui long chon it nhat 1 hoat dong");
        }

        if (typeChange == "restore") {
            const isConfirm = confirm("Are you sure you want to restore all this product?");

            if(!isConfirm) {
                return;
            }
        }

        if (typeChange == "delete-per") {
            const isConfirm = confirm("Are you sure you want to delete all this product?");

            if(!isConfirm) {
                return;
            }
        }

        if (inputsChecked.length > 0 ){
            let ids = [];
            const inputIds = formChangeMulti.querySelector("input[name = 'ids']");

            inputsChecked.forEach(input => {
                const id = input.value; // getAttribute("value")
                ids.push(id);
            })

            inputIds.value = ids.join(", "); // convert thanh dang text

            formChangeMulti.submit();
        }
        else {
            alert("Vui long chon it nhat 1 ban ghi");
        }
    })
}
// End Form Change Multi 



// Restore Item 
const buttonDelete = document.querySelectorAll("[button-res]");
if(buttonDelete.length > 0){
    const formDeleteItem = document.querySelector("#form-restore-item")
    // console.log(formDeleteItem);
    const path = formDeleteItem.getAttribute("data-path")



    buttonDelete.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Are you sure you want to restore this product?")
            if(isConfirm) {
                const id = button.getAttribute("data-id");
                const action = `${path}/${id}?_method=PATCH`;
                // console.log(action);
                formDeleteItem.action = action;
                formDeleteItem.submit();
            }
        })
    })
}
// Restore Item 



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

const buttonDeletePre = document.querySelectorAll("[button-delete-pre]");
if(buttonDeletePre.length > 0){
    const formDeleteItem = document.querySelector("#form-delete-itemm")
    // console.log(formDeleteItem);
    const path = formDeleteItem.getAttribute("data-path")

    buttonDeletePre.forEach(button => {
        button.addEventListener("click", () => {
            const isConfirm = confirm("Are you sure you want to delete this product?")
            if(isConfirm) {
                const id = button.getAttribute("data-id");
                const action = `${path}/${id}?_method=DELETE`;
                // console.log(action);
                formDeleteItem.action = action;
                formDeleteItem.submit();
            }
        })
    })
}