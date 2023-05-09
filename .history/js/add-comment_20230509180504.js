
try {
  const response = await fetch("https://example.com/wp-json/wp/v2/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + YOUR_JWT_TOKEN,
    },
    body: JSON.stringify({
      post: POST_ID,
      author_name: "John Doe",
      author_email: "john.doe@example.com",
      author_url: "https://johndoe.com",
      content: "This is a comment",
    }),
  });

  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
