//cart section
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let CloseCart = document.querySelector('#close-cart');

//for opening cart
cartIcon.onclick = () => {
    cart.classList.add("active");
};

//closing cart
CloseCart.onclick = () => {
    cart.classList.remove("active");
};

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

//cart functionality
function ready() {
    //items removing
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons);
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    //quantity changes
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    //add to cart
    var addcart = document.getElementsByClassName('add-car');
    for (var i = 0; i < addcart.length; i++) {
        var button = addcart[i];
        button.addEventListener("click", addcartclicked);
    }
    //button work
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked)
}
//buy button fuction
function buyButtonClicked(){
    alert('Your Order is Placed')
    var carContent = document.getElementsByClassName('cart-content')[0]
    while(carContent.hasChildNodes()){
        carContent.removeChild(carContent.firstChild);
    }
    updatetotal();
}

//items removing
function removeCartItem() {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}

//quantity changes
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
}

//add to cart
function addcartclicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
}

var addedItemTitles = [];
function addProductToCart(title, price, productImg) {
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsName = cartItems.getElementsByClassName("cart-product-title");
    if (addedItemTitles.includes(title)) {
        alert("You have already added this item to the cart");
        return;
    }
    
    var cartShopbox = document.createElement("div");
    cartShopbox.classList.add("cart-box");
    var cartBoxcontent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <!--remove cart-->
        <i class='bx bxs-trash-alt cart-remove'></i>
    `;
    cartShopbox.innerHTML = cartBoxcontent;
    cartItems.appendChild(cartShopbox);
    cartShopbox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopbox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
    addedItemTitles.push(title);
    updatetotal();
}

//total updating
function updatetotal() {
    var cartBoxes = document.getElementsByClassName('cart-box');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("₱", ""));
        var quantity = quantityElement.value;
        total += price * quantity;
    }
        total = Math.round(total * 100) / 100;
        document.getElementsByClassName('total-price')[0].innerText = '₱' + total;
}
