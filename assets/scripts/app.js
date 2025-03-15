
const wizard = [
  'https://lukskul.github.io/wizardOverlay/assets/img/rest.png', 
  'https://lukskul.github.io/wizardOverlay/assets/img/lightning.png',
  'https://lukskul.github.io/wizardOverlay/assets/img/beforeLightning.png', 
  'https://lukskul.github.io/wizardOverlay/assets/img/talking.png', 
  'https://lukskul.github.io/wizardOverlay/assets/img/yelling.png',
  'https://lukskul.github.io/wizardOverlay/assets/img/beforeLightningMiddle.png',
  'https://lukskul.github.io/wizardOverlay/assets/img/castingSpells.png',
];

const fireImage = [
  'https://lukskul.github.io/wizardOverlay/assets/img/fire1.png',
  'https://lukskul.github.io/wizardOverlay/assets/img/fire2.png',
  'https://lukskul.github.io/wizardOverlay/assets/img/fire3.png',
  'https://lukskul.github.io/wizardOverlay/assets/img/fire4.png',
  'https://lukskul.github.io/wizardOverlay/assets/img/fire5.png'  
]

let animationInterval;
let currentImage = 0;
let isCasting = false;
let message = ''; 

const wizardDiv = document.getElementById('wizard');
const orbContainer = document.querySelector('.orb-container');
const body = document.body;

//Setting Initial Image onLoad
if (wizardDiv) {
  wizardDiv.style.backgroundImage = `url(${wizard[0]})`;
}

function stop() {
  if (animationInterval) {
    clearInterval(animationInterval);
    animationInterval = null;
    document.body.style.backgroundColor = '';

    wizardDiv.style.backgroundImage = `url(${wizard[0]})`;
    wizardDiv.style.transition = 'background-image 0.5s ease-in-out';
    wizardDiv.classList.remove("wizard"); 

    wizardGreeting(''); 
    message = ''; 
    isCasting = false; 
  }
}

function clearRestImage() {
  if (wizardDiv.style.backgroundImage.includes(wizard[0])) {
    wizardDiv.style.backgroundImage = '';
    wizardDiv.style.transition = ''; 
    wizardDiv.classList.remove("wizard"); 
  }
}
// Adjusting the orbContainer's transform handling
function resetOrbPosition() {
  orbContainer.style.transition = 'transform 0.5s ease-in-out';
  orbContainer.style.transform = 'translateY(0)';
  orbContainer.style.animation = ''; // Clear previous bounce animation
}

function talking(message) {

  if (!wizardDiv || animationInterval) return;

  let time = (message.length / 2) * 200;
 
  wizardDiv.classList.add("wizard");
  animationInterval = setInterval(() => {
    currentImage = currentImage === 3 ? 4 : 3;
    wizardDiv.style.backgroundImage = `url(${wizard[currentImage]})`;
    clearRestImage();
  }, 100);

  setTimeout(stop, time);
}

   //"Incendio Ignis!",           // Fireball spell
    //"Vitae Lux!",               // Heal spell
    //"Pluvia Nimbus!",              Rain
    //"Electra Fulmina!",            Lightning strike
    //"Aegis Custos!",            // Shield spell
    //"Glacius Frigus!",          // Frostbite
    //"Teleportum Verto!",        // Teleport
    //"Invisibilis Umbra!",       // Invisibility
    //"Evoco Familiaris!",        // Summon Familiar
    //"Levitateus!",              // Levitation
    //"Tempus Rerum!",            // Time stop
    //"Nox Aether!",              // Darkness spell
    //"Flamma Pyra!",                Flame spell
    //"Miragea Illusio!"          // Illusion spell


async function castSpell(spell) {
  if (!wizardDiv || isCasting) return;
  isCasting = true;

  // Ensure spell is always treated as a string
  if (typeof spell !== 'string') spell = spell?.target?.dataset?.spell || '';

  if (!spell) {
    isCasting = false;
    return;
  }

  let time = (spell.length / 2) * 100;

  translateMessage(spell); 

  wizardDiv.classList.add("wizard");
  animationInterval = setInterval(() => {
    currentImage = currentImage === 5 ? 6 : 5;
    wizardDiv.style.backgroundImage = `url(${wizard[currentImage]})`;
    clearRestImage();
  }, 90); //Timer is face speed

  setTimeout(stop, time);

  time = time + 2; 
  await new Promise(resolve => setTimeout(resolve, time));

  if (spell === "Electra Fulmina!") lightning();
  else if (spell === "Pluvia Nimbus!") rain();
  else if (spell === "Flamma Pyra!") fire();
}
 
