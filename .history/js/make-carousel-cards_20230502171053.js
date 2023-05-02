import { getPosts, posts } from "./get-posts.js";

// (async function () {
//   await getPosts();
//   console.log("posts is: ", posts);

//   const carousel = document.getElementById("carousel-home");

//   for (const post of posts) {
//     const postContainer = document.createElement("div");
//     postContainer.classList.add("post-container");

//     const leftButton = document.querySelector(".carousel-left");
//     const rightButton = document.querySelector(".carousel-right");
//     const cardWidth = 328; // adjust to match your card width
//     let currentPosition = 0;
//     let startX; // starting X position of touch
//     let diffX = 0; // X difference between start and end of touch
//     let isSwiping = false; // flag to determine if user is swiping
//     // let currentPosition = 0;
//     // const cardWidth = 200; // adjust to match your card width

//     carousel.addEventListener("touchstart", (event) => {
//       startX = event.touches[0].clientX; // get starting X position of touch
//       isSwiping = true; // user is swiping
//     });

//     carousel.addEventListener("touchmove", (event) => {
//       if (isSwiping) {
//         const currentX = event.touches[0].clientX; // get current X position of touch
//         diffX = startX - currentX; // calculate X difference between start and end of touch
//         carousel.style.transform = `translateX(-${currentPosition * cardWidth + diffX}px)`; // move carousel
//       }
//     });

//     carousel.addEventListener("touchend", () => {
//       if (isSwiping) {
//         isSwiping = false; // user is no longer swiping
//         if (diffX > 0) {
//           const maxPosition = Math.ceil((posts.length - 1) / 1);
//           if (currentPosition < maxPosition) {
//             currentPosition++;
//           }
//         } else if (diffX < 0) {
//           if (currentPosition > 0) {
//             currentPosition--;
//           }
//         }
//         carousel.style.transform = `translateX(-${currentPosition * cardWidth}px)`; // move carousel to final position
//         diffX = 0; // reset X difference
//       }
//     });

//     leftButton.addEventListener("click", () => {
//       if (currentPosition > 0) {
//         currentPosition--;
//         postContainer.style.transform = `translateX(-${currentPosition * cardWidth}px)`;
//       } else {
//         // jump to end if left arrow is clicked on start
//         currentPosition = Math.ceil((posts.length - 1) / 1);
//         postContainer.style.transform = `translateX(-${currentPosition * cardWidth}px)`;
//       }
//     });

//     rightButton.addEventListener("click", () => {
//       const maxPosition = Math.ceil((posts.length - 4) / 4);
//       if (currentPosition < maxPosition) {
//         currentPosition++;
//         postContainer.style.transform = `translateX(-${currentPosition * cardWidth * 3}px)`;
//       } else {
//         // start over when there are no more posts to slide through
//         currentPosition = 0;
//         postContainer.style.transform = `translateX(0)`;
//       }
//     });

//     const imageContainer = document.createElement("div");
//     imageContainer.classList.add("post-image-container");
//     postContainer.appendChild(imageContainer);

