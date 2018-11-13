class product {
  constructor(name, category, image, price, PID, featured) {
    this.name = name;
    this.category = category;
    this.image = image;
    this.price = price;
    this.PID = PID;
    this.featured = featured;
  }
}

class cartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
    this.total = (this.product.price * this.quantity);
  }
}

let products = []
let cartItems = [];
let categories = ["oddities", "commodities", "curiosities"];

products[products.length] = new product("Armadillo Basket", "oddities", "./images/armadillo-basket.jpg", 200, "odd-1", true);
products[products.length] = new product("Basilisk", "oddities", "./images/basilisk.png", 300, "odd-2");
products[products.length] = new product("Bread Gloves", "curiosities", "./images/bread-gloves.jpg", 19.99, "cur-1");
products[products.length] = new product("Chimera", "oddities", "./images/chimera.png", 500, "odd-3");
products[products.length] = new product("Folgers Coffee", "commodities", "./images/coffee.png", 8.99, "com-2");
products[products.length] = new product("All-Purpose Flour", "commodities", "./images/flour.jpg", 7.49, "com-3");
products[products.length] = new product("iGrow", "curiosities", "./images/igrow.jpg", 79.99, "cur-2");
products[products.length] = new product("Taxidermy Jackalope", "oddities", "./images/jackalope.jpg", 180, "odd-4", true);
products[products.length] = new product("Milk", "commodities", "./images/milk.png", 3.49, "com-4", true);
products[products.length] = new product("Monkey Paw", "oddities", "./images/monkey-paw.jpg", 100, "odd-5");
products[products.length] = new product("Nose Up", "curiosities", "./images/nose-up.jpeg", 14.95, "cur-3");
products[products.length] = new product("Pet Sweep", "curiosities", "./images/pet-sweep.jpg", 19.99, "cur-4", true);
products[products.length] = new product("Rice", "commodities", "./images/rice.png", 2.99, "com-5");
products[products.length] = new product("Soup Splash Protector", "curiosities", "./images/splash-protector.jpg", 9.99, "cur-5", true);
products[products.length] = new product("Sugar", "commodities", "./images/sugar.jpg", 16, "com-6");
products[products.length] = new product("Tide", "commodities", "./images/tide.jpg", 5.95, "com-1", true);
products[products.length] = new product("Toe Tunes", "curiosities", "./images/toe-tunes.jpg", 25, "cur-6");
products[products.length] = new product("Two-headed Calf", "oddities", "./images/two-headed-calf.png", 1000, "odd-6");


if (localStorage.getItem("cartItems")) {
  cartItems = JSON.parse(localStorage.getItem("cartItems"))
  addCartItems();
}
if (cartItems.length == 0) {
  $("#cart-quantity").css('display', 'none');
  $("#cart-items").text("There are no currently no items in your shopping cart.");
}

//adds divs with products
categories.forEach(category => {
  $(`#${category}`).click(function () {
    $('#store').empty();
    products.forEach(product => {
      if (product.category == category) {
        $('#store').append(`<div class="product" id="${product.PID}"><img src="${product.image}" class="product-pic"><p>${product.name} $${product.price}</p><div class="add-item"><input type="number" value="1" class="quantity"><input class="submit" type="submit" value="Add to cart"></div></div>`);
      }
      $(`#${product.PID} .submit`).click(function () {
        if (cartItems[0] == undefined) {
          cartItems[0] = new cartItem(product, parseInt($(`#${product.PID} .quantity`).val()));
          addCartItems();
        } else {
          if (checkCartForProduct(product.PID) == undefined) {
            cartItems[cartItems.length] = new cartItem(product, parseInt($(`#${product.PID} .quantity`).val()));
            addCartItems();
          } else {
            checkCartForProduct(product.PID).quantity += parseInt($(`#${product.PID} .quantity`).val());
            addCartItems();
          }
        }
      });
    });
  });
});

//hide-show shopping cart
$("#cart-icon").click(function () {
  $("#cart").slideToggle("slow");
});

//hide-show hamburger menu
$("#hamburger").click(function () {
  $("#hamburger-dropdown").slideToggle("slow");
});

//add cart array items to shopping cart
function addCartItems() {
  $("#cart-items").empty();
  cartItems.forEach(function (i) {
    $("#cart-items").append(`<div class="cart-row"><p>${i.product.name}</p><p>${i.quantity}</p><p>$${i.total}</p></div>`)
  });
  $("#cart-quantity").text(`${cartItems.length}`)
  $("#cart-quantity").css('display', 'flex');
  localStorage.setItem("cartItems", JSON.stringify(cartItems))
}

//clear cart button
$("#clear-cart").click(function () {
  $("#cart-items").empty();
  $("#cart-items").text("There are no currently no items in your shopping cart.")
  cartItems = [];
  $("#cart").slideToggle("slow");
  $("#cart-quantity").css("display", "none");
  localStorage.setItem("cartItems", JSON.stringify(cartItems))
});

//check cart to see if item with matching PID exists. Returns item if true else returns undefined 
function checkCartForProduct(PID) {
  for (let i = 0; i < cartItems.length; i++) {
    if (PID == cartItems[i].product.PID) {
      return cartItems[i];
    }
    else { continue }
  }
}

//adds featured items to landing page
$(document).ready(function addFeatured() {
  $('#store').empty();
  products.forEach(product => {
    if (product.featured) {
      $('#store').append(`<div class="product" id="${product.PID}"><img src="${product.image}" class="product-pic"><p>${product.name} $${product.price}</p><div class="add-item"><input type="number" value="1" class="quantity"><input class="submit" type="submit" value="Add to cart"></div></div>`);
    }
    $(`#${product.PID} .submit`).click(function () {
      if (cartItems[0] == undefined) {
        cartItems[0] = new cartItem(product, parseInt($(`#${product.PID} .quantity`).val()));
        addCartItems();
      } else {
        if (checkCartForProduct(product.PID) == undefined) {
          cartItems[cartItems.length] = new cartItem(product, parseInt($(`#${product.PID} .quantity`).val()));
          addCartItems();
        } else {
          checkCartForProduct(product.PID).quantity += parseInt($(`#${product.PID} .quantity`).val());
          addCartItems();
        }
      }
    });
  });
});