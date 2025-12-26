// 1. Wishlist Toggle Logic
function toggleWishlist(btn) {
  const icon = btn.querySelector("i");
  const navCount = document.getElementById("wish-count");

  btn.classList.toggle("active");

  if (btn.classList.contains("active")) {
    icon.classList.replace("fa-regular", "fa-solid");
    navCount.style.display = "flex"; // Show count in navbar
  } else {
    icon.classList.replace("fa-solid", "fa-regular");
    navCount.style.display = "none";
  }
}

// 2. Quantity Logic
function updateQty(val) {
  const qtyElement = document.getElementById("qty-val");
  let current = parseInt(qtyElement.innerText);
  if (current + val >= 1) {
    qtyElement.innerText = current + val;
  }
}

// 3. Size Selection Logic
const sizeButtons = document.querySelectorAll(".size-btn");
sizeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    sizeButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

// 4. Add to Cart Logic
function handleAddToCart() {
  const btn = document.getElementById("addToCartBtn");
  const originalContent = btn.innerHTML;

  // Visual success feedback
  btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Added to Cart';
  btn.style.background = "#dcfce7";
  btn.style.color = "#166534";
  btn.style.borderColor = "#166534";

  // Reset after 2 seconds
  setTimeout(() => {
    btn.innerHTML = originalContent;
    btn.style.background = "white";
    btn.style.color = "var(--color-brand-dark)";
    btn.style.borderColor = "var(--color-brand-dark)";
  }, 2000);
}
