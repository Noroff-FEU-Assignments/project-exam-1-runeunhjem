
const footerNav = document.querySelector(".footer-nav");
const clonedNav = footerNav.cloneNode(true);

clonedNav.classList.add("cloned-nav");
document.body.appendChild(clonedNav);
const burgerIcon = document.querySelector(".menu-icon");
const clonedNavHeight = clonedNav.getBoundingClientRect().height;
const clonedNavRight = clonedNav.getBoundingClientRect().right;


burgerIcon.addEventListener("click", function () {
  const burgerIconRect = burgerIcon.getBoundingClientRect();
  const burgerIconTop = burgerIconRect.top + burgerIconRect.height;
  const burgerIconRight = burgerIconRect.right + burgerIconRect.right;
  const clonedNavTop = Math.min(burgerIconTop, window.innerHeight - clonedNavHeight);
  const clonedNavRight = Math.min(burgerIconRight, window.innerHeight - clonedNavRight);

  clonedNav.style.top = clonedNavTop + "px";
  console.log("clonedNavHeight is: ", clonedNavHeight);
  clonedNav.style.right = clonedNavRight + "px";
  console.log("clonedNavRight is: ", clonedNavRight);
  // clonedNav.style.right = burgerIconRect.right + "px";
  clonedNav.classList.toggle("is-open");
});


// const clonedNav = document.querySelector(".cloned-nav");
// const burgerIcon = document.querySelector(".menu-icon");

// burgerIcon.addEventListener("click", function () {
//   const burgerIconRect = burgerIcon.getBoundingClientRect();
//   const burgerIconTop = burgerIconRect.top + burgerIconRect.height;
//   const clonedNavTop = burgerIconTop;

//   clonedNav.style.top = clonedNavTop + "px";
//   clonedNav.style.right = burgerIconRect.right + "px";
//   clonedNav.classList.toggle("is-open");
// });
