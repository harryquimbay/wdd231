const visitMessage = document.getElementById("visitMessage");
const storageKey = "lastVisit";

if (visitMessage) {
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