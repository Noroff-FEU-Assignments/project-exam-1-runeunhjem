import { getPosts, posts } from "./get-posts.js";

let postsPerSlide = 1;
window.onload = handleViewportChange();

function handleViewportChange() {
  const viewportWidth = window.innerWidth;
  console.log("viewportWidth is: ", viewportWidth);

  if (viewportWidth < 768) {
    postsPerSlide = 1;
  } else if (viewportWidth < 1160 && viewportWidth >= 768) {
    postsPerSlide = 2;
  } else if (viewportWidth < 1540 && viewportWidth >= 1160) {
    postsPerSlide = 3;
  } else {
    postsPerSlide = 4;
  };
};

let startX = null;
const loader = document.getElementById("loader");

(async function () {
  loader.classList.add("active"); // Show the loader

  const leftButton = document.querySelector(".carousel-left");
  const rightButton = document.querySelector(".carousel-right");
  leftButton.classList.add("hide");
  rightButton.classList.add("hide");

  await getPosts();
  console.log("posts is: ", posts);

  const carousel = document.getElementById("carousel-home");

  for (const post of posts) {
    const postContainer = document.createElement("div");
    postContainer.classList.add("post-container");

    const leftButton = document.querySelector(".carousel-left");
    const rightButton = document.querySelector(".carousel-right");
    let currentPosition = 0;
    const viewportWidth = window.innerWidth;
    const cardWidthSwipe = 240; // card width for swipe function
    const cardWidthClick = 246; // card width for click function
    if(viewportWidth < 768) {
      const cardWidthClick = 240; // when there is no gap between cards
    }

    leftButton.addEventListener("click", () => {
      if (currentPosition > 0) {
        currentPosition--;
        postContainer.style.transform = `translateX(-${currentPosition * cardWidthClick * postsPerSlide}px)`;
      } else {
        // jump to end if left arrow is clicked on start
        currentPosition = Math.ceil((posts.length - postsPerSlide) / postsPerSlide);
        postContainer.style.transform = `translateX(-${currentPosition * cardWidthClick * postsPerSlide}px)`;
      }
    });

    rightButton.addEventListener("click", () => {
      const maxPosition = Math.ceil((posts.length - postsPerSlide) / postsPerSlide);
      if (currentPosition < maxPosition) {
        currentPosition++;
        postContainer.style.transform = `translateX(-${currentPosition * cardWidthClick * postsPerSlide}px)`;
        console.log(postContainer.style.transform);
        console.log("currentPosition is: ", currentPosition);
        console.log("cardWithClick is: ", cardWidthClick);
        console.log("postsPerSlide is: ", postsPerSlide);
      } else {
        // start over when there are no more posts to slide through
        currentPosition = 0;
        postContainer.style.transform = `translateX(0)`;
        console.log(postContainer.style.transform);
      }
    });

    // function to handle touchstart event
    function handleTouchStart(event) {
      startX = event.touches[0].clientX; // store the initial touch position
    }

    // function to handle touchmove event
    function handleTouchMove(event) {
      if (startX === null) {
        return; // exit if touchstart event hasn't been triggered
      }

      currentX = event.touches[0].clientX; // store the current touch position
      const diffX = startX - currentX; // calculate the distance moved by the finger

      // move each post element individually based on the distance moved
      const postElements = document.querySelectorAll(".post-container");
      postElements.forEach((postElement, index) => {
        postElement.style.transform = `translateX(-${index * cardWidthSwipe * postsPerSlide - diffX}px)`;
      });
    }

    // function to handle touchend event
    function handleTouchEnd(event) {
      if (startX === null) {
        return; // exit if touchstart event hasn't been triggered
      }

      const diffX = startX - currentX; // calculate the distance moved by the finger

      // determine whether to move the carousel left or right based on the distance moved
      if (diffX > 50) {
        // move each post element to the right
        const maxPosition = Math.ceil((posts.length - postsPerSlide) / postsPerSlide);
        if (currentPosition < maxPosition) {
          currentPosition++;
          const postElements = document.querySelectorAll(".post-container");
          postElements.forEach((postElement, index) => {
            postElement.style.transform = `translateX(-${
              index * cardWidthSwipe * postsPerSlide - currentPosition * cardWidthSwipe
            }px)`;
          });
        } else {
          // start over when there are no more posts to slide through
          currentPosition = 0;
          const postElements = document.querySelectorAll(".post-container");
          postElements.forEach((postElement, index) => {
            postElement.style.transform = `translateX(-${index * cardWidthSwipe * postsPerSlide}px)`;
          });
        }
      } else if (diffX < -50) {
        // move each post element to the left
        if (currentPosition > 0) {
          currentPosition--;
          const postElements = document.querySelectorAll(".post-container");
          postElements.forEach((postElement, index) => {
            postElement.style.transform = `translateX(-${
              index * cardWidthSwipe * postsPerSlide - currentPosition * cardWidthSwipe
            }px)`;
          });
        } else {
          // jump to end if left arrow is clicked on start
          currentPosition = Math.ceil((posts.length - postsPerSlide) / postsPerSlide);
          const postElements = document.querySelectorAll(".post-container");
          postElements.forEach((postElement, index) => {
            postElement.style.transform = `translateX(-${
              index * cardWidthSwipe * postsPerSlide - currentPosition * cardWidthSwipe
            }px)`;
          });
        }
      }

      // reset touch positions
      startX = null;
      currentX = null;
    }

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
  }

  const modal = document.getElementById("modal");
  const modalImage = document.getElementById("modal-image");
  const modalClose = document.getElementsByClassName("close")[0];

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
  function closeModal() {
    modal.style.display = "none";
    modalImage.src = "";
  };

  // Close the modal when the user clicks the close button
  modalClose.addEventListener("click", () => {
    modal.style.display = "none";
  });


  function openModal(imageSrc) {
    modalImage.src = imageSrc;
    modal.style.display = "flex";
  };


  const postImages = document.querySelectorAll(".post-image-container");
  postImages.forEach((postImage) => {
    postImage.addEventListener("click", () => {
      const postImageUrl = postImage.style.backgroundImage.slice(5, -2);
      modalImage.src = postImageUrl;
      modal.style.display = "block";
    });
  });
  loader.classList.remove("active"); // Hide the loader
  leftButton.classList.remove("hide");
  rightButton.classList.remove("hide");
})();
