import { getPosts, posts } from "./get-posts.js";

let postsPerSlide = 1;
const breakpoints = {
  "(max-width: 576px)": 576,
  "(max-width: 768px)": 768,
  "(max-width: 1150px)": 1150,
  "(max-width: 1600px)": 1600,
};

function handleInitialViewport() {
  const viewportWidth = window.innerWidth;
  console.log("viewportWidth is: ", viewportWidth);
  if (viewportWidth >= breakpoints["(max-width: 576px)"] && breakpoint < breakpoints["(max-width: 768px)"]) {
    handleViewportChange(breakpoints["(max-width: 576px)"]);
  } else if (viewportWidth >= breakpoints["(max-width: 768px)"] && breakpoint < breakpoints["(max-width: 1150px)"]) {
    handleViewportChange(breakpoints["(max-width: 768px)"]);
  } else if (viewportWidth >= breakpoints["(max-width: 1150px)"] && breakpoint < breakpoints["(max-width: 1600px)"]) {
    handleViewportChange(breakpoints["(max-width: 1150px)"]);
  } else {
    handleViewportChange(breakpoints["(max-width: 1600px)"]);
  };
};
window.onload = handleInitialViewport;


function handleViewportChange(breakpoint) {
  console.log("Breakpoint:", breakpoint);

  if (breakpoint >= breakpoints['(max-width: 576px)'] && breakpoint < breakpoints["(max-width: 768px)"]) {
    postsPerSlide = 1;
  } else if (breakpoint >= breakpoints["(max-width: 768px)"] && breakpoint < breakpoints["(max-width: 1150px)"]) {
    postsPerSlide = 2;
  } else if (breakpoint >= breakpoints["(max-width: 1150px)"] && breakpoint < breakpoints["(max-width: 1600px)"]) {
    postsPerSlide = 3;
  } else {
    postsPerSlide = 4;
  };

  // use the postsPerSlide value to update the carousel
};

const mediaQueries = Object.keys(breakpoints).map((key) => {
  return window.matchMedia(key);
});

mediaQueries.forEach((mediaQuery, index) => {
  console.log("mediaQueary is: ", mediaQuery);
  mediaQuery.addEventListener("change", (event) => {
    if (event.matches) {
      handleViewportChange(breakpoints[mediaQuery.media]);
      console.log("mediaQuery.media is: ", mediaQuery.media);
      console.log("breakpoints[mediaQuery.media] is: ", breakpoints[mediaQuery.media]);
      console.log("breakpoints is: ", breakpoints);
    };
  });

  if (mediaQuery.matches) {
    handleViewportChange(breakpoints[mediaQuery.media]);
  };
});

// add event listener for smallest screen size
const smallestMediaQuery = window.matchMedia(`(max-width: ${breakpoints["(max-width: 576px)"] - 1}px)`);
smallestMediaQuery.addEventListener("change", (event) => {
  if (event.matches) {
    postsPerSlide = 1; // set default value for smallest screens
    // update carousel with new postsPerSlide value
  }
});


let startX = null;

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

    const cardWidthSwipe = 246; // card width for swipe function
    const cardWidthClick = 246; // card width for click function

    leftButton.addEventListener("click", () => {
      if (currentPosition > 0) {
        currentPosition--;
        postContainer.style.transform = `translateX(-${currentPosition * cardWidthClick * postsPerSlide}px)`;
      } else {
        // jump to end if left arrow is clicked on start
        currentPosition = Math.ceil((posts.length - postsPerSlide) / postsPerSlide);
        postContainer.style.transform = `translateX(-${currentPosition * cardWidthClick * postsPerSlide}px)`;
      };
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
      };
    });

    // function to handle touchstart event
    function handleTouchStart(event) {
      startX = event.touches[0].clientX; // store the initial touch position
    };

    // function to handle touchmove event
    function handleTouchMove(event) {
      if (startX === null) {
        return; // exit if touchstart event hasn't been triggered
      };

      currentX = event.touches[0].clientX; // store the current touch position
      const diffX = startX - currentX; // calculate the distance moved by the finger

      // move each post element individually based on the distance moved
      const postElements = document.querySelectorAll(".post-container");
      postElements.forEach((postElement, index) => {
        postElement.style.transform = `translateX(-${index * cardWidthSwipe * postsPerSlide - diffX}px)`;
      });
    };

    // function to handle touchend event
    function handleTouchEnd(event) {
      if (startX === null) {
        return; // exit if touchstart event hasn't been triggered
      };

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
        };
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
        };
      };

      // reset touch positions
      startX = null;
      currentX = null;
    };

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
  };

  function closeModal() {
    modal.style.display = "none";
    modalImage.src = "";
  };

  const postImages = document.querySelectorAll(".post-image-container");
  postImages.forEach((postImage) => {
    postImage.addEventListener("click", () => {
      const postImageUrl = postImage.style.backgroundImage.slice(5, -2);
      modalImage.src = postImageUrl;
      modal.style.display = "block";
    });
  });
})();
