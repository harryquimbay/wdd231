
const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#navigation");


menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", String(isOpen));

menuButton.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
);

  // Change the hamburger icon
menuButton.textContent = isOpen ? "✕" : "☰";
});
