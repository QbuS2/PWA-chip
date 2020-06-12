function openBot() {
  // var href = "https://capgemini-eu.dev.amelia.com/Amelia/ui/capgeminidemo/login?embed=iframe&domainCode=capgeminidemo&language=en&myURL=https://chip.capgemini.com/clients/DEMO_conf/preview_c&hint=Hello world!&delay=5000";
  // window.location.href = href;
}

function hideElement(element){
  if(element){
    document.getElementById(element).className += ' hidden'
  }
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("https://eustools.fr.capgemini.com/chip_ui/DEMO/e43127ad9018ad11dcc0a695356dbbb3/pwa/sw.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log(err));
  });
}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

var buttonInstall = document.getElementById('install-button');
buttonInstall.addEventListener('click', (e) => {
  deferredPrompt.prompt();
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      buttonInstall.style.display = "none"; //zainstalowane
    } else {
      console.log('User dismissed the install prompt'); // odmowil instalacji
    }
  });
});

window.addEventListener('appinstalled', (evt) => {
  console.log('INSTALL: Success');
});