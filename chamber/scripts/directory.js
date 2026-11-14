
const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");

let members = [];

const membershipLevels = {
    1: "Standard Member",
    2: "Silver Member",
    3: "Gold Member"
};

const membershipClasses = {
    1: "member",
    2: "silver",
    3: "gold"
};

function createMemberCard(member) {
    const card = document.createElement("article");
    card.classList.add("member-card");

    const image = document.createElement("img");
    image.src = `images/${member.image}`;
    image.alt = `${member.name} business logo`;
    image.loading = "lazy";
    image.width = 300;
    image.height = 180;

    const info = document.createElement("div");
    info.classList.add("member-info");

    const name = document.createElement("h3");
    name.textContent = member.name;

    const level = document.createElement("span");
    level.classList.add("membership-level");

    level.textContent =
        membershipLevels[member.membership] || "Standard Member";

    level.classList.add(
        membershipClasses[member.membership] || "member"
    );

    const category = document.createElement("p");
    category.textContent = member.category;

    const description = document.createElement("p");
    description.textContent = member.description;

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

    info.append(
        name,
        level,
        category,
        description,
        address,
        phone,
        website
    );

    card.append(image, info);

    return card;
}

function displayMembers(memberList) {
    membersContainer.replaceChildren();

    if (memberList.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No chamber members are available.";
        membersContainer.appendChild(message);
        return;
    }

    const fragment = document.createDocumentFragment();

    memberList.forEach((member) => {
        fragment.appendChild(createMemberCard(member));
    });

    membersContainer.appendChild(fragment);
}

function setView(view) {
    const isGrid = view === "grid";

    membersContainer.classList.toggle("members-grid", isGrid);
    membersContainer.classList.toggle("members-list", !isGrid);

    gridButton.setAttribute("aria-pressed", String(isGrid));
    listButton.setAttribute("aria-pressed", String(!isGrid));
}

async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error(
                `Failed to load members: ${response.status}`
            );
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error("Invalid members data format.");
        }

        members = data;

        displayMembers(members);
    } catch (error) {
        console.error("Error loading chamber members:", error);

        membersContainer.replaceChildren();

        const message = document.createElement("p");
        message.textContent =
            "Unable to load the business directory. Please try again later.";

        membersContainer.appendChild(message);
    }
}

gridButton.addEventListener("click", () => {
    setView("grid");
});

listButton.addEventListener("click", () => {
    setView("list");
});

getMembers();

