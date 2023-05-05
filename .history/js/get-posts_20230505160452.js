// const apiUrl = "https://wordpress.runeunhjem.no/wp-json/wp/v2/posts?per_page=50&_embed";
const apiUrl = "https://wordpress.runeunhjem.no/wp-json/wp/v2/posts?per_page=4";
let posts = [];

async function getPosts() {
  try {
    const response = await fetch(apiUrl);
    const result = await response.json();
    console.log(result);

    for (const item of result) {
      const categoriesResponse = await fetch(item._links["wp:term"][0].href);
      const categoriesResult = await categoriesResponse.json();
      const categories = categoriesResult.map(category => category.name);

      const tagsResponse = await fetch(item._links["wp:term"][1].href);
      const tagsResult = await tagsResponse.json();
      const tags = tagsResult
        .filter((tag) => tag.name !== "ep1" && tag.name !== "food").map((tag) => tag.name);

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
    };
  } catch (error) {
    console.log(error);
  };
};

export { getPosts, posts };
