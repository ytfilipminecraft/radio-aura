const playlist = [
  {
    title: "AI moderátor – Rádio Aura",
    url: "assets/audio/moderator-1.mp3"
  },
  {
    title: "Hudobný Mix 1",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    title: "Hudobný Mix 2",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

let currentTrack = 0;

function startRadio() {
  playTrack(currentTrack);
}

function nextTrack() {
  currentTrack++;

  if (currentTrack >= playlist.length) {
    currentTrack = 0;
  }

  playTrack(currentTrack);
}

function playTrack(index) {
  const audio = document.getElementById("audio");
  const status = document.getElementById("status");
  const nowPlaying = document.getElementById("nowPlaying");

  audio.src = playlist[index].url;
  audio.play();

  status.textContent = "🔴 Rádio Aura vysiela";
  nowPlaying.textContent = "Teraz hrá: " + playlist[index].title;
}

document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("audio");

  audio.addEventListener("ended", () => {
    nextTrack();
  });
});