// // 1. Wishlist Toggle Logic

// // GLOBAL PRODUCT STATE
// let selectedSize = null;
// let quantity = 1;

// function selectSize(size, btn) {
//   selectedSize = size;

//   // Highlight UI
//   document.querySelectorAll(".size-btn").forEach(b => {
//     b.classList.remove("active");
//   });
//   btn.classList.add("active");

//   // Hide error
//   const err = document.getElementById("sizeError");
//   if (err) err.classList.add("hidden");

//   // Sync Buy Now hidden field
//   const hiddenSize = document.getElementById("selectedSize");
//   if (hiddenSize) hiddenSize.value = size;
// }



// function toggleWishlist(btn) {
//   const icon = btn.querySelector("i");
//   const navCount = document.getElementById("wish-count");

//   btn.classList.toggle("active");

//   if (btn.classList.contains("active")) {
//     icon.classList.replace("fa-regular", "fa-solid");
//     navCount.style.display = "flex"; // Show count in navbar
//   } else {
//     icon.classList.replace("fa-solid", "fa-regular");
//     navCount.style.display = "none";
//   }
// }

// // 2. Quantity Logic
// function updateQty(val) {
//   quantity += val;
//   if (quantity < 1) quantity = 1;
//   document.getElementById("qty-val").innerText = quantity;
// }


// // 4. Add to Cart Logic
// function handleAddToCart() {
//   const btn = document.getElementById("addToCartBtn");
//   const originalContent = btn.innerHTML;

//   // Visual success feedback
//   btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Added to Cart';
//   btn.style.background = "#dcfce7";
//   btn.style.color = "#166534";
//   btn.style.borderColor = "#166534";

//   // Reset after 2 seconds
//   setTimeout(() => {
//     btn.innerHTML = originalContent;
//     btn.style.background = "white";
//     btn.style.color = "var(--color-brand-dark)";
//     btn.style.borderColor = "var(--color-brand-dark)";
//   }, 2000);
// }
