const jwtApi = "https://wordpress.runeunhjem.no/wp-json/jwt-auth/v1/token";
const commentApi = "https://wordpress.runeunhjem.no/wp-json/wp/v2/comments";
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const postId = parseInt(params.get("id"));
console.log("postId comment is: ", postId);
const commentName = document.getElementById("name-input");
const commentEmail = document.getElementById("email-input");
const commentContent = document.getElementById("comment-input");
const postCommentButton = document.getElementById("post-comment");
const commentForm = document.getElementById("comment-form");

//allow anonymous comments
// function filter_rest_allow_anonymous_comments() {
//   return true;
// }
// add_filter("rest_allow_anonymous_comments", "filter_rest_allow_anonymous_comments");

// const data = {
//   username: "comment",
//   password: "comment-test-1234",
//   post: postId,
//   author_name: commentName.value,
//   author_email: commentEmail.value,
//   content: commentContent.value
// };

// postCommentButton.addEventListener("click", () => {
//   handleCommentSubmit(data,
//   //   {
//   //   username: "comment",
//   //   password: "comment-test-1234",
//   // }
//   );

// });
commentForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  try {
    const response = await fetch(`${commentApi}?post=${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post: postId,
        author_name: commentName.value,
        author_email: commentEmail.value,
        content: commentContent.value,
      }),
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Success! Your comment is posted");
  };
});

async function getComments() {
  try {
    const response = await fetch(`${commentApi}?post=${postId}`);
    const data = await response.json();
    console.log("data is: ", data);
    return data;
  } catch (error) {
    console.log(error);
  };
};
getComments();
