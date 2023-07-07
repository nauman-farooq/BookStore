// Initialize an empty array to store the added items
var addedItems = [];

// Function to update the cart item count
function updateCartItemCount() {
  var cartItemCount = document.querySelector('.cart__prices-item');
  if (cartItemCount) {
    var cartItems = document.querySelectorAll('.cart__card');
    var totalCount = 0;

    cartItems.forEach(function (item) {
      var quantity = parseInt(item.querySelector('.cart__amount-number').textContent);
      totalCount += quantity;
    });

    var itemText = totalCount === 0 || totalCount === 1 ? ' item' : ' items'; // Use singular or plural based on totalCount
    cartItemCount.textContent = totalCount + itemText;
  }
}

// Add to cart
var addCart = document.getElementsByClassName("featured__button");
for (var i = 0; i < addCart.length; i++) {
  var button = addCart[i];
  attachAddToCartListener(button);
}

function attachAddToCartListener(button) {
  button.addEventListener('click', function(event) {
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("featured__title")[0].innerText;
    var price = shopProducts.getElementsByClassName("featured__price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("featured__img")[0].src;

    // Check if the item has already been added to the cart
    if (isItemAlreadyAdded(title)) {
      alert('You have already added this item to cart.');
      return;
    }

    // Add the item to the cart
    addProductToCart(title, price, productImg);
    updateTotalPrice();
    updateCartItemCount();

    // Add the item to the addedItems array
    addedItems.push(title);
  });
}

function isItemAlreadyAdded(title) {
  // Check if the title exists in the addedItems array
  return addedItems.includes(title);
}
function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart__card");
  var cartBoxContent = `
    <div class="cart__box">
      <img src="${productImg}" alt="" class="cart__img">
    </div>
    <div class="cart__details">
      <h3 class="cart__title">${title}</h3>
      <span class="cart__price">${price}</span>
      <div class="cart__amount">
        <div class="cart__amount-content">
          <span class="cart__amount-box">
            <i class='bx bx-minus'></i>
          </span>
          <span class="cart__amount-number">1</span>
          <span class="cart__amount-box">
            <i class='bx bx-plus'></i>
          </span>
        </div>
        <i class='bx bx-trash-alt cart__amount-trash'></i>
      </div>
    </div>
  `;
  cartShopBox.innerHTML = cartBoxContent;
  var cartItems = document.getElementsByClassName("cart__container")[0];
  cartItems.appendChild(cartShopBox);

  var trashButton = cartShopBox.querySelector(".cart__amount-trash");
  trashButton.addEventListener("click", deleteCartItem);

  var minusButton = cartShopBox.querySelector(".bx-minus");
  minusButton.addEventListener("click", decrementQuantity);

  var plusButton = cartShopBox.querySelector(".bx-plus");
  plusButton.addEventListener("click", incrementQuantity);
}

function deleteCartItem(event) {
  var trashButton = event.target;
  var cartCard = trashButton.closest('.cart__card');
  cartCard.remove();
  updateTotalPrice();
  
  // Remove the item from the addedItems array
  var titleElement = cartCard.querySelector('.cart__title');
  var title = titleElement.textContent;
  var index = addedItems.indexOf(title);
  if (index !== -1) {
    addedItems.splice(index, 1);
  }
  updateCartItemCount(); // Update the cart item count after deleting 
}

function decrementQuantity(event) {
  var minusButton = event.target;
  var quantityElement = minusButton.parentNode.parentNode.querySelector('.cart__amount-number');
  var quantity = parseInt(quantityElement.textContent);
  if (quantity > 1) {
    quantity -= 1;
   quantityElement.textContent = quantity;
    updateTotalPrice();
  }
}

function incrementQuantity(event) {
  var plusButton = event.target;
  var quantityElement = plusButton.parentNode.parentNode.querySelector('.cart__amount-number');
  var quantity = parseInt(quantityElement.textContent);
  quantity += 1;
  quantityElement.textContent = quantity;
  updateTotalPrice();
}

function updateTotalPrice() {
  var cartItems = document.querySelectorAll('.cart__card');
  var totalPrice = 0;

  cartItems.forEach(function(item) {
    var quantity = parseInt(item.querySelector('.cart__amount-number').textContent);
    var priceElement = item.querySelector('.cart__price');
    var price = parseFloat(priceElement.textContent.replace('$', ''));

    if (!isNaN(price)) {
      totalPrice += quantity * price;
    }
  });

  var totalPriceElement = document.querySelector('.cart__prices-total');
  totalPriceElement.textContent = '$' + totalPrice.toFixed(2);
}

// Initial update of the total price
updateTotalPrice();


// Event listener to open the cart when a product is added
document.addEventListener('DOMContentLoaded', function() {
  var cartContainer = document.querySelector('.cart__container');
  var cartItems = document.querySelector('.cart__items');
  var addCartButtons = document.getElementsByClassName("featured__button");
  
  for (var i = 0; i < addCartButtons.length; i++) {
    var button = addCartButtons[i];
    button.addEventListener('click', function() {
      cartContainer.classList.add('active');
      cartItems.classList.add('active');
    });
  }
});

// Initial update of the total price
updateTotalPrice();
