const apiUrl = "https://wordpress.runeunhjem.no/wp-json/wp/v2/posts?per_page=50";
let posts = [];

async function getPosts() {
  try {
    const response = await fetch(apiUrl);
    const result = await response.json();
    console.log(result);

    // for (const item of result) {
    //   const post = {
    //     postId: item.id,
    //     title: item.title.rendered.replace(/&amp;/g, "&"),
    //     shortDescription: item.content.rendered.match(/<p>(.*?)<\/p>/)[1].trim(),
    //     categories: item.categories,
    //     tags: item.tags,
    //     image: item.content.rendered.match(/src="([^"]*)"/)[1],
    //     instructions: item.content.rendered.match(/<ol>(.*?)<\/ol>/s)[0],
    //     recipe: item.content.rendered.match(/Ingredients:([\s\S]*?)<ol>/)[1].trim(),
    //   };
    //   posts.push(post);
    for (const item of result) {
      // fetch categories and tags for the post
      const categoriesResponse = await fetch(item._links["wp:term"][0].href);
      const categoriesResult = await categoriesResponse.json();
      const categories = categoriesResult.map((category) => category.name);

      const tagsResponse = await fetch(item._links["wp:term"][1].href);
      const tagsResult = await tagsResponse.json();
      const tags = tagsResult.map((tag) => tag.name);

      const post = {
        postId: item.id,
        title: item.title.rendered.replace(/&/g, "&amp;"),
        categories: categories,
        tags: tags,
        image: item.content.rendered.match(/src="([^"]*)"/)[1],
        instructions: item.content.rendered.match(/<ol>(.*?)<\/ol>/s)[0],
        shortDescription: item.excerpt.rendered.replace(/(<([^>]+)>)/gi, "").trim(),
        recipe: item.content.rendered.match(/Ingredients:([\s\S]*?)<ol>/)[1].trim(),
      };
      posts.push(post);
    };
  } catch (error) {
    console.log(error);
  };
};

export { getPosts, posts };
