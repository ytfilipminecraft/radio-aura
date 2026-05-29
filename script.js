const playlist = [
  { title: "🎙️ Rádio Aura – Úvod", url: "assets/audio/moderator-1.mp3" },
  { title: "📰 Krátke správy zo Slovenska", url: "assets/audio/moderator-2.mp3" },

  { title: "🎵 Hudobná vlna 1", url: "assets/music/song-1.mp3" },
  { title: "🎵 Hudobná vlna 2", url: "assets/music/song-2.mp3" },

  { title: "🌦️ Počasie, doprava a prehľad dňa", url: "assets/audio/moderator-3.mp3" },

  { title: "🎵 Hudobná vlna 3", url: "assets/music/song-3.mp3" },
  { title: "🎵 Hudobná vlna 4", url: "assets/music/song-4.mp3" },

  { title: "💡 Zaujímavosť dňa na Rádiu Aura", url: "assets/audio/moderator-4.mp3" },

  { title: "🎵 Hudobná vlna 5", url: "assets/music/song-5.mp3" },
  { title: "🎵 Hudobná vlna 6", url: "assets/music/song-6.mp3" },
  { title: "🎵 Hudobná vlna 7", url: "assets/music/song-7.mp3" },
  { title: "🎵 Hudobná vlna 8", url: "assets/music/song-8.mp3" },
  { title: "🎵 Hudobná vlna 9", url: "assets/music/song-9.mp3" }
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