//declarations of html elements and an empty product container.
// p is shortcut ro product ex. pContainer.

// html buttons.
const showProductBtn = document.getElementById("showProductBtn");
const addProductBtn = document.getElementById("addProductBtn");
const modalBtn = document.getElementById("modalBtn");

//html inputs.
const pName = document.getElementById("productName");
const pCategeory = document.getElementById("productCategeory");
const pPrice = document.getElementById("productPrice");
const searchProductInput = document.getElementById("searchProductInput");


//html sections or div.
const tableBody = document.getElementById("tableBody");
const showProduct = document.getElementById("showProduct");
const crudNoContent = document.getElementById("crudNoContent");
const crudContent = document.getElementById("crudContent");

//empty product container
let pContainer = [];


// ***********************************************************************

hasData(); //called at start of website to check whether there's data in local storage or not.


//event listeners
showProductBtn.addEventListener("click", showAddProduct) //for showing modal of adding or updating an existing product.

addProductBtn.addEventListener("click", addProduct) //for adding a product and closing the addProduct modal.

searchProductInput.addEventListener("keyup",searchProduct) //for search the exsiting products.

//************************************************************************


//functions:


function hasData(){
    if (localStorage.getItem("product") == null) {
        pContainer = [];
    }
    else {
        pContainer = JSON.parse(localStorage.getItem("product"));
        crudNoContent.classList.add("d-none")
        crudContent.classList.remove("d-none")
        displayProduct();
    }
}//for check whether there's data or not.

function addProduct() {
    let product = {
        name: pName.value,
        categeory: pCategeory.value,
        price: pPrice.value
    }
    pContainer.push(product);
    formClear();
    localStorage.setItem("product", JSON.stringify(pContainer));
    displayProduct();
    hideAddProduct();
    crudNoContent.classList.add("d-none")
    crudContent.classList.remove("d-none")
}// for adding a product.

function formClear() {
    pName.value = "";
    pCategeory.value = "";
    pPrice.value = ""
}// for clearing the form input after adding the product or updating one.

function showAddProduct() {
    showProduct.classList.replace("d-none", "d-flex")
}//for showing add product modal.

function hideAddProduct() {
    showProduct.classList.replace("d-flex", "d-none")
}// for hiding add product modal.

function displayProduct() {
    let box = "";
    for (let i = 0; i < pContainer.length; i++) {
        box += `
        <tr>
            <td>${i + 1}</td>
            <td>${pContainer[i].name}</td>
            <td>${pContainer[i].categeory}</td>
            <td>${pContainer[i].price}</td>
            <td>
                <button onclick="modifiyProduct(${i})" class="btn btn-warning mb-1"><i class="far fa-edit text-white"></i></button>
                <button onclick="deleteProduct(${i})" class="btn btn-danger mb-1"><i class="fas fa-trash-alt"></i></button>
            </td>
        </tr>`;
    }

    tableBody.innerHTML = box;
}// for display product data in table.

function deleteProduct(i) {
    pContainer.splice(i, 1);
    localStorage.setItem("product", JSON.stringify(pContainer));
    displayProduct();
    if (pContainer.length === 0) {
        localStorage.removeItem("product")
        displayProduct();
        crudNoContent.classList.remove("d-none");
        crudContent.classList.add("d-none");
    }
}// for deleting specific product.

function modifiyProduct(i){
    showAddProduct();
    pName.value = pContainer[i].name;
    pCategeory.value = pContainer[i].categeory;
    pPrice.value = pContainer[i].price;
    modalBtn.innerHTML = `<button onclick="productIsModified(${i})" id="modifiyProductBtn" class="btn btn-warning btn-block">Update Product</button>`
}// for open modal and change button shape and functionality.

function productIsModified(i){
    pContainer[i].name = pName.value;
    pContainer[i].categeory = pCategeory.value;
    pContainer[i].price = pPrice.value;
    localStorage.setItem("product", JSON.stringify(pContainer));
    displayProduct();
    hideAddProduct()
}// for saving updated product and display new data.

function searchProduct()
{
    searchBox="";
    for(let i=0 ; i<pContainer.length ; i++){
        if(pContainer[i].name.toLowerCase().includes(this.value.toLowerCase())){
            searchBox+=`
            <tr>
                <td>${i + 1}</td>
                <td>${pContainer[i].name}</td>
                <td>${pContainer[i].categeory}</td>
                <td>${pContainer[i].price}</td>
                <td>
                    <button onclick="modifiyProduct(${i})" class="btn btn-warning"><i class="far fa-edit text-white"></i></button>
                    <button onclick="deleteProduct(${i})" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
                </td>
            </tr>`
        }
    }
    tableBody.innerHTML = searchBox;
}// for search an specific product only by it's name.



