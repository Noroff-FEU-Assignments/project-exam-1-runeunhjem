import { validateContactForm, contactName, contactEmail, contactSubject, contactContent } from "./validate-contact-form.js";

contactName.addEventListener("input", validateContactForm);
contactEmail.addEventListener("input", validateContactForm);
contactSubject.addEventListener("input", validateContactForm);
contactContent.addEventListener("input", validateContactForm);