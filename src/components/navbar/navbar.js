/*activar el flash de la barra de navegacion */
document.querySelectorAll(".retro-btn").forEach(btn => {

    // Flash de luz cuando hacen clic
    btn.addEventListener("click", () => {
        btn.classList.add("flash");

        setTimeout(() => {
            btn.classList.remove("flash");
        }, 150); // efecto corto, estilo LED hardware
    });
});
