const apiUrl = "https://wordpress.runeunhjem.no/wp-json/wp/v2/posts?_embed";
// postContainer = document.getElementById("post-container");
let posts = [];

async function getPosts() {
  try {
      const response = await fetch(apiUrl);
      posts = await response.json();
      console.log(posts);

      for (const item of posts) {
        const attributes = item.attributes.map((attr) => ({ [attr.name]: attr.terms[0].name }));
        const game = {
          postId: item.id,
          console.log(postId);
        }
      }
      // displayPosts(); // Do some srting and get only what is needed
  } catch (error) {
      console.log(error);
  };
};

getPosts();

export { posts };