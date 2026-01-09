let chosenSize = null;

function openCheckout() {
  const sizeError = document.getElementById("sizeError");
  const sizeInput = document.getElementById("selectedSize");

  // ✅ Only validate size if size selector exists (i.e., product is shoes)
  if (sizeError && sizeInput) {
    if (!chosenSize) {
      sizeError.classList.remove("hidden");
      return; // prevent modal from opening
    }
    sizeError.classList.add("hidden");
  }

  // Set quantity
  const qty = document.getElementById("qty-val").innerText;
  document.getElementById("buyQty").value = qty;

  // Open modal
  document.getElementById("checkoutModal").classList.remove("hidden");
}

function closeCheckout() {
  document.getElementById("checkoutModal").classList.add("hidden");
}

function selectSize(size, btn) {
  chosenSize = size;

  const sizeInput = document.getElementById("selectedSize");
  if (sizeInput) sizeInput.value = size;

  document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active-size"));
  btn.classList.add("active-size");

  const error = document.getElementById("sizeError");
  if (error) error.classList.add("hidden");
}
