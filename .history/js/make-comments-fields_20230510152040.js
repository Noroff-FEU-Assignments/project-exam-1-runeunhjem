import { getComments, comments } from "./add-comment.js";
console.log("comments is: ", comments);
await getComments();

const detailContainer = document.getElementById("post-details-container");
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const postId = parseInt(params.get("id"));
// console.log("postId is: ", postId);
const loader = document.getElementById("loader");
loader.classList.add("active");

const post = posts.find((p) => p.postId === parseInt(postId));