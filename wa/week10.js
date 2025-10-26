const newQuoteBtn = document.getElementById('new-quote');
const lyricText = document.getElementById('lyric');
const songText = document.getElementById('song');
const albumText = document.getElementById('album');

// Map album names to colors
const albumColors = {
"Taylor Swift": "#3dd9db",
  "Red": "#ed1f1f",
  "Red (Taylor's Version)": "#a81818",
  "Fearless": "#fff352",
  "Fearless (Taylor's Version)": "#edc339",
  "Speak Now": "#b739ed",
  "Speak Now (Taylor's Version)": "#7c1fa3",
  "1989": "#9bd4e0",
  "1989 (Taylor's Version)": "#5e9aa6",
  "Lover": "#ffb6c1",
  "Reputation": "#555555",
  "Evermore": "#eb711a",
  "Folklore": "#bfbbb8",
  "Midnights": "#1a1a2e"
};

async function getLyric() {
  lyricText.textContent = "✨ Fetching a Taylor Swift lyric...";
  songText.textContent = "";
  albumText.textContent = "";

  newQuoteBtn.disabled = true;

  try {
    const response = await fetch("https://taylorswiftapi.onrender.com/get");
    const data = await response.json();

    lyricText.textContent = `"${data.quote}"`;
    songText.textContent = `🎵 Song: ${data.song}`;
    albumText.textContent = `💿 Album: ${data.album}`;

    // Set background color based on album
   const bgColor = albumColors[data.album]
document.body.style.backgroundColor = bgColor;


  } catch (error) {
    lyricText.textContent = "Oops! Couldn't fetch a lyric. Try again.";
    console.error(error);
  } finally {
    newQuoteBtn.disabled = false;
  }
}

newQuoteBtn.addEventListener('click', getLyric);
