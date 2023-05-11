import { getComments, comments } from "./add-comment.js";
console.log("make comments is: ", comments);
await getComments();
console.log("comments after getComments is: ", comments);
const commentsContainer = document.getElementById("user-comments");

if (comments.length === 0) {
  // If no comments are fetched, display a default post
  const defaultPost = document.createElement("p");
  defaultPost.classList.add("comment-container");
  defaultPost.classList.add("comment-container");
  defaultPost.textContent = "<--- Be the first to comment.";
  commentsContainer.appendChild(defaultPost);
} else {
  comments.forEach((comment) => {
    const commentContainer = document.createElement("div");
    commentContainer.classList.add("comment-container");
    commentsContainer.appendChild(commentContainer);

    const title = document.createElement("h4");
    title.classList.add("comment-title");
    title.textContent = `${comment.commentName} posted:`;
    console.log("commentName is: ", comment.commentName);
    commentContainer.appendChild(title);

    const commentContent = document.createElement("p");
    commentContent.classList.add("comment-content");
    commentContent.textContent = `${comment.commentContent}`;
    console.log("commentContent is: ", comment.commentContent);
    commentContainer.appendChild(commentContent);

    const addedContainer = document.createElement("div");
    addedContainer.classList.add("post-date");
    const addedDate = new Date(comment.postDate);
    const options = {
      timeZone: "Europe/Oslo",
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const addedDateString = addedDate.toLocaleString("en-US", options);
    addedContainer.textContent = `Posted: ${addedDateString}`;
    commentContainer.appendChild(addedContainer);
  });
}
