function startRadio() {
    const audio = document.getElementById("audio");
    const status = document.getElementById("status");

    // Dočasný testovací stream
    audio.src = "https://stream.live.vc.bbcmedia.co.uk/bbc_radio_one";
    audio.play();

    status.textContent = "🔴 Rádio Aura hrá...";
}
