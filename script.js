const cartButton = document.querySelector(".cart-button");
const cartBadge = document.querySelector(".cart-badge");
const modal = document.querySelector(".modal");
const modal2 = document.querySelector(".modal-2");
const modalClose = document.querySelector(".close");
const modalClose2 = document.querySelector(".close-2");
const buyButton = document.querySelector(".buy-btn");
const cartItemsList = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const itemsGrid = document.querySelector(".items-grid");

let items = [
  {
    id: 1,
    name: "Apple",
    price: 0.99,
  },
  {
    id: 2,
    name: "Banana",
    price: 10,
  },
  {
    id: 3,
    name: "Milk",
    price: 3,
  },
  {
    id: 4,
    name: "Bread",
    price: 2,
  },
  {
    id: 5,
    name: "Orange",
    price: 6.98,
  },
  {
    id: 6,
    name: "Juice",
    price: 5.50,
  },
  {
    id: 7,
    name: "Kiwi",
    price: 8,
  },
  {
    id: 8,
    name: "Cerial",
    price: 9.98,
  },
];

let cart = [];

function fillItemsGrid() {
  for (const item of items) {
    let itemElement = document.createElement("div");
    itemElement.classList.add("item");
    itemElement.innerHTML = `
            <img src="https://picsum.photos/200/300?random=${item.id}" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>$${item.price}</p>
            <button class="add-to-cart-btn" data-id="${item.id}">Add to cart</button>
        `;
    itemsGrid.appendChild(itemElement);
  }
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

  addToCartButtons.forEach((button) => {
    let itemId = button.getAttribute("data-id");
    button.addEventListener("click", () => addToCart(itemId));
  });
}

function addToCart(id) {
    let item = items.find((item) => item.id == id);
    cart.push(item);
    cartBadge.innerText = cart.length;
    updateCartItemsList();
    updateCartTotal();
}

function updateCartItemsList() {
    cartItemsList.innerHTML = "";
    for (const item of cart) {
      let cartElement = document.createElement("div");
      cartElement.classList.add("item");
      cartElement.innerHTML = `
              <h2>${item.name}</h2>
              <p>$${item.price}</p>
              <button class="remove-from-cart-btn" data-id="${item.id}">Remove</button>
          `;
      cartItemsList.appendChild(cartElement);
    }

    const removeFromCartButton = document.querySelectorAll(".remove-from-cart-btn");
  
    removeFromCartButton.forEach((button) => {
      let itemId = button.getAttribute("data-id");
      button.addEventListener("click", () => removeFromCart(itemId));
    });
}

function removeFromCart(id) {
    let index = cart.findIndex((item) => item.id == id);
    cart.splice(index, 1);
    cartBadge.innerText = cart.length;
    updateCartItemsList();
    updateCartTotal();
}
function updateCartTotal() {
    let total = 0;
    for (const item of cart) {
      total += item.price;
    }
    cartTotal.innerText = "$" + total.toFixed(2);
}

function toggleModal() {
    modal.classList.toggle("show-modal");
}

function toggleModal2() {
    modal2.classList.toggle("show-modal");
}

fillItemsGrid();

cartButton.addEventListener("click", toggleModal);
modalClose.addEventListener("click", toggleModal);

buyButton.addEventListener("click", () => {
    if(cart.length == 0){
        alert("Your cart is empty!");
        return;
    }
    modal.innerHTML = "";
    toggleModal2();    
    cart = [];
    cartBadge.innerText = cart.length;
    updateCartItemsList();
    updateCartTotal();
    modalClose2.addEventListener("click", toggleModal2);
    toggleModal();
});
const ascendingPriceButton = document.querySelector(".ascPriceButton");
const descendingPriceButton = document.querySelector(".descPriceButton");

ascendingPriceButton.addEventListener("click", function() {
  sortItems('asc');
});
descendingPriceButton.addEventListener("click", function() {
  sortItems('desc');
});

function sortItems(order) {
  items.sort(function(a, b) {
    var priceA = a.price;
    var priceB = b.price;

    if (order === 'asc') {
      return priceA - priceB;
    } else if (order === 'desc') {
      return priceB - priceA;
    }
  });
  itemsGrid.innerHTML = "";
  fillItemsGrid();
}

const AtoZButton = document.querySelector(".AZButton");
const ZtoAButton = document.querySelector(".ZAButton");

AtoZButton.addEventListener("click", function() {
  sortItemsAlphabetically('a-z');
});
ZtoAButton.addEventListener("click", function() {
  sortItemsAlphabetically('z-a');
})
function sortItemsAlphabetically(order) {
  items.sort(function(a, b) {
    var nameA = a.name.toUpperCase();
    var nameB = b.name.toUpperCase();

    if (order === 'a-z') {
      return nameA.localeCompare(nameB);
    } else if (order === 'z-a') {
      return nameB.localeCompare(nameA);
    }
  });
  itemsGrid.innerHTML = "";
  fillItemsGrid();
}
