const forgotPasswordForm = document.getElementById("forgotPasswordForm");
const verifyCodeForm = document.getElementById("verifyCodeForm");
const phoneInput = document.getElementById("phone");
const displayPhoneNumber = document.getElementById("displayPhoneNumber");

const forgotPasswordScreen = document.getElementById("forgotPasswordScreen");
const verifyCodeScreen = document.getElementById("verifyCodeScreen");

const resendLink = document.getElementById("resendLink");
const resendMessage = document.getElementById("resendMessage");
const timerElement = document.getElementById("timer");

// Initial Phone number (Hardcoded for demo, would be dynamic in a real app)
let timerSeconds = 60;
let timerInterval;

function startTimer() {
  timerSeconds = 60;
  resendLink.style.display = "none";
  resendMessage.style.display = "inline";
  timerElement.textContent = timerSeconds + "s";

  timerInterval = setInterval(() => {
    timerSeconds--;
    timerElement.textContent = timerSeconds + "s";

    if (timerSeconds <= 0) {
      clearInterval(timerInterval);
      resendMessage.style.display = "none";
      resendLink.style.display = "inline";
    }
  }, 1000);
}

// --- SCREEN SWAPPING LOGIC ---

// 1. Handle submission of the Phone Number form
forgotPasswordForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const phoneNumber = phoneInput.value;

  // --- SIMULATED BACKEND CALL: Send SMS ---
  console.log(`Sending reset code via SMS to: ${phoneNumber}`);

  // Update the display phone number on the verification screen
  // NOTE: You would typically mask the number here, e.g., (+1) 555-***-4567
  displayPhoneNumber.textContent = phoneNumber;

  // Hide the first screen and show the second screen
  forgotPasswordScreen.classList.add("hidden-screen");
  verifyCodeScreen.classList.remove("hidden-screen");

  // Start the resend timer
  startTimer();

  alert(`Code sent to ${phoneNumber}. Please enter it on the next screen.`);
});

// 2. Handle Resend link click
resendLink.addEventListener("click", function (e) {
  e.preventDefault();
  console.log(`Resending code to ${displayPhoneNumber.textContent}...`);
  alert("Code resent! Starting 60-second timer again.");
  // In a real app, this triggers the server to send a new SMS
  startTimer();
});

// 3. Handle Verification Code submission
verifyCodeForm.addEventListener("submit", function (e) {
  e.preventDefault();
  clearInterval(timerInterval); // Stop timer on submission

  const code = document.getElementById("verificationCode").value;

  // --- SIMULATED BACKEND CALL: Verify Code ---
  console.log(
    `Verifying code ${code} for number ${displayPhoneNumber.textContent}`
  );

  if (code === "123456") {
    // Example correct code
    console.log("Status: Verification SUCCESS!");
    alert("Verification successful! Proceeding to set new password.");
    // Redirect to the Set New Password page
    // window.location.href = "set_new_password.html";
  } else {
    console.log("Status: Verification FAILED (Incorrect Code)");
    alert("Verification failed. Please check the code and try again.");
  }
});
