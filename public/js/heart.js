// ===== GLOBAL STATE =====
let selectedSize = null;
let quantity = 1;

// ===== TOAST MESSAGE =====
function showToast(message, success = true) {
  const toast = document.createElement("div");
  toast.innerText = message;
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.background = success ? "#16a34a" : "#dc2626"; // green/red
  toast.style.color = "#fff";
  toast.style.padding = "12px 18px";
  toast.style.borderRadius = "8px";
  toast.style.fontSize = "14px";
  toast.style.zIndex = "99999";
  toast.style.opacity = "0";
  toast.style.transition = "opacity 0.4s ease";
  document.body.appendChild(toast);

  setTimeout(() => { toast.style.opacity = "1"; }, 50);
  setTimeout(() => { toast.style.opacity = "0"; setTimeout(() => toast.remove(), 400); }, 5000);
}

// ===== SIZE SELECTION =====
function selectSize(size, btn) {
  selectedSize = size;

  // Highlight selected button
  document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  // Hide error
  const err = document.getElementById("sizeError");
  if (err) err.classList.add("hidden");

  // Sync hidden field for Buy Now
  const hiddenSize = document.getElementById("selectedSize");
  if (hiddenSize) hiddenSize.value = size;
}

// ===== QUANTITY SELECTION =====
function changeQty(val) {
  quantity += val;
  if (quantity < 1) quantity = 1;
  document.getElementById("qty-val").innerText = quantity;
}

// ===== WISHLIST TOGGLE =====
async function toggleFav(icon, productId) {
  try {
    const res = await fetch("/wishlist/toggle", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId })
    });

    if (res.status === 401) {
      showToast("Please login to use wishlist ❤️", false);
      return;
    }

    const data = await res.json();

    if (data.added) {
      icon.classList.add("active");
      icon.classList.replace("fa-regular", "fa-solid");
      showToast("Added to wishlist ❤️", true);
    } else {
      icon.classList.remove("active");
      icon.classList.replace("fa-solid", "fa-regular");
      showToast("Removed from wishlist 🤍", false);
    }
  } catch (err) {
    console.error("Wishlist error:", err);
    showToast("Something went wrong 😢", false);
  }
}

// ===== ADD TO CART =====
async function addToCart(btn, productId) {
  try {
    // Default quantity to 1 if missing
    const qtyEl = document.getElementById("qty-val");
    const qty = qtyEl ? parseInt(qtyEl.innerText) : 1;

    // If product requires size, but no size selected, use null for wishlist
    const size = selectedSize || null;

    const res = await fetch("/add-to-cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, size, quantity: qty })
    });

    const data = await res.json();

    if (!data.success) {
      showToast(data.message || "Add to cart failed", false);
      return;
    }

    btn.innerHTML = "✔ Added";
    btn.disabled = true;
    btn.style.opacity = "0.7";

    showToast("Added to cart 🛒", true);

  } catch (err) {
    console.error("Add to cart error:", err);
    showToast("Something went wrong 😢", false);
  }
}


// ===== BUY NOW =====
function openCheckout() {
  const sizeError = document.getElementById("sizeError");

  if (sizeError && !selectedSize) {
    sizeError.classList.remove("hidden");
    showToast("Please select a shoe size", false);
    return;
  }

  const buyQty = document.getElementById("buyQty");
  if (buyQty) buyQty.value = document.getElementById("qty-val").innerText;

  const sizeInput = document.getElementById("selectedSize");
  if (sizeInput) sizeInput.value = selectedSize;

  document.getElementById("checkoutModal").classList.remove("hidden");
}

function closeCheckout() {
  document.getElementById("checkoutModal").classList.add("hidden");
}


async function toggleCart(btn, productId) {
  const inCart = btn.dataset.incart === "true";

  // REMOVE
  if (inCart) {
    const res = await fetch("/cart/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId })
    });

    const data = await res.json();

    if (data.success) {
      btn.querySelector("span").innerText = "Add to Cart";
      btn.dataset.incart = "false";
      showToast("Removed from cart 🗑️", false);
    }
    return;
  }

  // ADD
  const qty = parseInt(document.getElementById("qty-val").innerText);
  const size = selectedSize || null;

  const res = await fetch("/add-to-cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, size, quantity: qty })
  });

  const data = await res.json();

  if (data.success) {
    btn.querySelector("span").innerText = "✔ Added";
    btn.dataset.incart = "true";
    showToast("Added to cart 🛒", true);
  }
}


