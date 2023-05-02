/////// WORKING 4 AND 4 CARDS CAROUSEL ///////
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
    let currentPosition = 0;
    // const cardWidth = 328; // adjust to match your card width
    // define separate cardWidth variables for swipe and click functions
    const cardWidthSwipe = 328; // adjust to match your card width for swipe function
    const cardWidthClick = 243; // adjust to match your card width for click function

    leftButton.addEventListener("click", () => {
      if (currentPosition > 0) {
        currentPosition--;
        postContainer.style.transform = `translateX(-${currentPosition * cardWidthClick * 3}px)`;
      } else {
        // jump to end if left arrow is clicked on start
        currentPosition = Math.ceil((posts.length - 4) / 4);
        postContainer.style.transform = `translateX(-${currentPosition * cardWidthClick * 3}px)`;
      }
    });

    rightButton.addEventListener("click", () => {
      const maxPosition = Math.ceil((posts.length - 4) / 4);
      if (currentPosition < maxPosition) {
        currentPosition++;
        postContainer.style.transform = `translateX(-${currentPosition * cardWidth * 3}px)`;
      } else {
        // start over when there are no more posts to slide through
        currentPosition = 0;
        postContainer.style.transform = `translateX(0)`;
      }
    });
    
    // get the carousel container element
    const carouselContainer = document.querySelector(".carousel-home");

    // variables to store touch positions
    let startX, currentX;

    // add touch event listeners to the carousel container
    carouselContainer.addEventListener("touchstart", handleTouchStart);
    carouselContainer.addEventListener("touchmove", handleTouchMove);
    carouselContainer.addEventListener("touchend", handleTouchEnd);

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

      // move the carousel container based on the distance moved
      carouselContainer.style.transform = `translateX(-${currentPosition * cardWidth - diffX}px)`;
    }

    // function to handle touchend event
    function handleTouchEnd(event) {
      if (startX === null) {
        return; // exit if touchstart event hasn't been triggered
      }

      const diffX = startX - currentX; // calculate the distance moved by the finger

      // determine whether to move the carousel left or right based on the distance moved
      if (diffX > 50) {
        // move the carousel container to the right
        const maxPosition = Math.ceil((posts.length - 4) / 4);
        if (currentPosition < maxPosition) {
          currentPosition++;
          postContainer.style.transform = `translateX(-${currentPosition * cardWidth}px)`;
        } else {
          // start over when there are no more posts to slide through
          currentPosition = 0;
          postContainer.style.transform = `translateX(0)`;
        }
      } else if (diffX < -50) {
        // move the carousel container to the left
        if (currentPosition > 0) {
          currentPosition--;
          postContainer.style.transform = `translateX(-${currentPosition * cardWidth}px)`;
        } else {
          // jump to end if left arrow is clicked on start
          currentPosition = Math.ceil((posts.length - 4) / 4);
          postContainer.style.transform = `translateX(-${currentPosition * cardWidth}px)`;
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
