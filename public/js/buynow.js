function openCheckout() {
  if ((window.PRODUCT_CATEGORY === "shoes" || window.PRODUCT_CATEGORY === "clothes") && !selectedSize) {
    const sizeError = document.getElementById("sizeError");
    if (sizeError) sizeError.classList.remove("hidden");
    alert("Please select a size");
    return;
  }

  // Set qty from JS variable (not innerText)
  const buyQtyInput = document.getElementById("buyQty");
  if (buyQtyInput) buyQtyInput.value = quantity; // ✅ fixed

  // Set size
  const sizeInput = document.getElementById("selectedSize");
  if (sizeInput) sizeInput.value = selectedSize;

  document.getElementById("checkoutModal").classList.remove("hidden");
}
