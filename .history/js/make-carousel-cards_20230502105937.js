import { getPosts, posts } from "./get-posts.js";

let currentIndex = 0;

(async function () {
  await getPosts();
  console.log("posts is: ", posts);

  const carousel = document.getElementById("carousel-home");
  carousel.style.flexWrap = "nowrap";

  for (let i = 0; i < Math.ceil(posts.length / 4); i++) {
    const cardSet = document.createElement("div");
    cardSet.classList.add("card-set");

    for (let j = i * 4; j < i * 4 + 4 && j < posts.length; j++) {
      const post = posts[j];
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

      cardSet.appendChild(postContainer);
    }

    carousel.appendChild(cardSet);

    // Position the card set within the carousel
    cardSet.style.transform = `translateX(${i * -100}%)`;
  }

  // Get references to the carousel and the left/right buttons
  const leftButton = document.querySelector(".carousel-left");
  const rightButton = document.querySelector(".carousel-right");

  // Add click event listeners to the buttons
  leftButton.addEventListener("click", () => {
    // Decrement the current index by 1, but don't go below 0
    currentIndex = Math.max(currentIndex - 1, 0);

    // Translate the carousel to the left by the appropriate amount
    carousel.style.transform = `translateX(${currentIndex * -100}%)`;
  });

  rightButton.addEventListener("click", () => {
    // Increment the current index by 1, but don't go above the number of card sets
    currentIndex = Math.min(currentIndex + 1, carousel.children.length - 1);

    // Translate the carousel to the right by the appropriate amount
    carousel.style.transform = `translateX(${currentIndex * -100}%)`;
  });
})();

// import { getPosts, posts } from "./get-posts.js";

// let currentIndex = 0;

// (async function () {
//   await getPosts();
//   console.log("posts is: ", posts);

//   const carousel = document.getElementById("carousel-home");
//   carousel.style.flexWrap = "nowrap";

// for (let i = 0; i < Math.ceil(posts.length / 4); i++) {
//   const cardSet = document.createElement("div");
//   cardSet.classList.add("card-set");

//   for (let j = i * 4; j < i * 4 + 4 && j < posts.length; j++) {
//     // for (const post of posts) {
//     const postContainer = document.createElement("div");
//     postContainer.classList.add("post-container");

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

//     // Position the post container within the carousel
//     const cardIndex = Array.from(carousel.children).indexOf(postContainer);
//     const cardTranslateX = (cardIndex % 4) * 243 - currentIndex * 972;
//     postContainer.style.transform = `translateX(${cardTranslateX}px)`;
//   }
//   carousel.appendChild(cardSet);

//   // Position the card set within the carousel
//   cardSet.style.transform = `translateX(${i * -100}%)`;
// }
//   // Get references to the carousel and the left/right buttons
//   const leftButton = document.querySelector(".carousel-left");
//   const rightButton = document.querySelector(".carousel-right");

//   // Add click event listeners to the buttons
//   leftButton.addEventListener("click", () => {
//     // Decrement the current index by 1, but don't go below 0
//     currentIndex = Math.max(currentIndex - 1, 0);

//     // Update the position of each post container
//     for (const postContainer of carousel.children) {
//       const cardIndex = Array.from(carousel.children).indexOf(postContainer);
//       const cardTranslateX = (cardIndex % 4) * 243 - currentIndex * 972;
//       postContainer.style.transform = `translateX(${cardTranslateX}px)`;
//     }
//   });

//   rightButton.addEventListener("click", () => {
//     // Increment the current index by 1, but don't go above the number of cards
//     currentIndex = Math.min(currentIndex + 1, Math.ceil(posts.length / 4) - 1);

//     // Update the position of each post container
//     for (const postContainer of carousel.children) {
//       const cardIndex = Array.from(carousel.children).indexOf(postContainer);
//       const cardTranslateX = (cardIndex % 4) * 243 - currentIndex * 972;
//       postContainer.style.transform = `translateX(${cardTranslateX}px)`;
//     }
//   });
// })();
