const menuBtn = document.querySelector("#menuBtn");
const mainNav = document.querySelector("#mainNav");

if (menuBtn && mainNav) {
    menuBtn.addEventListener("click", () => {
        mainNav.classList.toggle("open");
        const expanded = menuBtn.getAttribute("aria-expanded") === "true";
        menuBtn.setAttribute("aria-expanded", String(!expanded));
    });
}

const productContainer = document.querySelector("#allProducts");
const categoryFilter = document.querySelector("#categoryFilter");
const modal = document.querySelector("#productModal");
const modalContent = document.querySelector("#modalContent");
const closeModal = document.querySelector("#closeModal");

let allProducts = [];

async function fetchProducts() {
    try {
        const response = await fetch("data/products.json");

        if (!response.ok) {
            throw new Error("Product data could not be loaded.");
        }

        const data = await response.json();
        allProducts = data;
        displayProducts(allProducts);
    } catch (error) {
        if (productContainer) {
            productContainer.innerHTML = `<p>There was a problem loading the products. ${error.message}</p>`;
        }
    }
}

function displayProducts(products) {
    if (!productContainer) return;

    productContainer.innerHTML = products.map((product) => `
        <article class="product-card">
            <img src="${product.image}" alt="${product.name}" loading="lazy" width="400" height="500">
            <span class="badge">${product.category}</span>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p><strong>Color:</strong> ${product.color}</p>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button
                class="btn primary details-btn"
                type="button"
                data-id="${product.id}"
                aria-label="View details for ${product.name}"
            >
                View Details
            </button>
        </article>
    `).join("");

    const detailButtons = productContainer.querySelectorAll(".details-btn");

    detailButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selected = allProducts.find((item) => item.id === Number(button.dataset.id));
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
        <p><strong>Size:</strong> ${product.size}</p>
        <p><strong>Material:</strong> ${product.material}</p>
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

if (categoryFilter) {
    categoryFilter.addEventListener("change", () => {
        const selectedCategory = categoryFilter.value;

        if (selectedCategory === "all") {
            displayProducts(allProducts);
        } else {
            const filteredProducts = allProducts.filter(
                (product) => product.category === selectedCategory
            );
            displayProducts(filteredProducts);
        }
    });
}

fetchProducts();