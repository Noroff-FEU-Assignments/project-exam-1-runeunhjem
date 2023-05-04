// Get the original nav element
const originalNav = document.querySelector(".main-navigation");

// Clone the nav element
const clonedNav = originalNav.cloneNode(true);

// Insert the cloned nav element at the bottom of the page
const footer = document.querySelector(".footer");
footer.parentNode.insertBefore(clonedNav, footer.nextSibling);
