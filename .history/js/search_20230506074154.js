

let searchTerm = "";
const form = document.getElementById("search-form");
const input = form.querySelector("input[name='query']");
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const searchQuery = params.get("query");
