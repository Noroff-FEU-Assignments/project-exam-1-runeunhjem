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
  In this example, we're sending a POST request to the WordPress REST API endpoint for creating new
  comments (https://your-wordpress-site.com/wp-json/wp/v2/comments), with the Content-Type header set
  to application/json and the Authorization header set to a bearer token that grants permission to
  create new comments. The body of the request contains the comment data, including the post, author_name,
  author_email, and content parameters.

Note that the post parameter should be set to the ID of the post you want to comment on. You can find the ID of a post by looking at the URL of the post in the WordPress admin area. For example, if the URL of the post is https://your-wordpress-site.com/wp-admin/post.php?post=123&action=edit, the ID of the post is 123.

Also note that you may need to add some additional fields to the comment data, such as author_url, depending on your WordPress setup. Check the WordPress REST API documentation for more information on the available fields for comments.
*/