const searchIcon = document.querySelector(".search-icon");
const searchContainer = document.querySelector(".search-container");
const navContainer = document.querySelector(".main-navigation");

searchIcon.addEventListener("click", function () {
  searchContainer.classList.toggle("show");
  
});
console.log(searchContainer.classList);