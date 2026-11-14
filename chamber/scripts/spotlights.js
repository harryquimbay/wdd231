
const spotlightsContainer = document.querySelector("#spotlights");

const spotlightMemberships = {
    2: "Silver Member",
    3: "Gold Member"
};

async function getSpotlightMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const members = await response.json();

        if (!Array.isArray(members)) {
            throw new Error("Invalid member data format.");
        }

        const eligibleMembers = members.filter(
            member => member.membership === 2 || member.membership === 3
        );

        const shuffledMembers = [...eligibleMembers];

        for (let i = shuffledMembers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [shuffledMembers[i], shuffledMembers[j]] =
                [shuffledMembers[j], shuffledMembers[i]];
        }

        const selectedMembers = shuffledMembers.slice(0, 3);

        displaySpotlights(selectedMembers);

    } catch (error) {
        console.error("Error loading member spotlights:", error);

        spotlightsContainer.textContent =
            "Unable to load featured businesses at this time.";
    }
}

function displaySpotlights(members) {
    spotlightsContainer.replaceChildren();

    if (members.length === 0) {
        spotlightsContainer.textContent =
            "No featured businesses are currently available.";
        return;
    }

    members.forEach(member => {
        const card = document.createElement("article");
        card.classList.add("spotlight-card");

        const heading = document.createElement("h3");
        heading.textContent = member.name;

        const image = document.createElement("img");
        image.src = `images/${member.image}`;
        image.alt = `${member.name} logo`;
        image.loading = "lazy";
        image.width = 180;
        image.height = 120;

        const membership = document.createElement("p");
        membership.classList.add("spotlight-membership");
        membership.textContent =
            spotlightMemberships[member.membership];

        const address = document.createElement("p");
        address.textContent = member.address;

        const phone = document.createElement("p");
        phone.textContent = member.phone;

        const website = document.createElement("a");
        website.href = member.website;
        website.textContent = "Visit Website";
        website.target = "_blank";
        website.rel = "noopener noreferrer";
        website.setAttribute(
            "aria-label",
            `Visit ${member.name} website (opens in a new tab)`
        );

        card.append(
            heading,
            image,
            membership,
            address,
            phone,
            website
        );

        spotlightsContainer.appendChild(card);
    });
}

getSpotlightMembers();
