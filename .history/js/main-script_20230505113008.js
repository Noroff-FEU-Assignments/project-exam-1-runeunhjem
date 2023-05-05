const footerNav = document.querySelector(".footer-nav");
const clonedNav = footerNav.cloneNode(true);
const burgerIcon = document.querySelector(".menu-icon");
// document.addEventListener('DOMContentLoaded', function() {
  clonedNav.classList.add("cloned-nav");
  document.body.appendChild(clonedNav);
  // const clonedNav = document.querySelector(".cloned-nav");

  burgerIcon.addEventListener("click", function () {
    clonedNav.classList.toggle("is-open");
  });
// });

