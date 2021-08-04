// remove overlay and display game banner

const btn__reset = document.querySelector(".btn__reset");

btn__reset.addEventListener("click", (e) => {
  const overlay = btn__reset.parentNode;
  overlay.style.display = "none";
});
