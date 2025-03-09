// Path to your images
const img = [
  'assets/img/wizardAnimation/rest.png', 
  'assets/img/wizardAnimation/lightning.png',
  'assets/img/wizardAnimation/beforeLightning.png', 
  'assets/img/wizardAnimation/talking.png', 
  'assets/img/wizardAnimation/yelling.png',
  'assets/img/wizardAnimation/beforeLightningMiddle.png',
  'assets/img/wizardAnimation/castingSpells.png'
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

// Example usage
updateWizardGreeting('Welcome new viewer to the stream! The wizard awaits!');
