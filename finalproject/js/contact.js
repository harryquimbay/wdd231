const menuBtn = document.querySelector("#menuBtn");
const mainNav = document.querySelector("#mainNav");
const timestampField = document.querySelector("#timestamp");

if (menuBtn && mainNav) {
    menuBtn.addEventListener("click", () => {
        mainNav.classList.toggle("open");
        const expanded = menuBtn.getAttribute("aria-expanded") === "true";
        menuBtn.setAttribute("aria-expanded", String(!expanded));
    });
}

if (timestampField) {
    const now = new Date();
    timestampField.value = now.toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short"
    });
}