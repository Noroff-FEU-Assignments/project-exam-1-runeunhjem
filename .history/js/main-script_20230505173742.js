// const footerNav = document.querySelector(".footer-nav");
// const clonedNav = footerNav.cloneNode(true);
// const burgerIcon = document.querySelector(".menu-icon");

// clonedNav.classList.add("cloned-nav");
// document.body.appendChild(clonedNav);

// burgerIcon.addEventListener("click", function () {
//   clonedNav.classList.toggle("is-open");

//   if (clonedNav.classList.contains("is-open")) {
//     const burgerIconRect = burgerIcon.getBoundingClientRect();
//     const clonedNavRect = clonedNav.getBoundingClientRect();
//     const clonedNavBottom = window.innerHeight - burgerIconRect.bottom;
//     const clonedNavRight = window.innerWidth - burgerIconRect.right;

//     clonedNav.style.bottom = `${clonedNavBottom}px`;
//     clonedNav.style.right = `${clonedNavRight}px`;
//   };

// });

const footerNav = document.querySelector(".footer-nav");
const clonedNav = footerNav.cloneNode(true);
const burgerIcon = document.querySelector(".menu-icon");

clonedNav.classList.add("cloned-nav");
document.body.appendChild(clonedNav);

let isMenuOpen = false;

burgerIcon.addEventListener("click", function () {
  isMenuOpen = !isMenuOpen;
  if (isMenuOpen) {
    clonedNav.classList.add("is-open");
    const burgerIconRect = burgerIcon.getBoundingClientRect();
    const clonedNavRect = clonedNav.getBoundingClientRect();
    const clonedNavBottom = window.innerHeight - burgerIconRect.bottom;
    const clonedNavRight = window.innerWidth - burgerIconRect.right;

    clonedNav.style.bottom = `${clonedNavBottom}px`;
    clonedNav.style.right = `${clonedNavRight}px`;
  } else {
    clonedNav.classList.remove("is-open");
  }
});

document.addEventListener("click", function (event) {
  if (!clonedNav.contains(event.target) && isMenuOpen) {
    clonedNav.classList.remove("is-open");
    isMenuOpen = false;
  }
});
