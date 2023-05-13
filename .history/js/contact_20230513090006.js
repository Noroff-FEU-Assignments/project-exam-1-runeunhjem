import { validateContactForm } from "./validate-contact-form.js";
const contactName = document.getElementById("your-name");
const contactEmail = document.getElementById("your-email");
const contactSubject = document.getElementById("your-subject");
const contactContent = document.getElementById("your-message");

contactName.addEventListener("input", validateContactForm);
contactEmail.addEventListener("input", validateContactForm);
contactSubject.addEventListener("input", validateContactForm);
contactContent.addEventListener("input", validateContactForm);

const form = document.getElementById("contact-form");
form.addEventListener("submit", handleSubmit);
const cf7ApiUrl = "https://wordpress.runeunhjem.no/wp-json/contact-form-7/v1/contact-forms/158/feedback";
async function handleSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("your-name").value;
  const email = document.getElementById("your-email").value;
  const subject = document.getElementById("your-subject").value;
  const message = document.getElementById("your-message").value;

  const formContent = new URLSearchParams();
  formContent.append("your-name", name);
  formContent.append("your-email", email);
  formContent.append("your-subject", subject);
  formContent.append("your-message", message);

  try {
    const response = await fetch(cf7ApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formContent),
    });

    if (!response.ok) {
      throw new Error("Error:", response.status);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}
