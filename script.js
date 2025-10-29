
const video = document.getElementById("scaryVideo");
const overlay = document.getElementById("overlay");


video.src = "assets/1.mp4?nocache=" + Date.now();
video.volume = 1.0;
video.muted = true;


const enableVideo = () => {
  overlay.style.display = "none";
  video.style.display = "block";
  video.muted = false;
  video.play().catch(console.error);

  document.removeEventListener("click", enableVideo);
  document.removeEventListener("keydown", enableVideo);
  document.removeEventListener("touchstart", enableVideo);
};

document.addEventListener("click", enableVideo);
document.addEventListener("keydown", enableVideo);
document.addEventListener("touchstart", enableVideo);
