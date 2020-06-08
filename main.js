var flagContainer = document.getElementById("flagContainer");


function addFlags(...args) {

}

addFlag('br');
addFlag('en');
addFlag('es');
addFlag('de');
addFlag('fr');
addFlag('it');

function addFlag(language) {
    var box = document.createElement('div');
    box.innerHTML = `
<div class="flag flag-${language}"></div>
<div class="flag-text">
    <p>${language}</p>
</div>
`;
    box.setAttribute("onclick", "openBot()");
    flagContainer.appendChild(box);
}

function openBot() {
    console.error("Clicked!");
    //window.location.href = "https://capgemini-eu.dev.amelia.com/Amelia/ui/capgeminidemo/login?embed=iframe&domainCode=capgeminidemo&language=en&myURL=https://chip.capgemini.com/clients/DEMO_conf/preview_c&hint=Hello world!&delay=5000";
}