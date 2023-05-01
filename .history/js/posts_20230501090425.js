const apiUrl = "https://wordpress.runeunhjem.no/wp-json/wp/v2/posts?_embed";
// postContainer = document.getElementById("post-container");
let posts = [];

async function getPosts() {
  try {
      const response = await fetch(apiUrl);
      posts = await response.json();
      console.log(posts);

      
      // displayPosts(); // Do some srting and get only what is needed
  } catch (error) {
      console.log(error);
  };
};

getPosts();

export { posts };