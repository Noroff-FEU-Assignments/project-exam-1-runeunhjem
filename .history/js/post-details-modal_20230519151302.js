const modalContainer = document.createElement("div");
modalContainer.classList.add("modal");
document.body.appendChild(modalContainer);

const modalImage = new Image();
modalImage.src = post.image;
modalImage.classList.add("modal-image");
modalContainer.appendChild(modalImage);

imageContainer.addEventListener("click", function () {
  modalContainer.style.display = "flex";
});
modalContainer.addEventListener("click", function (event) {
  if (event.target === modalContainer) {
    modalContainer.style.display = "none";
  }
});
