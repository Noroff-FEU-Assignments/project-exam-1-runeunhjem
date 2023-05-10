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
  In this example, we're sending a POST request to the WordPress REST API endpoint for
  creating new posts (https://your-wordpress-site.com/wp-json/wp/v2/posts), with the Content-Type
  header set to application/json and the Authorization header set to a bearer token that
  grants permission to create new posts. The body of the request contains the post data,
  including the title, content, and status parameters.

Setting the status parameter to "publish" will cause the post to be automatically
published when it's created. If you set the status parameter to "draft", the post will be saved as a draft instead of being published immediately.
*/