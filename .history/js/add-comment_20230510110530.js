const apiUrl = "https://wordpress.runeunhjem.no/wp-json/wp/v2/comments?per_page=50&_embed=1";
try {
  const response = await fetch(apiUrl, {
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
