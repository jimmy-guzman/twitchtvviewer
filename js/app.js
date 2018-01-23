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

streams.forEach(streamName => {
  const url = "https://wind-bow.glitch.me/twitch-api/streams/" + streamName;
  fetch(url)
    .then(response => response.json())
    .then(data => {
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
      const clickable = document.querySelectorAll(".online");
      clickable.forEach(element =>
        element.addEventListener("click", openStream)
      );

      function openStream() {
        window.open(this.dataset.href, "_blank");
      }
    });
});
