var  flagsContainer = document.getElementById("flagsContainer");

var uiBundle = "capgeminidemo";
var domains = {
    en: {
        domainCode: "capgeminidemo",
        label: "English",
        info: "Custom message"
    },
    de: {
        domainCode: "capgeminidemo",
        label: "Germany",
        info: "Agents are currently not available"
    },
    fr: {
        domainCode: "capgeminidemo",
        label: "Francuski",
        info: "Agents are currently not available"
    },
    es: {
        domainCode: "capgeminidemo",
        label: "Hiszpański",
        info: "Agents are currently not available"
    },
    br: {
        domainCode: "capgeminidemo",
        label: "Brazylijski",
        info: "Agents are currently not available"
    },
    it: {
        domainCode: "capgeminidemo",
        label: "Italiano",
        info: "Agents are currently not available"
    }
}

addFlags();




function addFlags() {
    for (var language in domains) {
        addFlag(
            language,
            domains[language].domainCode,
            domains[language].label,
            domains[language].info
            )
    }    
}


function addFlag(language, domain, label, info) {
    var box = document.createElement('div');
    box.className = "splide__slide";
    box.innerHTML = `
    <div class="flag-container-inner">
        <div class="flag flag-${language}"></div>
    </div>
    `;
//     <div class="flag-text">
//     <p>${label}</p>
// </div>
// <div class="flag-info hidden">
//     <p>${info}</p>
// </div>
    box.setAttribute("onclick", `openBot('${domain}')`);
     flagsContainer.appendChild(box);
}

function openBot(domain ="capgeminidemo") {
    console.warn("Clicked!");
    // window.location.href = `https://capgemini-eu.dev.amelia.com/Amelia/ui/${uiBundle}/login?embed=iframe&domainCode=${domain}&language=en&hint=Hello world!&delay=5000`;
}

var collapseElement = document.getElementById("headerCollapse"); 
var prevScrollpos =  flagsContainer.scrollTop;
 flagsContainer.onscroll = function() {
    var scrollHeight = document.getElementsByClassName('header-title')[0].clientHeight;
    var currentScrollPos =  flagsContainer.scrollTop;
    if( currentScrollPos > scrollHeight || prevScrollpos > scrollHeight) {
        if (prevScrollpos > currentScrollPos) {
            collapseElement.classList.remove("collapse")
        } else {
            collapseElement.classList.add("collapse")
        }
    }
    prevScrollpos = currentScrollPos;
}


document.addEventListener('DOMContentLoaded', function () {
    new Splide('.splide', {
        type: 'loop',
        rewind: true,
        focus: 'center',
        perPage: 4,
        perMove: 3,
        easing: 'linear',
        arrows: false,
        pagination: false,
        autoplay: false,
        keyboard: true,
        direction: 'ttb',
        height: '70vh',
        updateOnMove: true,
    }).mount();
});


// var target = document.querySelector('#flagsContainer');
// var observer = new MutationObserver(function(mutations) {
//   mutations.forEach(function(mutation) {
//     document.querySelectorAll(".splide__slide:not([is-visible])").forEach(element => {
//         element.style.transform = 'perspective(200px) rotateX(-20deg) scale(0.9) ';
//     });
//     document.querySelectorAll(".is-visible")[0].style.transform = 'scale(1.1) translate3d(0px, -10px, 0px) perspective(200px) rotateX(20deg)';
//     document.querySelectorAll(".is-visible")[1].style.transform = 'rotateX(0deg) scale(1.2)';
//     document.querySelectorAll(".is-visible")[2].style.transform = 'scale(1.1) translate3d(0px, 10px, 0px) perspective(200px) rotateX(-20deg)';

//   });    
// });
// var config = { attributes: true, childList: true, characterData: true };
// observer.observe(target, config);


// // ==================================================


// let draggableItems = document.querySelectorAll('.flag-container-inner');
// let initialX;
// let offsetX = 0;
// let startingX;
// let targetElement;
// let lastActiveDropArea = null;

// let resetTransitionEndHandler = function () {
//     // Removes the style
//     this.removeAttribute('style');
// };

// /* Creates a handler for each event listener */
// let touchStartHandler = function (event) {
//     draggableItems.forEach(draggableItem => {
//     if (event.target == draggableItem) {
//         interactionStart(event.target, event.touches[0].pageX, event.touches[0].pageY);
//     } else {
//         return;
//     }
//     });
// };

// let touchMovetHandler = function (event) {
//     draggableItems.forEach(draggableItem => {
//     if (event.target == draggableItem) {
//         interactionMove(event.target, event.touches[0].pageX, event.touches[0].pageY);
//     } else {
//         return;
//     }
//     });
// };

// let touchEndtHandler = function (event) {
//     interactionEnd(event.target, event.changedTouches[0].pageX, event.changedTouches[0].pageY);
// };

// /* Create handlers to each interaction */
// let interactionStart = function (element, coordX) {

//     // Defines variables
//     let draggableItemRect = element.getBoundingClientRect();

//     /* Sets initial values */
//     initialX = coordX;
//     startingX = draggableItemRect.left;
//     // startingX = document.body.clientWidth/100 -document.body.clientWidth;
//     /* Adds active class */
//     // if (!element.classList.contains('active')) {
//     //     element.classList.add('active');
//     // }
// };

// let interactionMove = function (element, coordX) {
//     /* Sets offset values */
//     offsetX = coordX - initialX;
//     console.log(`OffsetX: ${offsetX.toFixed(2)}, startingX: ${startingX.toFixed(2)}, difference: ${(startingX - offsetX).toFixed(2)}`)

//     /* Transforms the UI to move the element */
//     element.style.transform = "translateX(" + (startingX + offsetX) + "px) ";
// };

// let interactionEnd = function (element, coordX) {

//     if (offsetX < -50) {
//         console.error("123");
//         element.classList.add('active');
//         element.querySelector('.flag-text').classList.add('hidden');
//         element.querySelector('.flag-info').classList.remove('hidden');
//     }else{
//         console.error("abc");
//         if(offsetX > 100){
//             openBot('capgeminidemo');
//         }
//         element.classList.remove('active');
//         element.querySelector('.flag-text').classList.remove('hidden');
//         element.querySelector('.flag-info').classList.add('hidden');

//     }
//     element.style.transform = "translateX(" + startingX + "px) ";
//     element.addEventListener('transitionend', resetTransitionEndHandler);
// };

// /* Creates the necessary functions */
// let addEventListeners = function (element) {
//     /* Touch related events */
//     element.addEventListener('touchstart', touchStartHandler);
//     element.addEventListener('touchmove', touchMovetHandler);
//     element.addEventListener('touchend', touchEndtHandler);
// };

// /* Executes a function to create all event listeners */
// draggableItems.forEach(draggableItem => {
//     addEventListeners(draggableItem);
// });

window.addEventListener("orientationchange", function() {draggableItems.forEach(draggableItem => {draggableItem.removeAttribute('style')})}, false);

//================================================
