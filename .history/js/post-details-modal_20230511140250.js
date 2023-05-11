const modalContainer = document.createElement("div");
modalContainer.classList.add("details-modal");
document.body.appendChild(modalContainer);

// Open the modal when clicking on the image
imageContainer.addEventListener("click", function () {
  modalContainer.style.display = "flex";
});

// Close the modal when clicking on the image or outside the modal
modalContainer.addEventListener("click", function (event) {
  if (event.target === modalContainer) {
    modalContainer.style.display = "none";
  }
});