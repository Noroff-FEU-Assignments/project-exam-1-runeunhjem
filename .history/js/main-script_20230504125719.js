// Get the original nav element
const originalNav = document.querySelector(".main-navigation");
const clonedNav = originalNav.cloneNode(true);
const footer = document.querySelector(".footer");
footer.parentNode.insertBefore(clonedNav, footer.nextSibling);
