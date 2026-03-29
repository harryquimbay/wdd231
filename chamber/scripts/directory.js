const membersContainer = document.getElementById("membersContainer");
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");

async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
        throw new Error("Unable to load member data.");
        }

        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error("Error loading member data:", error);
        membersContainer.innerHTML = "<p>Sorry, the directory could not be loaded.</p>";
    }
}

function getMembershipLabel(level) {
    if (level === 1) return "Member";
    if (level === 2) return "Silver";
    if (level === 3) return "Gold";
    return "Member";
}

function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("section");
        card.classList.add("member-card");

        card.innerHTML = `
        <img src="${member.image}" alt="${member.name} logo" loading="lazy" width="120" height="120">
        <div>
            <h3>${member.name}</h3>
            <p>${member.description}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a></p>
            <p><strong>Membership:</strong> ${getMembershipLabel(member.membership)}</p>
        </div>
        `;

    membersContainer.appendChild(card);
    });
}

if (gridBtn && listBtn && membersContainer) {
    gridBtn.addEventListener("click", () => {
        membersContainer.classList.add("members-grid");
        membersContainer.classList.remove("members-list");
        gridBtn.classList.add("active");
        listBtn.classList.remove("active");
    });

    listBtn.addEventListener("click", () => {
        membersContainer.classList.add("members-list");
        membersContainer.classList.remove("members-grid");
        listBtn.classList.add("active");
        gridBtn.classList.remove("active");
    });
}

getMembers();