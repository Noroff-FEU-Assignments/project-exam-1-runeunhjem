import { posts } from "./posts.js";

import { getPosts, posts } from "./posts.js";
const postContainer = document.getElementById("post-container");

(async function () {
  await getPosts();
  console.log("posts is: ", posts);

  // Do something with the posts array
})();
