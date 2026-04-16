const menuBtn = document.querySelector("#menuBtn");
const mainNav = document.querySelector("#mainNav");

if (menuBtn && mainNav) {
    menuBtn.addEventListener("click", () => {
        mainNav.classList.toggle("open");
        const expanded = menuBtn.getAttribute("aria-expanded") === "true";
        menuBtn.setAttribute("aria-expanded", String(!expanded));
    });
}

const featuredContainer = document.querySelector("#featuredProducts");
const modal = document.querySelector("#productModal");
const modalContent = document.querySelector("#modalContent");
const closeModal = document.querySelector("#closeModal");
const gridBtn = document.querySelector("#gridView");
const listBtn = document.querySelector("#listView");

async function getProducts() {
    try {
        const response = await fetch("data/products.json");
        if (!response.ok) {
            throw new Error("Unable to load products data.");
        }

        const products = await response.json();
        return products;
    } catch (error) {
        if (featuredContainer) {
            featuredContainer.innerHTML = `<p>There was a problem loading products. ${error.message}</p>`;
        }
        return [];
    }
}

function renderFeatured(products) {
    if (!featuredContainer) return;

    const featured = products.filter((product) => product.featured).slice(0, 6);

    featuredContainer.innerHTML = featured.map((product) => `
        <article class="product-card">
            <img src="${product.image}" alt="${product.name}" loading="lazy" width="400" height="500">
            <span class="badge">${product.category}</span>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="btn primary details-btn" type="button" data-id="${product.id}" aria-label="View details for ${product.name}">
                View Details
            </button>
        </article>
    `).join("");

    const detailButtons = featuredContainer.querySelectorAll(".details-btn");

    detailButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selected = products.find((item) => item.id === Number(button.dataset.id));
            openModal(selected);
        });
    });
}

function openModal(product) {
    if (!modal || !modalContent || !product) return;

    modalContent.innerHTML = `
        <h2 id="modalTitle">${product.name}</h2>
        <img class="modal-image" src="${product.image}" alt="${product.name}" loading="lazy" width="400" height="500">
        <p><strong>Category:</strong> ${product.category}</p>
        <p><strong>Color:</strong> ${product.color}</p>
        <p><strong>Size Range:</strong> ${product.size}</p>
        <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
        <p>${product.description}</p>
    `;

    modal.showModal();
}

if (closeModal && modal) {
    closeModal.addEventListener("click", () => {
        modal.close();
    });
}

if (modal) {
    modal.addEventListener("click", (event) => {
        const dialogDimensions = modal.getBoundingClientRect();
        const clickedOutside =
            event.clientX < dialogDimensions.left ||
            event.clientX > dialogDimensions.right ||
            event.clientY < dialogDimensions.top ||
            event.clientY > dialogDimensions.bottom;

        if (clickedOutside) {
            modal.close();
        }
    });
}

function saveViewPreference(view) {
    localStorage.setItem("suienView", view);
}

function applyViewPreference() {
    if (!featuredContainer) return;

    const storedView = localStorage.getItem("suienView");

    if (storedView === "list") {
        featuredContainer.classList.add("list-view");
    } else {
        featuredContainer.classList.remove("list-view");
    }
}

if (gridBtn && featuredContainer) {
    gridBtn.addEventListener("click", () => {
        featuredContainer.classList.remove("list-view");
        saveViewPreference("grid");
    });
}

if (listBtn && featuredContainer) {
    listBtn.addEventListener("click", () => {
        featuredContainer.classList.add("list-view");
        saveViewPreference("list");
    });
}

async function initHomePage() {
    applyViewPreference();

    if (featuredContainer) {
        const products = await getProducts();
        renderFeatured(products);
    }
}

initHomePage();