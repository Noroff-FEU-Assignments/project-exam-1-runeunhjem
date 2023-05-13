import { validateContactForm } from "./validate-contact-form.js";
const contactName = document.getElementById("name-input");
const contactEmail = document.getElementById("email-input");
const contactSubject = document.getElementById("subject-input");
const contactContent = document.getElementById("comment-input");

contactName.addEventListener("input", validateContactForm);
contactEmail.addEventListener("input", validateContactForm);
contactSubject.addEventListener("input", validateContactForm);
contactContent.addEventListener("input", validateContactForm);

// Example code for sending form data to Contact Form 7 via AJAX

const form = document.getElementById("contact-form"); // Replace with the ID of your form
form.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();

  // Collect form data
  const name = document.getElementById("name-input").value;
  const email = document.getElementById("email-input").value;
  const subject = document.getElementById("subject-input").value;
  const message = document.getElementById("comment-input").value;

  // Construct the payload
  const payload = {
    name: name, // Replace with the actual field name in your Contact Form 7 form
    email: email,
    subject: subject,
    message: message,
  };

  try {
    // Send POST request to Contact Form 7 API
    const response = await fetch("https://wordpress.runeunhjem.no/wp-json/contact-form-7/v1/contact-forms/158/feedback", {
      method: "POST",
      body: new URLSearchParams(payload), // Use URL-encoded form data
    });

    if (!response.ok) {
      throw new Error("Error:", response.status);
    }

    const data = await response.json();
    // Handle the response
    console.log(data);
    // Display success message or handle errors
  } catch (error) {
    console.error("Error:", error);
    // Handle errors
  }
}
