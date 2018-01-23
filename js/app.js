const streams = [
  "ESL_SC2",
  "OgamingSC2",
  "cretetion",
  "freecodecamp",
  "storbeck",
  "habathcx",
  "RobotCaleb",
  "noobs2ninjas",
  "nbagleague",
  "nba",
  "monstercat",
  "eepi111"
];

const channelsTable = document.querySelector(".channels-table");
const navButtons = document.querySelectorAll(".nav-buttons li");
let isOnline;
let isOffline;

streams.forEach(streamName => {
  const url = "https://wind-bow.glitch.me/twitch-api/streams/" + streamName;
  fetch(url)
    .then(response => response.json())
    .then(data => render(data, streamName));
});

function render(data, streamName) {
  let gameName = "";
  let status = "Currently Offline";
  let logo = "";
  let online = "offline";
  let streamUrl = "";

  if (data.stream) {
    online = "online";
    status = data.stream.game + ": " + data.stream.channel.status;
    logo = `<img class="streamer-logo" src="${
      data.stream.channel.logo
    }" alt="logo of ${streamName}">`;
    streamUrl = data.stream.channel.url;
  }

  channelsTable.innerHTML += `
      <tr class=${online} data-href=${streamUrl}>
          <td>${logo}${streamName}</td>
          <td>${status}</td>
      </tr>
      `;

  isOnline = document.querySelectorAll(".online");
  isOffline = document.querySelectorAll(".offline");

  isOnline.forEach(element => element.addEventListener("click", openStream));

  function openStream() {
    window.open(this.dataset.href, "_blank");
  }
}

navButtons.forEach(button => button.addEventListener("click", changeDisplay));

function removeSelected() {
  navButtons.forEach(button => button.classList.remove("selected"));
}

function changeDisplay(button) {
  if (this.innerText === "Online") {
    removeSelected();
    this.classList.add("selected");
    isOnline.forEach(stream => (stream.style.display = "table-row"));
    isOffline.forEach(stream => (stream.style.display = "none"));
  }
  if (this.innerText === "Offline") {
    removeSelected();
    this.classList.add("selected");
    isOffline.forEach(stream => (stream.style.display = "table-row"));
    isOnline.forEach(stream => (stream.style.display = "none"));
  }
  if (this.innerText === "All") {
    removeSelected();
    this.classList.add("selected");
    isOffline.forEach(stream => (stream.style.display = "table-row"));
    isOnline.forEach(stream => (stream.style.display = "table-row"));
  }
}
