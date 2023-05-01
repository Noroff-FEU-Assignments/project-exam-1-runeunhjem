import { getPosts, posts } from "./posts.js";

(async function () {
  await getPosts();
  console.log("posts is: ", posts);

  const carousel = document.getElementById("carousel-home");

  for (const post of posts) {
    const postContainer = document.createElement("div");
    postContainer.classList.add("post-container");

    const container = document.createElement("div");
    container.classList.add("post-image-container");
    postContainer.appendChild(container);

    const image = new Image();
    image.onload = function () {
    container.style.backgroundImage = `url(${image.src})`;
    };
    image.src = post.image;

    const title = document.createElement("h2");
    title.classList.add("post-title");
    title.textContent = post.title;
    postContainer.appendChild(title);

    const tagLine = document.createElement("div");
    recipe.innerHTML = post.recipe;
    postContainer.appendChild(recipe);

    // const categories = document.createElement("p");
    // categories.textContent = `Categories: ${post.categories.join(", ")}`;
    // postContainer.appendChild(categories);

    // const tags = document.createElement("p");
    // tags.textContent = `Tags: ${post.tags.join(", ")}`;
    // postContainer.appendChild(tags);

    // const instructions = document.createElement("div");
    // instructions.innerHTML = post.instructions;
    // postContainer.appendChild(instructions);

    // const recipe = document.createElement("div");
    // recipe.innerHTML = post.recipe;
    // postContainer.appendChild(recipe);

    carousel.appendChild(postContainer);
  }
})();

