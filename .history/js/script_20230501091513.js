import { posts } from "./posts.js";
const postContainer = document.getElementById("post-container");
console.log("posts is: ", posts);

import { getPosts, posts } from "./posts.js";

(async function () {
  await getPosts();
  console.log(posts);
  // Do something with the posts array
})();
