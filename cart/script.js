window.onload = () => {
  let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  if (!cartItems) return;
  renderCart(cartItems);
  handleCheckoutList(cartItems);
};

let cart = document.querySelector(".items");
let itemList = document.querySelector(".item-price-list");
cart.addEventListener("click", handleClick);

function handleClick(e) {
  if (e.target.tagName !== "BUTTON") return;
  let id = Number(e.target.getAttribute("data-id"));
  let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  let filtered = cartItems.filter((item) => item.id !== id);
  renderCart(filtered);
  handleCheckoutList(filtered);
  localStorage.setItem("cartItems", JSON.stringify(filtered));
}

function handleCheckoutList(data) {
  if (!data) return;
  const total = document.querySelector("#totalPrice");
  let totalPrice = data.reduce((acc, product) => {
    return acc + Number(product.price);
  }, 0);
  console.log(totalPrice);
  total.textContent = `$${totalPrice.toFixed(2)}`;
  renderCheckoutList(data);
}

function renderCart(data) {
  cart.innerHTML = "";
  data.forEach((item) => {
    cart.innerHTML += `<div class="item">
    <img src=${item.image} alt="Item" />
    <div class="info">
      <p>Title : ${item.title}</p>
      <p>Price : $${item.price}</p>
    </div>
    <button class="addBtn" data-id=${item.id}>Remove From Cart</button>
  </div>`;
  });
}

function renderCheckoutList(data) {
  itemList.innerHTML = "";
  if (!data) return;
  data.forEach((item, index) => {
    itemList.innerHTML += `<li>
    <p>${index + 1}.${item.title}</p>
    <p>$${item.price}</p>
  </li>`;
  });
}

document.getElementById("checkoutBtn").onclick = function (e) {
  let totalPrice = Number(document.getElementById("totalPrice").textContent);
  var options = {
    key: "rzp_test_PV1oQ0oMtgXOsq", // Enter the Key ID generated from the Dashboard
    amount: totalPrice * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "MyShop Checkout",
    description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    theme: {
      color: "#000",
    },
    image:
      "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
  };

  var rzpy1 = new Razorpay(options);
  rzpy1.open();
  localStorage.removeItem("cartItems");
  renderCart([]);
  // window.location.href = "/shop";
  renderCheckoutList([]);
  e.preventDefault();
};
