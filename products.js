function loadProducts(category, containerId) {
  const products = JSON.parse(localStorage.getItem(category)) || [];
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  products.forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" class="preview-image" alt="Product Image" />
      <p><strong>${product.caption}</strong></p>
      <p>Color: ${product.color}</p>
      <p>Size: ${product.size}</p>
      <p>Quantity: ${product.quantity}</p>
      <button onclick="deleteProduct('${category}', ${index})">Delete</button>
      <button onclick="editProduct('${category}', ${index})">Edit</button>
    `;
    container.appendChild(card);
  });
}

function deleteProduct(category, index) {
  const products = JSON.parse(localStorage.getItem(category)) || [];
  products.splice(index, 1);
  localStorage.setItem(category, JSON.stringify(products));
  loadProducts(category, `${category}-products`);
}

// Edit Modal logic
let currentEditCategory = "";
let currentEditIndex = -1;
let originalImageBase64 = "";

function editProduct(category, index) {
  const products = JSON.parse(localStorage.getItem(category)) || [];
  const product = products[index];

  currentEditCategory = category;
  currentEditIndex = index;
  originalImageBase64 = product.image;

  // Pre-fill form
  document.getElementById("editCaption").value = product.caption;
  document.getElementById("editColor").value = product.color;
  document.getElementById("editSize").value = product.size;
  document.getElementById("editQuantity").value = product.quantity;

  document.getElementById("imagePreview").src = product.image;
  document.getElementById("imagePreview").style.display = "block";

  document.getElementById("editModal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("editModal").classList.add("hidden");
  document.getElementById("editForm").reset();
  document.getElementById("imagePreview").style.display = "none";
}

// Live preview on image change
document.getElementById("editImage").addEventListener("change", function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById("imagePreview").src = e.target.result;
      document.getElementById("imagePreview").style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});

document.addEventListener("DOMContentLoaded", function() {
  loadProducts("men", "men-products");
  loadProducts("women", "women-products");
  loadProducts("children", "children-products");
});
