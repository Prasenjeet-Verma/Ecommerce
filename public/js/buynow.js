function openCheckout() {
  const sizeRequired = ["shoes", "crocs", "sliders", "clothes"].includes(window.PRODUCT_CATEGORY);

  if (sizeRequired && !selectedSize) {
    const sizeError = document.getElementById("sizeError");
    if (sizeError) sizeError.classList.remove("hidden");
    return; // ❌ modal open nahi hoga
  }

  document.getElementById("buyQty").value = quantity;
  document.getElementById("selectedSize").value = selectedSize || "";

  document.getElementById("checkoutModal").classList.remove("hidden");
}


document.addEventListener("DOMContentLoaded", () => {
  const sizeRequired = ["shoes", "crocs", "sliders", "clothes"].includes(window.PRODUCT_CATEGORY);
  const buyBtn = document.getElementById("buyNowBtn");

  if (sizeRequired) {
    buyBtn.disabled = true;   // only for size products
  } else {
    buyBtn.disabled = false;  // watches, bags, glasses
  }
});
