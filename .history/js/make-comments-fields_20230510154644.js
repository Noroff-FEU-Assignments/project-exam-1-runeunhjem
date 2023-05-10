import { getComments, comments } from "./add-comment.js";
console.log("make comments is: ", comments);
await getComments();
console.log("comments after getComments is: ", comments);

comme
const commentsContainer = document.getElementById("user-comments");
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const postId = parseInt(params.get("id"));
// console.log("postId is: ", postId);
const loader = document.getElementById("loader");
loader.classList.add("active");

const post = comments.find((p) => p.postId === parseInt(postId));

const commentContainer = document.createElement("div");
commentContainer.classList.add("comment-container");
commentsContainer.appendChild(commentContainer);

const title = document.createElement("h4");
title.classList.add("comment-title");
title.textContent = `${post.commentName} posted:`;
console.log("commentName is: ", post.commentName);
commentContainer.appendChild(title);