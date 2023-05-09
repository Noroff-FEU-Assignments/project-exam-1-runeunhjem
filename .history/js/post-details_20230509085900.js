import { getPosts, posts } from "./get-posts.js";
console.log("posts is: ", posts);

await getPosts();
const detailContainer = document.getElementById("post-details-container");
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const postId = parseInt(params.get("id"));
console.log("postId is: ", postId);
const loader = document.getElementById("loader");
loader.classList.add("active");

const post = posts.find((p) => p.postId === parseInt(postId));
console.log("post is: ", post);

document.title = `${post.title} | CHEF'S TABLE`;
console.log("post.title is: ", post.title);


loader.classList.remove("active");
