const butInstall = document.getElementById('buttonInstall');

// Variable to hold the deferred prompt event
let deferredPrompt;

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the default prompt from showing
    event.preventDefault();
    // Store the event so we can trigger it later
    deferredPrompt = event;
    // Make the install button visible
    butInstall.style.display = 'block';
});

// Handle the click event on the 'Install' button
butInstall.addEventListener('click', async () => {
    // If deferredPrompt is available, trigger the install prompt
    if (deferredPrompt) {
        // Show the install prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }

        // Reset the deferred prompt, as it's only used once
        deferredPrompt = null;
        // Optionally, hide the install button after installation
        butInstall.style.display = 'none';
    }
});

// Handle the 'appinstalled' event to detect when the PWA is installed
window.addEventListener('appinstalled', (event) => {
    console.log('PWA was installed successfully');
    // You can add any logic here you want to run after the app is installed
});
