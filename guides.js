
// Create an object to store audio elements
const audioElements = {};

function playAudio(modalId) {
  // Check if this audio is already created
  if (!audioElements[modalId]) {
    // Create a new audio element
    const audio = new Audio(`audio/${modalId}.mp3`);
    audioElements[modalId] = audio;
    
    // Add event listeners for audio states
    audio.addEventListener('ended', function() {
      document.querySelector(`#${modalId} .audio-button`).classList.remove('playing');
    });
  }
  
  const audioElement = audioElements[modalId];
  const button = document.querySelector(`#${modalId} .audio-button`);
  
  // If audio is already playing, pause it
  if (!audioElement.paused) {
    audioElement.pause();
    audioElement.currentTime = 0;
    button.classList.remove('playing');
    button.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M15.54 8.46C16.4774 9.39764 17.0039 10.6692 17.0039 11.995C17.0039 13.3208 16.4774 14.5924 15.54 15.53" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M19.07 5.93C20.9447 7.80528 21.9979 10.3489 21.9979 13C21.9979 15.6511 20.9447 18.1947 19.07 20.07" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Listen to Instructions
    `;
  } else {
    // Play the audio
    audioElement.play();
    button.classList.add('playing');
    button.innerHTML = `
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 5L6 9H2V15H6L11 19V5Z" fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M15.54 8.46C16.4774 9.39764 17.0039 10.6692 17.0039 11.995C17.0039 13.3208 16.4774 14.5924 15.54 15.53" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M19.07 5.93C20.9447 7.80528 21.9979 10.3489 21.9979 13C21.9979 15.6511 20.9447 18.1947 19.07 20.07" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Stop Audio
    `;
  }
}

// Function to open modal
function openModal(modalId) {
  document.getElementById(modalId).style.display = "block";
  document.body.style.overflow = "hidden";
}

// Function to close modal
function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
  document.body.style.overflow = "auto";
  
  // Stop audio if playing when modal is closed
  if (audioElements[modalId] && !audioElements[modalId].paused) {
    audioElements[modalId].pause();
    audioElements[modalId].currentTime = 0;
    document.querySelector(`#${modalId} .audio-button`).classList.remove('playing');
  }
}

// Close modal if clicked outside of content
window.onclick = function(event) {
  if (event.target.className === "modal") {
    closeModal(event.target.id);
  }
}
