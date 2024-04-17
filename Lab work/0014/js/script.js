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
    console.log(product);
    const productCard = document.createElement("a");
    productCard.classList.add("card");
    productCard.href = "./details.html";
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

const showProductDetail = (product) => {};
// ACCORDIAN
const accordians = document.querySelectorAll(".accordian");

accordians.forEach((accordian) => {
  const question = accordian.querySelector(".question");
  const answere = accordian.querySelector(".answere");

  question.addEventListener("click", () => {
    answere.classList.toggle("active");
    question.classList.toggle("active");
  });
});
