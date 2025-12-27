// Sidebar Toggle Logic
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
}

// Modal Logic
function openModal(modalId) {
  document.getElementById(modalId).style.display = "flex";
}

function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
}

function openEditModal(product) {
  // basic fields
  document.getElementById("editProductId").value = product._id;
  document.getElementById("editName").value = product.title;
  document.getElementById("editPrice").value = product.price;
  document.getElementById("editOffer").value = product.offerPercentage || 0;
  document.getElementById("editStock").value = product.totalStock;
  document.getElementById("editDescription").value = product.description || "";
  document.getElementById("editGender").value = product.gender;
  document.getElementById("editStatus").value = product.status;

  // sizes
  document
    .querySelectorAll('#editModal input[name="sizes"]')
    .forEach(cb => {
      cb.checked = product.sizes.includes(Number(cb.value));
    });

  // 🔥 IMAGE PREVIEW
  const preview = document.getElementById("editImagePreview");
  preview.innerHTML = "";

  product.images.forEach(img => {
    const image = document.createElement("img");
    image.src = img;
    image.style.width = "70px";
    image.style.height = "70px";
    image.style.objectFit = "cover";
    image.style.borderRadius = "6px";
    preview.appendChild(image);
  });

  openModal("editModal");
}


// Close on outside click
window.onclick = function (event) {
  if (event.target.classList.contains("modal-overlay")) {
    event.target.style.display = "none";
  }
};

function filterWatches(value) {
  if (value === "all") {
    window.location.href = "/admin-howmanywatchesuploaded";
  } else {
    window.location.href =
      "/admin-howmanywatchesuploaded?filter=" + value;
  }
}



document.querySelector('input[name="images"]').addEventListener("change", e => {
  const files = e.target.files;

  if (files.length > 4) {
    alert("Maximum 4 images allowed");
    e.target.value = "";
    return;
  }

  for (let file of files) {
    if (file.size > 2 * 1024 * 1024) {
      alert("Each image must be under 2MB");
      e.target.value = "";
      return;
    }
  }
});
