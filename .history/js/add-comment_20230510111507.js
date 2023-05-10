const data = {
  post: 123, // Replace 123 with the ID of the post you want to comment on
  author_name: "John Doe",
  author_email: "johndoe@example.com",
  content: "This is my comment",
};

fetch("https://your-wordpress-site.com/wp-json/wp/v2/comments", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_ACCESS_TOKEN",
  },
  body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Comment created:", data);
  })
  .catch((error) => {
    console.error("Error creating comment:", error);
  });

  /*
  