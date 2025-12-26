function toggleAdvance(element) {
  const advanceBox = document.getElementById("advanceBox");
  const balanceRow = document.getElementById("balanceRow");

  if (element.value === "cod") {
    // If COD is selected, show the advance payment box
    advanceBox.classList.remove("hidden");
    balanceRow.classList.remove("hidden");
  } else {
    // If Online is selected, hide the advance payment box
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

  // 1. Hide the Summary Panel on page load
  if (summaryPanel) {
    summaryPanel.style.display = "none";
  }

  // 2. Main function to update visibility
  const updateDisplay = (method) => {
    // Make the summary panel visible
    summaryPanel.style.display = "block";

    if (method === "cod") {
      advanceBox.classList.remove("hidden");
      balanceRow.classList.remove("hidden");
    } else {
      advanceBox.classList.add("hidden");
      balanceRow.classList.add("hidden");
    }
  };

  // 3. Listen for clicks on the LOL (Online) container
  lol.addEventListener("click", () => {
    const radio = lol.querySelector('input[type="radio"]');
    radio.checked = true;
    updateDisplay("online");
  });

  // 4. Listen for clicks on the KOK (COD) container
  kok.addEventListener("click", () => {
    const radio = kok.querySelector('input[type="radio"]');
    radio.checked = true;
    updateDisplay("cod");
  });
});
