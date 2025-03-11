
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
    document.getElementById('wizard').style.backgroundImage = `url(${img[0]})`;
    clearInterval(animationInterval);
    animationInterval = null;
    wizardDiv.style.transition = 'background-image 0.5s ease-in-out';
    document.body.style.backgroundColor = '';
    wizardDiv.classList.remove("wizard"); 
    wizardGreeting(''); 
  }
}

function clearRestImage() {
  wizardDiv.style.transition = ''; // Remove transition when starting animations
  if (wizardDiv.style.backgroundImage.includes(img[0])) {
    wizardDiv.style.backgroundImage = '';
    wizardDiv.classList.remove("wizard"); 
  }
}

function startTalking() {
  if (!wizardDiv) return;

  if(!animationInterval){
    wizardDiv.classList.add("wizard"); 
    animationInterval = setInterval(() => {
      currentImage = currentImage === 3 ? 4 : 3; 
      wizardDiv.style.backgroundImage = `url(${img[currentImage]})`; 
      clearRestImage(); 
    }, 100);
  }
}

function startYelling() {
  if (!wizardDiv) return;
  if(!animationInterval){
    wizardDiv.classList.add("wizard");
    animationInterval = setInterval(() => {
      currentImage = currentImage === 4 ? 3 : 4; 
      wizardDiv.style.backgroundImage = `url(${img[currentImage]})`; 
      clearRestImage(); 
    }, 100);
  }
}

function startCastingSpells() {
  if (!wizardDiv) return;

  let spell = [
    "Incendio Ignis!",          // Fireball spell
    "Vitae Lux!",               // Heal spell
    "Electra Fulmina!",         // Lightning strike
    "Aegis Custos!",            // Shield spell
    "Glacius Frigus!",          // Frostbite
    "Teleportum Verto!",        // Teleport
    "Invisibilis Umbra!",       // Invisibility
    "Evoco Familiaris!",        // Summon Familiar
    "Levitateus!",              // Levitation
    "Tempus Rerum!",            // Time stop
    "Nox Aether!",              // Darkness spell
    "Flamma Pyra!",             // Flame wave
    "Miragea Illusio!"          // Illusion spell
  ];

  let randomSpell = spell[Math.floor(Math.random() * spell.length)];

  if(!animationInterval){
    animationInterval = setInterval(() => {
      currentImage = currentImage === 5 ? 6 : 5; 
      wizardDiv.style.backgroundImage = `url(${img[currentImage]})`; 
      clearRestImage();
      wizardGreeting(randomSpell);
    }, 200);

    setTimeout(() => {
      stop(); 
      randomSpell = ''; 
      wizardGreeting('');
    }, 2000); 
  }
}

// Lightning effect function
function startLightning() {

    if (!wizardDiv) return;

    if (!animationInterval) {
      animationInterval = setInterval(() => {
        currentImage = currentImage === 2 ? 1 : 2;
        wizardDiv.style.backgroundImage = `url(${img[currentImage]})`;
  
        body.style.backgroundColor = currentImage === 1 ? 'white' : 'black';
        body.style.transition = 'background-color 0.09s ease-in-out';
        clearRestImage();
      }, 10); 

      setTimeout(() => {
        stop(); 
      }, 2000); 
    }

}

// Example: Start and stop on button click
document.getElementById('startButtonLightning').addEventListener('click', startLightning);
document.getElementById('startButtonCastingSpells').addEventListener('click', startCastingSpells); 

function wizardGreeting(message) {
  const wizardTextBox = document.getElementById('wizardText');
  wizardTextBox.innerHTML = message;

  if (message === '') {
    wizardTextBox.style.display = "none"; // Hide the div when there's no content
  } else {
    wizardTextBox.style.display = "block"; // Show the div when there's content
    wizardTextBox.textContent = content; // Set the text content
  }

  if (message) {
    startTalking(); // Start talking when there’s a message
  } else {
    stop(); // Stop when the message disappears
  }
}

Twitch.ext.onAuthorized((auth) => {
  const welcomeMessage = `✨ Greetings, traveler!`; 
  wizardGreeting(welcomeMessage);

  setTimeout(() => { 
    wizardGreeting(''); // Clear message after 3s, stop talking
  }, 3000);
});

//You have entered the realm of magic and wonder. Prepare thyself! 🧙‍♂️✨`;

let clickCount = 0;

document.getElementById('wizard').addEventListener('click', () => {
    if (clickCount >= 6) return;

    clickCount++;

    if (clickCount === 6) {
        startLightning(); 
        wizardGreeting("STOP!!!");
        setTimeout(() => {
            stop();
        }, 2000);
    } else {
      animationInterval = setInterval(() => {
        currentImage = currentImage === 5 ? 6 : 5; 
        wizardDiv.style.backgroundImage = `url(${img[currentImage]})`; 
        clearRestImage();
      }, 200);
        setTimeout(() => {
            stop();
        }, 800);
    }
});

