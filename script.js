const productContainer = document.getElementById("productContainer");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const searchInput = document.getElementById("searchInput");
const noResults = document.getElementById("noResults");

let allProducts = [];
let loadedProducts = [];
let currentIndex = 0;
const PRODUCTS_PER_LOAD = 5;

// Fetch products
fetch("https://fakestoreapi.com/products")
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    console.log("Fetched Products:", allProducts);
    loadMoreProducts();
  });

// Load next 5 products
function loadMoreProducts() {
  const nextProducts = allProducts.slice(currentIndex, currentIndex + PRODUCTS_PER_LOAD);
  nextProducts.forEach(product => {
    createProductCard(product);
    loadedProducts.push(product);
  });

  currentIndex += PRODUCTS_PER_LOAD;
  if (currentIndex >= allProducts.length) {
    loadMoreBtn.style.display = "none";
  }
}

// Create product card
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <img src="${product.image}" alt="${product.title}" />
    <h4>${product.title}</h4>
    <p>₹ ${product.price}</p>
  `;
  card.addEventListener("click", () => {
    window.location.href = `product.html?id=${product.id}`;
  });
  productContainer.appendChild(card);
}

// Search functionality
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = loadedProducts.filter(product =>
    product.title.toLowerCase().includes(query)
  );

  productContainer.innerHTML = "";

  if (filtered.length === 0) {
    noResults.style.display = "block";
  } else {
    noResults.style.display = "none";
    filtered.forEach(product => createProductCard(product));
  }
});

loadMoreBtn.addEventListener("click", loadMoreProducts);
