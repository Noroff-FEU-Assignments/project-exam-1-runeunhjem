import { getPosts, posts } from "./get-posts.js";

const modal = document.getElementById("modal");
const modalImage = document.getElementById("modal-image");
const modalClose = document.getElementsByClassName("close")[0];

// Add click event listener to each post image
const postImages = document.querySelectorAll(".post-image-container");
postImages.forEach((postImage) => {
  postImage.addEventListener("click", () => {
    const postImageUrl = postImage.style.backgroundImage.slice(5, -2);
    modalImage.src = postImageUrl;
    modal.style.display = "block";
  });
});

// Close the modal when the user clicks the close button
modalClose.addEventListener("click", () => {
  modal.style.display = "none";
});

export {}