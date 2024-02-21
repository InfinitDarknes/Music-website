let IsPlaying = false;
const Music = document.getElementById("music");
const ToggleIcon = document.getElementById("toggle-icon");
const Time = document.getElementById("time");
const ProgressBar = document.getElementById("progress-bar");
const Progress = document.getElementById("progress");
const SoundBar = document.getElementById("sound-bar");
const Sound = document.getElementById("sound");
function Toggle() {
  if (IsPlaying) Pause();
  else Play();
}
function Play() {
  IsPlaying = true;
  ToggleIcon.src = "../Icons/PauseIcon.png";
  Music.play();
}
function Pause() {
  IsPlaying = false;
  ToggleIcon.src = "../Icons/PlayIcon.png";
  Music.pause();
}
function Forward() {
  Music.currentTime += 30;
  Play();
}
function Backward() {
  Music.currentTime -= 30;
  Play();
}
function UpdateProgressBar() {
  if (!IsPlaying) return;
  console.log(Music.currentTime);
  if (Music.currentTime === Music.duration) Reset();
  let CurrentTime = Music.currentTime;
  let CurrentMin = Math.floor(CurrentTime / 60)
    .toString()
    .padStart(2, "0");
  let CurrentSec = Math.floor(CurrentTime % 60)
    .toString()
    .padStart(2, "0");
  let CurrentPrecentage = (CurrentTime / Music.duration) * 100;
  Progress.style.width = `${CurrentPrecentage}%`;
  Time.innerText = `${CurrentMin} : ${CurrentSec}`;
}
function Reset() {
  IsPlaying = false;
  Music.currentTime = 0;
  ToggleIcon.src = "../Icons/PlayIcon.png";
  Progress.style.width = "0px";
}
ProgressBar.addEventListener("click", (Event) => {
  let ClickPosition = (Event.offsetX / ProgressBar.clientWidth) * 100;
  Music.currentTime = Music.duration * (ClickPosition / 100);
  Progress.style.width = `${ClickPosition}%`;
});
SoundBar.addEventListener("click", (Event) => {
  let ClickPosition = (Event.offsetX / SoundBar.clientWidth) * 100;
  Music.volume = ClickPosition / 100;
  Sound.style.width = `${ClickPosition}%`;
});
