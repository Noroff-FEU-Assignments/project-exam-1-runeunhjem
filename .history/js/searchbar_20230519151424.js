const searchIcon = document.querySelector(".search-icon");
const searchContainer = document.querySelector(".search-container");
const navContainer = document.querySelector(".search-bar");

searchIcon.addEventListener("click", function () {
  searchContainer.classList.toggle("show");
  navContainer.classList.toggle("hide");
});

document.addEventListener("click", function (event) {
  if (!searchContainer.contains(event.target) && !searchIcon.contains(event.target)) {
    searchContainer.classList.remove("show");
    navContainer.classList.remove("hide");
  }
});

const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get the search term from the input
  const searchTerm = searchInput.value;

  // Update the form action with the search term
  searchForm.action = `search-results.html?query=${searchTerm}`;

  // Submit the form
  searchForm.submit();
});
