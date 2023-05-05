const searchIcon = document.querySelector(".search-icon");
const searchContainer = document.querySelector(".search-container");
const navContainer = document.querySelector(".search-bar");

// Add click event listener to the search icon
searchIcon.addEventListener("click", function () {
  searchContainer.classList.toggle("show");
  navContainer.classList.toggle("hide");
});

// Add click event listener to the entire document
document.addEventListener("click", function (event) {
  // If the user clicks outside of the search container, close the search bar
  if (!searchContainer.contains(event.target) && !searchIcon.contains(event.target)) {
    searchContainer.classList.remove("show");
    navContainer.classList.remove("hide");
  }
});
