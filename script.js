const container = document.getElementById("product-container");
const searchInput = document.getElementById("search");
const loadMoreBtn = document.getElementById("load-more");

let products = [];
let visibleCount = 5;

fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(data => {
    products = data;
    console.log("Fetched Products:", products);
    showProducts();
  });

function showProducts() {
  container.innerHTML = "";

  const filtered = products
    .slice(0, visibleCount)
    .filter(p => p.title.toLowerCase().includes(searchInput.value.toLowerCase()));

  if (filtered.length === 0) {
    container.innerHTML = "<p>No products found.</p>";
  } else {
    filtered.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <a href="product.html?id=${product.id}">
          <img src="${product.image}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p>$${product.price}</p>
        </a>
      `;
      container.appendChild(card);
    });
  }

  if (visibleCount >= products.length) {
    loadMoreBtn.style.display = "none";
  } else {
    loadMoreBtn.style.display = "block";
  }
}

loadMoreBtn.addEventListener("click", () => {
  visibleCount += 5;
  showProducts();
});

searchInput.addEventListener("input", showProducts);
