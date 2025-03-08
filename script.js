
  const socket = new WebSocket('ws://localhost:3030');

  socket.onmessage = (event) => {
    if (event.data === 'wizardOverlay') { // Updated to listen for new message
      triggerWizardOverlay();
    }
  };

  function triggerWizardOverlay() {
    const lightning = document.getElementById('lightning');
    lightning.classList.remove('hidden');
    lightning.classList.add('flash');
    setTimeout(() => {
      lightning.classList.add('hidden');
      lightning.classList.remove('flash');
    }, 500);
}
