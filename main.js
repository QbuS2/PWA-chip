var  flagsContainer = document.getElementById("flagsContainer");

var uiBundle = "capgeminidemo";
var domains = {
    en: {
        domainCode: "capgeminidemo",
        label: "English"
    },
    de: {
        domainCode: "capgeminidemo",
        label: "Germany"
    },
    fr: {
        domainCode: "capgeminidemo",
        label: "Francuski"
    },
    es: {
        domainCode: "capgeminidemo",
        label: "Hiszpański"
    },
    br: {
        domainCode: "capgeminidemo",
        label: "Brazylijski"
    },
    it: {
        domainCode: "capgeminidemo",
        label: "Italiano"
    }
}

addFlags();




function addFlags() {
    for (var language in domains) {
        console.log("language '" + language + "' has domain: " + domains[language].domainCode);
        addFlag(
            language,
            domains[language].domainCode,
            domains[language].label
        )
    }    
}


function addFlag(language, domain, label) {
    var box = document.createElement('div');
    box.className = "flag-container-outer";
    box.innerHTML = `
    <div class="flag-container-inner">
        <div class="flag flag-${language}"></div>
        <div class="flag-text">
            <p>${label}</p>
        </div>
        <div class="flag-info hidden">
            <p>Agents are currently not available</p>
        </div>
    </div>
    `;
    box.setAttribute("onclick", `openBot('${domain}')`);
     flagsContainer.appendChild(box);
}

function openBot(domain ="capgeminidemo") {
    console.warn("Clicked!");
    window.location.href = `https://capgemini-eu.dev.amelia.com/Amelia/ui/${uiBundle}/login?embed=iframe&domainCode=${domain}&language=en&hint=Hello world!&delay=5000`;
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


// ==================================================


let draggableItems = document.querySelectorAll('.flag-container-inner');
let initialX;
let initialY;
let offsetX = 0;
let offsetY = 0;
let startingX;
let startingY;
let targetElement;
let lastActiveDropArea = null;

let resetTransitionEndHandler = function () {
    // Removes the style
    this.removeAttribute('style');
};

/* Creates a handler for each event listener */
let touchStartHandler = function (event) {
    draggableItems.forEach(draggableItem => {
    if (event.target == draggableItem) {
        interactionStart(event.target, event.touches[0].pageX, event.touches[0].pageY);
    } else {
        return;
    }
    });
};

let touchMovetHandler = function (event) {
    draggableItems.forEach(draggableItem => {
    if (event.target == draggableItem) {
        interactionMove(event.target, event.touches[0].pageX, event.touches[0].pageY);
    } else {
        return;
    }
    });
};

let touchEndtHandler = function (event) {
    interactionEnd(event.target, event.changedTouches[0].pageX, event.changedTouches[0].pageY);
};

/* Create handlers to each interaction */
let interactionStart = function (element, coordX, coordY) {

    // Defines variables
    let draggableItemRect = element.getBoundingClientRect();

    /* Sets initial values */
    initialX = coordX;
    initialY = coordY;
    startingX = draggableItemRect.left;
    // startingX = document.body.clientWidth/100 -document.body.clientWidth;
    /* Adds active class */
    // if (!element.classList.contains('active')) {
    //     element.classList.add('active');
    // }
};

let interactionMove = function (element, coordX, coordY) {
    /* Sets offset values */
    offsetX = coordX - initialX;
    offsetY = coordY - initialY;
    console.log(`OffsetX: ${offsetX.toFixed(2)}, startingX: ${startingX.toFixed(2)}, difference: ${(startingX - offsetX).toFixed(2)}`)

    /* Transforms the UI to move the element */
    element.style.transform = "translateX(" + (startingX + offsetX) + "px) ";
};

let interactionEnd = function (element, coordX, coordY) {

    if (offsetX < -50) {
        console.error("123");
        element.classList.add('active');
        element.querySelector('.flag-text').classList.add('hidden');
        element.querySelector('.flag-info').classList.remove('hidden');
    }else{
        console.error("abc");
        if(offsetX > 100){
            openBot('capgeminidemo');
        }
        element.classList.remove('active');
        element.querySelector('.flag-text').classList.remove('hidden');
        element.querySelector('.flag-info').classList.add('hidden');

    }
    element.style.transform = "translateX(" + startingX + "px) ";
    element.addEventListener('transitionend', resetTransitionEndHandler);
};

/* Creates the necessary functions */
let addEventListeners = function (element) {
    /* Touch related events */
    element.addEventListener('touchstart', touchStartHandler);
    element.addEventListener('touchmove', touchMovetHandler);
    element.addEventListener('touchend', touchEndtHandler);
};

/* Executes a function to create all event listeners */
draggableItems.forEach(draggableItem => {
    addEventListeners(draggableItem);
});

window.addEventListener("orientationchange", function() {draggableItems.forEach(draggableItem => {draggableItem.removeAttribute('style')})}, false);