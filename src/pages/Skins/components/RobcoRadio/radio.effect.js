document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".retro-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.classList.add("flash");
      setTimeout(() => btn.classList.remove("flash"), 150);
    });
  });
});