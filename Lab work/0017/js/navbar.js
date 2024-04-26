// Function to update the total number of cart items in the navbar
const updateCartItemCount = () => {
  const totalProducts = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve cart items from localStorage
  const totalItemsElement = document.getElementById("total-cart-item");

  if (totalItemsElement) {
    // Update the total items count in the navbar
    totalItemsElement.textContent = totalProducts.length;
  }
};

// Call the updateCartItemCount function to initially display the total items count
updateCartItemCount();
