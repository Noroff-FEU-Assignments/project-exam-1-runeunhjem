import { getPosts, posts } from "./get-posts.js";

let searchTerm = searchQuery || "";
const form = document.getElementById("search-form");
const input = form.querySelector("input[name='query']");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const searchQuery = params.get("query");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  searchTerm = input.value.trim();
  filterPosts();
});

function filterPosts() {
  const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
  // ...
}

