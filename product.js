const productDetails = document.getElementById("productDetails");

// Get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

fetch(`https://fakestoreapi.com/products/${productId}`)
  .then(res => res.json())
  .then(product => {
    productDetails.innerHTML = `
      <div class="product-card" style="margin: auto;">
        <img src="${product.image}" alt="${product.title}" />
        <h2>${product.title}</h2>
        <p><strong>Price:</strong> ₹ ${product.price}</p>
        <p><strong>Category:</strong> ${product.category}</p>
        <p><strong>Description:</strong> ${product.description}</p>
      </div>
    `;
  });
