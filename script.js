const songs = [
  { title: "🎵 Hudobná vlna 1", url: "assets/music/song-1.mp3" },
  { title: "🎵 Hudobná vlna 2", url: "assets/music/song-2.mp3" },
  { title: "🎵 Hudobná vlna 3", url: "assets/music/song-3.mp3" },
  { title: "🎵 Hudobná vlna 4", url: "assets/music/song-4.mp3" },
  { title: "🎵 Hudobná vlna 5", url: "assets/music/song-5.mp3" },
  { title: "🎵 Hudobná vlna 6", url: "assets/music/song-6.mp3" },
  { title: "🎵 Hudobná vlna 7", url: "assets/music/song-7.mp3" },
  { title: "🎵 Hudobná vlna 8", url: "assets/music/song-8.mp3" },
  { title: "🎵 Hudobná vlna 9", url: "assets/music/song-9.mp3" }
];

let songIndex = 0;

const audio = document.getElementById("audio");
const statusText = document.getElementById("status");
const nowPlaying = document.getElementById("nowPlaying");

function speak(text, callback) {
  const voice = new SpeechSynthesisUtterance(text);
  voice.lang = "sk-SK";
  voice.rate = 0.95;
  voice.pitch = 1;

  voice.onend = () => {
    if (callback) callback();
  };

  speechSynthesis.cancel();
  speechSynthesis.speak(voice);
}

async function getNewsText() {
  try {
    const rssUrl = "https://www.teraz.sk/rss/slovensko.rss";
    const apiUrl =
      "https://api.rss2json.com/v1/api.json?rss_url=" +
      encodeURIComponent(rssUrl);

    const response = await fetch(apiUrl);
    const data = await response.json();

    const items = data.items.slice(0, 3);
    return items.map(item => item.title).join(". ");
  } catch (error) {
    return "Aktuálne správy sa momentálne nepodarilo načítať.";
  }
}

async function getWeatherText() {
  try {
    const url =
      "https://api.open-meteo.com/v1/forecast?latitude=48.1486&longitude=17.1077&current=temperature_2m,wind_speed_10m,weather_code&timezone=Europe%2FBratislava";

    const response = await fetch(url);
    const data = await response.json();

    const temp = data.current.temperature_2m;
    const wind = data.current.wind_speed_10m;

    return `Aktuálne počasie v Bratislave: ${temp} stupňov Celzia, vietor ${wind} kilometrov za hodinu.`;
  } catch (error) {
    return "Počasie sa momentálne nepodarilo načítať.";
  }
}

async function getTrafficText() {
  return "Dopravný servis: aktuálnu situáciu na cestách zatiaľ overujeme. Pri jazde sledujte dopravné značenie a jazdite opatrne.";
}

function startRadio() {
  statusText.textContent = "🔴 Rádio Aura LIVE";
  nowPlaying.textContent = "Teraz hrá: AI moderátor";

  speak(
    "Dobrý deň, počúvate Rádio Aura, hudbu budúcnosti. Čaká vás mix hudby, aktuálnych informácií zo Slovenska, počasia a zaujímavostí.",
    async () => {
      const news = await getNewsText();

      nowPlaying.textContent = "Teraz hrá: Aktuálne správy";
      speak("Prinášame krátke správy zo Slovenska. " + news, () => {
        playSong();
      });
    }
  );
}

function playSong() {
  const song = songs[songIndex];

  audio.src = song.url;
  audio.play();

  nowPlaying.textContent = "Teraz hrá: " + song.title;
}

function nextTrack() {
  songIndex++;

  if (songIndex >= songs.length) {
    songIndex = 0;
  }

  playSong();
}

audio.addEventListener("ended", () => {
  songIndex++;

  if (songIndex === 2) {
    speak(
      "Počúvate Rádio Aura. Teraz pokračujeme ďalšou hudobnou vlnou.",
      playSong
    );
    return;
  }

  if (songIndex === 4) {
    Promise.all([getWeatherText(), getTrafficText()]).then(
      ([weather, traffic]) => {
        nowPlaying.textContent = "Teraz hrá: Počasie a doprava";
        speak(weather + " " + traffic + " Rádio Aura pokračuje hudbou.", playSong);
      }
    );
    return;
  }

  if (songIndex === 6) {
    speak(
      "Zaujímavosť dňa. Internetové rádio môže počúvať ktokoľvek na svete, stačí webová stránka a internetové pripojenie.",
      playSong
    );
    return;
  }

  if (songIndex >= songs.length) {
    songIndex = 0;
    speak(
      "Ďakujeme, že počúvate Rádio Aura. Začíname ďalší hudobný blok.",
      playSong
    );
    return;
  }

  playSong();
});