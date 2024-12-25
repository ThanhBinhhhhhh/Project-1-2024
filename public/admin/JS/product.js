// Change Status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]")

if(buttonChangeStatus.length > 0){

    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");
    // console.log(path);

    // console.log(buttonChangeStatus)
    buttonChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const statusCurrent = button.getAttribute("data-status")
            const id = button.getAttribute("data-id")
            // console.log(statusCurrent)
            // console.log(id)

            let statusChange = statusCurrent == "active" ? "inactive" : "active";
            // console.log(statusChange)

            const action = path + `/${statusChange}/${id}?_method=PATCH`;
            // console.log(action);

            formChangeStatus.action = action;

            // Submit Form 
            formChangeStatus.submit();
        })
    })
}
// End Change Status

// Form Change Multi 
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti) {
    // console.log(formChangeMulti);
    formChangeMulti.addEventListener("submit", (e) => {
        e.preventDefault(); // ngan load lai trang
        const checkBoxMulti = document.querySelector("[checkbox-multi]")
        const inputsChecked = checkBoxMulti.querySelectorAll("input[name='id']:checked");

        const typeChange = e.target.elements.type.value;

        if (typeChange == "none") {
            alert("Vui long chon it nhat 1 hoat dong");
        }

        if (typeChange == "delete") {
            const isConfirm = confirm("Are you sure you want to delete all this product?");

            if(!isConfirm) {
                return;
            }
        }


        if (inputsChecked.length > 0 ){

            // get Id , position
            let ids = [];
            const inputIds = formChangeMulti.querySelector("input[name = 'ids']");

            inputsChecked.forEach(input => {
                const id = input.value; // getAttribute("value")

                if (typeChange == "change-position") {
                    const position = input.closest("tr").querySelector("input[name = 'position']").value;
                    // console.log(position);
                    ids.push(`${id}-${position}`);
                }
                else {
                    ids.push(id);
                }
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

// Delete Item 
const buttonDelete = document.querySelectorAll("[button-delete]");
if(buttonDelete.length > 0){
    const formDeleteItem = document.querySelector("#form-delete-item")
    // console.log(formDeleteItem);
    const path = formDeleteItem.getAttribute("data-path")



    buttonDelete.forEach(button => {
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
// End Delete Item 

// CheckBox Multi 
const checkBoxMulti = document.querySelector("[checkbox-multi]")
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



