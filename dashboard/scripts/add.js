if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}
function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    console.log(removeCartItemButtons)
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)

    }
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)

    }
    var addToCartbuttons = document.getElementsByClassName('shp-btn')
    for (var i = 0; i < addToCartbuttons.length; i++) {
        var button = addToCartbuttons[i]
        button.addEventListener('click', addToCartClicked)
    }
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
}
function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-title')[0].innerText
    var price = shopItem.getElementsByClassName('price')[0].innerText
    var imagesrc = shopItem.getElementsByClassName('shop-image')[0].src
    console.log(title, price, imagesrc)
    // addItemToCart(title, price, imagesrc)
}
function addItemToCart(title, price, imagesrc) {
    var cartrow = document.createElement('div')
    cartrow.classList.add('cart-row')
    cartrow.innerText = title
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartRowContents =
        `<div class="cart-item cart-column">
    <img class="cart-item-image"src="${imagesrc}" height="100" weidth="100">
    <span class="cart-item-title">${title}</span>
    </div>
    
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1">
    <button class="btn btn-danger" type="button">Remove</button>
    </div>`
    cartrow.innerHTML = cartRowContents
    cartItems.append(cartrow)
    cartrow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)

}
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
}

$(document).ready(function () {
    getItemList();
    getAllCardItems();
});

function getItemList() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8083/sellnbye/api/card/getItemList",
        success: function (data) {
            if (data != undefined && data.length > 0) {
                $('.shop-items').empty();
                for (var i = 0; i < data.length; i++) {
                    var dt = data[i];
                    $('.shop-items').append('<div class="shop-item"><span class="shop-title">' + dt.category_name + '</span>' +
                        '<image class="shop-image" src="' + dt.image_path + '" height="160px" width="160px">' +
                        '<div class="shop-detail"><span class="price">Rs' + dt.price + '</span>' +
                        '<button class="btn btn-primary shp-btn" type="button" onclick="addItemToCard(' + dt.id + ')">ADD TO CART</button>' +
                        '</div></div>');
                }
            }
        }
    });
}


function addItemToCard(id) {
    //dt = JSON.parse($(elm).data('item'));
    var userId = 1;
    $.ajax({
        type: "POST",
        url: "http://localhost:8083/sellnbye/api/card/add/" + id + "/" + userId + "/" + 1,
        contentType: "application/json",
        success: function (data) {
            getAllCardItems();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown)
        }
    });
}

function removeItemFromCard(id) {
    var userId = 1;
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8083/sellnbye/api/card/removeItemFromCard/" + id + "/" + userId,
        contentType: "application/json",
        success: function (data) {
            getAllCardItems();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function getAllCardItems() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8083/sellnbye/api/card/getAllCardItems/1",
        success: function (data) {
            $('.cart-items').empty();
            if (data != undefined && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var dt = data[i];
                    $('.cart-items').append(
                        '<div class="cart-row"><div class="cart-item cart-column">' +
                        '<img class="cart-item-image" src="' + dt.image_path + '" height="100" weidth="100">' +
                        '<span class="cart-item-title">' + dt.category_name + '</span></div>' +
                        '<span class="cart-price cart-column">Rs' + dt.price + '</span>' +
                        '<div class="cart-quantity cart-column">' +
                        '<input class="cart-quantity-input" type="number" value="' + dt.quantity + '">' +
                        '<button class="btn btn-danger" type="button" onclick="removeItemFromCard(' + dt.id + ')">Remove</button></div></div>');
                }
            }
        }
    });
}
