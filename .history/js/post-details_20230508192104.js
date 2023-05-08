import { getPosts, posts } from "./getposts.js";
import { getComments, comments } from "./getcomments.js";

async function init() {
  await getPosts();
  await getComments();
  const loader = document.getElementById("loader");

  (async function () {
    loader.classList.add("active");

  })();
}

init();