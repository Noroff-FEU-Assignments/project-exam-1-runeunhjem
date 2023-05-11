const commentApi = "https://wordpress.runeunhjem.no/wp-json/wp/v2/comments";
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const postId = parseInt(params.get("id"));
console.log("postId comment is: ", postId);
let comments = [];
const userComments = document.getElementById("user-comments");
const commentName = document.getElementById("name-input");
const commentEmail = document.getElementById("email-input");
const commentContent = document.getElementById("comment-input");
const commentForm = document.getElementById("comment-form");
// Form validation
const form = document.getElementById("comment-form");
const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");
const commentInput = document.getElementById("comment-input");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const commentValue = commentInput.value.trim();

  // Validate name field
  if (nameValue.length < 1) {
    alert("Name should have at least 1 character.");
    return;
  }

  // Validate email field
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailValue)) {
    alert("Email should be in the correct format.");
    return;
  }

  // Validate comment field
  if (commentValue.length < 10) {
    alert("Comment should have at least 10 characters.");
    return;
  }

  // Submit the form if all fields are valid
  // Your code for submitting the form goes here
});

// Set placeholders
nameInput.placeholder = "Name...";
emailInput.placeholder = "Email...";
commentInput.placeholder = "Comment...";
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
    console.log("data is: ", data);
  } catch (error) {
    console.log(error);
  } finally {
    location.reload();
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
  };
};

export { getComments, comments };

