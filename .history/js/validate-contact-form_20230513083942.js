function validateContactForm() {
  const contactForm = document.getElementById("contact-form");
  const sendMessageButton = document.getElementById("send-message");
  const contactName = document.getElementById("your-name");
  const contactNameError = document.getElementById("name-input-error");
  const contactEmail = document.getElementById("your-email");
  const contactEmailError = document.getElementById("email-input-error");
  const contactSubject = document.getElementById("your-subject");
  const contactSubjectError = document.getElementById("subject-input-error");
  const contactContent = document.getElementById("your-message");
  const contactContentError = document.getElementById("message-input-error");
  const confirmSuccess = document.getElementById("message-sent");
  let formSubmitted = false;

  // CHANGE PLACEHOLDERS TO INPUT TIPS ON FOCUS
  contactName.addEventListener("focus", function () {
    contactName.placeholder = "Min 2 characters";
  });
  contactName.addEventListener("blur", function () {
    contactName.placeholder = "Your Name";
  });
  contactEmail.addEventListener("focus", function () {
    contactEmail.placeholder = "Valid email format (john.doe@mail.com)";
  });
  contactEmail.addEventListener("blur", function () {
    contactEmail.placeholder = "Your Email";
  });
  contactSubject.addEventListener("focus", function () {
    contactSubject.placeholder = "Min 4 characters";
  });
  contactSubject.addEventListener("blur", function () {
    contactSubject.placeholder = "What's the subject?";
  });
  contactContent.addEventListener("focus", function () {
    contactContent.placeholder = "Min 10 characters";
  });
  contactContent.addEventListener("blur", function () {
    contactContent.placeholder = "Your Message";
  });

  // THE VALIDATION FUNCTION TO BE RUN ON SUBMIT
  function validateForm(event) {
    event.preventDefault();
    // let formSubmitted = true;

    if (checkLength(contactName.value, 2)) {
      contactNameError.style.display = "none";
      contactName.style.backgroundColor = "#8fff98";
      contactName.style.color = "#000000";
    } else {
      contactNameError.style.display = "block";
      contactName.style.backgroundColor = "#fafad2";
      contactName.style.color = "#FF0000";
    }
    if (validateEmail(contactEmail.value)) {
      contactEmailError.style.display = "none";
      contactEmail.style.backgroundColor = "#8fff98";
      contactEmail.style.color = "#000000";
    } else {
      contactEmailError.style.display = "block";
      contactEmail.style.backgroundColor = "#fafad2";
      contactEmail.style.color = "#FF0000";
    }
    if (checkLength(contactSubject.value, 3)) {
      contactSubjectError.style.display = "none";
      contactSubject.style.backgroundColor = "#8fff98";
      contactSubject.style.color = "#000000";
    } else {
      contactSubjectError.style.display = "block";
      contactSubject.style.backgroundColor = "#fafad2";
      contactSubject.style.color = "#FF0000";
    }
    if (checkLength(contactContent.value, 9)) {
      contactContentError.style.display = "none";
      contactContent.style.backgroundColor = "#8fff98";
      contactContent.style.color = "#000000";
    } else {
      contactContentError.style.display = "block";
      contactContent.style.backgroundColor = "#fafad2";
      contactContent.style.color = "#FF0000";
    }
    if (
      checkLength(contactName.value, 1) &&
      validateEmail(contactEmail.value) &&
      checkLength(contactSubject.value, 3) &&
      checkLength(contactContent.value, 9)
    ) {
      sendMessageButton.setAttribute("type", "submit");
      sendMessageButton.style.cursor = "pointer";
      sendMessageButton.innerText = "Send Message";
      sendMessageButton.classList.add("buttonSuccess");
      sendMessageButton.addEventListener("click", successMessage);
    } else {
      sendMessageButton.setAttribute("type", "button");
      sendMessageButton.innerText = "Form Error";
      sendMessageButton.classList.add("send-msg-button", "buttonNotReady");
      confirmSuccess.style.display = "none";
    }
  }

  // EVENTLISTENER TO CHECK IF SUBMIT BUTTON IS CLICKED
  contactForm.addEventListener("submit", function (event) {
    formSubmitted = true; // Set flag to true on form submit
    validateForm(event);
  });

  contactName.addEventListener("input", validateForm);
  contactEmail.addEventListener("input", validateForm);
  contactSubject.addEventListener("input", validateForm);
  contactContent.addEventListener("input", validateForm);

  // SHOW SUCCESS MESSAGE WHEN FORM IS SUBMITTED
  function successMessage() {
    const confirmSuccess = document.getElementById("message-sent");
    confirmSuccess.style.display = "block";
    confirmSuccess.innerHTML = `
    <p class="success">Your message was sent successfully</p>
    `;
    setTimeout(closeSuccessMessage, 4000);
  }

  function closeSuccessMessage() {
    location.reload();
  }

  // VALIDATE THE LENGTH OF MESSAGE NAME, EMAIL & CONTENT
  function checkLength(value, len) {
    if (value.trim().length > len) {
      return true;
    } else {
      return false;
    }
  }

  // VALIDATE EMAIL ADDRESS PATTERN
  function validateEmail(email) {
    const regEx = /\S+@\S+\.\S/; // The \S+ means one or more non-whitespace characters
    const patternMatches = regEx.test(email);
    return patternMatches;
  }
}

export { validateContactForm };