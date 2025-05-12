document.getElementById("productForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const imageInput = document.getElementById("image");
  const caption = document.getElementById("caption").value.trim();
  const color = document.getElementById("color").value.trim();
  const size = document.getElementById("size").value.trim();
  const quantity = document.getElementById("quantity").value.trim();
  const category = document.getElementById("category").value;

  if (!imageInput.files[0]) {
    alert("Please select an image.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const newProduct = {
      image: event.target.result,
      caption,
      color,
      size,
      quantity
    };

    const existing = JSON.parse(localStorage.getItem(category)) || [];
    existing.push(newProduct);
    localStorage.setItem(category, JSON.stringify(existing));

    alert("Product added successfully!");
    document.getElementById("productForm").reset();
  };

  reader.readAsDataURL(imageInput.files[0]);
});