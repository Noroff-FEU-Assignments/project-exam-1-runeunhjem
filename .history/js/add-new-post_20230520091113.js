const jwtApi = "https://wordpress.runeunhjem.no/wp-json/jwt-auth/v1/token";
const commentApi = "https://wordpress.runeunhjem.no/wp-json/wp/v2/comments";
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const postId = parseInt(params.get("id"));
// console.log("postId comment is: ", postId);
const commentName = document.getElementById("name-input");
const commentEmail = document.getElementById("email-input");
const commentContent = document.getElementById("comment-input");
const postCommentButton = document.getElementById("post-comment");
const commentForm = document.getElementById("comment-form");

const data = {
  title: "My new post",
  content: "This is the content of my new post.",
  status: "publish",
};

fetch("https://your-wordpress-site.com/wp-json/wp/v2/posts", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_ACCESS_TOKEN",
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((data) => {
    // console.log("Post created:", data);
  })
  .catch((error) => {
    console.error("Error creating post:", error);
  });

