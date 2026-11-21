
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);

    const fields = {
        firstName: "#confirm-first-name",
        lastName: "#confirm-last-name",
        email: "#confirm-email",
        phone: "#confirm-phone",
        organization: "#confirm-organization"
    };

Object.entries(fields).forEach(([parameter, selector]) => {
    const element = document.querySelector(selector);

    if (element) {
        element.textContent = params.get(parameter) || "Not provided";
    }
});

const timestampElement = document.querySelector(
    "#confirm-timestamp"
);

const timestamp = params.get("timestamp");

    if (timestampElement) {
        if (timestamp) {
        const date = new Date(timestamp);

        if (!Number.isNaN(date.getTime())) {
            timestampElement.textContent = date.toLocaleString(
            "en-US",
            {
                dateStyle: "long",
                timeStyle: "short"
            }
            );
        } else {
            timestampElement.textContent = "Invalid date";
        }
        } else {
        timestampElement.textContent = "Not provided";
        }
    }
});

