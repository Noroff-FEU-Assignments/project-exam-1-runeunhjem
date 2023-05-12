import { validateContactForm } from "./validate-contact-form.js";
const contactName = document.getElementById("name-input");
const contactEmail = document.getElementById("email-input");
const contactSubject = document.getElementById("subject-input");
const contactContent = document.getElementById("comment-input");
const contactForm = document.getElementById("contact-form");
const sendMessageButton = document.getElementById("send-message");
const contactNameError = document.getElementById("name-input-error");
const contactEmailError = document.getElementById("email-input-error");
const contactSubjectError = document.getElementById("subject-input-error");
const contactContentError = document.getElementById("message-input-error");
const confirmSuccess = document.getElementById("message-sent");

contactName.addEventListener("input", validateContactForm);
contactEmail.addEventListener("input", validateContactForm);
contactSubject.addEventListener("input", validateContactForm);
contactContent.addEventListener("input", validateContactForm);