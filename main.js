let installPromptEvent;

window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent Chrome <= 67 from automatically showing the prompt
  event.preventDefault();
  // Stash the event so it can be triggered later.
  installPromptEvent = event;
  // Update the install UI to notify the user app can be installed
  document.querySelector('#install-button').disabled = false;
});

btnInstall = document.getElementById('install-button');

btnInstall.addEventListener('click', () => {
  // Update the install UI to remove the install button
  installPromptEvent.prompt();
  // Wait for the user to respond to the prompt
  installPromptEvent.userChoice.then((choice) => {
    if (choice.outcome === 'accepted') {
      btnInstall.style.display = "none";
    } else {
      //console.log('User dismissed the A2HS prompt');
    }
    // Clear the saved prompt since it can't be used again
    installPromptEvent = null;
  });
});

function openBot() {
  var href = "https://capgemini-eu.dev.amelia.com/Amelia/ui/capgeminidemo/login?embed=iframe&domainCode=capgeminidemo&language=en&myURL=https://chip.capgemini.com/clients/DEMO_conf/preview_c&hint=Hello world!&delay=5000";
  window.location.href = href;
}