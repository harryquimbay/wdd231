
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#membership-form");
    const timestamp = document.querySelector("#timestamp");
    const dialogs = document.querySelectorAll(".membership-dialog");
    const benefitLinks = document.querySelectorAll("[data-dialog]");


if (timestamp) {
    timestamp.value = new Date().toISOString();
}


benefitLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const dialogId = link.dataset.dialog;
        const dialog = document.getElementById(dialogId);

    if (dialog instanceof HTMLDialogElement) {
        dialog.showModal();
        }
    });
});

// Close dialogs
dialogs.forEach((dialog) => {
    const closeButton = dialog.querySelector(".close-dialog");

    if (closeButton) {
        closeButton.addEventListener("click", () => {
        dialog.close();
        });
    }


    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
        dialog.close();
        }
    });
});


if (form) {
    form.addEventListener("submit", () => {
        if (timestamp && !timestamp.value) {
        timestamp.value = new Date().toISOString();
            }
        });
    }
});
