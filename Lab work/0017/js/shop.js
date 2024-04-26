const wrapper = document.querySelector(".wrapper");
const categoryContainer = document.querySelector("ul");
const searchInput = document.querySelector("#searchInput");
let products;

const fetchData = async () => {
  try {
    const response = await fetch("./js/data.json");
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching products:", error.message);
  }
};

// HANDLE SEARCH FUNCTIONALY
const handleSearch = () => {
  const query = searchInput.value.toLowerCase(); // Get search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(query)
  ); // Filter products based on search query

  wrapper.innerHTML = ""; // Clear previous products

  // Display filtered products
  filteredProducts.forEach((product) => {
    const card = createProductCard(product);
    wrapper.appendChild(card);
  });
};

// HANDLE FILTER BY CATEGORY
const filterProducts = (categoryName) => {
  wrapper.innerHTML = ""; // Clear previous products

  if (categoryName === "All") {
    // Display all products if category is "All"
    products.forEach((product) => {
      const card = createProductCard(product);
      wrapper.appendChild(card);
    });
  } else {
    // Display products matching the selected category
    const filteredProducts = products.filter((product) => {
      // Check if any category of the product matches the desired category name
      return product.categories.some(
        (category) => category.name === categoryName
      );
    });

    filteredProducts.forEach((product) => {
      const card = createProductCard(product);
      wrapper.appendChild(card);
    });
  }
  // Remove "active" class from all buttons
  document.querySelectorAll("ul li").forEach((li) => {
    li.classList.remove("active");
  });

  // Add "active" class to the clicked button
  const activeButton = document.querySelector(
    `ul li[data-category="${categoryName}"]`
  );
  activeButton.classList.add("active");
};

document.addEventListener("DOMContentLoaded", async () => {
  products = await fetchData();
  displayProducts(products);
  searchInput.addEventListener("input", handleSearch);
});

const createProductCard = (product) => {
  const card = document.createElement("a");
  card.href = "details.html?id=" + product.id;
  card.classList.add("card");

  card.innerHTML = `
    <img src="${product.images[0].url}" alt="${product.name}">
    
   <div class="card-content">
   <p class="name">${product.name}</p>
    <p class="price">${
      product.variants[0].oldPrice === null
        ? ""
        : `<span class='oldPrice'>${product.variants[0].oldPrice}</span>`
    }  From GBP ${product.variants[0].price}</p>
   </div>
  `;

  // Add tag if present
  if (product.tag) {
    const tag = document.createElement("p");
    tag.classList.add("tag");
    tag.textContent = product.tag;
    card.appendChild(tag);
  }

  return card;
};

const displayProducts = (products) => {
  wrapper.innerHTML = "";
  products.forEach((product) => {
    const card = createProductCard(product);
    wrapper.appendChild(card);
  });
};

const categories = [
  "All",
  "Dragon fruit",
  "Medium-sweet fruits",
  "Medium-sour fruits",
  "Sweet fruits",
  "Guava",
  "Soursop",
];

// CREATE LIST OF CATEGORIES
categories.forEach((category) => {
  const li = document.createElement("li");
  li.innerText = category;
  li.dataset.category = category;
  li.addEventListener("click", () => filterProducts(category));
  categoryContainer.appendChild(li);
});
