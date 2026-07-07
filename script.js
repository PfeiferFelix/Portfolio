document.getElementById("contactSendBtn").addEventListener("click", sendContactForm);
document.getElementById("burgerBtn").addEventListener("click", openMobileMenu);
document.getElementById("mobileMenuClose").addEventListener("click", closeMobileMenu);
document.querySelectorAll(".mobile_link").forEach(function (link) {
    link.addEventListener("click", closeMobileMenu);
});

/**
 * Opens the fullscreen mobile navigation menu.
 */
function openMobileMenu() {
    document.getElementById("mobileMenu").classList.add("open");
    document.body.style.overflow = "hidden";
}

/**
 * Closes the fullscreen mobile navigation menu.
 */
function closeMobileMenu() {
    document.getElementById("mobileMenu").classList.remove("open");
    document.body.style.overflow = "";
}

/**
 * Sends the contact form data as JSON to the PHP mail script on the server.
 */
async function sendContactForm() {
    let data = {
        name: document.getElementById("contactName").value,
        email: document.getElementById("contactEmail").value,
        message: document.getElementById("contactMessage").value,
    };

    let response = await fetch("contact_form_mail.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        clearContactForm();
    }
}

/**
 * Clears all contact form fields after a successful submission.
 */
function clearContactForm() {
    document.getElementById("contactName").value = "";
    document.getElementById("contactEmail").value = "";
    document.getElementById("contactMessage").value = "";
    document.getElementById("privacy").checked = false;
}
