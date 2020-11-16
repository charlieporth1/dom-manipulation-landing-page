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
const delay = ms => new Promise(res => setTimeout(res, ms));
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
const createId = (id = '') => {
    return `${id}_ctp-tech-lp`
};

const createNavSectionId = (index) => {
    return `section${index}-navbar`
};

function toggleVisibility(htmlElement) {
    const isHidden = htmlElement.style.display.toString().includes("none");
    const toggleStr = !isHidden ? "none" : "block"; //custom code loaded from utils
    return toggleStr;
}

function setVisibility(visibility) {
    return !visibility ? "none" : "block"; //custom code loaded from utils
}

function createNavSectionItems() {
    return sectionsIds.map((id, index) => {
        return `<li id="${createNavSectionId(index)}" class="navbar__menu" style="display: none"><p class="menu__link" onclick="onClickSmoothScrollNavBar('${id}')">Section ${index + 1}</p></li>`
    }).toString().replaceAll(",", "");
}

function onClickSmoothScrollNavBar(idToScrollTo) {
    setNavBarVisibility(false);
    const sectionElement = document.querySelector(`#${idToScrollTo}`);
    window.scrollTo({behavior: "smooth", top: sectionElement.getBoundingClientRect().top});
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */
// build the nav
function addNav() {
    navList.innerHTML =
        `<h2 style="font-size: 1.5em; padding-right: 10px">Navigation</h2>
         ${createNavSectionItems()}
        <div id="other-sites">
        ${OtherWebsites()}
        </div>`;

}

function getPosition(element) {
    let xPosition = 0;
    let yPosition = 0;
    while (element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    return {x: xPosition, y: yPosition,};
}

async function onScrollListener() {
    await delay(1000); //wait because this is heavy after page load
    const sectionPositions = Array.from(sections).map((element, index) => {
        return {position: getPosition(element), id: createNavSectionId(index), index: index};
    });
    window.onscroll = function () {
        let currentScrollPos = window.pageYOffset;
        // 20 is an arbitrary number here, just to make you think if you need the prevScrollpos variable:
        const elementObj = sectionPositions.filter(postion => postion.position.y > currentScrollPos).shift();
        if (currentScrollPos < 20) {
            document.getElementById(sectionPositions[0].id).style.display = setVisibility(false);
        } else if (elementObj) {
            document.getElementById(elementObj.id).style.display = setVisibility(true);
            const i = elementObj.index;
            if (sectionPositions[i - 1])
                document.getElementById(sectionPositions[i - 1].id).style.display = setVisibility(false);
            if (sectionPositions[i + 1])
                document.getElementById(sectionPositions[i + 1].id).style.display = setVisibility(false);
        }
    }
}


/**
 * @return {string}
 */
function OtherWebsites() {
    return `
    <li class="navbar__menu" style="display: none" id=${createId("ctp-tech")}"><a  class="menu__link" href='https://www.ctptech.dev'>Portfolio Website</a></li>
    <li class="navbar__menu" style="display: none" id="${createId('charlie-tech')}"><a class="menu__link" href='https://charlie-tech.ctptech.dev'>IT Support Website</a></li>
    <li class="navbar__menu" style="display: none" id="${createId('otih')}"><a class="menu__link" href='https://otih.ctptech.dev'>6th grade Website</a></li>
    <li class="navbar__menu" style="display: none" id="${createId('studioso')}"><a class="menu__link" href='https://studioso.ctptech.dev'>Old Company Website</a></li>
  `;
}

window.addEventListener('load', async () => {
    addNav();
    onLoad();
    await onScrollListener();
});

function onLoad() {
    // Add class 'active' to section when near top of viewport
    navList.addEventListener('mouseover', () => {
        setNavBarVisibility(true);
    });
    navList.addEventListener('mouseleave', () => {
        setNavBarVisibility(false);
    });
}

function setNavBarVisibility(isVisibility) {
    const listItems = navList.getElementsByClassName('navbar__menu');
    for (let item of listItems) {
        item.style.display = setVisibility(isVisibility);
    }
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
