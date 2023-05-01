import { getPosts, posts } from "./posts.js";

(async function () {
  await getPosts();
  console.log("posts is: ", posts);

  const carousel = document.getElementById("carousel-home");

  for (const post of posts) {
    const postContainer = document.createElement("div");
    postContainer.classList.add("post-container");

    const image = document.createElement("img");
    image.classList
    image.src = post.image;
    postContainer.appendChild(image);

    const title = document.createElement("h2");
    title.textContent = post.title;
    postContainer.appendChild(title);

    const categories = document.createElement("p");
    categories.textContent = `Categories: ${post.categories.join(", ")}`;
    postContainer.appendChild(categories);

    const tags = document.createElement("p");
    tags.textContent = `Tags: ${post.tags.join(", ")}`;
    postContainer.appendChild(tags);

    const instructions = document.createElement("div");
    instructions.innerHTML = post.instructions;
    postContainer.appendChild(instructions);

    const recipe = document.createElement("div");
    recipe.innerHTML = post.recipe;
    postContainer.appendChild(recipe);

    carousel.appendChild(postContainer);
  }
})();

