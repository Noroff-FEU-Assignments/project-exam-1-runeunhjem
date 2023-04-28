const searchIcon = document.querySelector(".search-icon");
const searchContainer = document.querySelector(".search-container");
.main-navigation

searchIcon.addEventListener("click", function () {
  searchContainer.classList.toggle("show");
});
console.log(searchContainer.classList);