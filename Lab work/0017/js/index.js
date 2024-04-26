const fetchData = async () => {
  try {
    const response = await fetch("./js/data.json");
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching products:", error.message);
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  const products = await fetchData();
  displayFavouriteAndBestSellerCards(products);
});

const displayFavouriteAndBestSellerCards = (products) => {
  const productsContainer = document.querySelector(".cards-container");
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("card");
    productCard.innerHTML = `
    <img src=${product.images[0].url} />
    <div class="card-content">
      <p class="name">${product.name}</p>
     
      <p class="price">${
        product.variants[0].oldPrice === null
          ? ""
          : `<span class='oldPrice'>${product.variants[0].oldPrice}</span>`
      }  From GBP ${product.variants[0].price}</p>
    </div>
      `;
    productCard.addEventListener("click", () => showProductDetail(product));
    productsContainer.appendChild(productCard);
  });
};

const showProductDetail = (product) => {
  window.location.href = "details.html?id=" + product.id;
};

function updateNavbarCartItemCount() {
  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalCartItemsElement = document.querySelector("#total-cart-item");
  totalCartItemsElement.textContent = totalCartItems;
}
