const getSingleProduct = async (productID) => {
  try {
    const response = await fetch("./js/data.json");
    const data = await response.json();
    const filteredProduct = data.data.find(
      (product) => product.id === productID
    );
    return filteredProduct;
  } catch (error) {
    console.error("Error fetching products:", error.message);
  }
};

window.onload = async () => {
  // GET PRODUCT ID FROM URL
  var urlParams = new URLSearchParams(window.location.search);
  var productID = urlParams.get("id");
  //   GET PRODUCT
  const product = await getSingleProduct(productID);
  //   SHow PRODUCT
  showProductDetails(product);
  // ACCORDIAN
  addEventListernerOnAccordian();
};

const showProductDetails = (product) => {
  const detailsWrapper = document.querySelector(".details");
  //   IMAGE
  const image = document.createElement("img");
  image.src = product?.images[0]?.url;
  image.classList.add("product-img");
  detailsWrapper.appendChild(image);
  //   Other details
  const infoWrapper = document.createElement("div");
  infoWrapper.classList.add("info");
  const innerHTML = `<h1>${product.name}</h1>
  <p class="price"> <span>${
    product.variants[0].oldPrice == null ? "" : product.variants[0].oldPrice
  }</span> From £${product.variants[0].price}</p>
  <div class="description">
    ${product.description}
  </div>`;
  infoWrapper.innerHTML = innerHTML;

  //   Quantitiy Options
  const quantitySelect = document.createElement("select");
  const quantityOptionsHTML = product.optionTypes[0].values
    .map((quantity) => `<option value="${quantity}">${quantity}</option>`)
    .join("");
  quantitySelect.innerHTML = quantityOptionsHTML;

  //   Accoridian
  const accordianWrapper = document.createElement("div");
  const accoridainItemsHTML = product.additionalInfo
    .map(
      (item) => ` <div class="accordian">
    <h4 class="question">
      <span>${item.title}</span>
      <img src="./images/arrow.png" alt="" />
    </h4>
      ${item.description}
  </div>`
    )
    .join("");
  accordianWrapper.innerHTML = accoridainItemsHTML;
  quantitySelect.innerHTML = quantityOptionsHTML;
  infoWrapper.appendChild(quantitySelect);
  detailsWrapper.appendChild(infoWrapper);
  infoWrapper.appendChild(accordianWrapper);
};

const addEventListernerOnAccordian = () => {
  const accordians = document.querySelectorAll(".accordian");
  accordians.forEach((accordian) => {
    const question = accordian.querySelector(".question");
    const answere = accordian.querySelector("p");

    question.addEventListener("click", () => {
      answere.classList.toggle("active");
      question.classList.toggle("active");
    });
  });
};
