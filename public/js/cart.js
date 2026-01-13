function toggleAdvance(element) {
  const advanceBox = document.getElementById("advanceBox");
  const balanceRow = document.getElementById("balanceRow");

  if (!advanceBox || !balanceRow) return;

  if (element.value === "cod") {
    advanceBox.classList.remove("hidden");
    balanceRow.classList.remove("hidden");
  } else {
    advanceBox.classList.add("hidden");
    balanceRow.classList.add("hidden");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const lol = document.querySelector(".lol");
  const kok = document.querySelector(".kok");
  const summaryPanel = document.querySelector("aside .glass-panel");
  const advanceBox = document.getElementById("advanceBox");
  const balanceRow = document.getElementById("balanceRow");

  // ❗ Agar cart / checkout page nahi hai to script quietly stop
  if (!lol || !kok) return;

  const updateDisplay = (method) => {
    if (summaryPanel) summaryPanel.style.display = "block";

    if (advanceBox && balanceRow) {
      if (method === "cod") {
        advanceBox.classList.remove("hidden");
        balanceRow.classList.remove("hidden");
      } else {
        advanceBox.classList.add("hidden");
        balanceRow.classList.add("hidden");
      }
    }
  };

  // ONLINE
  lol.addEventListener("click", () => {
    const radio = lol.querySelector('input[type="radio"]');
    if (radio) radio.checked = true;
    updateDisplay("online");
  });

  // COD
  kok.addEventListener("click", () => {
    const radio = kok.querySelector('input[type="radio"]');
    if (radio) radio.checked = true;
    updateDisplay("cod");
  });
});


// ================= CART FUNCTIONS =================

async function updateCartQty(productId, action) {
  await fetch("/cart/update-qty", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, action }),
  });

  location.reload();
}

async function removeItem(productId) {
  await fetch("/cart/remove", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
  });

  location.reload();
}


// ================= MODAL =================

// function openCheckout() {
//   const modal = document.getElementById("checkoutModal");
//   if (modal) modal.classList.remove("hidden");
// }

// function closeCheckout() {
//   const modal = document.getElementById("checkoutModal");
//   if (modal) modal.classList.add("hidden");
// }
