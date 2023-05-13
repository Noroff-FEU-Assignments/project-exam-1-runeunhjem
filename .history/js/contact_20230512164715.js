import { validateContactForm } from "./validate-contact-form.js";
const contactName = document.getElementById("your-name");
const contactEmail = document.getElementById("your-email");
const contactSubject = document.getElementById("your-subject");
const contactContent = document.getElementById("your-message");

contactName.addEventListener("input", validateContactForm);
contactEmail.addEventListener("input", validateContactForm);
contactSubject.addEventListener("input", validateContactForm);
contactContent.addEventListener("input", validateContactForm);

const form = document.getElementById("contact-form"); // Replace with the ID of your form
form.addEventListener("submit", handleSubmit);
const cf7Ap
async function handleSubmit(event) {
  event.preventDefault();

  // Collect form data
  const name = document.getElementById("your-name").value;
  const email = document.getElementById("your-email").value;
  const subject = document.getElementById("your-subject").value;
  const message = document.getElementById("your-message").value;

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
      // body: new URLSearchParams(payload), // Use URL-encoded form data
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload.toString(),
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
