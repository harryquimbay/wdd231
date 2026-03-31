const spotlightContainer = document.getElementById("spotlights");

export async function loadSpotlights() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
        throw new Error("Member data could not be loaded.");
    }

    const members = await response.json();
    const spotlightMembers = members
        .filter(member => member.membership === 2 || member.membership === 3)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

    displaySpotlights(spotlightMembers);
} catch (error) {
    console.error(error);
    if (spotlightContainer) {
        spotlightContainer.innerHTML = "<p>Spotlights are unavailable at the moment.</p>";
        }
    }
}

function displaySpotlights(members) {
    if (!spotlightContainer) return;

    spotlightContainer.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        card.innerHTML = `
        <img src="${member.image}" alt="${member.name} logo" loading="lazy" width="120" height="120">
        <div>
            <h3>${member.name}</h3>
            <p>${member.description}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
        </div>
    `;

    spotlightContainer.appendChild(card);
    });
}