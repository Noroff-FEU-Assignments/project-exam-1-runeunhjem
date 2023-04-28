const searchIcon = document.querySelector(".searchbar-icon");
const searchContainer = document.querySelector(".search-container");

searchIcon.addEventListener("click", function () {
  searchContainer.classList.toggle("show");
});
