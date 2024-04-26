const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const totalPriceElement = document.querySelector("#total-price");
const totalPrice = cartItems.reduce(
  (total, item) => total + item.price * item.quantity,
  0
);
totalPriceElement.textContent = "£" + totalPrice.toFixed(2);

const handlePayment = (event) => {
  event.preventDefault(); // Prevent default form submission

  // Simulate payment processing (no actual payment happens)
  const formData = {
    name: document.getElementById("name").value,
    number: document.getElementById("number").value,
    expiryDate: document.getElementById("expiry-date").value,
    securityCode: document.getElementById("security-number").value,
  };

  console.log("Submitted Payment Information:", formData);

  window.localStorage.clear("cart");
  // Display a success message (optional)
  window.alert(
    "Payment information submitted successfully! (For demonstration purposes only)"
  );

  window.location.href =
    window.location.protocol + "//" + window.location.host + "/index.html";
};
