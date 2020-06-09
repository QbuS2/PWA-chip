var  flagsContainer = document.getElementById("flagsContainer");

var domains = {
    en: {
        domainCode: "capgeminidemo",
        uiBundle: "capgeminidemo"
    },
    de: {
        domainCode: "capgeminidemo",
        uiBundle: "capgeminidemo"
    },
    fr: {
        domainCode: "capgeminidemo",
        uiBundle: "capgeminidemo"
    },
    es: {
        domainCode: "capgeminidemo",
        uiBundle: "capgeminidemo"
    },
    br: {
        domainCode: "capgeminidemo",
        uiBundle: "capgeminidemo"
    },
    it: {
        domainCode: "capgeminidemo",
        uiBundle: "capgeminidemo"
    }
}

addFlags();
// addFlag('br');
// addFlag('en');
// addFlag('es');
// addFlag('de');
// addFlag('fr');
// addFlag('it');




function addFlags() {
    for (var language in domains) {
        console.log("language '" + language + "' has domain: " + domains[language].domainCode);
        addFlag(language, domains[language].domainCode, domains[language].uiBundle)
    }    
}


function addFlag(language, domain, bundle) {
    var box = document.createElement('div');
    box.className = "flag-container";
    box.innerHTML = `
    <div class="flag flag-${language}"></div>
    <div class="flag-text">
        <p>${language}</p>
    </div>
    `;
    box.setAttribute("onclick", `openBot('${domain}', '${bundle}')`);
     flagsContainer.appendChild(box);
}

function openBot(domain, bundle) {
    console.warn("Clicked!");
    // window.location.href = `https://capgemini-eu.dev.amelia.com/Amelia/ui/${bundle}/login?embed=iframe&domainCode=${domain}&language=en&hint=Hello world!&delay=5000`;
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