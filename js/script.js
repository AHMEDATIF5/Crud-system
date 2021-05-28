let productName = document.getElementById('Product-name'),
    productCate = document.getElementById('Product-category'),
    productPrice = document.getElementById('Product-price'),
    productDesc = document.getElementById('Product-desc'),
    searchInp = document.getElementById('product-search'),
    btn = document.getElementById('btn'),
    editProduct;

let productList;

if (localStorage.getItem('productData') == null) {
    
    productList = [];
}else
{
    productList = JSON.parse(localStorage.getItem('productData'));
    displayProduct();
}


btn.addEventListener('click',function addProduct() {
    
    if (btn.innerHTML == "add Product") {
        
        let products = {
            Name : productName.value,
            cate : productCate.value,
            price : productPrice.value,
            desc : productDesc.value
        }
    
        if (productName.value == "" || productCate == "" || productPrice == "") {
            
            alert('please fill out all field !');
            
        }else
        {
            productList.push(products);
    
            localStorage.setItem('productData' , JSON.stringify(productList));
    
        }
    
    }else
    {
        edit();
        location.reload();
    }

    clrForm ();
    
    displayProduct();

} )

// display product function 

function displayProduct() {

    productTable = '';
    
    for (let i = 0; i < productList.length; i++) {

        productTable += `<tr>
                        <td>${i}</td>
                        <td>${productList[i].Name}</td>
                        <td>${productList[i].cate}</td>
                        <td>${productList[i].price}</td>
                        <td>${productList[i].desc}</td>
                        <td><button onclick="update(${i})" class='btn btn-warning'><i class="far fa-edit"></i></button></td>
                        <td><button onclick="deleteProduct(${i})" class= 'btn btn-danger'><i class="fas fa-trash-alt"></i></button></td>
                        </tr>`
        
    }
    
    document.getElementById('tbody').innerHTML = productTable;
}

// search function 

searchInp.addEventListener('keyup',
    function search() {

    productSearch = searchInp.value;

    let trs = '';
        
    for (let i = 0; i < productList.length; i++) {

        if (productList[i].Name.toLowerCase().includes(productSearch.toLowerCase()) == true || productList[i].cate.toLowerCase().includes(productSearch.toLowerCase()) == true || productList[i].price.toLowerCase().includes(productSearch.toLowerCase()) == true ) {
            
            trs += `<tr>
            <td>${i}</td>
            <td>${productList[i].Name}</td>
            <td>${productList[i].cate}</td>
            <td>${productList[i].price}</td>
            <td>${productList[i].desc}</td>
            <td><button class='btn btn-warning'><i class="far fa-edit"></i></button></td>
            <td><button onclick="deleteProduct(${i})"  class= 'btn btn-danger'><i class="fas fa-trash-alt"></i></button></td>
            </tr>`
        }

    }

    document.getElementById('tbody').innerHTML = trs;

    
})

// delete function 

function deleteProduct(index) {
    
    productList.splice(index,1);

    displayProduct();

    localStorage.setItem('productData' , JSON.stringify(productList));


    
}

// update function 

function update(ind) {
    
    productName.value = productList[ind].Name;
    productCate.value = productList[ind].cate;
    productPrice.value = productList[ind].price;
    productDesc.value = productList[ind].desc;

    btn.innerHTML = '<i class="far fa-edit"> update';

    editProduct = ind;
}

function edit() {
    
    let products = {
        Name : productName.value,
        cate : productCate.value,
        price : productPrice.value,
        desc : productDesc.value
    }

    productList[editProduct] = products;

    localStorage.setItem('productData' , JSON.stringify(productList));
}


// clear form function 

function clrForm ()
{
    productName.value = '';
    productCate.value = '';
    productPrice.value = '';
    productDesc.value = '';
}


