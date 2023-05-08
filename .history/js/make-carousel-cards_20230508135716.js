import { getPosts, posts } from "./get-posts.js";

let postsPerSlide = 1;
let viewportWidth = window.innerWidth;
let currentPosition = 0;
window.onload = handleViewportChange();

function handleViewportChange() {
  console.log("viewportWidth is: ", viewportWidth);

  if (viewportWidth < 768) {
    postsPerSlide = 1;
  } else if (viewportWidth < 1160 && viewportWidth >= 768) {
    postsPerSlide = 2;
  } else if (viewportWidth < 1536 && viewportWidth >= 1160) {
    postsPerSlide = 3;
  } else {
    postsPerSlide = 4;
  }

  const totalSlides = Math.ceil(posts.length / postsPerSlide);
  console.log("totalSlides is: ", totalSlides);
  const totalSlidesElement = document.getElementById("total-slides");
  totalSlidesElement.textContent = totalSlides;

  const currentSlideElement = document.getElementById("current-slide");
  currentSlideElement.textContent = currentPosition + 1;
};

window.addEventListener("resize", () => {
  viewportWidth = window.innerWidth;
  handleViewportChange();
});

const loader = document.getElementById("loader");

(async function () {
  loader.classList.add("active");

  const leftButton = document.querySelector(".carousel-left");
  const rightButton = document.querySelector(".carousel-right");
  leftButton.classList.add("hide");
  rightButton.classList.add("hide");

  await getPosts();
  console.log("posts is: ", posts);

  const carousel = document.getElementById("carousel-home");

  handleViewportChange();

  for (const post of posts) {
    const postContainer = document.createElement("div");
    postContainer.classList.add("post-container");

    const leftButton = document.querySelector(".carousel-left");
    const rightButton = document.querySelector(".carousel-right");
    let currentPosition = 0;
    const viewportWidth = window.innerWidth;

    let cardWidthClick = 246;
    if(viewportWidth < 768) {
      cardWidthClick = 192;
    };
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("post-image-container");
    postContainer.appendChild(imageContainer);

    const image = new Image();
    image.onload = function () {
      imageContainer.style.backgroundImage = `url(${image.src})`;
    };
    image.src = post.image;

    const detaContainer = document.createElement("div");
    imageContainer.classList.add("post-image-container");
    postContainer.appendChild(imageContainer);

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

    leftButton.addEventListener("click", () => {
      if (currentPosition > 0) {
        currentPosition--;
        postContainer.style.transform = `translateX(-${currentPosition * cardWidthClick * postsPerSlide}px)`;
      } else {
        currentPosition = Math.ceil((posts.length - postsPerSlide) / postsPerSlide);
        postContainer.style.transform = `translateX(-${currentPosition * cardWidthClick * postsPerSlide}px)`;
      }

      const currentSlideElement = document.getElementById("current-slide");
      currentSlideElement.textContent = currentPosition + 1;
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

        const currentSlideElement = document.getElementById("current-slide");
        currentSlideElement.textContent = currentPosition + 1;
      } else {
        currentPosition = 0;
        postContainer.style.transform = `translateX(0)`;
        console.log(postContainer.style.transform);

        const currentSlideElement = document.getElementById("current-slide");
        currentSlideElement.textContent = 1;
      }
    });
  };

  const modal = document.getElementById("modal");
  const modalContent = document.getElementById("modal-content");
  const modalImage = document.getElementById("modal-image");
  const modalClose = document.getElementsByClassName("close")[0];

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    };
  });
  function closeModal() {
    modal.style.display = "none";
    modalImage.src = "";
  };

  window.onclick = function (event) {
    if (event.target == modalContent) {
      modal.style.display = "none";
    };
  };

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
  loader.classList.remove("active");
  leftButton.classList.remove("hide");
  rightButton.classList.remove("hide");
})();
