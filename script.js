/**
 * @file Portfolio interactivity: mobile navigation menu toggling and the
 * client-side validation and submission of the contact form.
 */

// Wire up DOM event listeners once the script loads. Each lookup is guarded so
// the script works on pages where a given element is absent.
let contactSendBtn = document.getElementById("contactSendBtn");
if (contactSendBtn) contactSendBtn.addEventListener("click", sendContactForm);

let burgerBtn = document.getElementById("burgerBtn");
if (burgerBtn) burgerBtn.addEventListener("click", openMobileMenu);

let mobileMenuClose = document.getElementById("mobileMenuClose");
if (mobileMenuClose) mobileMenuClose.addEventListener("click", closeMobileMenu);

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
 * Clears all contact form fields after a successful submission.
 */
function clearContactForm() {
    document.getElementById("contactName").value = "";
    document.getElementById("contactEmail").value = "";
    document.getElementById("contactMessage").value = "";
    document.getElementById("privacy").checked = false;
}


/**
 * Marks a form field as invalid and shows a localized error message beneath it.
 *
 * @param {string} inputId - ID of the input element to flag with the error style.
 * @param {string} errorId - ID of the element that displays the error message.
 * @param {string} messageKey - i18n key used to look up the localized error text.
 * @returns {void}
 */
function showFieldError(inputId, errorId, messageKey) {
    document.getElementById(inputId).classList.add("input--error");
    const errorEl = document.getElementById(errorId);
    errorEl.setAttribute("data-i18n", messageKey);
    errorEl.textContent = window.i18n.t(messageKey);
}

/**
 * Removes the error state and message from a form field.
 *
 * @param {string} inputId - ID of the input element to clear the error style from.
 * @param {string} errorId - ID of the element that displays the error message.
 * @returns {void}
 */
function clearFieldError(inputId, errorId) {
    document.getElementById(inputId).classList.remove("input--error");
    const errorEl = document.getElementById(errorId);
    errorEl.removeAttribute("data-i18n");
    errorEl.textContent = "";
}

/**
 * Checks whether a string is a syntactically valid email address.
 *
 * @param {string} contactEmail - The email address to validate.
 * @returns {boolean} `true` if the value matches the email pattern, otherwise `false`.
 */
function isValidEmail(contactEmail) {
    return /^[^\s@]+@[a-zA-Z0-9]([a-zA-Z0-9\-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9\-]*[a-zA-Z0-9])?)+$/.test(contactEmail);
}


/**
 * Validates the contact form email field and shows an error if it is invalid.
 *
 * @returns {boolean} `true` if the entered email is valid, otherwise `false`.
 */
function validateContactEmail() {
    const contactEmail = document.getElementById("contactEmail").value.trim();
    if (!isValidEmail(contactEmail)) {
        showFieldError("contactEmail", "contactEmailError", "contact.error.email");
        return false;
    }
    return true;
}

/**
 * Validates the contact form name field, requiring a non-empty value that
 * contains at least one letter, and shows an error if it is invalid.
 *
 * @returns {boolean} `true` if the entered name is valid, otherwise `false`.
 */
function validateName() {
    const name = document.getElementById("contactName").value.trim();
    if (!name) {
        showFieldError("contactName", "contactNameError", "contact.error.name.required");
        return false;
    }
    if (!/[a-zA-ZÀ-ÿ]/.test(name)) {
        showFieldError("contactName", "contactNameError", "contact.error.name.letters");
        return false;
    }
    return true;
}
/**
 * Validates the contact form message field, requiring a non-empty value, and
 * shows an error if it is invalid.
 *
 * @returns {boolean} `true` if a message was entered, otherwise `false`.
 */
function validateContactMessage() {
    const message = document.getElementById("contactMessage").value.trim();
    if (!message) {
        showFieldError("contactMessage", "contactMessageError", "contact.error.message");
        return false;
    }
    return true;
}


/**
 * Ensures the privacy policy checkbox is checked and shows a localized error if not.
 *
 * @returns {boolean} `true` if the privacy checkbox is checked, otherwise `false`.
 */
function checkPrivacy() {
    const privacy = document.getElementById("privacy");
    if (!privacy.checked) {
        const privacyError = document.getElementById("contactPrivacyError");
        if (privacyError) {
            privacyError.setAttribute("data-i18n", "contact.error.privacy");
            privacyError.textContent = window.i18n.t("contact.error.privacy");
        }
        return false;
    }
    return true;
}

/**
 * Runs all contact form field validations. Clears previous errors first, then
 * validates name, email, message and privacy consent.
 *
 * @returns {boolean} `true` if every field is valid, otherwise `false`.
 */
function validateContactForm() {
    clearFieldError("contactName", "contactNameError");
    clearFieldError("contactEmail", "contactEmailError");
    clearFieldError("contactMessage", "contactMessageError");
    clearFieldError("privacy", "contactPrivacyError");

    let isValid = true;
    if (!validateName()) isValid = false;
    if (!validateContactEmail()) isValid = false;
    if (!validateContactMessage()) isValid = false;
    if (!checkPrivacy()) isValid = false;
    return isValid;
}
/**
 * Validates and submits the contact form. On successful validation the field
 * values are POSTed as JSON to `contact_form_mail.php`; the form is cleared only
 * if the server responds with an OK status.
 *
 * @async
 * @returns {Promise<void>} Resolves once the request has been handled.
 */
async function sendContactForm() {
    if (!validateContactForm()) return;

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