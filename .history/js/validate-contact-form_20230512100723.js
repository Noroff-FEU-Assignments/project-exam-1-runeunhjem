function validateContactForm() {
  const contactForm = document.getElementById("cf7-form");
  const sendMessageButton = document.getElementById("send-message");
  const contactName = document.getElementById("name-input");
  const contactNameError = document.getElementById("name-input-error");
  const contactEmail = document.getElementById("email-input");
  const contactEmailError = document.getElementById("email-input-error");
  const contactSubject = document.getElementById("subject-input");
  const contactSubjectError = document.getElementById("subject-input-error");
  const contactContent = document.getElementById("comment-input");
  const contactContentError = document.getElementById("comment-input-error");
  const confirmSuccess = document.getElementById("message-sent");

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
  contactContent.addEventListener("focus", function () {
    contactContent.placeholder = "Min 10 characters";
  });
  contactContent.addEventListener("blur", function () {
    contactContent.placeholder = "Your Message";
  });

  // THE VALIDATION FUNCTION TO BE RUN ON SUBMIT
  function validateForm(event) {
    event.preventDefault();
    let formSubmitted = true;

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
    if (checkLength(contactContent.value, 10)) {
      contactContentError.style.display = "none";
      contactContent.style.backgroundColor = "#8fff98";
      contactContent.style.color = "#000000";
    } else {
      contactContentError.style.display = "block";
      contactContent.style.backgroundColor = "#fafad2";
      contactContent.style.color = "#FF0000";
    }
    if (checkLength(contactName.value, 2) && validateEmail(contactEmail.value) && checkLength(contactContent.value, 10)) {
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
  commentForm.addEventListener("submit", function (event) {
    formSubmitted = true; // Set flag to true on form submit
    validateForm(event);
  });

  commentName.addEventListener("input", validateForm);
  commentEmail.addEventListener("input", validateForm);
  commentContent.addEventListener("input", validateForm);

  // SHOW SUCCESS MESSAGE WHEN FORM IS SUBMITTED
  function successMessage() {
    const confirmSuccess = document.getElementById("comment-posted");
    confirmSuccess.style.display = "block";
    confirmSuccess.innerHTML = `
    <p class="success">Your message was sent successfully</p>
  `;
    // setTimeout(closeSuccessMessage, 4000); // RESET CONTACT FORM AFTER 4 SECONDS
  }

  // RESET CONTACT FORM AFTER SET TIMEOUT
  function closeSuccessMessage() {
    const confirmSuccess = document.querySelector(".message-sent");
    confirmSuccess.style.display = "none";
    commentName.value = "";
    commentName.style.backgroundColor = "rgb(250, 235, 215)";
    commentEmail.value = "";
    commentEmail.style.backgroundColor = "rgb(250, 235, 215)";
    commentContent.value = "";
    commentContent.style.backgroundColor = "rgb(250, 235, 215)";
    sendMessageButton.style.backgroundColor = "#404040";
    sendMessageButton.style.color = "#f5c51880";
    sendMessageButton.innerText = "Send Message";
  }

  // VALIDATE THE LENGTH OF COMMENT NAME, EMAIL & CONTENT
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

validateContactForm();

export { validateContactForm };
