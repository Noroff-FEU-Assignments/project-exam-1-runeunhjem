const searchIcon = document.querySelector(".search-icon");
const searchContainer = document.querySelector(".search-container");
const navContainer = document.querySelector(".search-bar");

searchIcon.addEventListener("click", function () {
  searchContainer.classList.toggle("show");
  navContainer.classList.toggle("hide");
});

export { searchIcon };