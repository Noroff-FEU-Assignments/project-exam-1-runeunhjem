const apiUrl = `https://wordpress.runeunhjem.no/wp-json/wp/v2/posts?per_page=50&_embed=1&search=${searchTerm}`;
// const apiUrl = "https://wordpress.runeunhjem.no/wp-json/wp/v2/posts?per_page=50&_embed=1";
// const apiUrl = "https://wordpress.runeunhjem.no/wp-json/wp/v2/posts?per_page=50";
let posts = [];



async function getPosts(searchTerm = "") {
  try {
    const response = await fetch(apiUrl);
    const result = await response.json();
    console.log(result);

    for (const item of result) {
      const categories = item._embedded["wp:term"][0].map((category) => category.name);
      const tags = item._embedded["wp:term"][1]
        .filter((tag) => tag.name !== "ep1" && tag.name !== "food")
        .map((tag) => tag.name);

      const post = {
        postId: item.id,
        title: item.title.rendered.replace(/&amp;/g, "&"),
        shortDescription: item.content.rendered.match(/<p>(.*?)<\/p>/)[1].trim(),
        tags: tags,
        date: new Date(item.modified),
        categories: categories,
        image: item.content.rendered.match(/src="([^"]*)"/)[1],
        instructions: item.content.rendered.match(/<ol>(.*?)<\/ol>/s)[0],
        recipe: item.content.rendered.match(/Ingredients:([\s\S]*?)<ol>/)[1].trim(),
      };
      posts.push(post);
    }
  } catch (error) {
    console.log(error);
  }
}

export { getPosts, posts };