//     const image = new Image();
//     image.onload = function () {
//       imageContainer.style.backgroundImage = `url(${image.src})`;
//     };
//     image.src = post.image;
(async function () {
  await getPosts();
  console.log("posts is: ", posts);

  const carousel = document.getElementById("carousel-home");
  const postContainers = [];

  for (const post of posts) {
    const postContainer = document.createElement("div");
    postContainer.classList.add("post-container");

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

    postContainers.push(postContainer);
    carousel.appendChild(postContainer);
  }

  const leftButton = document.querySelector(".carousel-left");
  const rightButton = document.querySelector(".carousel-right");
  const cardWidth = 328; // adjust to match your card width
  let currentPosition = 0;
  let startX; // starting X position of touch
  let diffX = 0; // X difference between start and end of touch
  let isSwiping = false; // flag to determine if user is swiping

  carousel.addEventListener("touchstart", (event) => {
    startX = event.touches[0].clientX; // get starting X position of touch
    isSwiping = true; // user is swiping
  });

  carousel.addEventListener("touchmove", (event) => {
    if (isSwiping) {
      const currentX = event.touches[0].clientX; // get current X position of touch
      diffX = startX - currentX; // calculate X difference between start and end of touch
      carousel.style.transform = `translateX(-${currentPosition * cardWidth + diffX}px)`; // move carousel
    }
  });

  carousel.addEventListener("touchend", () => {
    if (isSwiping) {
      isSwiping = false; // user is no longer swiping
      if (diffX > 0) {
        const maxPosition = Math.ceil((posts.length - 1) / 1);
        if (currentPosition < maxPosition) {
          currentPosition++;
        }
      } else if (diffX < 0) {
        if (currentPosition > 0) {
          currentPosition--;
        }
      }
      carousel.style.transform = `translateX(-${currentPosition * cardWidth}px)`; // move carousel to final position
      diffX = 0; // reset X difference
    }
  });

  leftButton.addEventListener("click", () => {
    if (currentPosition > 0) {
      currentPosition--;
      postContainer.style.transform = `translateX(-${currentPosition * cardWidth * 3}px)`;
    } else {
      // jump to end if left arrow is clicked on start
      currentPosition = Math.ceil((posts.length - 4) / 1);
      postContainer.style.transform = `translateX(-${currentPosition * cardWidth * 3}px)`;
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

/////// WORKING 4 AND 4 CARDS CAROUSEL ///////
// import { getPosts, posts } from "./get-posts.js";

// (async function () {
//   await getPosts();
//   console.log("posts is: ", posts);

//   const carousel = document.getElementById("carousel-home");

//   for (const post of posts) {
//     const postContainer = document.createElement("div");
//     postContainer.classList.add("post-container");

//     const leftButton = document.querySelector(".carousel-left");
//     const rightButton = document.querySelector(".carousel-right");
//     const cardWidth = 328; // adjust to match your card width
//     let currentPosition = 0;

//     leftButton.addEventListener("click", () => {
//       if (currentPosition > 0) {
//         currentPosition--;
//         postContainer.style.transform = `translateX(-${currentPosition * cardWidth * 3}px)`;
//       } else {
//         // jump to end if left arrow is clicked on start
//         currentPosition = Math.ceil((posts.length - 4) / 4);
//         postContainer.style.transform = `translateX(-${currentPosition * cardWidth * 3}px)`;
//       }
//     });

//     rightButton.addEventListener("click", () => {
//       const maxPosition = Math.ceil((posts.length - 4) / 4);
//       if (currentPosition < maxPosition) {
//         currentPosition++;
//         postContainer.style.transform = `translateX(-${currentPosition * cardWidth * 3}px)`;
//       } else {
//         // start over when there are no more posts to slide through
//         currentPosition = 0;
//         postContainer.style.transform = `translateX(0)`;
//       }
//     });

//     const imageContainer = document.createElement("div");
//     imageContainer.classList.add("post-image-container");
//     postContainer.appendChild(imageContainer);

//     const image = new Image();
//     image.onload = function () {
//       imageContainer.style.backgroundImage = `url(${image.src})`;
//     };
//     image.src = post.image;

//     const title = document.createElement("h2");
//     title.classList.add("post-title");
//     title.textContent = post.title;
//     postContainer.appendChild(title);

//     const tagLine = document.createElement("p");
//     tagLine.classList.add("post-tagline");
//     tagLine.textContent = post.shortDescription;
//     postContainer.appendChild(tagLine);

//     const tags = document.createElement("p");
//     tags.classList.add("post-tags");
//     tags.textContent = `Tags: ${post.tags.join(", ")}`;
//     postContainer.appendChild(tags);

//     const date = new Date(post.date);
//     const dateString = `${date.toLocaleString("en-us", { month: "short" })} ${date.getDate()}, ${date.getFullYear()}`;
//     const added = document.createElement("p");
//     added.classList.add("post-added");
//     added.textContent = `Modified: ${dateString}`;
//     postContainer.appendChild(added);

//     carousel.appendChild(postContainer);
//   };
//   const modal = document.getElementById("modal");
//   const modalImage = document.getElementById("modal-image");
//   const modalClose = document.getElementsByClassName("close")[0];

//   modal.addEventListener("click", (event) => {
//     if (event.target === modal) {
//       closeModal();
//     }
//   });

//   // Close the modal when the user clicks the close button
//   modalClose.addEventListener("click", () => {
//     modal.style.display = "none";
//   });

//   function openModal(imageSrc) {
//     modalImage.src = imageSrc;
//     modal.style.display = "flex";
//   }

//   function closeModal() {
//     modal.style.display = "none";
//     modalImage.src = "";
//   }

//   const postImages = document.querySelectorAll(".post-image-container");
//   postImages.forEach((postImage) => {
//     postImage.addEventListener("click", () => {
//       const postImageUrl = postImage.style.backgroundImage.slice(5, -2);
//       modalImage.src = postImageUrl;
//       modal.style.display = "block";
//     });
//   });
// })();
