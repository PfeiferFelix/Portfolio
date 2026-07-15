
/**
 * IDs of the text contact fields mapped to the validator that shows or clears
 * their inline error. Used for wiring blur/input listeners and live validation.
 */
const CONTACT_FIELD_VALIDATORS = {
    contactName: validateName,
    contactEmail: validateContactEmail,
    contactMessage: validateContactMessage,
};

/**
 * Tracks which fields the user has already interacted with (left at least once),
 * so errors are only shown after a field has been touched — never on page load.
 * @type {Set<string>}
 */
const touchedContactFields = new Set();

/**
 * Wires up the contact form and mobile menu event listeners on load; each lookup
 * is guarded so it works on pages where a given element is absent.
 */
let contactSendBtn = document.getElementById("contactSendBtn");
if (contactSendBtn) {
    contactSendBtn.addEventListener("click", sendContactForm);
    Object.keys(CONTACT_FIELD_VALIDATORS).forEach(wireContactField);
    wirePrivacyBox();
    updateSendButtonState();
}

/**
 * Wires blur/input listeners for one contact field: leaving it marks it touched
 * and validates it, and once touched it re-validates live while typing.
 * @param {string} id - ID of the contact field to wire.
 */
function wireContactField(id) {
    const field = document.getElementById(id);
    if (!field) return;
    field.addEventListener("blur", function () {
        touchedContactFields.add(id);
        CONTACT_FIELD_VALIDATORS[id]();
        updateSendButtonState();
    });
    field.addEventListener("input", function () {
        if (touchedContactFields.has(id)) CONTACT_FIELD_VALIDATORS[id]();
        updateSendButtonState();
    });
}

/**
 * Wires the privacy checkbox to mark itself touched and re-validate on change.
 */
function wirePrivacyBox() {
    const privacyBox = document.getElementById("privacy");
    if (!privacyBox) return;
    privacyBox.addEventListener("change", function () {
        touchedContactFields.add("privacy");
        checkPrivacy();
        updateSendButtonState();
    });
}

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
 * Enables the Send button only while the entire form is valid: a name with at
 * least one letter, a valid email, a non-empty message and privacy consent.
 * The button stays disabled until every requirement is met.
 *
 * @returns {void}
 */
function updateSendButtonState() {
    if (!contactSendBtn) return;
    contactSendBtn.disabled = !(isNameValid() && isEmailValid() && isMessageValid() && isPrivacyChecked());
}

/**
 * Clears all contact form fields, errors and touched state after a successful
 * submission, then re-evaluates the (now disabled) Send button.
 */
function clearContactForm() {
    document.getElementById("contactName").value = "";
    document.getElementById("contactEmail").value = "";
    document.getElementById("contactMessage").value = "";
    document.getElementById("privacy").checked = false;

    touchedContactFields.clear();
    clearFieldError("contactName", "contactNameError");
    clearFieldError("contactEmail", "contactEmailError");
    clearFieldError("contactMessage", "contactMessageError");
    clearPrivacyError();

    updateSendButtonState();
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
 * Shows the localized privacy-consent error message.
 * @returns {void}
 */
function showPrivacyError() {
    const privacyError = document.getElementById("contactPrivacyError");
    if (!privacyError) return;
    privacyError.setAttribute("data-i18n", "contact.error.privacy");
    privacyError.textContent = window.i18n.t("contact.error.privacy");
}

/**
 * Clears the privacy-consent error message.
 * @returns {void}
 */
function clearPrivacyError() {
    const privacyError = document.getElementById("contactPrivacyError");
    if (!privacyError) return;
    privacyError.removeAttribute("data-i18n");
    privacyError.textContent = "";
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
 * @returns {boolean} `true` if the name is non-empty and contains at least one letter.
 */
function isNameValid() {
    const name = document.getElementById("contactName").value.trim();
    return name.length > 0 && /[a-zA-ZÀ-ÿ]/.test(name);
}

/**
 * @returns {boolean} `true` if the email field holds a syntactically valid address.
 */
function isEmailValid() {
    return isValidEmail(document.getElementById("contactEmail").value.trim());
}

/**
 * @returns {boolean} `true` if the message field is not empty.
 */
function isMessageValid() {
    return document.getElementById("contactMessage").value.trim().length > 0;
}

/**
 * @returns {boolean} `true` if the privacy checkbox is checked.
 */
function isPrivacyChecked() {
    return document.getElementById("privacy").checked;
}


/**
 * Validates the email field: shows the error when invalid, clears it when valid.
 *
 * @returns {boolean} `true` if the entered email is valid, otherwise `false`.
 */
function validateContactEmail() {
    if (!isEmailValid()) {
        showFieldError("contactEmail", "contactEmailError", "contact.error.email");
        return false;
    }
    clearFieldError("contactEmail", "contactEmailError");
    return true;
}

/**
 * Validates the name field, requiring a non-empty value that contains at least
 * one letter. Shows the matching error when invalid, clears it when valid.
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
    clearFieldError("contactName", "contactNameError");
    return true;
}

/**
 * Validates the message field, requiring a non-empty value. Shows the error when
 * invalid, clears it when valid.
 *
 * @returns {boolean} `true` if a message was entered, otherwise `false`.
 */
function validateContactMessage() {
    if (!isMessageValid()) {
        showFieldError("contactMessage", "contactMessageError", "contact.error.message");
        return false;
    }
    clearFieldError("contactMessage", "contactMessageError");
    return true;
}


/**
 * Ensures the privacy policy checkbox is checked. Shows the error when it is not,
 * clears it when it is.
 *
 * @returns {boolean} `true` if the privacy checkbox is checked, otherwise `false`.
 */
function checkPrivacy() {
    if (!isPrivacyChecked()) {
        showPrivacyError();
        return false;
    }
    clearPrivacyError();
    return true;
}

/**
 * Runs all contact form field validations, showing errors for every invalid
 * field. Marks all fields as touched so subsequent live validation stays active.
 *
 * @returns {boolean} `true` if every field is valid, otherwise `false`.
 */
function validateContactForm() {
    ["contactName", "contactEmail", "contactMessage", "privacy"].forEach(function (id) {
        touchedContactFields.add(id);
    });

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

    contactSendBtn.disabled = true;

    try {
        let response = await fetch("contact_form_mail.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(getContactFormData()),
        });

        if (response.ok) {
            clearContactForm();
            showToast("contact.toast");
        } else {
            showToast("contact.toast.error");
            updateSendButtonState();
        }
    } catch (error) {
        showToast("contact.toast.error");
        updateSendButtonState();
    }
}

/**
 * Displays a localized confirmation or error message above the page content.
 * @param {string} messageKey - i18n key for the toast text.
 * @returns {void}
 */
function showToast(messageKey) {
    const existingToast = document.querySelector(".toast");
    if (existingToast) existingToast.remove();

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    toast.textContent = window.i18n.t(messageKey);
    document.body.appendChild(toast);

    window.setTimeout(function () {
        toast.remove();
    }, 6000);
}

/**
 * Reads the current contact form field values into a plain payload object.
 * @returns {{name: string, email: string, message: string}}
 */
function getContactFormData() {
    return {
        name: document.getElementById("contactName").value.trim(),
        email: document.getElementById("contactEmail").value.trim(),
        message: document.getElementById("contactMessage").value.trim(),
    };
}
