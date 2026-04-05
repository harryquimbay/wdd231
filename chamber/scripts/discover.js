import { places } from "../data/places.mjs";

const visitMessage = document.getElementById("visitMessage");
const cardsContainer = document.getElementById("discoverCards");
const storageKey = "lastVisit";

function showVisitMessage() {
    if (!visitMessage) return;

    const lastVisit = localStorage.getItem(storageKey);
    const now = Date.now();

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const diff = now - Number(lastVisit);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else if (days === 1) {
            visitMessage.textContent = "You last visited 1 day ago.";
        } else {
            visitMessage.textContent = `You last visited ${days} days ago.`;
        }
    }

    localStorage.setItem(storageKey, now.toString());
}

function displayPlaces() {
    if (!cardsContainer) return;

    places.forEach((place, index) => {
        const card = document.createElement("article");
        card.classList.add("discover-card");
        card.style.gridArea = `card${index + 1}`;

        card.innerHTML = `
            <h2>${place.title}</h2>
            <figure>
                <img src="${place.image}" alt="${place.alt}" loading="lazy" width="300" height="200">
            </figure>
            <address>${place.address}</address>
            <p>${place.description}</p>
            <button type="button">Learn More</button>
        `;

        cardsContainer.appendChild(card);
    });
}

function setFooterInfo() {
    const year = document.getElementById("currentyear");
    const lastModified = document.getElementById("lastModified");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

    if (lastModified) {
        lastModified.textContent = `Last Modified: ${document.lastModified}`;
    }
}

showVisitMessage();
displayPlaces();
setFooterInfo();