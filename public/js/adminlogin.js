function togglePass() {
  const passInput = document.getElementById("password");
  const icon = document.querySelector(".toggle-password");
  if (passInput.type === "password") {
    passInput.type = "text";
    icon.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    passInput.type = "password";
    icon.classList.replace("fa-eye-slash", "fa-eye");
  }
}

function handleLogin(e) {
  e.preventDefault();
  const btn = document.getElementById("loginBtn");
  const originalText = btn.innerHTML;

  // Show loading state
  btn.innerHTML =
    '<i class="fa-solid fa-circle-notch fa-spin"></i> Authenticating...';
  btn.style.opacity = "0.8";
  btn.style.pointerEvents = "none";

  // Simulate server delay
  setTimeout(() => {
    // Redirect to your dashboard page
    window.location.href = "adminDashbord.html";
  }, 1500);
}
