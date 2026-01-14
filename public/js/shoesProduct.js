// // Sidebar Toggle Logic
// function toggleSidebar() {
//   const sidebar = document.getElementById("sidebar");
//   const overlay = document.getElementById("sidebarOverlay");
//   sidebar.classList.toggle("active");
//   overlay.classList.toggle("active");
// }

// // Modal Logic
// function openModal(modalId) {
//   document.getElementById(modalId).style.display = "flex";
// }

// function closeModal(modalId) {
//   document.getElementById(modalId).style.display = "none";
// }

// function openEditModal(product) {
//   // basic fields
//   document.getElementById("editProductId").value = product._id;
//   document.getElementById("editName").value = product.title;
//   document.getElementById("editPrice").value = product.price;
//   document.getElementById("editOffer").value = product.offerPercentage || 0;
//   document.getElementById("editStock").value = product.totalStock;
//   document.getElementById("editDescription").value = product.description || "";
//   document.getElementById("editGender").value = product.gender;
//   document.getElementById("editBrand").value = product.brand;
//   document.getElementById("editStatus").value = product.status;

//   // sizes
//   document
//     .querySelectorAll('#editModal input[name="sizes"]')
//     .forEach(cb => {
//       cb.checked = product.sizes.includes(Number(cb.value));
//     });

//   // 🔥 IMAGE PREVIEW
//   const preview = document.getElementById("editImagePreview");
//   preview.innerHTML = "";

//   product.images.forEach(img => {
//     const image = document.createElement("img");
//     image.src = img;
//     image.style.width = "70px";
//     image.style.height = "70px";
//     image.style.objectFit = "cover";
//     image.style.borderRadius = "6px";
//     preview.appendChild(image);
//   });

//   openModal("editModal");
// }

// // Close on outside click
// window.onclick = function (event) {
//   if (event.target.classList.contains("modal-overlay")) {
//     event.target.style.display = "none";
//   }
// };

// function filterShoes(value) {
//   if (value === "all") {
//     window.location.href = "/admin-howmanyshoesuploaded";
//   } else {
//     window.location.href =
//       "/admin-howmanyshoesuploaded?filter=" + value;
//   }
// }

// document.querySelector('input[name="images"]').addEventListener("change", e => {
//   const files = e.target.files;

//   if (files.length > 4) {
//     alert("Maximum 4 images allowed");
//     e.target.value = "";
//     return;
//   }

//   for (let file of files) {
//     if (file.size > 2 * 1024 * 1024) {
//       alert("Each image must be under 2MB");
//       e.target.value = "";
//       return;
//     }
//   }
// });
// ================= Sidebar Toggle =================
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebarOverlay");

  if (sidebar && overlay) {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
  }
}

// ================= Modal Logic =================
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.style.display = "flex";
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.style.display = "none";
}

// ================= SAFE EDIT MODAL OPENER =================
// called from button onclick="openEditModalFromBtn(this)"
function openEditModalFromBtn(btn) {
  const id = btn.dataset.id;
  const jsonTag = document.getElementById("product-" + id);

  if (!jsonTag) {
    alert("Product data missing");
    return;
  }

  try {
    const product = JSON.parse(jsonTag.textContent);
    openEditModal(product);
  } catch (err) {
    console.error("❌ JSON parse failed:", err);
    alert("Product data corrupted. Check description / title.");
  }
}

// ================= Fill Edit Modal =================
function openEditModal(product) {
  // Basic fields
  document.getElementById("editProductId").value = product._id;
  document.getElementById("editName").value = product.title || "";
  document.getElementById("editPrice").value = product.price || 0;
  document.getElementById("editOffer").value = product.offerPercentage || 0;
  document.getElementById("editStock").value = product.totalStock || 0;
  document.getElementById("editDescription").value = product.description || "";
  document.getElementById("editGender").value = product.gender || "male";
  document.getElementById("editBrand").value = product.brand || "";
  document.getElementById("editStatus").value = product.status || "active";

  // ================= Sizes FIX =================
  document.querySelectorAll('#editModal input[name="sizes"]').forEach((cb) => {
    cb.checked = product.sizes && product.sizes.includes(cb.value);
  });

  // ================= Image Preview =================
  const preview = document.getElementById("editImagePreview");
  preview.innerHTML = "";

  if (product.images && product.images.length > 0) {
    product.images.forEach((img) => {
      const image = document.createElement("img");
      image.src = img;
      image.style.width = "70px";
      image.style.height = "70px";
      image.style.objectFit = "cover";
      image.style.borderRadius = "6px";
      image.style.border = "1px solid #ccc";
      preview.appendChild(image);
    });
  }

  openModal("editModal");
}

// ================= Close modal when clicking outside =================
window.addEventListener("click", function (event) {
  if (event.target.classList.contains("modal-overlay")) {
    event.target.style.display = "none";
  }
});

// ================= Filter Shoes =================
function filterShoes(value) {
  if (value === "all") {
    window.location.href = "/admin-howmanyshoesuploaded";
  } else {
    window.location.href = "/admin-howmanyshoesuploaded?filter=" + value;
  }
}

// ================= Image Validation (Add + Edit) =================
document.querySelectorAll('input[name="images"]').forEach((input) => {
  input.addEventListener("change", (e) => {
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
});
// ================= End of File =================
