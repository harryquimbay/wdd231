const menuButton = document.querySelector("#menu");
const navMenu = document.querySelector("#nav-menu");

menuButton.addEventListener("click", () => {
    navMenu.classList.toggle("open");

    const isOpen = navMenu.classList.contains("open");
    menuButton.setAttribute("aria-expanded", isOpen);
});