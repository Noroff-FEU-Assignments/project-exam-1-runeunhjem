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
  }
});
async function getComments() {
  try {
    const response = await fetch(`https://wordpress.runeunhjem.no/wp-json/wp/v2/comments?post=${postId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}


// const options = {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//     Authorization:
//       "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3dvcmRwcmVzcy5ydW5ldW5oamVtLm5vIiwiaWF0IjoxNjgzNzA3MzA3LCJuYmYiOjE2ODM3MDczMDcsImV4cCI6MTY4NDMxMjEwNywiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiNiJ9fX0.fUpoOYNlEQX7EVTvmqcYB-0M-_2TgQvBmSDmf2HlPbs",
//   },
//   body: JSON.stringify(data),
// };


// async function handleCommentSubmit(args) {
//   // event.preventDefault();
//   try {
//     const response = await fetch(commentApi, options);
//     const data = await response.json();
//     console.log("Comment created:", data);
//   } catch (error) {
//     console.error("Error creating comment:", error);
//   } finally {
//     window.location.reload();
//   }
// };

  /*
  In this example, we're sending a POST request to the WordPress REST API endpoint for creating new
  comments (https://your-wordpress-site.com/wp-json/wp/v2/comments), with the Content-Type header set
  to application/json and the Authorization header set to a bearer token that grants permission to
  create new comments. The body of the request contains the comment data, including the post, author_name,
  author_email, and content parameters.

Note that the post parameter should be set to the ID of the post you want to comment on.
You can find the ID of a post by looking at the URL of the post in the WordPress admin area.
For example, if the URL of the post is https://your-wordpress-site.com/wp-admin/post.php?post=123&action=edit,
the ID of the post is 123.

Also note that you may need to add some additional fields to the comment data, such as author_url,
depending on your WordPress setup. Check the WordPress REST API documentation for more information on
the available fields for comments.
*/