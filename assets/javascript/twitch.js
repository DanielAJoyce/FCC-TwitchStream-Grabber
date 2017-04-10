var twitchChannels = ["ESL_SC2", "OgamingSC2", "esl_csgo", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "adkiwod0934ikjefdc"];

$(document).ready(function() {
  twitchChannels.forEach(function(entry) {

    console.log("hello");
    getTwitch(entry);

  });

})

function getTwitch(channel) {

  // Will refactor this nicely into an object later on. 
  var responseChan;
  var responseStream;
  var gameName;
  var streamUrl;
  var displayName;
  var channelLogo;

  
  $.getJSON('https://cors-anywhere.herokuapp.com/https://wind-bow.gomix.me/twitch-api/channels/' + channel + '/', function(dataChan) {
    if (dataChan.status === 404) {
      console.log("404");
      var alert = '<div class="alert alert-info">';
      alert += '<span class="closebtn"';
      alert += 'onclick="this.parentElement.style.display=';
      alert += "'none';";
      alert += '">&times;</span>';
      alert += 'Stream:' + channel + 'Does not exist</div>';
      $("#head").append(alert);
    } else {
      console.log(dataChan);
      console.log("this acc is ok");
      displayName = dataChan.display_name;
      streamUrl = dataChan.url;
      gameName = dataChan.game;
      channelLogo = dataChan.logo;
      console.log(gameName);
      console.log(streamUrl);
      console.log(displayName);
      console.log(channelLogo);
      addCard(channel, displayName, streamUrl, gameName, channelLogo);
    }
  });

}

function addCard(channel, displayName, streamUrl, gameName, channelLogo) {
  $.getJSON('https://cors-anywhere.herokuapp.com/https://wind-bow.gomix.me/twitch-api/streams/' + channel + '/', function(dataStream) {
    console.log("hello datastream:" + dataStream);

    if (dataStream.stream == null) {
      console.log("null");
      var card = '<div class="card offline">';
    } else {
      console.log("not null " + dataStream);
      var card = '<div class="card online">';

    }

    // var card = '<div class="card">';
    if(channelLogo === null){
      channelLogo="https://cdn1.iconfinder.com/data/icons/simple-icons/2048/twitch-2048-black.png";
    }
    card += '<img src="' + channelLogo + '"/>';
    card += '<h3>' + '<a href="' + streamUrl + '" target="_blank">' + displayName + '</a></h3>';
    if (gameName == null) {
      gameName = "Random";
    }
    if(gameName.length > 15)
      {
        gameName = gameName.substring(0,14);
      }
    card += "<h3>" + gameName + "<h3>";
    card += "<div>";

    $(".twitchStreams").append(card);

  });

}

