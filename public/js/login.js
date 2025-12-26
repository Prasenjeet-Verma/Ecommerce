// 1. Tab Switching Logic
const tabUsername = document.getElementById("tab-username");
const tabPhone = document.getElementById("tab-phone");

const usernameGroup = document.getElementById("input-group-username");
const phoneGroup = document.getElementById("input-group-phone");

const usernameInput = document.getElementById("username");
const phoneInput = document.getElementById("phone");

// Default state (username active)
usernameInput.disabled = false;
phoneInput.disabled = true;

tabUsername.addEventListener("click", function () {
  tabUsername.classList.add("active");
  tabPhone.classList.remove("active");

  usernameGroup.classList.remove("hidden");
  phoneGroup.classList.add("hidden");

  usernameInput.disabled = false;
  phoneInput.disabled = true;

  phoneInput.value = "";
});

tabPhone.addEventListener("click", function () {
  tabPhone.classList.add("active");
  tabUsername.classList.remove("active");

  phoneGroup.classList.remove("hidden");
  usernameGroup.classList.add("hidden");

  phoneInput.disabled = false;
  usernameInput.disabled = true;

  usernameInput.value = "";
});


// 2. Password Visibility Logic
const togglePassword = document.querySelector("#togglePassword");
const passwordInput = document.querySelector("#password");

togglePassword.addEventListener("click", function (e) {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  this.classList.toggle("fa-eye");
  this.classList.toggle("fa-eye-slash");
});
