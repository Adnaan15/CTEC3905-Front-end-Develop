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

// Function to show the custom alert with a message
const showAlert = (message) => {
  const alertElement = document.getElementById("customAlert");
  const alertMessage = document.getElementById("alertMessage");

  if (alertElement && alertMessage) {
    alertMessage.textContent = message;
    alertElement.style.display = "block";
    alertElement.style.animation = "slideIn 0.3s forwards";

    // Auto-close the alert after 3 seconds
    setTimeout(() => {
      closeAlert();
    }, 3000);
  }
};

// Function to close the custom alert
const closeAlert = () => {
  const alertElement = document.getElementById("customAlert");
  if (alertElement) {
    alertElement.style.animation = "slideOut 0.3s forwards";
    setTimeout(() => {
      alertElement.style.display = "none";
    }, 300);
  }
};

// Retrieve cart data from local storage or initialize an empty cart array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to add a product with a specific variant and quantity to the cart
const addToCart = (product, productId, variantId, quantity = 1) => {
  // Find the selected variant based on variantId
  const variant = product.variants.find((v) => v.id === variantId);

  if (!variant) {
    console.error(
      `Variant with ID ${variantId} not found for product ${product.name}`
    );
    return;
  }

  // Check if the product with the same variant is already in the cart
  const existingCartItemIndex = cart.findIndex(
    (item) => item.productId === productId && item.variantId === variantId
  );

  if (existingCartItemIndex !== -1) {
    // If the product with the same variant is already in the cart, update its quantity
    cart[existingCartItemIndex].quantity += quantity;
  } else {
    // If the product with the selected variant is not in the cart, add it as a new cart item
    const newCartItem = {
      productId: productId,
      name: product.name,
      variantId: variantId,
      price: variant.price,
      quantity: quantity,
      imageURL: product?.images[0]?.url,
      variantName: variant.optionsValues.QUANTITY
        ? variant.optionsValues.QUANTITY
        : variant.optionsValues.Quantity,
    };
    cart.push(newCartItem);
  }

  // Update local storage with the updated cart data
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartItemCount();

  const notificationMessage = `Added ${quantity} ${product.name} (${variant.optionsValues.QUANTITY}) to cart.`;

  showAlert(notificationMessage);

  // Log the updated cart for testing purposes
  console.log(
    "Product added to cart:",
    product.name,
    "Variant ID:",
    variantId,
    "Quantity:",
    quantity
  );
  console.log("Updated Cart:", cart);
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
  const variantSelect = document.createElement("select");
  // Check if product has variants
  if (product.variants && product.variants.length > 0) {
    // Generate HTML options for variant select based on product variants
    const variantOptionsHTML = product.variants
      .map(
        (variant) =>
          `<option value="${variant.id}">${
            variant.optionsValues.Quantity
              ? variant.optionsValues.Quantity
              : variant.optionsValues.QUANTITY
          }</option>`
      )
      .join("");

    // Set innerHTML of variantSelect to the generated options HTML
    variantSelect.innerHTML = variantOptionsHTML;

    variantSelect.addEventListener("change", (event) => {
      const selectedVariantId = event.target.value;
      const selectedVariant = product.variants.find(
        (v) => v.id === selectedVariantId
      );

      if (selectedVariant) {
        const priceElement = document.querySelector(".price span");
        priceElement.textContent = `£${selectedVariant.price}`;
      }
    });
  } else {
    // Handle case where variants are not available or structured as expected
    console.error("Variants not found or invalid in product:", product);
    // Optionally provide a fallback or default behavior
    variantSelect.innerHTML = '<option value="">No variants available</option>';
  }

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

  infoWrapper.appendChild(variantSelect);
  const button = document.createElement("button");
  button.innerText = "Add to cart";
  button.classList.add("btn");
  infoWrapper.appendChild(button);
  button.addEventListener("click", () => {
    addToCart(product, product.id, variantSelect.value, 1);
  });
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
