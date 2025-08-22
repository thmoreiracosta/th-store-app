import { products } from "../data/data.js";

const container = document.querySelector(".list");
const dotsContainer = document.querySelector(".dots");
const numberEl = document.querySelector(".number");

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
let timer = null;
let resumeTimer = null; // timeout para religar autoplay
const RESUME_DELAY = 15000;

function showProduct(index, direction = "next") {
  const items = document.querySelectorAll(".item");

  // encontra ativo atual e marca como saindo
  const currentActive = document.querySelector(".item.active");
  if (currentActive) {
    currentActive.classList.remove("active");

    // adiciona saída dependendo da direção
    if (direction === "next") {
      currentActive.classList.add("exiting-left");
    } else {
      currentActive.classList.add("exiting-right");
    }

    // remove classe de saída depois da animação (~1s)
    setTimeout(() => {
      currentActive.classList.remove("exiting-left", "exiting-right");
    }, 1000);
  }

  // ativa o novo
  items[index].classList.add("active");
  updateIndicators(index);
  currentIndex = index;
}


function startAutoplay() {
  stopAutoplay();
  timer = setInterval(() => {    
    showProduct((currentIndex + 1) % products.length);
  }, 5000);
}

function stopAutoplay() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

function userInteracted() {
  stopAutoplay();
  if (resumeTimer) clearTimeout(resumeTimer);
  resumeTimer = setTimeout(() => {
    startAutoplay();
  }, RESUME_DELAY);
}

renderProducts();
renderDots();
startAutoplay();

document.getElementById("back").addEventListener("click", () => {
  const backIndex = (currentIndex + 1) % products.length;
  userInteracted();
  showProduct(backIndex, "back");
});

document.getElementById("next").addEventListener("click", () => {
  const nextIndex = (currentIndex - 1 + products.length) % products.length;
  userInteracted();
  showProduct(nextIndex, "next");
});

dotsContainer.addEventListener("click", (e) => {
  const dot = e.target.closest(".dot"); // garante que pegou o LI correto
  if (!dot || !dotsContainer.contains(dot)) return;

  const dots = Array.from(dotsContainer.querySelectorAll(".dot"));
  const index = dots.indexOf(dot); // índice real na lista

  if (index >= 0) {
    showProduct(index);
    userInteracted();
  }
});


