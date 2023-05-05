const footerNav = document.querySelector(".footer-nav");
const clonedNav = footerNav.cloneNode(true);
const burgerIcon = document.querySelector(".menu-icon");

clonedNav.classList.add("cloned-nav");
document.body.appendChild(clonedNav);

burgerIcon.addEventListener("click", function () {
  clonedNav.classList.toggle("is-open");

  if (clonedNav.classList.contains("is-open")) {
    const burgerIconRect = burgerIcon.getBoundingClientRect();
    const clonedNavRect = clonedNav.getBoundingClientRect();
    const clonedNavBottom = window.innerHeight - burgerIconRect.bottom;
    const clonedNavRight = window.innerWidth - burgerIconRect.right;

    clonedNav.style.bottom = `${clonedNavBottom}px`;
    clonedNav.style.right = `${clonedNavRight}px`;
  }

  
});

