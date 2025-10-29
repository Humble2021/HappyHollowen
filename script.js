const video = document.getElementById("scaryVideo");
const overlay = document.getElementById("overlay");

video.src = "assets/1.mp4?nocache=" + Date.now();
video.volume = 1.0;
video.muted = true;

const enableVideo = async () => {
  overlay.style.display = "none";
  video.style.display = "block";

  try {
    await video.play();
  } catch (e) {
    console.warn("Muted autoplay failed:", e);
  }

  video.muted = false;
  try {
    await video.play();
  } catch (e) {
    console.error("Playback with sound failed:", e);
  }

  document.removeEventListener("click", enableVideo);
  document.removeEventListener("touchstart", enableVideo);
  document.removeEventListener("keydown", enableVideo);
};

document.addEventListener("click", enableVideo, { once: true });
document.addEventListener("touchstart", enableVideo, { once: true });
document.addEventListener("keydown", enableVideo, { once: true });

video.addEventListener("error", () => {
  overlay.style.display = "flex";
  overlay.innerHTML = "Failed to load video. <br>Check your connection or file path.";
});
