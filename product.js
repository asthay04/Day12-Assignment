const container = document.getElementById("product-detail");
const productId = new URLSearchParams(window.location.search).get("id");

if (productId) {
  fetch(`https://fakestoreapi.com/products/${productId}`)
    .then(res => res.json())
    .then(product => {
      container.innerHTML = `
        <h1>${product.title}</h1>
        <img src="${product.image}" alt="${product.title}" style="max-width: 200px;">
        <h2>$${product.price}</h2>
        <p><strong>Category:</strong> ${product.category}</p>
        <p>${product.description}</p>
        <a href="index.html">← Back to Home</a>
      `;
    })
    .catch(() => {
      container.innerHTML = "<p>Product not found.</p>";
    });
} else {
  container.innerHTML = "<p>Invalid product ID.</p>";
}
