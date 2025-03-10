
// Path to your images
const img = [
  'assets/img/rest.png', 
  'assets/img/lightning.png',
  'assets/img/beforeLightning.png', 
  'assets/img/talking.png', 
  'assets/img/yelling.png',
  'assets/img/beforeLightningMiddle.png',
  'assets/img/castingSpells.png'
];

let animationInterval;
let currentImage = 0;

const wizardDiv = document.getElementById('wizard');
const body = document.body;

// Set initial image on page load
if (wizardDiv) {
  wizardDiv.style.backgroundImage = `url(${img[0]})`;
}

function stop() {
  if (animationInterval) {
    clearInterval(animationInterval);
    animationInterval = null;
    document.getElementById('wizard').style.backgroundImage = `url(${img[0]})`;

    wizardDiv.style.transition = 'background-image 0.5s ease-in-out';
    document.body.style.backgroundColor = '';
  }
}

function clearRestImage() {
  wizardDiv.style.transition = ''; // Remove transition when starting animations
  if (wizardDiv.style.backgroundImage.includes(img[0])) {
    wizardDiv.style.backgroundImage = '';
  }
}

function startTalking() {
  if (!wizardDiv) return;

  if(!animationInterval){
    clearRestImage();
    animationInterval = setInterval(() => {
      currentImage = currentImage === 3 ? 4 : 3; 
      wizardDiv.style.backgroundImage = `url(${img[currentImage]})`; 
    }, 100);
  }
}

function startYelling() {
  if (!wizardDiv) return;

  if(!animationInterval){
    clearRestImage();
    animationInterval = setInterval(() => {
      currentImage = currentImage === 0 ? 4 : 0; 
      wizardDiv.style.backgroundImage = `url(${img[currentImage]})`; 
    }, 300);
  }
}

function startCastingSpells() {
  if (!wizardDiv) return;

  if(!animationInterval){
    clearRestImage();
    animationInterval = setInterval(() => {
      currentImage = currentImage === 5 ? 6 : 5; 
      wizardDiv.style.backgroundImage = `url(${img[currentImage]})`; 
    }, 300);
  }
}

// Lightning effect function
function startLightning() {
  if (!wizardDiv) return;

  if (!animationInterval) {
    clearRestImage();
    animationInterval = setInterval(() => {
      currentImage = currentImage === 2 ? 1 : 2;
      wizardDiv.style.backgroundImage = `url(${img[currentImage]})`;

      body.style.backgroundColor = currentImage === 1 ? 'white' : 'black';
      body.style.transition = 'background-color 0.09s ease-in-out';
    }, 10); // Change every 200ms
  }
}

// Example: Start and stop on button click
document.getElementById('stopButton').addEventListener('click', stop);
document.getElementById('startButtonLightning').addEventListener('click', startLightning);
document.getElementById('startButtonTalking').addEventListener('click', startTalking); 
document.getElementById('startButtonYelling').addEventListener('click', startYelling); 
document.getElementById('startButtonCastingSpells').addEventListener('click', startCastingSpells); 

function updateWizardGreeting(message) {
  const wizardTextBox = document.getElementById('wizardText');
  wizardTextBox.innerHTML = message;
}
// // wizardOverlay.js
// Twitch.ext.onAuthorized((auth) => {
//   const userId = auth.userId; // Twitch provides this
//   const welcomeMessage = `✨ Greetings, traveler! You have entered the realm of magic and wonder. Prepare thyself! 🧙‍♂️✨`;
//   updateWizardGreeting(welcomeMessage); // Display the message

//   // Remove the greeting after 3 seconds
//   setTimeout(() => {
//       updateWizardGreeting(''); // Clear the message
//   }, 3000);
// });

// // Listen for incoming messages
// socket.onmessage = (event) => {
//   const data = JSON.parse(event.data);
  
//   if (data.type === 'MESSAGE' && data.data.message) {
//       const message = JSON.parse(data.data.message);
      
//       if (message.action === 'startLightning') {
//           startLightning(); // Run your startLightning function
//       }
//   }
// };
const socket = new WebSocket('ws://localhost:3000'); // WebSocket to your own server

Twitch.ext.onAuthorized((auth) => {
  const welcomeMessage = `✨ Greetings, traveler! You have entered the realm of magic and wonder. Prepare thyself! 🧙‍♂️✨`;
  updateWizardGreeting(welcomeMessage);

  setTimeout(() => {
    updateWizardGreeting('');
  }, 3000);
});

// Listen for WebSocket messages from your server
socket.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.action === 'startLightning') {
    startLightning();
  }
};

// Simulate a lightning request (you can replace this with any event)
function triggerLightning() {
  socket.send(JSON.stringify({ action: 'triggerLightning' }));
}
