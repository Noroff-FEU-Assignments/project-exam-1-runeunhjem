import { validateContactForm } from "./validate-contact-form.js";
const contactName = document.getElementById("name-input");
const contactEmail = document.getElementById("email-input");
const contactSubject = document.getElementById("subject-input");
const contactContent = document.getElementById("comment-input");

contactName.addEventListener("input", validateContactForm);
contactEmail.addEventListener("input", validateContactForm);
contactSubject.addEventListener("input", validateContactForm);
contactContent.addEventListener("input", validateContactForm);