const video = document.getElementById("scaryVideo");
const overlay = document.getElementById("overlay");

const isMessenger = /FBAN|FBAV|Messenger/i.test(navigator.userAgent);

video.src = "assets/1.mp4?nocache=" + Date.now();
video.volume = 1.0;
video.muted = true;

const enableVideo = async () => {
  if (isMessenger) {
    overlay.innerHTML = `
      🎃 <b>Messenger limits.</b><br><br>
      <a href="${window.location.href}" target="_blank" 
         style="color:#ff944d;text-decoration:underline;font-size:1.2rem;">
         Open this page in your browser to hear the sound
      </a>
    `;
    return;
  }

  overlay.style.display = "none";
  video.style.display = "block";

  try {
    await video.play();
    video.muted = false;
    await video.play();
  } catch (e) {
    console.error("Playback error:", e);
  }

  document.removeEventListener("click", enableVideo);
  document.removeEventListener("touchstart", enableVideo);
  document.removeEventListener("keydown", enableVideo);
};

document.addEventListener("click", enableVideo, { once: true });
document.addEventListener("touchstart", enableVideo, { once: true });
document.addEventListener("keydown", enableVideo, { once: true });


video.addEventListener("error", () => {
  overlay.innerHTML = "Failed to load video. Check your connection or file path.";
});
