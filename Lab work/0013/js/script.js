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
  //   const modalWrpper = document.querySelector(".modal-wrapper");
  //   const modalContainer = document.createElement("div");
  //   modalContainer.classList.add("modal-container");
  //   modalContainer.classList.add("modal-active");
  //   const innerHTML = `<div class="close-btn">
  //   <svg
  //     width="20"
  //     height="20"
  //     viewBox="0 0 20 20"
  //     fill="none"
  //     xmlns="http://www.w3.org/2000/svg"
  //   >
  //     <path
  //       id="Vector 3"
  //       d="M1.81836 1.81836L18.182 18.182M1.81836 18.182L18.182 1.81836"
  //       stroke="currentColor"
  //       stroke-width="2.45455"
  //       stroke-linecap="round"
  //     ></path>
  //   </svg>
  // </div>
  // <div class="image-container">
  //   <img src="./images/sample.jpg" alt="" />
  // </div>
  // <div class="info">
  //   <h1>${product.name}</h1>
  //   <p class="price"><span class="oldPrice">£22</span> From £2.50</p>
  //   <p class="description">
  //     A sweet passionfruit. This variety of passionfruit has a grey pulp
  //     with lots of crunchy seeds and a sweet juice. The perfect passion
  //     fruit for you if you find other varieties a bit too tart!
  //   </p>
  //   <div class="form-control">
  //     <label for="quantity">Quantity</label>
  //     <select name="quantity" id="quantity">
  //       <option value="1">1</option>
  //       <option value="2">3</option>
  //       <option value="3">6</option>
  //     </select>
  //   </div>
  //   <button class="btn">Add to cart</button>
  //   <div class="accordian">
  //     <h4 class="question">
  //       Lorem ipsum dolor sit amet, consectetur adipisicing elit
  //     </h4>
  //     <p class="answere">
  //       Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
  //       quos qui quo dignissimos. Quod illo culpa possimus nemo itaque
  //     </p>
  //   </div>
  //   <div class="accordian">
  //     <h4 class="question">
  //       Lorem ipsum dolor sit amet, consectetur adipisicing elit
  //     </h4>
  //     <p class="answere">
  //       Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
  //       quos qui quo dignissimos. Quod illo culpa possimus nemo itaque
  //     </p>
  //   </div>
  //   <div class="accordian">
  //     <h4 class="question">
  //       Lorem ipsum dolor sit amet, consectetur adipisicing elit
  //     </h4>
  //     <p class="answere">
  //       Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
  //       quos qui quo dignissimos. Quod illo culpa possimus nemo itaque
  //     </p>
  //   </div>
  // </div>`;
  //   modalContainer.innerHTML = innerHTML;
  //   modalWrpper.appendChild(modalContainer);
};
// MODAL
// const dummy = document.querySelector("#dummy");

// dummy.addEventListener("click", () => {
//   console.log("clicked");
//   modalWrpper.classList.add("modal-active");
// });

// ACCORDIAN
const accordians = document.querySelectorAll(".accordian");

accordians.forEach((accordian) => {
  const question = accordian.querySelector(".question");
  const answere = accordian.querySelector(".answere");

  question.addEventListener("click", () => {
    answere.classList.toggle("active");
  });
});
