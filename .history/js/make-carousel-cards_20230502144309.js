import { getPosts, posts } from "./get-posts.js";

(async function () {
  await getPosts();
  console.log("posts is: ", posts);

  const carousel = document.getElementById("carousel-home");


  for (const post of posts) {
    const postContainer = document.createElement("div");
    postContainer.classList.add("post-container");

    const leftButton = document.querySelector(".carousel-left");
    const rightButton = document.querySelector(".carousel-right");
    const cardWidth = 328; // adjust to match your card width
    let currentPosition = 0;
    let buttonsHidden = false;

    const leftButtonStyle = getComputedStyle(leftButton);
    const rightButtonStyle = getComputedStyle(rightButton);

    if (leftButtonStyle.display === "none" && rightButtonStyle.display === "none") {
      buttonsHidden = true;
    }

    leftButton.addEventListener("click", () => {
      if (currentPosition > 0 && !buttonsHidden) {
        currentPosition--;
        carousel.style.transform = `translateX(-${currentPosition * cardWidth * 3}px)`;
      } else {
        // jump to end if left arrow is clicked on start
        currentPosition = Math.ceil((posts.length - 4) / 4);
        postContainer.style.transform = `translateX(-${currentPosition * cardWidth * 3}px)`;
      }
    });

    rightButton.addEventListener("click", () => {
      const maxPosition = Math.ceil((postContainers.length - 4) / 4);
      if (currentPosition < maxPosition && !buttonsHidden) {
        currentPosition++;
        carousel.style.transform = `translateX(-${currentPosition * cardWidth * 3}px)`;
      }
    });
    leftButton.addEventListener("click", () => {
      if (currentPosition > 0) {
        currentPosition--;
        postContainer.style.transform = `translateX(-${currentPosition * cardWidth * 3}px)`;
      } else {
        // jump to end if left arrow is clicked on start
        currentPosition = Math.ceil((posts.length - 4) / 4);
        postContainer.style.transform = `translateX(-${currentPosition * cardWidth * 3}px)`;
      }
    });

    // rightButton.addEventListener("click", () => {
    //   const maxPosition = Math.ceil((posts.length - 4) / 4);
    //   if (currentPosition < maxPosition) {
    //     currentPosition++;
    //     postContainer.style.transform = `translateX(-${currentPosition * cardWidth * 3}px)`;
    //   } else {
    //     // start over when there are no more posts to slide through
    //     currentPosition = 0;
    //     postContainer.style.transform = `translateX(0)`;
    //   }
    // });

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("post-image-container");
    postContainer.appendChild(imageContainer);

    const image = new Image();
    image.onload = function () {
      imageContainer.style.backgroundImage = `url(${image.src})`;
    };
    image.src = post.image;

    const title = document.createElement("h2");
    title.classList.add("post-title");
    title.textContent = post.title;
    postContainer.appendChild(title);

    const tagLine = document.createElement("p");
    tagLine.classList.add("post-tagline");
    tagLine.textContent = post.shortDescription;
    postContainer.appendChild(tagLine);

    const tags = document.createElement("p");
    tags.classList.add("post-tags");
    tags.textContent = `Tags: ${post.tags.join(", ")}`;
    postContainer.appendChild(tags);

    const date = new Date(post.date);
    const dateString = `${date.toLocaleString("en-us", { month: "short" })} ${date.getDate()}, ${date.getFullYear()}`;
    const added = document.createElement("p");
    added.classList.add("post-added");
    added.textContent = `Modified: ${dateString}`;
    postContainer.appendChild(added);

    carousel.appendChild(postContainer);
  };
  const modal = document.getElementById("modal");
  const modalImage = document.getElementById("modal-image");
  const modalClose = document.getElementsByClassName("close")[0];

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  // Close the modal when the user clicks the close button
  modalClose.addEventListener("click", () => {
    modal.style.display = "none";
  });

  function openModal(imageSrc) {
    modalImage.src = imageSrc;
    modal.style.display = "flex";
  }

  function closeModal() {
    modal.style.display = "none";
    modalImage.src = "";
  }

  const postImages = document.querySelectorAll(".post-image-container");
  postImages.forEach((postImage) => {
    postImage.addEventListener("click", () => {
      const postImageUrl = postImage.style.backgroundImage.slice(5, -2);
      modalImage.src = postImageUrl;
      modal.style.display = "block";
    });
  });
})();

