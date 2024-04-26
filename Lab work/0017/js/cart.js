function renderCartItems() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartTableBody = document.querySelector("#cart-tbody");
  cartTableBody.innerHTML = "";

  cartItems.forEach((item) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>
        <button class="cancel-btn">&times;</button>
      </td>
      <td>
        <div class="product__details__table__cell">
          <img src="${item.imageURL}" alt="${item.name}" />
          <div class="info">
            <p class="name">${item.name}</p>
            <p class="quantity">Variant: ${item.variantName}</p>
          </div>
        </div>
      </td>
      <td>
        <div class="quantity__wrapper">
          <button class="decrement-btn">-</button>
          <span>${item.quantity}</span>
          <button class="increment-btn">+</button>
        </div>
      </td>
      <td>£${item.price}</td>
      <td>£${(item.price * item.quantity).toFixed(2)}</td>
    `;
    cartTableBody.appendChild(newRow);
  });

  const totalItemsElement = document.querySelector(".total__items");
  totalItemsElement.textContent = cartItems.length + " items";

  const totalPriceElement = document.querySelector(".info__row p");
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  totalPriceElement.textContent = "£" + totalPrice.toFixed(2);

  // Event listener for incrementing/decrementing quantity
  cartTableBody.addEventListener("click", (event) => {
    const target = event.target;
    if (target.classList.contains("increment-btn")) {
      const row = target.closest("tr");
      const productName = row.querySelector(".name").textContent;
      const selectedItem = cartItems.find((item) => item.name === productName);
      if (selectedItem) {
        selectedItem.quantity++; // Increment quantity by 1
        localStorage.setItem("cart", JSON.stringify(cartItems));
        renderCartItems();
      }
    } else if (target.classList.contains("decrement-btn")) {
      const row = target.closest("tr");
      const productName = row.querySelector(".name").textContent;
      const selectedItem = cartItems.find((item) => item.name === productName);
      if (selectedItem && selectedItem.quantity > 1) {
        selectedItem.quantity--; // Decrement quantity by 1, minimum quantity is 1
        localStorage.setItem("cart", JSON.stringify(cartItems));
        renderCartItems();
      }
    }
  });

  // Event listener for cancel button (remove item from cart)
  const cancelButtons = document.querySelectorAll(".cancel-btn");
  cancelButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      cartItems.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cartItems));

      renderCartItems();
      updateCartItemCount();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCartItems();
});
