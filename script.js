// Add to Cart functionality
const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const name = button.getAttribute("data-name");
    const price = parseFloat(button.getAttribute("data-price"));

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = cart.find((item) => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  });
});

// Cart Summary on cart.html
const cartSummary = document.getElementById("cart-summary");
const checkoutBtn = document.getElementById("checkout-btn");

if (cartSummary) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    cartSummary.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    let total = 0;
    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;

      const div = document.createElement("div");
      div.className = "featured-item";
      div.innerHTML = `
        <h3>${item.name}</h3>
        <p>Price: $${item.price.toFixed(2)}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Subtotal: $${itemTotal.toFixed(2)}</p>
        <button class="btn remove-item-btn" data-index="${index}">Remove</button>
      `;
      cartSummary.appendChild(div);
    });

    const totalDiv = document.createElement("div");
    totalDiv.className = "featured-item";
    totalDiv.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
    cartSummary.appendChild(totalDiv);
  }

  cartSummary.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-item-btn")) {
      const index = e.target.getAttribute("data-index");
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      window.location.reload();
    }
  });

  checkoutBtn.addEventListener("click", () => {
    if (cart.length > 0) {
      window.location.href = "checkout.html";
    } else {
      alert("Your cart is empty!");
    }
  });
}
