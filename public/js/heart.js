function showToast(message, success = true) {
  const toast = document.createElement("div");

  toast.innerText = message;

  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.background = success ? "#16a34a" : "#dc2626"; // green / red
  toast.style.color = "#fff";
  toast.style.padding = "12px 18px";
  toast.style.borderRadius = "8px";
  toast.style.fontSize = "14px";
  toast.style.zIndex = "99999";
  toast.style.opacity = "0";
  toast.style.transition = "opacity 0.4s ease";

  document.body.appendChild(toast);

  // fade in
  setTimeout(() => {
    toast.style.opacity = "1";
  }, 50);

  // remove after 5 sec
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 400);
  }, 5000);
}



async function toggleFav(icon, productId) {
  try {
    const res = await fetch("/wishlist/toggle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });

    if (res.status === 401) {
      showToast("Please login to use wishlist ❤️", false);
      return;
    }

    const data = await res.json();

    if (data.added) {
      icon.classList.add("active");
      showToast("Added to wishlist ❤️", true);
    } else {
      icon.classList.remove("active");
      showToast("Removed from wishlist 🤍", false);
    }

  } catch (err) {
    console.error("Wishlist error:", err);
    showToast("Something went wrong 😢", false);
  }
}
