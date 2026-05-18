let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart(){

 let box = document.getElementById("cartBox");

 box.innerHTML = "";

 let total = 0;

 cart.forEach((item,index)=>{

 total += item.price * item.qty;

 box.innerHTML += `

 <div class="cart-card">

 <img src="${item.image}">

 <div>

 <h3>${item.name}</h3>

 <p>₹${item.price}</p>

 <p>Qty: ${item.qty}</p>

 </div>
 <div>

 <button onclick="increase(${index})">+</button>

 <button onclick="decrease(${index})">-</button>

 <button onclick="removeItem(${index})">
 Delete
 </button>

 </div>

 </div>

 `;
 });

 document.getElementById("total").innerText =
 "Total ₹" + total;
}

function increase(i){

 cart[i].qty++;
 save();
}
function decrease(i){

 cart[i].qty--;

 if(cart[i].qty <= 0){
  cart.splice(i,1);
 }

 save();
}

function removeItem(i){

 cart.splice(i,1);
 save();
}

function save(){

 localStorage.setItem("cart", JSON.stringify(cart));
 renderCart();
}

function placeOrder(){

 let orderId = Math.floor(Math.random()*100000);

 alert(
 `Order Placed Successfully ✅\nOrder ID: ${orderId}`
 );

 cart = [];
 save();
}

renderCart();