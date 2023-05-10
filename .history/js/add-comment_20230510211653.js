const commentApi = "https://wordpress.runeunhjem.no/wp-json/wp/v2/comments";
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const postId = parseInt(params.get("id"));
console.log("postId comment is: ", postId);
let comments = [];
const userComments = document.getElementById("user-comments");
// const jwtApi = "https://wordpress.runeunhjem.no/wp-json/jwt-auth/v1/token";
const commentName = document.getElementById("name-input");
const commentEmail = document.getElementById("email-input");
const commentContent = document.getElementById("comment-input");
// const postCommentButton = document.getElementById("post-comment");
const commentForm = document.getElementById("comment-form");

// commentForm.addEventListener("submit", async function (event) {
//   event.preventDefault();
//   try {
//     const response = await fetch(`${commentApi}?post=${postId}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         post: postId,
//         author_name: commentName.value,
//         author_email: commentEmail.value,
//         content: commentContent.value,
//         // status: "approve",
//       }),
//     });

//     const data = await response.json();
//     console.log("data is: ", data);
//   } catch (error) {
//     console.log(error);
//   } finally {
//     console.log("Success! Your comment is posted");
//   };
// });

// async function getComments() {
//   try {
//     const response = await fetch(`${commentApi}?post=${postId}`);
//     console.log("postId is: ", postId);
//     const data = await response.json();
//     console.log("data is: ", data);

//     for (const item of data) {
//       const comment = {
//         commentId: item.id,
//         postId: item.post,
//         postDate: item.date,
//         commentName: item.author_name,
//         commentEmail: item.author_email,
//         commentContent: item.content.rendered.replace(/(<([^>]+)>)/gi, "").replace(/&[a-z]+;/gi, ""),
//       };
//       comments.push(comment);
//       console.log("comments is: ", comments);
//     }
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
//   // window.location.reload();
// }

// export { getComments, comments };

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
        // status: "approve",
      }),
    });

    const data = await response.json();
    console.log("data is: ", data);

    // Reload the comments list
    await getComments();
    // Update the UI with the updated comments list
    updateCommentsUI();

  } catch (error) {
    console.log(error);
  } finally {
    console.log("Success! Your comment is posted");
  };
});

async function getComments() {
  try {
    const response = await fetch(`${commentApi}?post=${postId}`);
    console.log("postId is: ", postId);
    const data = await response.json();
    console.log("data is: ", data);

    for (const item of data) {
      const comment = {
        commentId: item.id,
        postId: item.post,
        postDate: item.date,
        commentName: item.author_name,
        commentEmail: item.author_email,
        commentContent: item.content.rendered.replace(/(<([^>]+)>)/gi, "").replace(/&[a-z]+;/gi, ""),
      };
      comments.push(comment);
      console.log("comments is: ", comments);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}

function updateCommentsUI() {
  // Clear the existing comments list
  userComments.innerHTML = "";
  // Loop through the comments list and append each comment to the UI
  for (const comment of comments) {
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");
    commentDiv.innerHTML = `
      <h4>${comment.commentName}</h4>
      <p>${comment.commentContent}</p>
      <span class="comment-date">${comment.postDate}</span>
    `;
    userComments.appendChild(commentDiv);
  }
}

export { getComments, comments, updateCommentsUI };
