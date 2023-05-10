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
    console.log("Post created:", data);
  })
  .catch((error) => {
    console.error("Error creating post:", error);
  });

  /*