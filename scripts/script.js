import { products } from "../data/data.js";

const container = document.querySelector(".list");

function renderProducts() {
  container.innerHTML = products
    .map(
      (product, index) => `
    <div class="item ${index === 0 ? "active" : ""}">
    <div class="product-img">
    <img src="${product.img}" alt="${product.alt}" />
    </div>
    <div class="content">
    <h5 class="product-tag">${product.tag}</h5>
    <h2 class="product-title">${product.title}</h2>
    <p class="description">${product.description}</p>
    <button class="btn">Saiba Mais</button>
    </div>
    </div>    
    `
    )
    .join("");
}
renderProducts();

const dotsContainer = document.querySelector(".dots");
const numberEl = document.querySelector(".number");

function renderDots() {
  dotsContainer.innerHTML = products
    .map((_, i) => `<li class="dot ${i === 0 ? "active" : ""}"></li>`)
    .join("");
}
renderDots();

function updateIndicators(index) {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === index);
  });
  numberEl.textContent = String(index + 1).padStart(2, "0");
}

let currentIndex = 0;

function showProduct(index) {
  const items = document.querySelectorAll(".item");
  items.forEach((item, i) => {
    item.classList.toggle("active", i === index);
  });
  updateIndicators(index);
}

document.getElementById("next").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + products.length) % products.length;
  showProduct(currentIndex);
});

document.getElementById("back").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % products.length;
  showProduct(currentIndex);
});

showProduct(currentIndex);
