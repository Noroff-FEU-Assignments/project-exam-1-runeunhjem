import { getPosts, posts } from "./getposts.js";
import { getComments, comments } from "./getcomments.js";

async function init() {
  await getPosts();
  await getComments();
  const loader = document.getElementById("loader");
  const
  (async function () {
    loader.classList.add("active");

  })();
  loader.classList.remove("active");
}

init();