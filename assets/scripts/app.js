
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

// Authenticate and authorize the extension
Twitch.ext.onAuthorized((auth) => {
  const userId = auth.userId; // Get the user ID provided by Twitch
  const broadcasterId = auth.broadcasterId; // Get the broadcaster's ID
  const welcomeMessage = `✨ Greetings, traveler! You have entered the realm of magic and wonder. Prepare thyself! 🧙‍♂️✨`;

  // Display the welcome message
  updateWizardGreeting(welcomeMessage); // Display greeting message function

  // Remove the greeting after 3 seconds
  setTimeout(() => {
    updateWizardGreeting(''); // Clear the message after 3 seconds
  }, 3000);

  // Listen for incoming messages from the backend (e.g., for 'startLightning' action)
  const socket = new WebSocket('wss://pubsub-edge.twitch.tv');
  
  // Authenticate with the extension token
  socket.onopen = () => {
    const token = generateExtensionToken(broadcasterId); // Use the broadcaster's ID for the token
    socket.send(JSON.stringify({
      type: 'LISTEN',
      topics: [`broadcast-${broadcasterId}`], // Listen to the broadcast topic
      auth_token: token // Send the auth token for PubSub authentication
    }));
  };

  // Handle incoming messages
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    
    // If a message is received and it contains an action
    if (data.type === 'MESSAGE' && data.data.message) {
      const message = JSON.parse(data.data.message);
      
      // If the message action is 'startLightning', run the startLightning function
      if (message.action === 'startLightning') {
        startLightning(); // Call the function that triggers the lightning effect
      }
    }
  };
});

// Function to generate the extension token (used for PubSub)
function generateExtensionToken(broadcasterId) {
  const secret = process.env.EXTENSION_SECRET;  // Get the extension secret key
  const payload = {
    exp: Math.floor(Date.now() / 1000) + 60,  // Token expires in 60 seconds
    user_id: broadcasterId,  // The broadcaster's user ID
    role: 'external',  // 'external' for backend services
    channel_id: broadcasterId,  // Channel ID (same as broadcaster ID)
    pubsub_perms: {
      send: ['broadcast']  // Permission to send PubSub messages
    }
  };
  return jwt.sign(payload, Buffer.from(secret, 'base64'), { algorithm: 'HS256' }); // Return signed token
}

// Function to display or clear the greeting message
function updateWizardGreeting(message) {
  // Logic to display the message in your extension (e.g., show the message in the overlay)
  const greetingElement = document.getElementById('greeting-message');
  if (greetingElement) {
    greetingElement.innerHTML = message; // Set the greeting message
  }
}

// Function to start the lightning effect
function startLightning() {
  console.log('⚡ Lightning effect triggered!');
  // Add the logic for your lightning effect here (e.g., animations)
}
