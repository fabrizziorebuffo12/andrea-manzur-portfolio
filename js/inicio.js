const contactBtn = document.getElementById("contactBtn");
const contactPanel = document.getElementById("contactPanel");

contactBtn.addEventListener("click", () => {
  contactPanel.classList.toggle("open");
});