function wizardGreeting(message) {
  if (typeof message !== 'string') message = message?.target?.dataset?.message || '';

  if (!message) {
    return;
  }
  if (message) {
    talking(message);  
    translateMessage(message); 
  }
  setTimeout(() => {
    resetOrbPosition();
  }, 4000);
}

function translateMessage(message) {
  const wizardTextBox = document.getElementById('wizardText');
  let time = (message.length / 2) * 300;

  if (wizardTextBox) {
    wizardTextBox.style.display = "block";
    wizardTextBox.textContent = message;
  }

  setTimeout(() => {
    wizardTextBox.style.display = "none";
  }, time);  

}

function lightning() {
  if (!animationInterval)
  animationInterval = setInterval(() => {
    currentImage = currentImage === 2 ? 1 : 2;
    wizardDiv.style.backgroundImage = `url(${wizard[currentImage]})`;
    body.style.backgroundColor = currentImage === 1 ? 'white' : 'black';
    body.style.transition = 'background-color 0.09s ease-in-out';
    clearRestImage();
  }, 75); 
  setTimeout(() => {
    stop(); 
  }, 3000); 

}

function rain() {
  const rainContainer = document.getElementById('elements');
  const numberOfRaindrops = 200; // Number of raindrops for a dense effect

  // Create raindrops
  for (let i = 0; i < numberOfRaindrops; i++) {
    const rainDrop = document.createElement('div');
    rainDrop.classList.add('rain-drop');

    // Random position along the X-axis and random speed
    rainDrop.style.left = `${Math.random() * 100}vw`; // 100vw to cover full width
    rainDrop.style.animationDuration = `${Math.random() * 0.5 + 0.5}s`; // Fast, random falling speed
    rainDrop.style.animationTimingFunction = 'linear';

    // Random delay to make raindrops fall at different times
    rainDrop.style.animationDelay = `${Math.random() * 2}s`;

    rainContainer.appendChild(rainDrop);
  }

  // Remove raindrops after 3 seconds
  setTimeout(() => {
    rainContainer.innerHTML = ''; // Clear all raindrops
  }, 500000); 
  setTimeout(() => {
    resetOrbPosition();
  }, 3000);
}

function fire() {
  if (!animationInterval)
  // Start the fire animation
  animationInterval = setInterval(() => {
    currentImage = (currentImage + 1) % fireImage.length; // Loop through fire images
    wizardDiv.style.backgroundImage = `url(${fireImage[currentImage]})`;
  }, 50); // Slightly slower to make the animation visible

  // Stop the fire animation after 2 seconds
  setTimeout(() => {
    stop();
  }, 3000);
  setTimeout(() => {
    resetOrbPosition();
  }, 4000);
}

Twitch.ext.onAuthorized((auth) => {
  const welcomeMessage = `✨ Greetings, traveler! ✨`; 
  wizardGreeting(welcomeMessage);
});

document.getElementById('body').addEventListener('click', () => {

  orbContainer.style.transform = 'translateY(-100%)';

  castSpell("Electra Fulmina!");
  setTimeout(() => {
      stop();
      wizardGreeting("Are you trying to push my buttons?")
  }, 7000);
  setTimeout(() => {
    resetOrbPosition();
  }, 7000);
});

document.getElementById('hand').addEventListener('click', () => {
  orbContainer.style.transform = 'translateY(-100%)';
  castSpell("Flamma Pyra!")
})

document.getElementById('staff').addEventListener('click', () => {
  orbContainer.style.transform = 'translateY(-100%)';
  castSpell("Pluvia Nimbus!")
})
 
document.getElementById('head').addEventListener('click', () => {
  orbContainer.style.transform = 'translateY(-100%)';
  wizardGreeting("Fear Not My Child!")
})
