let colors = ["red", "black", "blue", "green"];
let sizes = ["s", "m", "l", "lg", "xl"];

const allSection = document.querySelector("#allProducts > div");
const sectionTitle = document.querySelector("#allProducts > title");
const filters = document.querySelector(".filters");
let currTab = document.querySelector(".filter.active");

const filterColors = document.getElementById("filters-colors");
const filterSizes = document.getElementById("filters-sizes");

const filterRating = document.getElementById("range");

const filterPrice = document.getElementById("filters-price");

const colorInputs = document.querySelectorAll(`input[name="checkbox"]:checked`);

const searchElement = document.querySelector(`input[placeholder="Search"]`);

searchElement.addEventListener("input", handleInput);
const asideFilters = document.querySelector("aside");
const cartItems = document.querySelector(".items");

filters.addEventListener("click", handleFilter);
cartItems.addEventListener("click", handleCartItems);

window.onload = () => {
  fetchProducts().then((data) => {
    // if (!data) return;
    data = data.map((product) => {
      return {
        ...product,
        colors: colors.slice(Math.floor(Math.random() * colors.length)),
        sizes: sizes.slice(Math.floor(Math.random() * sizes.length)),
      };
    });
    renderUI(allSection, data, "All");
    localStorage.setItem("data", JSON.stringify(data));
    localStorage.setItem("currData", JSON.stringify(data));
  });
};

function handleCartItems(e) {
  if (e.target.tagName !== "BUTTON") return;
  let data = JSON.parse(localStorage.getItem("data"));
  let id = Number(e.target.getAttribute("data-id"));
  let product = data.find((product) => product.id === id);
  let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  cartItems.push(product);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  alert("Item added to the cart successfully 🎉🎉🎉");
}

function handleInput(e) {
  const data = JSON.parse(localStorage.getItem("data"));
  const query = e.target.value.trim().toLowerCase();

  if (!data) return;
  const filtered = data.filter((product) =>
    product.title.toLowerCase().includes(query)
  );
  renderUI(allSection, filtered, "");
}

function handleFilter(e) {
  if (!e.target.classList.contains("filter")) return;

  const data = JSON.parse(localStorage.getItem("data"));
  const tab = e.target.textContent;
  const curTab = currTab.textContent;

  if (tab === curTab) return;

  currTab.classList.remove("active");
  e.target.classList.add("active");
  currTab = e.target;

  if (tab === "All") {
    renderUI(allSection, data, "All");
  } else if (tab === "Mens") {
    const menProducts = filterMensProducts(data);

    renderUI(allSection, menProducts, "Men's Clothing");
  } else if (tab === "Womens") {
    const womensProducts = filterWoMensProducts(data);
    renderUI(allSection, womensProducts, "Women's Clothing");
  } else if (tab === "Jewellery") {
    const jewelleryProducts = filterJewellaryProducts(data);
    renderUI(allSection, jewelleryProducts, "Jewellery");
  } else if (tab === "Electronics") {
    const electronicsProducts = filterElectronicsProducts(data);
    renderUI(allSection, electronicsProducts, "Electronics");
  }
}

asideFilters.addEventListener("change", (e) => {
  const isFilter =
    e.target.matches('input[type="checkbox"]') ||
    e.target.matches('input[type="range"]');

  if (isFilter) {
    filterProducts();
  }
});

function getCheckedValues(name) {
  return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map(
    (input) => input.id
  );
}

function getPriceRanges() {
  return getCheckedValues("prange").map((range) => {
    return range.split("-").map(Number);
  });
}

function filterProducts() {
  const selectedColors = getCheckedValues("color");
  const selectedSizes = getCheckedValues("size");

  const selectedRanges = getPriceRanges();
  const selectedRating = parseFloat(document.getElementById("range").value);

  const originalData = JSON.parse(localStorage.getItem("data"));

  const filtered = originalData.filter((product) => {
    // Check color
    const colorMatch =
      selectedColors.length === 0 ||
      selectedColors.some((color) => product.colors.includes(color));

    // Check size
    const sizeMatch =
      selectedSizes.length === 0 ||
      selectedSizes.some((size) => product.sizes.includes(size));

    // Check price
    const priceMatch =
      selectedRanges.length === 0 ||
      selectedRanges.some(
        ([min, max]) => product.price >= min && product.price <= max
      );

    // Check rating
    const ratingMatch = product.rating?.rate >= selectedRating;

    return colorMatch && sizeMatch && priceMatch && ratingMatch;
  });

  renderUI(allSection, filtered, "");
}

async function fetchProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) return;
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err.message);
    return null;
  }
}

function filterMensProducts(data) {
  if (!data) return;
  const filteredData = data.filter(
    (product) => product.category === "men's clothing"
  );

  if (filteredData) return filteredData;
  return null;
}

function filterWoMensProducts(data) {
  if (!data) return;
  const filteredData = data.filter(
    (product) => product.category === "women's clothing"
  );

  if (filteredData) return filteredData;
  return null;
}

function filterJewellaryProducts(data) {
  if (!data) return;
  const filteredData = data.filter(
    (product) => product.category === "jewelery"
  );

  if (filteredData) return filteredData;
  return null;
}

function filterElectronicsProducts(data) {
  if (!data) return;
  const filteredData = data.filter(
    (product) => product.category === "electronics"
  );

  if (filteredData) return filteredData;
  return null;
}

function renderUI(element, data, title = "") {
  sectionTitle.textContent = title;
  element.innerHTML = "";
  data.forEach((product) => {
    element.innerHTML += `
    <div class="item">
      <img src=${product.image} alt="Item" />
      <div class="info">
        <div class="row">
          <div class="price">$${product.price}</div>
          <div class="sized">${product.sizes.join(",").toUpperCase()}</div>
        </div>
        <div class="colors">
          Colors:
          <div class="row">
            ${product.colors
              .map((color) => {
                return `<div class="circle" style="background-color: ${color}"></div>`;
              })
              .join("\n")}
          </div>
        </div>
        <div class="row">Rating:${"⭐".repeat(
          Math.floor(product.rating.rate)
        )}</div>
      </div>
      <button id="addBtn" data-id=${product.id}>Add to Cart</button>
    </div>`;
  });
}
