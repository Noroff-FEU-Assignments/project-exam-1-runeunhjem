const apiUrl = "https://wordpress.runeunhjem.no/wp-json/wp/v2/posts?_embed";
let posts = [];

async function getPosts() {
  try {
    const response = await fetch(apiUrl);
    const result = await response.json();
    console.log(result);

    for (const item of result) {
      const post = {
        postId: item.id,
      };
      posts.push(post);
      console.log("postId is :", post.postId);
    };
  } catch (error) {
    console.log(error);
  };
};

export { getPosts, posts };
