let chosenSize = null;

function openCheckout() {
  const sizeError = document.getElementById("sizeError");

  // 👟 If size selector exists → validate
  if (sizeError) {
    if (!chosenSize) {
      sizeError.classList.remove("hidden");
      return;
    }
    sizeError.classList.add("hidden");
  }

  // set qty
  const qty = document.getElementById("qty-val").innerText;
  document.getElementById("buyQty").value = qty;

  // open modal
  document.getElementById("checkoutModal").classList.remove("hidden");
}

function closeCheckout() {
  document.getElementById("checkoutModal").classList.add("hidden");
}

function selectSize(size, btn) {
  chosenSize = size;
  document.getElementById("selectedSize").value = size;

  document.querySelectorAll(".size-btn").forEach(b => {
    b.classList.remove("active-size");
  });

  btn.classList.add("active-size");

  const error = document.getElementById("sizeError");
  if (error) error.classList.add("hidden");
}
