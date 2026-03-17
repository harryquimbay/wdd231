const membersContainer = document.querySelector("#members-container");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");

async function getMembers() {
    const response = await fetch("data/members.json");
    const members = await response.json();
    displayMembers(members);
}

function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("article");
        card.classList.add("member-card");

        card.innerHTML = `
        <img src="${member.image}" alt="${member.name} logo" loading="lazy" width="300" height="200">
        <div>
            <h2>${member.name}</h2>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">Visit Site</a></p>
            <p><strong>Membership:</strong> ${getMembershipLevel(member.membership)}</p>
            <p>${member.description}</p>
        </div>
        `;

        membersContainer.appendChild(card);
    });
}

function getMembershipLevel(level) {
    if (level === 1) return "Member";
    if (level === 2) return "Silver";
    if (level === 3) return "Gold";
    return "Unknown";
}

gridButton.addEventListener("click", () => {
    membersContainer.classList.add("grid-view");
    membersContainer.classList.remove("list-view");
});

listButton.addEventListener("click", () => {
    membersContainer.classList.add("list-view");
    membersContainer.classList.remove("grid-view");
});

getMembers();