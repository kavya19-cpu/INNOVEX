let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let allProducts = [];

/* =========================
   UPDATE CART COUNT
========================= */

function updateCount() {

  let total = cart.reduce((sum, item) => sum + item.qty, 0);

  document.getElementById("count").innerText = total;
}

updateCount();

/* =========================
   FETCH PRODUCTS
========================= */

fetch("/products")

.then(res => res.json())

.then(data => {

  allProducts = data;

  showProducts(allProducts);
})

.catch(error => {

  console.log("Error Loading Products:", error);
});

/* =========================
   SHOW PRODUCTS
========================= */

function showProducts(products) {

  let box = document.getElementById("products");

  box.innerHTML = "";

  if(products.length === 0){

    box.innerHTML = `
      <h2 style="text-align:center;">
        No Products Found
      </h2>
    `;

    return;
  }

  products.forEach(product => {

    box.innerHTML += `

    <div class="card">

      <img src="${product.image}">

      <div class="card-content">

        <h3>${product.name}</h3>

        <div class="rating">
          ${"⭐".repeat(product.rating)}
        </div>

        <div class="price">
          ₹${product.price}
        </div>

        <div class="card-buttons">

          <button onclick="addToCart(${product.id})">
            Add To Cart
          </button>

          <button onclick="addWishlist(${product.id})">
            ❤️
          </button>

        </div>

      </div>

    </div>
    `;
  });
}

/* =========================
   ADD TO CART
========================= */

function addToCart(id) {

  let product = allProducts.find(item => item.id === id);

  if (!product) return;

  let existing = cart.find(item => item.id === id);

  if (existing) {

    existing.qty++;

  } else {

    cart.push({
      ...product,
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCount();

  showToast(product.name + " Added To Cart");
}

/* =========================
   ADD TO WISHLIST
========================= */

function addWishlist(id) {

  let product = allProducts.find(item => item.id === id);

  if (!product) return;

  wishlist.push(product);

  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  showToast(product.name + " Added To Wishlist ❤️");
}

/* =========================
   FILTER PRODUCTS
========================= */

function filterProducts(category) {

  if (category === "All") {

    showProducts(allProducts);

  } else {

    let filtered = allProducts.filter(product =>
      product.category === category
    );

    showProducts(filtered);
  }
}

/* =========================
   SEARCH PRODUCTS
========================= */

let search = document.getElementById("search");

if(search){

  search.addEventListener("input", function () {

    let value = this.value.toLowerCase();

    let filtered = allProducts.filter(product =>

      product.name.toLowerCase().includes(value)

    );

    showProducts(filtered);
  });
}

/* =========================
   TOAST NOTIFICATION
========================= */

function showToast(message) {

  let toast = document.getElementById("toast");

  toast.innerText = message;

  toast.classList.add("show");

  setTimeout(() => {

    toast.classList.remove("show");

  }, 2000);
}

/* =========================
   DARK MODE
========================= */

function toggleDarkMode() {

  document.body.classList.toggle("dark");
}
