/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */
const navList = document.querySelector('#navbar__list');
const sections = document.getElementsByClassName('section-class');
const sectionsIds = Array.from(sections).map((section) => {
    return section.id;
});
/**
 * End Global Variables
 * Start Helper Functions
 *
 */
const Visibility = {
    hidden:false,
    visible: true,
    none:null,
};
const createId = (id = '')=> {
    return `${id}_ctp-tech-lp`
};
function toggleVisibility(htmlElement)  {
    const isHidden = htmlElement.style.display.toString().includes("none");
    const toggleStr = !isHidden ? "none" : "block"; //custom code loaded from utils
    return toggleStr;
}
function setVisibility(visibility) {
    return !visibility ? "none" : "block"; //custom code loaded from utils
}

function createNavSectionItems() {
    return sectionsIds.map((id, index) => {
        return `<li  class="navbar__menu" style="display: none"> <a class="menu__link" href='#${id}'>Section ${index + 1}</a></li>`
    }).toString().replaceAll(",","");
}
/**
 * End Helper Functions
 * Begin Main Functions
 *
 */
// build the nav
function addNav() {
    navList.innerHTML =
        `
        <h2 style="font-size: 1.5em; padding-right: 10px">Navigation</h2>
        ${createNavSectionItems()}
 
        ${OtherWebsites()}
        `;

}

/**
 * @return {string}
 */
function OtherWebsites() {
    return  `<li class="" style="display: none" id=${createId()}"><a  class="menu__link" href='https://www.ctptech.dev'>Portfolio Website</a></li>
    <li class="navbar__menu" style="display: none" id="${createId('charlie-tech')}"><a class="menu__link" href='https://charlie-tech.ctptech.dev'>IT Support Website</a></li>
    <li class="navbar__menu" style="display: none" id="${createId('otih')}"><a class="menu__link" href='https://otih.ctptech.dev'>6th grade Website</a></li>
    <li class="navbar__menu" style="display: none" id="${createId('studioso')}"><a class="menu__link" href='https://studioso.ctptech.dev'>Old Company Website</a></li>
  `;
}
window.addEventListener('load', ()=> {
    addNav();
    onLoad();
});
function onLoad() {
    // Add class 'active' to section when near top of viewport
    navList.addEventListener('mouseover', ()=> {
        const listItems = navList.getElementsByClassName('navbar__menu');
        for (let item of listItems) {
            item.style.display = setVisibility(true);
        }
    });
    navList.addEventListener('mouseleave', ()=> {
        const listItems = navList.getElementsByClassName('navbar__menu');
        for (let item of listItems) {
            item.style.display = setVisibility(false);
        }
    });
}

// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu 

// Scroll to section on link click

// Set sections as active
