function openCheckout() {
  const sizeError = document.getElementById("sizeError");

  // Validate only if size exists
  if (sizeError && !selectedSize) {
    sizeError.classList.remove("hidden");
    return;
  }

  // Set qty
  document.getElementById("buyQty").value =
    document.getElementById("qty-val").innerText;

  // Set size
  const sizeInput = document.getElementById("selectedSize");
  if (sizeInput) sizeInput.value = selectedSize;

  // Open modal
  document.getElementById("checkoutModal").classList.remove("hidden");
}

function closeCheckout() {
  document.getElementById("checkoutModal").classList.add("hidden");
}
