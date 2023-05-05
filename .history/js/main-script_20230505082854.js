const footerNav = document.querySelector(".footer-nav");
const clonedNav = footerNav.cloneNode(true);

clonedNav.classList.add("cloned-nav");
document.body.appendChild(clonedNav);
const burgerIcon = document.querySelector(".burger-icon");
// const clonedNav = document.querySelector(".cloned-nav");

burgerIcon.addEventListener("click", function () {
  clonedNav.classList.add("is-open");
});
