const apiUrl = "https://wordpress.runeunhjem.no/wp-json/wp/v2/posts?_embed";
postContainer = document.getElementById("post-container");
const posts = [];

async function getPosts() {
  try {
      const response = await fetch(apiUrl);
      posts = await response.json();
      console.log(posts);
      displayPosts();
  } catch (error) {
      console.log(error);
  };
};

getPosts();