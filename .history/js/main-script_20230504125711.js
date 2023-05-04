// Get the original nav element
const originalNav = document.querySelector(".main-navigation");

// Clone the nav element
const clonedNav = originalNav.cloneNode(true);

const footer = document.querySelector(".footer");
footer.parentNode.insertBefore(clonedNav, footer.nextSibling);
